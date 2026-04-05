import { computeEquilibrium, getISData, getLMData, getBPData, getFiscalMultiplier, getMonetaryMultiplier } from './model.js';
import { initChart, updateChart } from './chart.js';
import { StateManager } from './state/StateManager.js';
import { UIController } from './ui/UIController.js';
import { ExplanationEngine } from './ui/ExplanationEngine.js';
import { ModalManager } from './ui/ModalManager.js';
import { scenarios, getScenario } from './scenarios/scenarios.js';
import { debounce } from './utils/debounce.js';
import { saveState, loadState, saveToHistory, exportToFile, importFromFile } from './utils/storage.js';
import html2canvas from 'html2canvas';

// Core instances
let chartInstance;
const stateManager = new StateManager();
const uiController = new UIController(stateManager);
const explanationEngine = new ExplanationEngine();
const modalManager = new ModalManager();

// DOM
const sliders = {
  G: document.getElementById('slider-G'),
  T: document.getElementById('slider-T'),
  M: document.getElementById('slider-M'),
  e: document.getElementById('slider-e'),
  rstar: document.getElementById('slider-rstar'),
  c: document.getElementById('slider-c'),
  b: document.getElementById('slider-b'),
  k: document.getElementById('slider-k'),
  h: document.getElementById('slider-h'),
};

const vals = {
  G: document.getElementById('val-G'),
  T: document.getElementById('val-T'),
  M: document.getElementById('val-M'),
  e: document.getElementById('val-e'),
  rstar: document.getElementById('val-rstar'),
  c: document.getElementById('val-c'),
  b: document.getElementById('val-b'),
  k: document.getElementById('val-k'),
  h: document.getElementById('val-h'),
};

const toggleModel = document.getElementById('model-toggle');
const labelModel = document.getElementById('model-label');
const toggleExchangeContainer = document.getElementById('exchange-toggle-container');
const toggleExchange = document.getElementById('exchange-toggle');
const labelExchange = document.getElementById('exchange-label');
const openEcoGroups = document.querySelectorAll('.open-eco-group');
const openEcoBtns = document.querySelectorAll('.open-eco-btn');
const hint_e = document.getElementById('hint-e');
const explanationText = document.getElementById('explanation-text');

function renderMath() {
  if (window.renderMathInElement) {
    window.renderMathInElement(document.getElementById('math-content'), {
      delimiters: [
        {left: "$$", right: "$$", display: true},
        {left: "$", right: "$", display: false}
      ]
    });
  }
}

function updateExplain(cause, direction) {
  let explain = "";
  if (!cause) {
    if (isOpenEconomy) {
      explain = isFloatingRate 
        ? "No modelo de Economia Aberta com Câmbio Flutuante, a taxa de câmbio se ajusta para estabilizar o mercado. A política monetária é altamente eficaz."
        : "No Câmbio Fixo, o Banco Central compra/vende reservas, alterando a oferta de moeda $M$ para manter a taxa de câmbio $e$. A política fiscal é altamente eficaz.";
    } else {
      explain = "O ponto de equilíbrio ocorre onde o mercado de bens (IS) cruza com o mercado monetário (LM). Este é o modelo clássico de Economia Fechada.";
    }
  } else {
    // Basic dynamic explanation based on shock
    if (cause === 'G' && direction === 'up') {
      if(!isOpenEconomy) explain = "O aumento do Gasto Público (G) eleva a renda, o que expande a demanda por moeda. Como a oferta (M) é fixa, a taxa de juros (r) sobe. Ocorre o efeito deslocamento (crowding out) do investimento privado.";
      else if(isFloatingRate) explain = "Expansão Fiscal c/ Câmbio Flutuante: A IS vai para a direita, pressionando a taxa de juros a subir. Capitais entram no país e a moeda (e) se valoriza. A IS recua para o ponto inicial. Política fiscal é totalmente INEFICAZ.";
      else explain = "Expansão Fiscal c/ Câmbio Fixo: A IS vai para a direita. Juros sobem e atraem capital. Para manter o câmbio constante, o Banco Central compra moeda estrangeira e emite moeda nacional, o que expande a LM para a direita. Política fiscal é muito EFICAZ.";
    } 
    else if (cause === 'G' && direction === 'down') {
      explain = "A contração do Gasto Público retrai a demanda agregada (desloca IS à esquerda), reduzindo a renda de equilíbrio e consequentemente a taxa de juros.";
    }
    else if (cause === 'M' && direction === 'up') {
      if(!isOpenEconomy) explain = "Uma Política Monetária Expansionista desloca a curva LM à direita. A maior liquidez derruba a taxa de juros (r), estimulando os investimentos e elevando a renda (Y).";
      else if(isFloatingRate) explain = "Expansão Monetária c/ Câmbio Flutuante: LM vai para a direita, juros caem. Fuga de capitais desvaloriza o câmbio (e). Isso estimula as exportações líquidas e a IS vai para a direita até encontrar a nova LM em r*. Política Monetária EFICAZ.";
      else explain = "Expansão Monetária c/ Câmbio Fixo: LM vai para a direita, juros caem. Fuga de capitais desvalorizaria o câmbio. O Bacen vende dólares e retira reias de circulação, revertendo a LM para a esquerda imediatamente. Política Monetária INEFICAZ.";
    }
    else if (cause === 'M' && direction === 'down') {
      explain = "Uma Política Monetária Contracionista reduz a oferta de moeda, elevando a taxa de juros e reduzindo o investimento privado. Resulta em queda da renda de equilíbrio.";
    }
    else if (cause === 'e') {
      explain = direction === 'up' 
        ? "Uma desvalorização do câmbio nominal torna os bens domésticos mais baratos para o exterior, elevando as exportações. IS desloca-se para a direita."
        : "Uma valorização cambial encarece nossas exportações. A curva IS desloca-se para a esquerda. Restrito ao controle de câmbio fixo explícito.";
    }
    else if (cause === 'toggles') {
      explain = "Modelo atualizado. Revise as posições das curvas e as novas restrições de equilíbrio acima.";
    }
  }
  
  // Use GSAP to animate explanation text gracefully
  gsap.fromTo(explanationText, { opacity: 0 }, { opacity: 1, duration: 0.5 });
  explanationText.innerHTML = explain;
}

function updateApp(source = null, direction = null) {
  // Sync params from sliders except endogenous variables depending on regime
  params.G = parseFloat(sliders.G.value);
  params.T = parseFloat(sliders.T.value);
  params.c = parseFloat(sliders.c.value);
  params.b = parseFloat(sliders.b.value);
  params.k = parseFloat(sliders.k.value);
  params.h = parseFloat(sliders.h.value);
  params.rstar = parseFloat(sliders.rstar.value);

  // If floating rate: M is exogenous, e is endogenous
  if (isOpenEconomy && isFloatingRate) {
    params.M = parseFloat(sliders.M.value);
    sliders.e.disabled = true;
    sliders.e.style.opacity = '0.5';
    hint_e.classList.remove('hidden');
  } 
  // If fixed rate: e is exogenous, M is endogenous
  else if (isOpenEconomy && !isFloatingRate) {
    params.e = parseFloat(sliders.e.value);
    sliders.M.disabled = true;
    sliders.M.style.opacity = '0.5';
    hint_e.classList.add('hidden');
    sliders.e.disabled = false;
    sliders.e.style.opacity = '1';
  } 
  // Closed economy: both exogenous manually controlled
  else {
    params.M = parseFloat(sliders.M.value);
    sliders.M.disabled = false;
    sliders.M.style.opacity = '1';
    sliders.e.disabled = true;
    sliders.e.style.opacity = '0.5';
    hint_e.classList.add('hidden');
  }

  // Calculate EQ
  const eq = computeEquilibrium(params, isOpenEconomy, isFloatingRate);
  
  // Update sliders if they became endogenous (and visually)
  if (isOpenEconomy && isFloatingRate) {
    sliders.e.value = eq.e_eq.toFixed(1);
    params.e = eq.e_eq;
  }
  if (isOpenEconomy && !isFloatingRate) {
    sliders.M.value = eq.M_eq.toFixed(0);
    params.M = eq.M_eq;
  }

  // Update text values
  Object.keys(vals).forEach(key => {
    if(key === 'c' || key === 'k' || key === 'e') {
      vals[key].innerText = params[key].toFixed(2);
    } else {
      vals[key].innerText = params[key].toFixed(0);
    }
  });

  // Calculate Data arrays for chart
  const dataIS = getISData(params, isOpenEconomy, params.e);
  const dataLM = getLMData(params, params.M);
  const dataBP = getBPData(params.rstar);

  // Update chart
  updateChart(chartInstance, dataIS, dataLM, dataBP, { Y: eq.Y, r: eq.r }, isOpenEconomy);
  
  if(source) {
    updateExplain(source, direction);
  } else {
    // If no explicit source, preserve logic or write default
    if(!lastEq) updateExplain();
  }
  
  lastEq = eq;
}

// Listeners
Object.keys(sliders).forEach(key => {
  sliders[key].addEventListener('input', () => {
    updateApp(); // passive update
  });
});

document.querySelectorAll('.shock-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const shockVar = e.target.getAttribute('data-shock');
    const dir = e.target.getAttribute('data-dir');
    const input = sliders[shockVar];
    
    // Safety for disabled inputs
    if(input.disabled) return alert("Esta variável não pode ser chocada manualmente neste regime de governo (ela é endógena).");
    
    const max = parseFloat(input.max);
    const min = parseFloat(input.min);
    const step = keyStep(shockVar);
    
    let val = parseFloat(input.value);
    val = dir === 'up' ? Math.min(max, val + step) : Math.max(min, val - step);
    input.value = val;
    
    // Animate the thumb
    gsap.fromTo(input, { scale: 1.05 }, { scale: 1.0, duration: 0.2, clearProps: "all" });
    
    updateApp(shockVar, dir);
  });
});

function keyStep(key) {
  if (key === 'G' || key === 'T' || key === 'M') return 100;
  if (key === 'c' || key === 'k') return 0.05;
  if (key === 'e') return 0.1;
  return 10;
}

toggleModel.addEventListener('change', (e) => {
  isOpenEconomy = e.target.checked;
  labelModel.innerText = isOpenEconomy ? 'Economia Aberta (IS-LM-BP)' : 'Economia Fechada (IS-LM)';
  
  if (isOpenEconomy) {
    toggleExchangeContainer.classList.remove('hidden');
    openEcoGroups.forEach(g => g.classList.remove('hidden'));
    openEcoBtns.forEach(b => b.classList.remove('hidden'));
  } else {
    toggleExchangeContainer.classList.add('hidden');
    openEcoGroups.forEach(g => g.classList.add('hidden'));
    openEcoBtns.forEach(b => b.classList.add('hidden'));
  }
  
  // Re-enable everything to ensure clean state reset
  sliders.M.disabled = false;
  sliders.e.disabled = true; 
  
  updateApp('toggles');
});

toggleExchange.addEventListener('change', (e) => {
  isFloatingRate = e.target.checked;
  labelExchange.innerText = isFloatingRate ? 'Câmbio Flutuante' : 'Câmbio Fixo';
  updateApp('toggles');
});

document.getElementById('btn-reset').addEventListener('click', () => {
  Object.keys(defaults).forEach(k => {
    sliders[k].value = defaults[k];
  });
  updateApp();
  updateExplain();
});

document.getElementById('btn-equations').addEventListener('click', () => {
  document.getElementById('equations-modal').classList.remove('hidden');
  renderMath();
});

document.getElementById('btn-close-eq').addEventListener('click', () => {
  document.getElementById('equations-modal').classList.add('hidden');
});

document.getElementById('btn-export').addEventListener('click', () => {
  html2canvas(document.getElementById('graph-container'), {
    backgroundColor: '#ffffff'
  }).then(canvas => {
    const link = document.createElement('a');
    link.download = `mackenzie-is-lm-simulation-${new Date().getTime()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
});

// Initialization
chartInstance = initChart('macroChart');

// Set initial toggles match HTML
toggleModel.checked = false;
toggleExchange.checked = true;

updateApp();
setTimeout(renderMath, 100);
