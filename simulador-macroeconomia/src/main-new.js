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
let useExpandedModel = true; // Sempre usar modelo expandido para maior precisão em todos os regimes

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
      
      // BP curve: only shown in IS-LM-BP mode
      const showBP = state.showBP !== false && state.isOpenEconomy;
      if (showBP) {
        console.log('Generating BP with mobility:', state.capitalMobility);
        dataBP = getBPData(state.params.rstar, state.capitalMobility, state.params, eq.e_eq);
      } else {
        dataBP = []; // IS-LM (Fechada or Aberta without BP)
      }
    }
    
    // Update state with new equilibrium
    stateManager.setEquilibrium(eq);
    
    // Update endogenous variables in UI
    if (state.isOpenEconomy && state.isFloatingRate) {
      const e_val = eq.e_eq || eq.E;
      if (isFinite(e_val)) {
        // Limit only for extreme safety, but allow 3.2 baseline and shocks
        const safe_e = Math.max(0.1, Math.min(20.0, e_val));
        uiController.updateDisplay('e', safe_e);
        stateManager.updateParams({ e: safe_e, E: safe_e });
      }
    }
    if (state.isOpenEconomy && !state.isFloatingRate) {
      const M_val = eq.M_eq || eq.M;
      if (isFinite(M_val) && M_val > 0) {
        // Permite que M se ajuste livremente para manter o câmbio fixo
        uiController.updateDisplay('M', M_val);
        stateManager.updateParams({ M: M_val });
      }
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
          dataBP: initialState.isOpenEconomy ? getBPData(initialState.params.rstar, initialState.capitalMobility, initialState.params, initialEq.e_eq) : []
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
      capitalMobility: state.capitalMobility,
      scenario: state.currentScenario ? getScenario(state.currentScenario) : null,
      equilibrium: eq,
      params: state.params
    });
    uiController.updateExplanation(explanation);
    
    // Update structural parameters explanation
    const structuralParams = ['c', 'b', 'k', 'h'];
    if (source && structuralParams.includes(source)) {
      const structuralExplanation = explanationEngine.getStructuralParameterExplanation(
        source, 
        state.params[source], 
        state.isOpenEconomy
      );
      uiController.updateStructuralExplanation(structuralExplanation);
    } else {
      // Default structural explanation
      const k_mult = state.isOpenEconomy 
        ? (1 / (1 - state.params.c + state.params.m1)) 
        : (1 / (1 - state.params.c));
      
      let defaultStructural = `<strong>Parâmetros Atuais:</strong><br>
        • PMgC (c) = ${state.params.c.toFixed(2)} → Multiplicador = ${k_mult.toFixed(2)}<br>
        • Sen. Investimento (b) = ${state.params.b.toFixed(0)}<br>
        • Sen. Moeda-Renda (k) = ${state.params.k.toFixed(2)}<br>
        • Sen. Moeda-Juros (h) = ${state.params.h.toFixed(0)}<br><br>
        <em>Ajuste sliders ou clique em "Aplicar" nas abas para ver detalhes.</em>`;
      
      uiController.updateStructuralExplanation(defaultStructural);
    }

    // Update open economy parameters explanation
    const openEcoParams = ['x1', 'x2', 'm1', 'm2', 'f', 'Ystar', 'rstar', 'P'];
    if (state.isOpenEconomy) {
      if (source && (openEcoParams.includes(source) || source === 'rstar')) {
        const openEcoExplanation = explanationEngine.getOpenEconomyParameterExplanation(
          source, 
          state.params[source === 'rstar' ? 'rstar' : source]
        );
        uiController.updateOpenEconomyExplanation(openEcoExplanation);
      } else {
        // Default theoretical explanation for the regime
        const regimeTheory = explanationEngine.getRegimeTheory(state.capitalMobility, state.params);
        uiController.updateOpenEconomyExplanation(regimeTheory);
      }
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
    const slider = uiController.sliders[key];
    if (!slider) return; // guard against missing elements
    slider.addEventListener('input', () => {
      const newValue = parseFloat(slider.value);
      const oldValue = stateManager.getState().params[key];
      const direction = newValue > oldValue ? 'up' : 'down';
      stateManager.updateParams({ [key]: newValue });
      uiController.updateDisplay(key, newValue);
      updateApp(key, direction);
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

  // ═══════════════════════════════════════════════════════
  // HEADER CONTROLS — Model, Mobility, Exchange Rate
  // ═══════════════════════════════════════════════════════

  function setGroupActive(groupId, active) {
    const el = document.getElementById(groupId);
    if (!el) return;
    el.style.opacity        = active ? '1'    : '0.35';
    el.style.pointerEvents  = active ? 'auto' : 'none';
  }

  function highlightRadios(name, cls) {
    document.querySelectorAll(`input[name="${name}"]`).forEach(radio => {
      const label = radio.closest('label');
      if (label) label.classList.toggle(cls, radio.checked);
    });
  }

  /**
   * Reset params to defaults, then apply the given regime flags.
   * Called on every regime switch so curves are always in equilibrium.
   */
  function resetAndApplyRegime({ isOpen, isFloating, capitalMobility }) {
    // 1. Reset all sliders/params to defaults
    stateManager.reset();
    stateManager.resetInitialState();

    // 2. Apply the chosen regime flags
    if (isOpen !== undefined)          stateManager.setEconomyType(isOpen);
    if (isFloating !== undefined)      stateManager.setExchangeRegime(isFloating);
    if (capitalMobility !== undefined) stateManager.setCapitalMobility(capitalMobility);

    // 3. Sync showBP
    stateManager.state.showBP = stateManager.getState().isOpenEconomy;

    // 4. Sync all slider UI to the reset values
    uiController.updateFromState(stateManager.getState());
  }

  function applyModelType(value) {
    const isOpen    = value === 'islmbp';
    const showBP    = value === 'islmbp';

    // Read the currently checked mobility/exchange radios
    const mobVal = document.querySelector('input[name="capitalMobility"]:checked')?.value || 'perfect';
    const excVal = document.querySelector('input[name="exchangeRegime"]:checked')?.value  || 'floating';

    resetAndApplyRegime({
      isOpen,
      isFloating:      excVal === 'floating',
      capitalMobility: isOpen ? mobVal : 'perfect'
    });

    stateManager.state.showBP = showBP;

    // Dim/activate sub-groups
    setGroupActive('mob-group',      showBP);
    setGroupActive('exchange-group', showBP);

    highlightRadios('modelType', 'active-blue');
    updateApp();
  }

  // Model radios
  document.querySelectorAll('input[name="modelType"]').forEach(radio => {
    radio.addEventListener('change', e => applyModelType(e.target.value));
  });

  // Exchange rate radios
  document.querySelectorAll('input[name="exchangeRegime"]').forEach(radio => {
    radio.addEventListener('change', e => {
      const mobVal = document.querySelector('input[name="capitalMobility"]:checked')?.value || 'perfect';
      resetAndApplyRegime({
        isOpen:          stateManager.getState().isOpenEconomy,
        isFloating:      e.target.value === 'floating',
        capitalMobility: mobVal
      });
      highlightRadios('exchangeRegime', 'active-purple');
      updateApp();
    });
  });

  // Mobility radios
  document.querySelectorAll('input[name="capitalMobility"]').forEach(radio => {
    radio.addEventListener('change', e => {
      const excVal = document.querySelector('input[name="exchangeRegime"]:checked')?.value || 'floating';
      resetAndApplyRegime({
        isOpen:          true,
        isFloating:      excVal === 'floating',
        capitalMobility: e.target.value
      });
      highlightRadios('capitalMobility', 'active-green');
      updateApp();
    });
  });

  // Apply initial state
  stateManager.state.showBP = true;
  applyModelType('islmbp');
  highlightRadios('capitalMobility', 'active-green');
  highlightRadios('exchangeRegime', 'active-purple');

  // Reset button
  document.getElementById('btn-reset').addEventListener('click', () => {
    stateManager.reset();
    uiController.updateFromState(stateManager.getState());
    updateApp();
    uiController.showNotification('Simulação resetada', 'success');
  });

  // Capture button - captura estado atual como referência
  document.getElementById('btn-capture')?.addEventListener('click', () => {
    stateManager.resetInitialState();
    updateApp();
    uiController.showNotification('Estado atual capturado como referência', 'success');
  });

  // Export button (Professor mode)
  document.getElementById('btn-export')?.addEventListener('click', () => {
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
  document.getElementById('btn-advanced')?.addEventListener('click', () => {
    document.getElementById('advanced-modal')?.classList.remove('hidden');
    loadAdvancedParams();
  });

  document.getElementById('btn-close-advanced')?.addEventListener('click', () => {
    document.getElementById('advanced-modal')?.classList.add('hidden');
  });

  document.getElementById('btn-apply-advanced')?.addEventListener('click', () => {
    applyAdvancedParams();
    document.getElementById('advanced-modal')?.classList.add('hidden');
    
    // Log do estado antes de updateApp
    const stateBeforeUpdate = stateManager.getState();
    console.log('State before updateApp:', {
      capitalMobility: stateBeforeUpdate.capitalMobility,
      isOpenEconomy: stateBeforeUpdate.isOpenEconomy
    });
    
    updateApp();
    uiController.showNotification('Parâmetros avançados aplicados', 'success');
  });

  document.getElementById('btn-reset-advanced')?.addEventListener('click', () => {
    resetAdvancedParams();
    loadAdvancedParams();
    uiController.showNotification('Parâmetros restaurados aos padrões', 'success');
  });

  document.getElementById('btn-load-scenario-expanded')?.addEventListener('click', () => {
    document.getElementById('advanced-modal')?.classList.add('hidden');
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
  document.getElementById('btn-scenarios')?.addEventListener('click', () => {
    modalManager.show('scenarios');
  });

  document.getElementById('btn-history')?.addEventListener('click', () => {
    modalManager.show('history');
  });

  document.getElementById('btn-help')?.addEventListener('click', () => {
    modalManager.show('help');
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') return;
    
    switch(e.key.toLowerCase()) {
      case 'r':
        document.getElementById('btn-reset')?.click();
        break;
      case 'c':
        document.getElementById('btn-capture')?.click();
        break;
      case 's':
        modalManager.show('scenarios');
        break;
      case 'h':
        modalManager.show('history');
        break;
      case 'e':
        document.getElementById('btn-equations')?.click();
        break;
      case '?':
        modalManager.show('help');
        break;
    }
  });

  // (Capital mobility is handled in applyModelType section above)
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
 * Helper to safely set value to a DOM element if it exists
 */
function setVal(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val;
}

/**
 * Helper to safely get value from a DOM element if it exists
 */
function getVal(id, defaultVal = 0) {
  const el = document.getElementById(id);
  return el ? parseFloat(el.value) : defaultVal;
}

/**
 * Load advanced parameters into modal/panes
 */
function loadAdvancedParams() {
  const state = stateManager.getState();
  const params = state.params;
  
  // Componentes autônomos
  setVal('param-C0', params.C0);
  setVal('param-I0', params.I0);
  setVal('param-X0', params.X0);
  setVal('param-M0', params.M0);
  setVal('param-L0', params.L0);
  setVal('param-K0', params.K0);
  
  // Economia aberta & estruturais extras
  setVal('param-x1', params.x1);
  setVal('param-x2', params.x2);
  setVal('param-m1', params.m1);
  setVal('param-m2', params.m2);
  setVal('param-f',  params.f);
  setVal('param-Ystar', params.Ystar);
  setVal('param-P',     params.P);
  
  // Mobilidade de capital
  const mobilityRadios = document.querySelectorAll('input[name="capitalMobility"]');
  mobilityRadios.forEach(radio => {
    radio.checked = radio.value === state.capitalMobility;
  });
}

/**
 * Apply advanced parameters from panes
 */
function applyAdvancedParams() {
  const state = stateManager.getState();
  
  const updates = {
    C0:    getVal('param-C0', state.params.C0),
    I0:    getVal('param-I0', state.params.I0),
    X0:    getVal('param-X0', state.params.X0),
    M0:    getVal('param-M0', state.params.M0),
    L0:    getVal('param-L0', state.params.L0),
    K0:    getVal('param-K0', state.params.K0),
    x1:    getVal('param-x1', state.params.x1),
    x2:    getVal('param-x2', state.params.x2),
    m1:    getVal('param-m1', state.params.m1),
    m2:    getVal('param-m2', state.params.m2),
    f:     getVal('param-f',  state.params.f),
    Ystar: getVal('param-Ystar', state.params.Ystar),
    P:     getVal('param-P',     state.params.P)
  };
  
  stateManager.updateParams(updates);
  
  // Atualizar mobilidade de capital baseada no rádio ativo
  const checkedMobility = document.querySelector('input[name="capitalMobility"]:checked');
  if (checkedMobility) {
    const selectedMobility = checkedMobility.value;
    stateManager.setCapitalMobility(selectedMobility);
    
    // Ajustar f baseado na mobilidade se f não foi alterado manualmente para algo extremo
    // (Se f foi alterado via input, o updates acima já cuidou disso, mas se o usuário 
    // apenas mudou o rádio e clicou aplicar, garantimos os defaults do regime)
    if (selectedMobility === 'perfect') {
      stateManager.updateParams({ f: 999999 });
    } else if (selectedMobility === 'zero' || selectedMobility === 'closed') {
      stateManager.updateParams({ f: 0.1 }); // Usar 0.1 para evitar divisões por zero
    }
  }
  
  // Sync UI and trigger update
  uiController.updateFromState(stateManager.getState());
  updateApp();
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
  if (window.MathJax && window.MathJax.typesetPromise) {
    window.MathJax.typesetPromise([document.getElementById('math-content')]).catch((err) => console.log('MathJax error:', err));
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
  // Note: for session stability we skip restoring localStorage if it conflicts
  // with the selected radio defaults. Always start fresh from StateManager defaults.
  // (Re-enable selective restore after confirming state sync is stable)
  const savedState = loadState();
  if (savedState) {
    // Verificar se é um estado antigo (baseado no rstar antigo de 14.75 ou e antigo de 5.17)
    // Forçamos o reset para a nova calibração centralizada (Y=5000, i=15)
    const isOldState = (savedState.params && (savedState.params.rstar === 14.75 || savedState.params.e === 5.17));
    if (isOldState) {
      console.log('Detected old calibration — clearing localStorage for centering update');
      localStorage.removeItem('macroSimulatorState');
    } else {
      // (Do NOT restore state from localStorage on startup to avoid radio/state mismatch)
    }
  }
  
  // Initial update — default to IS-LM-BP mode (showBP = true)
  stateManager.state.showBP = true;

  // Sync state with DOM-selected radios (overrides any stale localStorage values)
  const selectedMobilityRadio = document.querySelector('input[name="capitalMobility"]:checked');
  const selectedExchangeRadio = document.querySelector('input[name="exchangeRegime"]:checked');
  const selectedModelRadio    = document.querySelector('input[name="modelType"]:checked');

  if (selectedMobilityRadio) stateManager.setCapitalMobility(selectedMobilityRadio.value);
  if (selectedExchangeRadio) stateManager.setExchangeRegime(selectedExchangeRadio.value === 'floating');
  if (selectedModelRadio) {
    const isOpen = selectedModelRadio.value === 'islmbp';
    stateManager.setEconomyType(isOpen);
    stateManager.state.showBP = isOpen;
  }

  updateApp(); // null source → getDefaultExplanation
  
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
