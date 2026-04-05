/**
 * Modelo IS-LM-BP Expandido
 * Baseado no documento "Consolidação do Modelo IS-LM-BP para Simulador"
 * 
 * Inclui todas as variáveis e parâmetros do modelo completo:
 * - Renda externa (Y*)
 * - Taxa de juros externa (i*)
 * - Sensibilidade das exportações à renda externa (x1)
 * - Sensibilidade das exportações ao câmbio (x2)
 * - Sensibilidade das importações ao câmbio (m2)
 * - Fluxos de capital (K0, f)
 * - Demanda autônoma por moeda (L0)
 * - Mobilidade de capital (perfeita, imperfeita, nula)
 */

/**
 * Compute equilibrium with expanded model
 * @param {Object} params - All model parameters
 * @param {string} capitalMobility - 'perfect', 'imperfect', 'zero'
 * @param {boolean} isFloating - true for floating exchange rate
 * @returns {Object} Equilibrium values {Y, i, E, M}
 */
export function computeEquilibriumExpanded(params, capitalMobility, isFloating) {
  const {
    // Componentes autônomos
    C0, I0, G0, T0, X0, M0, L0, K0,
    // Parâmetros comportamentais
    c,    // Propensão marginal a consumir
    b,    // Sensibilidade do investimento aos juros
    m1,   // Propensão marginal a importar
    k,    // Sensibilidade da demanda por moeda à renda
    h,    // Sensibilidade da demanda por moeda aos juros
    // Parâmetros de economia aberta
    x1,   // Sensibilidade das exportações à renda externa
    x2,   // Sensibilidade das exportações ao câmbio
    m2,   // Sensibilidade das importações ao câmbio
    f,    // Sensibilidade dos fluxos de capital ao diferencial de juros
    // Variáveis exógenas
    Ystar, // Renda externa
    istar, // Taxa de juros externa
    E,     // Taxa de câmbio (exógena em câmbio fixo)
    M,     // Oferta de moeda (exógena em câmbio flutuante)
    P      // Nível de preços
  } = params;

  // Validações
  if (c < 0 || c >= 1) throw new Error('c deve estar entre 0 e 1');
  if (k <= 0 || h <= 0 || b <= 0) throw new Error('k, h e b devem ser positivos');
  if (m1 < 0 || m1 >= 1) throw new Error('m1 deve estar entre 0 e 1');

  // Componente autônomo da IS
  const A = C0 - c * T0 + I0 + G0;

  // Economia fechada (caso especial)
  if (capitalMobility === 'closed') {
    return computeClosedEconomy(A, c, b, k, h, M, P);
  }

  // Economia aberta
  switch (capitalMobility) {
    case 'perfect':
      return computePerfectMobility(params, A, isFloating);
    case 'imperfect':
      return computeImperfectMobility(params, A, isFloating);
    case 'zero':
      return computeZeroMobility(params, A, isFloating);
    default:
      throw new Error('Mobilidade de capital inválida');
  }
}

/**
 * Economia fechada (IS-LM clássico)
 */
function computeClosedEconomy(A, c, b, k, h, M, P) {
  const MReal = M / P;
  const denominator = b * k + h * (1 - c);
  
  if (Math.abs(denominator) < 0.001) {
    throw new Error('Denominador muito próximo de zero');
  }
  
  const Y = (h * A + b * MReal) / denominator;
  const i = (k * Y - MReal) / h;
  
  if (!isFinite(Y) || !isFinite(i) || Y < 0 || i < 0) {
    throw new Error('Equilíbrio inválido');
  }
  
  return { Y, i, E: null, M, regime: 'closed' };
}

/**
 * Mobilidade perfeita de capitais (i = i*)
 */
function computePerfectMobility(params, A, isFloating) {
  const { c, b, k, h, m1, x1, x2, m2, X0, M0, Ystar, istar, E, M, P } = params;
  
  // Taxa de juros é determinada externamente
  const i = istar;
  
  if (isFloating) {
    // Câmbio Flutuante: LM determina Y, IS ajusta E
    const MReal = M / P;
    const Y = (MReal + h * i) / k;
    
    // Calcular E que equilibra a IS
    const netExportSensitivity = x2 - m2;
    if (Math.abs(netExportSensitivity) < 0.001) {
      throw new Error('Sensibilidade líquida ao câmbio muito baixa');
    }
    
    const E_eq = (b * i - A - X0 - x1 * Ystar + M0 + (1 - c + m1) * Y) / netExportSensitivity;
    
    return {
      Y,
      i,
      E: Math.max(0.1, E_eq),
      M,
      regime: 'floating-perfect'
    };
  } else {
    // Câmbio Fixo: IS determina Y, LM ajusta M
    const denominator = 1 - c + m1;
    if (Math.abs(denominator) < 0.001) {
      throw new Error('Denominador muito próximo de zero');
    }
    
    const Y = (A + X0 + x1 * Ystar + (x2 - m2) * E - M0 - b * i) / denominator;
    
    // Calcular M que equilibra a LM
    const M_eq = P * (k * Y - h * i);
    
    return {
      Y,
      i,
      E,
      M: Math.max(0, M_eq),
      regime: 'fixed-perfect'
    };
  }
}

/**
 * Mobilidade imperfeita de capitais (BP positivamente inclinada)
 */
function computeImperfectMobility(params, A, isFloating) {
  const { c, b, k, h, m1, x1, x2, m2, f, X0, M0, K0, Ystar, istar, E, M, P } = params;
  
  if (isFloating) {
    // Câmbio Flutuante: Sistema de 3 equações (IS, LM, BP)
    // Resolver numericamente para Y, i, E
    
    // Aproximação iterativa
    let Y = 3000; // Chute inicial
    let i_val = istar;
    let E_val = E;
    
    for (let iter = 0; iter < 100; iter++) {
      const MReal = M / P;
      
      // LM: i = (k*Y - M/P) / h
      i_val = (k * Y - MReal) / h;
      
      // BP: Calcular E que equilibra BP
      // NX + CK = 0
      // (X0 + x1*Ystar + x2*E - M0 - m1*Y - m2*E) + (K0 + f*(i - istar)) = 0
      const netExportSensitivity = x2 - m2;
      if (Math.abs(netExportSensitivity) < 0.001) {
        E_val = E; // Manter E se sensibilidade muito baixa
      } else {
        E_val = (M0 + m1 * Y - X0 - x1 * Ystar - K0 - f * (i_val - istar)) / netExportSensitivity;
      }
      
      // IS: Calcular novo Y
      const denominator = 1 - c + m1;
      if (Math.abs(denominator) < 0.001) break;
      
      const Y_new = (A + X0 + x1 * Ystar + (x2 - m2) * E_val - M0 - b * i_val) / denominator;
      
      // Verificar convergência
      if (Math.abs(Y_new - Y) < 1) break;
      
      Y = Y_new;
    }
    
    return {
      Y,
      i: i_val,
      E: Math.max(0.1, E_val),
      M,
      regime: 'floating-imperfect'
    };
  } else {
    // Câmbio Fixo: Sistema de 3 equações (IS, LM, BP)
    // Resolver numericamente para Y, i, M
    
    let Y = 3000;
    let i_val = istar;
    let M_val = M;
    
    for (let iter = 0; iter < 100; iter++) {
      // IS: i = (A + X0 + x1*Ystar + (x2-m2)*E - M0 - (1-c+m1)*Y) / b
      const denominator_IS = 1 - c + m1;
      if (Math.abs(b) < 0.001) break;
      
      i_val = (A + X0 + x1 * Ystar + (x2 - m2) * E - M0 - denominator_IS * Y) / b;
      
      // BP: Verificar se está em equilíbrio, ajustar Y se necessário
      const NX = X0 + x1 * Ystar + x2 * E - M0 - m1 * Y - m2 * E;
      const CK = K0 + f * (i_val - istar);
      const BP = NX + CK;
      
      // Ajustar Y para equilibrar BP
      if (Math.abs(BP) > 1) {
        Y = Y + BP * 0.1; // Ajuste gradual
      }
      
      // LM: M = P * (k*Y - h*i)
      M_val = P * (k * Y - h * i_val);
      
      // Verificar convergência
      if (Math.abs(BP) < 1) break;
    }
    
    return {
      Y,
      i: i_val,
      E,
      M: Math.max(0, M_val),
      regime: 'fixed-imperfect'
    };
  }
}

/**
 * Sem mobilidade de capitais (BP vertical)
 */
function computeZeroMobility(params, A, isFloating) {
  const { c, b, k, h, m1, x1, x2, m2, X0, M0, Ystar, E, M, P } = params;
  
  // BP vertical: Y determinado por NX = 0
  // X0 + x1*Ystar + x2*E - M0 - m1*Y - m2*E = 0
  // Y_BP = (X0 + x1*Ystar + (x2-m2)*E - M0) / m1
  
  if (Math.abs(m1) < 0.001) {
    throw new Error('Propensão a importar muito baixa');
  }
  
  const Y_BP = (X0 + x1 * Ystar + (x2 - m2) * E - M0) / m1;
  
  if (isFloating) {
    // Câmbio Flutuante: Y = Y_BP, LM determina i, IS ajusta E
    const MReal = M / P;
    const i = (k * Y_BP - MReal) / h;
    
    // Calcular E que equilibra IS em Y_BP
    const netExportSensitivity = x2 - m2;
    let E_eq = E;
    
    if (Math.abs(netExportSensitivity) > 0.001) {
      E_eq = (b * i - A - X0 - x1 * Ystar + M0 + (1 - c + m1) * Y_BP) / netExportSensitivity;
    }
    
    return {
      Y: Y_BP,
      i,
      E: Math.max(0.1, E_eq),
      M,
      regime: 'floating-zero'
    };
  } else {
    // Câmbio Fixo: Y = Y_BP, IS determina i, LM ajusta M
    const denominator = 1 - c + m1;
    if (Math.abs(b) < 0.001) {
      throw new Error('Sensibilidade do investimento muito baixa');
    }
    
    const i = (A + X0 + x1 * Ystar + (x2 - m2) * E - M0 - denominator * Y_BP) / b;
    
    // Calcular M que equilibra LM
    const M_eq = P * (k * Y_BP - h * i);
    
    return {
      Y: Y_BP,
      i,
      E,
      M: Math.max(0, M_eq),
      regime: 'fixed-zero'
    };
  }
}

/**
 * Generate IS curve data with expanded model
 */
export function getISDataExpanded(params, E_value) {
  const { C0, I0, G0, T0, X0, M0, c, b, m1, x1, x2, m2, Ystar } = params;
  
  const A = C0 - c * T0 + I0 + G0;
  const netExportBase = X0 + x1 * Ystar + (x2 - m2) * E_value - M0;
  const denominator = 1 - c + m1;
  
  if (Math.abs(b) < 0.001) return [];
  
  const data = [];
  for (let Y = 500; Y <= 25000; Y += 200) {
    const i = (A + netExportBase - denominator * Y) / b;
    if (isFinite(i) && i >= -5 && i <= 30) {
      data.push({ x: Y, y: i });
    }
  }
  return data;
}

/**
 * Generate LM curve data with expanded model
 */
export function getLMDataExpanded(params, M_value) {
  const { k, h, L0, P } = params;
  
  const MReal = M_value / P;
  
  if (Math.abs(h) < 0.001) return [];
  
  const data = [];
  for (let Y = 500; Y <= 25000; Y += 200) {
    const i = (k * Y - MReal - L0) / h;
    if (isFinite(i) && i >= -5 && i <= 30) {
      data.push({ x: Y, y: i });
    }
  }
  return data;
}

/**
 * Generate BP curve data with expanded model
 */
export function getBPDataExpanded(params, capitalMobility, E_value) {
  const { X0, M0, K0, x1, x2, m1, m2, f, Ystar, istar } = params;
  
  const data = [];
  
  if (capitalMobility === 'perfect') {
    // BP horizontal em i = i*
    for (let Y = 500; Y <= 25000; Y += 200) {
      data.push({ x: Y, y: istar });
    }
  } else if (capitalMobility === 'zero') {
    // BP vertical em Y_BP
    const Y_BP = (X0 + x1 * Ystar + (x2 - m2) * E_value - M0) / m1;
    for (let i = -5; i <= 30; i += 0.5) {
      data.push({ x: Y_BP, y: i });
    }
  } else if (capitalMobility === 'imperfect') {
    // BP positivamente inclinada
    // NX + CK = 0
    // (X0 + x1*Ystar + x2*E - M0 - m1*Y - m2*E) + (K0 + f*(i - istar)) = 0
    // Resolvendo para i:
    // i = istar + (m1*Y - X0 - x1*Ystar - (x2-m2)*E + M0 - K0) / f
    
    if (Math.abs(f) < 0.001) return [];
    
    const netExportBase = X0 + x1 * Ystar + (x2 - m2) * E_value - M0 - K0;
    
    for (let Y = 500; Y <= 25000; Y += 200) {
      const i = istar + (m1 * Y - netExportBase) / f;
      if (isFinite(i) && i >= -5 && i <= 30) {
        data.push({ x: Y, y: i });
      }
    }
  }
  
  return data;
}

/**
 * Calculate aggregate demand components
 */
export function getAggregateComponentsExpanded(params, Y, i, E) {
  const { C0, I0, G0, T0, X0, M0, c, b, m1, x1, x2, m2, Ystar } = params;
  
  const C = C0 + c * (Y - T0);
  const I = I0 - b * i;
  const X = X0 + x1 * Ystar + x2 * E;
  const Im = M0 + m1 * Y + m2 * E;
  const NX = X - Im;
  
  return {
    C: Math.max(0, C),
    I: Math.max(0, I),
    G: G0,
    X: Math.max(0, X),
    M: Math.max(0, Im),
    NX,
    Y
  };
}
