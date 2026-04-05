/**
 * Centralized State Manager for the Macroeconomic Simulator
 * Handles all application state and notifies listeners of changes
 */

export class StateManager {
  constructor() {
    this.state = {
      isOpenEconomy: false,
      isFloatingRate: true,
      capitalMobility: 'perfect', // 'perfect', 'imperfect', 'zero', 'closed'
      params: {
        // === COMPONENTES AUTÔNOMOS ===
        C0: 1500,     // Consumo autônomo
        I0: 2000,     // Investimento autônomo
        G0: 3200,     // Gastos do governo (ajustado para equilíbrio com BP)
        T0: 3500,     // Tributação
        X0: 1500,     // Exportações autônomas
        M0: 1300,     // Importações autônomas
        L0: 0,        // Demanda autônoma por moeda
        K0: 0,        // Fluxo autônomo de capital
        
        // === PARÂMETROS COMPORTAMENTAIS ===
        c: 0.65,      // Propensão marginal a consumir (0 < c < 1)
        b: 80,        // Sensibilidade do investimento aos juros
        m1: 0.25,     // Propensão marginal a importar (ajustado para equilíbrio com BP)
        k: 0.5,       // Sensibilidade da demanda por moeda à renda
        h: 60,        // Sensibilidade da demanda por moeda aos juros
        
        // === PARÂMETROS DE ECONOMIA ABERTA ===
        x1: 0.15,     // Sensibilidade das exportações à renda externa
        x2: 100,      // Sensibilidade das exportações ao câmbio (ajustado)
        m2: 200,      // Sensibilidade das importações ao câmbio
        f: 100,       // Sensibilidade dos fluxos de capital ao diferencial de juros
        
        // === VARIÁVEIS EXÓGENAS ===
        Ystar: 12000, // Renda externa (PIB mundial ~R$ 1,2 quatrilhão / 100 bi)
        istar: 14.75, // Taxa de juros externa (Selic Brasil)
        E: 5.17,      // Taxa de câmbio (R$/USD) - Dez 2024
        M: 1200,      // Oferta nominal de moeda (calibrado para i=14.75%)
        P: 1.0,       // Nível de preços (normalizado)
        
        // === VARIÁVEIS LEGADAS (compatibilidade) - sincronizadas ===
        G: 3200,      // Alias para G0 (ajustado)
        T: 3500,      // Alias para T0
        e: 5.17,      // Alias para E (taxa de câmbio)
        rstar: 14.75, // Alias para istar (Selic Brasil)
        m: 0.25,      // Alias para m1 (ajustado)
        v: 100        // Alias para x2 (ajustado)
      },
      equilibrium: null,
      history: [],
      currentScenario: null,
      // Estado inicial para comparação visual
      initialState: null
    };
    
    this.defaults = JSON.parse(JSON.stringify(this.state.params)); // Deep copy
    this.listeners = new Set();
    this.maxHistorySize = 50;
    
    // Garantir sincronização inicial dos aliases
    this.syncAliases();
  }

  /**
   * Subscribe to state changes
   * @param {Function} callback - Called when state changes
   * @returns {Function} Unsubscribe function
   */
  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  /**
   * Notify all listeners of state change
   */
  notify(changeType = 'update') {
    this.listeners.forEach(listener => listener(this.state, changeType));
  }

  /**
   * Update parameters with validation
   */
  updateParams(updates) {
    const validated = this.validateParams(updates);
    
    // Atualizar parâmetros
    Object.keys(validated).forEach(key => {
      this.state.params[key] = validated[key];
      
      // Sincronizar aliases automaticamente quando um é atualizado
      if (key === 'G') this.state.params.G0 = validated[key];
      if (key === 'G0') this.state.params.G = validated[key];
      if (key === 'T') this.state.params.T0 = validated[key];
      if (key === 'T0') this.state.params.T = validated[key];
      if (key === 'e') this.state.params.E = validated[key];
      if (key === 'E') this.state.params.e = validated[key];
      if (key === 'rstar') this.state.params.istar = validated[key];
      if (key === 'istar') this.state.params.rstar = validated[key];
      if (key === 'm') this.state.params.m1 = validated[key];
      if (key === 'm1') this.state.params.m = validated[key];
      if (key === 'v') this.state.params.x2 = validated[key];
      if (key === 'x2') this.state.params.v = validated[key];
    });
    
    this.notify('params');
  }
  
  /**
   * Sync aliases for backward compatibility
   * Usado apenas ao carregar cenários que usam nomes antigos
   */
  syncAliases() {
    const p = this.state.params;
    
    // Copiar valores dos aliases antigos para os novos (cenários usam nomes antigos)
    if (p.G !== undefined) p.G0 = p.G;
    if (p.T !== undefined) p.T0 = p.T;
    if (p.e !== undefined) p.E = p.e;
    if (p.rstar !== undefined) p.istar = p.rstar;
    if (p.m !== undefined) p.m1 = p.m;
    if (p.v !== undefined) p.x2 = p.v;
  }

  /**
   * Validate parameter values
   */
  validateParams(params) {
    const validated = {};
    
    for (const [key, value] of Object.entries(params)) {
      const numValue = parseFloat(value);
      
      if (isNaN(numValue)) continue;
      
      // Apply constraints
      switch(key) {
        case 'c':
        case 'k':
        case 'm':
          validated[key] = Math.max(0, Math.min(0.99, numValue));
          break;
        case 'e':
        case 'E':
          validated[key] = Math.max(4.0, Math.min(6.0, numValue));
          break;
        case 'rstar':
          validated[key] = Math.max(0, Math.min(20, numValue));
          break;
        case 'b':
        case 'h':
          validated[key] = Math.max(1, Math.min(200, numValue));
          break;
        case 'v':
          validated[key] = Math.max(10, Math.min(500, numValue));
          break;
        default:
          validated[key] = Math.max(0, numValue);
      }
    }
    
    return validated;
  }

  /**
   * Set economy type
   */
  setEconomyType(isOpen) {
    this.state.isOpenEconomy = isOpen;
    this.notify('economy-type');
  }

  /**
   * Set exchange rate regime
   */
  setExchangeRegime(isFloating) {
    this.state.isFloatingRate = isFloating;
    this.notify('exchange-regime');
  }

  /**
   * Set capital mobility
   */
  setCapitalMobility(mobility) {
    this.state.capitalMobility = mobility;
    this.notify('capital-mobility');
  }

  /**
   * Update equilibrium
   */
  setEquilibrium(eq) {
    this.state.equilibrium = eq;
    
    // Salvar estado inicial na primeira vez
    if (!this.state.initialState) {
      this.captureInitialState();
    }
    
    this.addToHistory();
    this.notify('equilibrium');
  }

  /**
   * Capture initial state for comparison
   */
  captureInitialState() {
    this.state.initialState = {
      params: { ...this.state.params },
      equilibrium: { ...this.state.equilibrium },
      isOpenEconomy: this.state.isOpenEconomy,
      isFloatingRate: this.state.isFloatingRate,
      capitalMobility: this.state.capitalMobility
    };
  }

  /**
   * Reset initial state (for new scenario or reset)
   */
  resetInitialState() {
    this.state.initialState = null;
  }

  /**
   * Get initial state
   */
  getInitialState() {
    return this.state.initialState ? { ...this.state.initialState } : null;
  }

  /**
   * Add current state to history
   */
  addToHistory() {
    const snapshot = {
      timestamp: Date.now(),
      params: { ...this.state.params },
      equilibrium: { ...this.state.equilibrium },
      isOpenEconomy: this.state.isOpenEconomy,
      isFloatingRate: this.state.isFloatingRate
    };
    
    this.state.history.push(snapshot);
    
    if (this.state.history.length > this.maxHistorySize) {
      this.state.history.shift();
    }
  }

  /**
   * Reset to defaults
   */
  reset() {
    this.state.params = JSON.parse(JSON.stringify(this.defaults)); // Deep copy
    this.state.capitalMobility = 'perfect'; // Reset mobilidade também
    this.syncAliases(); // Garantir sincronização
    this.state.history = [];
    this.resetInitialState();
    this.notify('reset');
  }

  /**
   * Load a scenario
   */
  loadScenario(scenario) {
    this.state.params = { ...this.state.params, ...scenario.params };
    this.syncAliases(); // Garantir sincronização dos aliases
    this.state.isOpenEconomy = scenario.isOpenEconomy ?? this.state.isOpenEconomy;
    this.state.isFloatingRate = scenario.isFloatingRate ?? this.state.isFloatingRate;
    this.state.capitalMobility = scenario.capitalMobility ?? 'perfect';
    this.state.currentScenario = scenario.name;
    this.resetInitialState(); // Reset para capturar novo estado inicial
    this.notify('scenario-loaded');
  }

  /**
   * Export current state
   */
  exportState() {
    return {
      params: { ...this.state.params },
      isOpenEconomy: this.state.isOpenEconomy,
      isFloatingRate: this.state.isFloatingRate,
      capitalMobility: this.state.capitalMobility,
      equilibrium: this.state.equilibrium,
      timestamp: Date.now()
    };
  }

  /**
   * Import state
   */
  importState(data) {
    if (data.params) {
      this.state.params = this.validateParams(data.params);
      this.syncAliases(); // Garantir sincronização
    }
    if (typeof data.isOpenEconomy === 'boolean') {
      this.state.isOpenEconomy = data.isOpenEconomy;
    }
    if (typeof data.isFloatingRate === 'boolean') {
      this.state.isFloatingRate = data.isFloatingRate;
    }
    if (data.capitalMobility) {
      this.state.capitalMobility = data.capitalMobility;
    }
    this.notify('import');
  }

  /**
   * Get current state
   */
  getState() {
    return { ...this.state };
  }

  /**
   * Get history
   */
  getHistory() {
    return [...this.state.history];
  }
}
