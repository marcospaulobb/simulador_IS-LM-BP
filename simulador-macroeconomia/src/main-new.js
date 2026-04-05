import { computeEquilibrium, getISData, getLMData, getBPData, getFiscalMultiplier, getMonetaryMultiplier } from './model.js';
import { computeEquilibriumExpanded, getISDataExpanded, getLMDataExpanded, getBPDataExpanded, getAggregateComponentsExpanded } from './model-expanded.js';
import { initChart, updateChart } from './chart.js';
import { StateManager } from './state/StateManager.js';
import { UIController } from './ui/UIController.js';
import { ExplanationEngine } from './ui/ExplanationEngine.js';
import { ModalManager } from './ui/ModalManager.js';
import { scenarios, getScenario } from './scenarios/scenarios.js';
import { scenariosExpanded, getScenarioExpanded } from './scenarios/scenarios-expanded.js';
import { debounce } from './utils/debounce.js';
import { saveState, loadState, saveToHistory, exportToFile, importFromFile } from './utils/storage.js';
import html2canvas from 'html2canvas';

// Core instances
let chartInstance;
const stateManager = new StateManager();
const uiController = new UIController(stateManager);
const explanationEngine = new ExplanationEngine();
const modalManager = new ModalManager();

// Flag para usar modelo expandido
let useExpandedModel = false; // Começar com modelo simples

/**
 * Main update function - recalculates equilibrium and updates UI
 */
const updateApp = debounce((source = null, direction = null) => {
  try {
    const state = stateManager.getState();
    
    console.log('updateApp called - capitalMobility:', state.capitalMobility, 'isOpenEconomy:', state.isOpenEconomy, 'source:', source);
    
    let eq, dataIS, dataLM, dataBP;
    
    if (useExpandedModel && state.isOpenEconomy) {
      // Usar modelo expandido para economia aberta
      eq = computeEquilibriumExpanded(
        state.params,
        state.capitalMobility,
        state.isFloatingRate
      );
      
      // Calcular dados das curvas com modelo expandido
      dataIS = getISDataExpanded(state.params, eq.E);
      dataLM = getLMDataExpanded(state.params, eq.M);
      dataBP = getBPDataExpanded(state.params, state.capitalMobility, eq.E);
      
      // Converter i para r (compatibilidade com gráfico)
      eq.r = eq.i;
      eq.e_eq = eq.E;
      eq.M_eq = eq.M;
      
    } else {
      // Usar modelo simples (economia fechada ou compatibilidade)
      eq = computeEquilibrium(
        state.params,
        state.isOpenEconomy,
        state.isFloatingRate,
        state.capitalMobility
      );
      
      dataIS = getISData(state.params, state.isOpenEconomy, eq.e_eq);
      dataLM = getLMData(state.params, eq.M_eq);
      
      // BP só existe em economia aberta
      if (state.isOpenEconomy) {
        console.log('Generating BP with mobility:', state.capitalMobility, 'params:', state.params);
        dataBP = getBPData(state.params.rstar, state.capitalMobility, state.params);
        console.log('BP data points:', dataBP.length, 'first point:', dataBP[0]);
      } else {
        dataBP = []; // Economia fechada não tem BP
      }
    }
    
    // Update state with new equilibrium
    stateManager.setEquilibrium(eq);
    
    // Update endogenous variables in UI
    if (state.isOpenEconomy && state.isFloatingRate) {
      uiController.updateDisplay('e', eq.e_eq || eq.E);
      stateManager.updateParams({ e: eq.e_eq || eq.E, E: eq.e_eq || eq.E });
    }
    if (state.isOpenEconomy && !state.isFloatingRate) {
      uiController.updateDisplay('M', eq.M_eq || eq.M);
      stateManager.updateParams({ M: eq.M_eq || eq.M });
    }
    
    // Get initial state for comparison
    let initialData = null;
    const initialState = stateManager.getInitialState();
    if (initialState) {
      let initialEq;
      
      if (useExpandedModel && initialState.isOpenEconomy) {
        initialEq = computeEquilibriumExpanded(
          initialState.params,
          initialState.capitalMobility,
          initialState.isFloatingRate
        );
        
        initialData = {
          dataIS: getISDataExpanded(initialState.params, initialEq.E),
          dataLM: getLMDataExpanded(initialState.params, initialEq.M),
          dataBP: getBPDataExpanded(initialState.params, initialState.capitalMobility, initialEq.E)
        };
      } else {
        initialEq = computeEquilibrium(
          initialState.params,
          initialState.isOpenEconomy,
          initialState.isFloatingRate,
          initialState.capitalMobility
        );
        
        initialData = {
          dataIS: getISData(initialState.params, initialState.isOpenEconomy, initialEq.e_eq),
          dataLM: getLMData(initialState.params, initialEq.M_eq),
          dataBP: initialState.isOpenEconomy ? getBPData(initialState.params.rstar, initialState.capitalMobility, initialState.params) : []
        };
      }
    }
    
    // Prepare equilibrium data with policy info
    const eqData = { 
      Y: eq.Y, 
      r: eq.r,
      policy: source ? { type: source, direction: direction } : null
    };
    
    // Update chart with initial data for comparison
    updateChart(chartInstance, dataIS, dataLM, dataBP, eqData, state.isOpenEconomy, initialData);
    
    // Update explanation
    const explanation = explanationEngine.getExplanation({
      cause: source,
      direction,
      isOpenEconomy: state.isOpenEconomy,
      isFloatingRate: state.isFloatingRate,
      scenario: state.currentScenario ? getScenario(state.currentScenario) : null,
      equilibrium: eq,
      params: state.params
    });
    uiController.updateExplanation(explanation);
    
    // Update structural parameters explanation
    const structuralParams = ['c', 'b', 'k', 'h'];
    if (source && structuralParams.includes(source)) {
      console.log('Updating structural explanation for:', source, 'value:', state.params[source]);
      const structuralExplanation = explanationEngine.getStructuralParameterExplanation(
        source, 
        state.params[source], 
        state.isOpenEconomy
      );
      uiController.updateStructuralExplanation(structuralExplanation);
    } else {
      // Default structural explanation
      const defaultStructural = `<strong>Parâmetros Atuais:</strong><br>
        • PMgC (c) = ${state.params.c.toFixed(2)} → Multiplicador = ${(1/(1-state.params.c)).toFixed(2)}<br>
        • Sen. Investimento (b) = ${state.params.b.toFixed(0)} → IS ${state.params.b > 60 ? 'mais horizontal' : 'mais vertical'}<br>
        • Sen. Moeda-Renda (k) = ${state.params.k.toFixed(2)} → LM ${state.params.k > 0.5 ? 'mais vertical' : 'mais horizontal'}<br>
        • Sen. Moeda-Juros (h) = ${state.params.h.toFixed(0)} → LM ${state.params.h > 80 ? 'mais horizontal' : 'mais vertical'}<br><br>
        <em>Clique nos sliders dos parâmetros estruturais para ver explicações detalhadas.</em>`;
      uiController.updateStructuralExplanation(defaultStructural);
    }
    
    // Auto-save state
    saveState(stateManager.exportState());
    
  } catch (error) {
    console.error('Error updating app:', error);
    uiController.showNotification(error.message, 'error');
  }
}, 100);

/**
 * Setup event listeners
 */
function setupEventListeners() {
  // Slider inputs
  Object.keys(uiController.sliders).forEach(key => {
    uiController.sliders[key].addEventListener('input', () => {
      const newValue = parseFloat(uiController.sliders[key].value);
      const oldValue = stateManager.getState().params[key];
      const direction = newValue > oldValue ? 'up' : 'down';
      
      stateManager.updateParams({ [key]: newValue });
      uiController.updateDisplay(key, newValue);
      updateApp(key, direction); // Pass direction based on value change
    });
  });
  
  // Value input listeners (digitação direta)
  uiController.setupInputListeners((key, value) => {
    const oldValue = stateManager.getState().params[key];
    const direction = value > oldValue ? 'up' : 'down';
    
    stateManager.updateParams({ [key]: value });
    uiController.updateDisplay(key, value);
    updateApp(key, direction); // Pass direction based on value change
  });

  // Shock buttons
  document.querySelectorAll('.shock-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const shockVar = e.target.getAttribute('data-shock');
      const dir = e.target.getAttribute('data-dir');
      const slider = uiController.sliders[shockVar];
      
      if (slider.disabled) {
        uiController.showNotification('Esta variável é endógena neste regime', 'warning');
        return;
      }
      
      const max = parseFloat(slider.max);
      const min = parseFloat(slider.min);
      const step = getStep(shockVar);
      
      let val = parseFloat(slider.value);
      val = dir === 'up' ? Math.min(max, val + step) : Math.max(min, val - step);
      slider.value = val;
      
      stateManager.updateParams({ [shockVar]: val });
      uiController.updateDisplay(shockVar, val);
      uiController.animateSlider(shockVar);
      
      updateApp(shockVar, dir);
    });
  });

  // Model toggle (Closed/Open economy)
  uiController.toggleModel.addEventListener('change', (e) => {
    stateManager.setEconomyType(e.target.checked);
    uiController.updateFromState(stateManager.getState());
    updateApp('toggles');
  });

  // Exchange rate regime toggle
  uiController.toggleExchange.addEventListener('change', (e) => {
    stateManager.setExchangeRegime(e.target.checked);
    uiController.updateFromState(stateManager.getState());
    updateApp('toggles');
  });

  // Reset button
  document.getElementById('btn-reset').addEventListener('click', () => {
    stateManager.reset();
    uiController.updateFromState(stateManager.getState());
    updateApp();
    uiController.showNotification('Simulação resetada', 'success');
  });

  // Capture button - captura estado atual como referência
  document.getElementById('btn-capture').addEventListener('click', () => {
    stateManager.resetInitialState();
    updateApp();
    uiController.showNotification('Estado atual capturado como referência', 'success');
  });

  // Export button (Professor mode)
  document.getElementById('btn-export').addEventListener('click', () => {
    html2canvas(document.getElementById('graph-container'), {
      backgroundColor: '#ffffff'
    }).then(canvas => {
      const link = document.createElement('a');
      link.download = `mackenzie-is-lm-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      uiController.showNotification('Gráfico exportado!', 'success');
    });
  });

  // Equations modal
  document.getElementById('btn-equations').addEventListener('click', () => {
    document.getElementById('equations-modal').classList.remove('hidden');
    renderMath();
  });

  document.getElementById('btn-close-eq').addEventListener('click', () => {
    document.getElementById('equations-modal').classList.add('hidden');
  });

  // Advanced parameters modal
  document.getElementById('btn-advanced').addEventListener('click', () => {
    document.getElementById('advanced-modal').classList.remove('hidden');
    loadAdvancedParams();
  });

  document.getElementById('btn-close-advanced').addEventListener('click', () => {
    document.getElementById('advanced-modal').classList.add('hidden');
  });

  document.getElementById('btn-apply-advanced').addEventListener('click', () => {
    applyAdvancedParams();
    document.getElementById('advanced-modal').classList.add('hidden');
    
    // Log do estado antes de updateApp
    const stateBeforeUpdate = stateManager.getState();
    console.log('State before updateApp:', {
      capitalMobility: stateBeforeUpdate.capitalMobility,
      isOpenEconomy: stateBeforeUpdate.isOpenEconomy
    });
    
    updateApp();
    uiController.showNotification('Parâmetros avançados aplicados', 'success');
  });

  document.getElementById('btn-reset-advanced').addEventListener('click', () => {
    resetAdvancedParams();
    loadAdvancedParams();
    uiController.showNotification('Parâmetros restaurados aos padrões', 'success');
  });

  document.getElementById('btn-load-scenario-expanded').addEventListener('click', () => {
    document.getElementById('advanced-modal').classList.add('hidden');
    document.getElementById('scenarios-expanded-modal').classList.remove('hidden');
  });

  // Scenarios expanded modal
  document.getElementById('btn-close-scenarios-expanded').addEventListener('click', () => {
    document.getElementById('scenarios-expanded-modal').classList.add('hidden');
  });

  // Scenario expanded buttons
  document.querySelectorAll('.scenario-expanded-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const scenarioKey = e.currentTarget.getAttribute('data-scenario');
      loadScenarioExpanded(scenarioKey);
      document.getElementById('scenarios-expanded-modal').classList.add('hidden');
    });
  });

  // New feature buttons
  document.getElementById('btn-scenarios').addEventListener('click', () => {
    modalManager.show('scenarios');
  });

  document.getElementById('btn-history').addEventListener('click', () => {
    modalManager.show('history');
  });

  document.getElementById('btn-help').addEventListener('click', () => {
    modalManager.show('help');
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') return;
    
    switch(e.key.toLowerCase()) {
      case 'r':
        document.getElementById('btn-reset').click();
        break;
      case 'c':
        document.getElementById('btn-capture').click();
        break;
      case 's':
        modalManager.show('scenarios');
        break;
      case 'h':
        modalManager.show('history');
        break;
      case 'e':
        document.getElementById('btn-equations').click();
        break;
      case '?':
        modalManager.show('help');
        break;
    }
  });
}

/**
 * Get step size for variable
 */
function getStep(key) {
  if (key === 'G' || key === 'T' || key === 'M') return 100;
  if (key === 'c' || key === 'k') return 0.05;
  if (key === 'e') return 0.1;
  if (key === 'rstar') return 0.5;
  return 10;
}

/**
 * Load advanced parameters into modal
 */
function loadAdvancedParams() {
  const state = stateManager.getState();
  const params = state.params;
  
  // Componentes autônomos
  document.getElementById('param-C0').value = params.C0 || 1500;
  document.getElementById('param-I0').value = params.I0 || 2000;
  document.getElementById('param-X0').value = params.X0 || 1500;
  document.getElementById('param-M0').value = params.M0 || 1300;
  document.getElementById('param-L0').value = params.L0 || 0;
  document.getElementById('param-K0').value = params.K0 || 0;
  
  // Economia aberta - ajustar valores padrão para equilíbrio com BP vertical
  document.getElementById('param-x1').value = params.x1 || 0.15;
  document.getElementById('param-x2').value = params.x2 || 300;
  document.getElementById('param-m2').value = params.m2 || 200;
  document.getElementById('param-f').value = params.f || 100;
  document.getElementById('param-Ystar').value = params.Ystar || 12000;
  document.getElementById('param-P').value = params.P || 1.0;
  
  // Mobilidade de capital
  const mobilityRadios = document.querySelectorAll('input[name="capitalMobility"]');
  mobilityRadios.forEach(radio => {
    radio.checked = radio.value === state.capitalMobility;
  });
}

/**
 * Apply advanced parameters from modal
 */
function applyAdvancedParams() {
  const updates = {
    C0: parseFloat(document.getElementById('param-C0').value),
    I0: parseFloat(document.getElementById('param-I0').value),
    X0: parseFloat(document.getElementById('param-X0').value),
    M0: parseFloat(document.getElementById('param-M0').value),
    L0: parseFloat(document.getElementById('param-L0').value),
    K0: parseFloat(document.getElementById('param-K0').value),
    x1: parseFloat(document.getElementById('param-x1').value),
    x2: parseFloat(document.getElementById('param-x2').value),
    m2: parseFloat(document.getElementById('param-m2').value),
    f: parseFloat(document.getElementById('param-f').value),
    Ystar: parseFloat(document.getElementById('param-Ystar').value),
    P: parseFloat(document.getElementById('param-P').value)
  };
  
  stateManager.updateParams(updates);
  
  // Atualizar mobilidade de capital
  const selectedMobility = document.querySelector('input[name="capitalMobility"]:checked').value;
  stateManager.setCapitalMobility(selectedMobility); // Usar método correto
  
  console.log('Capital Mobility set to:', selectedMobility);
  
  // Ajustar f baseado na mobilidade
  if (selectedMobility === 'perfect') {
    stateManager.updateParams({ f: 999999 });
  } else if (selectedMobility === 'zero' || selectedMobility === 'closed') {
    stateManager.updateParams({ f: 0 });
  }
  
  // Se não for economia fechada, ativar economia aberta
  if (selectedMobility !== 'closed') {
    stateManager.setEconomyType(true); // Ativar economia aberta
    uiController.updateFromState(stateManager.getState());
    console.log('Economy opened. isOpenEconomy:', stateManager.getState().isOpenEconomy);
  } else {
    stateManager.setEconomyType(false); // Desativar economia aberta
    uiController.updateFromState(stateManager.getState());
    console.log('Economy closed. isOpenEconomy:', stateManager.getState().isOpenEconomy);
  }
  
  // Log dos parâmetros relevantes para BP
  const state = stateManager.getState();
  console.log('Params for BP:', {
    X0: state.params.X0,
    v: state.params.v,
    x2: state.params.x2,
    e: state.params.e,
    E: state.params.E,
    m: state.params.m,
    m1: state.params.m1,
    capitalMobility: state.capitalMobility
  });
}

/**
 * Reset advanced parameters to defaults
 */
function resetAdvancedParams() {
  stateManager.updateParams({
    C0: 1500, I0: 2000, X0: 1500, M0: 1300, L0: 0, K0: 0,
    x1: 0.15, x2: 300, m2: 200, f: 100,
    Ystar: 12000, P: 1.0
  });
  stateManager.state.capitalMobility = 'perfect';
}

/**
 * Render math equations
 */
function renderMath() {
  if (window.renderMathInElement) {
    window.renderMathInElement(document.getElementById('math-content'), {
      delimiters: [
        {left: "$", right: "$", display: true},
        {left: "$", right: "$", display: false}
      ]
    });
  }
}

/**
 * Load expanded scenario
 */
function loadScenarioExpanded(scenarioKey) {
  const scenario = getScenarioExpanded(scenarioKey);
  if (!scenario) {
    uiController.showNotification('Cenário não encontrado', 'error');
    return;
  }
  
  // Ativar modelo expandido
  useExpandedModel = true;
  
  // Atualizar todos os parâmetros do cenário
  stateManager.updateParams(scenario.params);
  
  // Configurar regime de mobilidade e câmbio
  stateManager.state.capitalMobility = scenario.capitalMobility;
  stateManager.state.isFloatingRate = scenario.isFloatingRate;
  
  // Ativar economia aberta se não for closed
  const isOpen = scenario.capitalMobility !== 'closed';
  stateManager.setEconomyType(isOpen);
  
  // Atualizar UI
  uiController.updateFromState(stateManager.getState());
  
  // Capturar estado inicial
  stateManager.resetInitialState();
  
  // Atualizar simulação
  updateApp();
  
  uiController.showNotification(`Cenário carregado: ${scenario.name}`, 'success');
}

/**
 * Initialize application
 */
function init() {
  // Initialize chart
  chartInstance = initChart('macroChart');
  
  // Initialize modals
  modalManager.init();
  
  // Setup modal callbacks
  modalManager.on('onScenarioSelect', (scenarioKey) => {
    const scenario = getScenario(scenarioKey);
    if (scenario) {
      stateManager.loadScenario(scenario);
      uiController.updateFromState(stateManager.getState());
      updateApp();
      uiController.showNotification(`Cenário carregado: ${scenario.name}`, 'success');
    }
  });
  
  modalManager.on('onHistorySelect', (historyItem) => {
    stateManager.importState(historyItem);
    uiController.updateFromState(stateManager.getState());
    updateApp();
    uiController.showNotification('Estado restaurado do histórico', 'success');
  });
  
  // Setup event listeners
  setupEventListeners();
  
  // Subscribe to state changes
  stateManager.subscribe((state, changeType) => {
    if (changeType === 'economy-type' || changeType === 'exchange-regime') {
      uiController.updateExchangeUI(state.isOpenEconomy, state.isFloatingRate);
    }
    
    if (changeType === 'scenario-loaded') {
      // Reset initial state para o ponto de partida do cenário
      stateManager.resetInitialState();
      // Forçar atualização do app para o novo cenário
      updateApp('scenario', 'none');
    }
  });
  
  // Load saved state or use defaults
  const savedState = loadState();
  if (savedState) {
    // Verificar se é um estado antigo (m < 0.2)
    if (savedState.params && savedState.params.m && savedState.params.m < 0.2) {
      console.log('Detected old state with m =', savedState.params.m, '- clearing localStorage');
      localStorage.removeItem('macroSimulatorState');
      uiController.showNotification('Estado antigo detectado - usando valores padrão atualizados', 'info');
    } else {
      stateManager.importState(savedState);
      uiController.updateFromState(stateManager.getState());
    }
  }
  
  // Initial update
  updateApp();
  
  // Render math after short delay
  setTimeout(renderMath, 100);
  
  // Show welcome notification
  setTimeout(() => {
    uiController.showNotification('Bem-vindo ao Simulador IS-LM! Pressione ? para ajuda', 'info');
  }, 500);
}

// Start application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
