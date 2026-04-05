export function computeEquilibrium(params, isOpen, isFloating, capitalMobility = 'perfect') {
  const { G, T, M, c, b, k, h, e, rstar, C0, I0, X0, m, v, x1, Ystar, K0 } = params;
  
  // Nomes consistentes (usar aliases se necessário, mas StateManager já sincroniza)
  const real_G = params.G || params.G0 || 0;
  const real_T = params.T || params.T0 || 0;
  const real_M = params.M || 1800;
  const real_e = params.e || params.E || 5.0;
  const real_rstar = params.rstar || params.istar || 5.0;
  const real_m = (params.m !== undefined) ? params.m : (params.m1 || 0.12);
  const real_v = params.v || params.x2 || 200;
  
  const A = C0 - c * real_T + I0 + real_G;
  const X_total = X0 + (x1 || 0) * (Ystar || 0);

  // Validate critical inputs
  if (k <= 0 || h <= 0 || b <= 0) throw new Error('Parâmetros k, h e b devem ser positivos');
  if (c < 0 || c >= 1) throw new Error('Propensão marginal a consumir inválida');

  if (!isOpen) {
    // ECONOMIA FECHADA
    const denominator = b * k + h * (1 - c);
    const Y_eq = (h * A + b * real_M) / denominator;
    const r_eq = (k * Y_eq - real_M) / h;
    return { Y: Y_eq, r: r_eq, e_eq: real_e, M_eq: real_M };
  } else {
    // ECONOMIA ABERTA
    let Y_eq, r_eq, e_eq, M_eq;

    if (capitalMobility === 'zero') {
      if (isFloating) {
        // Flutuante + Sem Mobilidade: IS-LM determinam Y, r (como fechada), e ajusta
        const denominator = b * k + h * (1 - c);
        Y_eq = (h * A + b * real_M) / denominator;
        r_eq = (k * Y_eq - real_M) / h;
        e_eq = (real_m * Y_eq - X_total) / real_v;
        M_eq = real_M;
      } else {
        // Fixo + Sem Mobilidade: BP determina Y (NX=0), IS determina r, LM ajusta M
        e_eq = real_e;
        if (real_m <= 0) throw new Error('m deve ser positivo para mobilidade zero');
        Y_eq = (X_total + real_v * real_e) / real_m;
        r_eq = (A - (1 - c) * Y_eq) / b;
        M_eq = k * Y_eq - h * r_eq;
      }
    } else if (capitalMobility === 'imperfect') {
      const f = params.f || 100;
      if (isFloating) {
        // Resolver LM e a linha combinada IS-BP (NX+CF=0)
        // Linha combinada: (1-c)Y + (b+f)r = A + f*rstar - K0
        const A_comb = A + f * real_rstar - (K0 || 0);
        const denominator = (b + f) * k + h * (1 - c);
        Y_eq = (h * A_comb + (b + f) * real_M) / denominator;
        r_eq = (k * Y_eq - real_M) / h;
        e_eq = (real_m * Y_eq - f * (r_eq - real_rstar) - X_total - (K0 || 0)) / real_v;
        M_eq = real_M;
      } else {
        // Câmbio Fixo: Sistema 2x2 (IS e BP)
        const IS_add = A + X_total + real_v * real_e;
        const BP_add = f * real_rstar - X_total - (K0 || 0) - real_v * real_e;
        const mult_IS = (1 - c + real_m);
        const den = f * mult_IS + b * real_m;
        Y_eq = (f * IS_add - b * BP_add) / den;
        r_eq = (mult_IS * BP_add + real_m * IS_add) / den;
        M_eq = k * Y_eq - h * r_eq;
        e_eq = real_e;
      }
    } else {
      // MOBILIDADE PERFEITA
      r_eq = real_rstar;
      if (isFloating) {
        Y_eq = (real_M + h * real_rstar) / k;
        e_eq = (b * real_rstar - A - X_total + (1 - c + real_m) * Y_eq) / real_v;
        M_eq = real_M;
      } else {
        e_eq = real_e;
        const denominator = 1 - c + real_m;
        Y_eq = (A + X_total + real_v * real_e - b * real_rstar) / denominator;
        M_eq = k * Y_eq - h * real_rstar;
      }
    }

    // Validação final de segurança
    if (!isFinite(Y_eq) || !isFinite(r_eq)) throw new Error('Equilíbrio instável');
    
    return { 
      Y: Y_eq, 
      r: r_eq, 
      e_eq: Math.max(0.1, e_eq || 0), 
      M_eq: Math.max(0, M_eq || 0) 
    };
  }
}

export function getISData(params, isOpen, dynamic_e) {
  const { G, T, c, b, C0, I0, X0, m, v, x1, Ystar } = params;
  const real_G = params.G || params.G0 || 0;
  const real_T = params.T || params.T0 || 0;
  const real_m = (params.m !== undefined) ? params.m : (params.m1 || 0.12);
  const real_v = params.v || params.x2 || 200;
  
  const A = C0 - c * real_T + I0 + real_G;
  const X_total = X0 + (x1 || 0) * (Ystar || 0);

  const mult = isOpen ? (1 - c + real_m) : (1 - c);
  const add = isOpen ? (X_total + real_v * dynamic_e) : 0;
  
  const data = [];
  for (let Y = 0; Y <= 25000; Y += 250) {
    const r = (A + add - mult * Y) / b;
    if (isFinite(r) && r >= -20 && r <= 60) {
      data.push({ x: Y, y: r });
    }
  }
  return data;
}

export function getLMData(params, dynamic_M) {
  const { k, h, L0 } = params;
  const L_base = L0 || 0;
  
  const data = [];
  for (let Y = 0; Y <= 25000; Y += 250) {
    const r = (k * Y - dynamic_M - L_base) / h;
    if (isFinite(r) && r >= -20 && r <= 60) {
      data.push({ x: Y, y: r });
    }
  }
  return data;
}

export function getBPData(rstar, capitalMobility = 'perfect', params = null) {
  if (!params) return [];
  const { X0, x1, Ystar, v, x2, e, E, m, m1, f, K0 } = params;
  
  const real_e = e || E || 5.0;
  const real_m = (m !== undefined) ? m : (m1 || 0.12);
  const real_v = v || x2 || 200;
  const X_total = X0 + (x1 || 0) * (Ystar || 0);
  const real_f = f || 100;
  const real_K0 = K0 || 0;
  const real_rstar = rstar || params.istar || 5.0;

  const data = [];
  if (capitalMobility === 'zero') {
    let Y_BP = (X_total + real_v * real_e) / real_m;
    for (let r = -20; r <= 60; r += 2) {
      data.push({ x: Y_BP, y: r });
    }
  } else if (capitalMobility === 'imperfect') {
    const add = X_total + real_v * real_e + real_K0;
    for (let Y = 0; Y <= 25000; Y += 250) {
      const r = real_rstar + (real_m * Y - add) / real_f;
      if (isFinite(r) && r >= -20 && r <= 60) {
        data.push({ x: Y, y: r });
      }
    }
  } else {
    for (let Y = 0; Y <= 25000; Y += 500) {
      data.push({ x: Y, y: real_rstar });
    }
  }
  return data;
}

export function getFiscalMultiplier(params, isOpen) {
  const { c, m } = params;
  const real_m = (params.m !== undefined) ? params.m : (params.m1 || 0.12);
  const denominator = isOpen ? (1 - c + real_m) : (1 - c);
  return denominator > 0.001 ? 1 / denominator : 0;
}

export function getMonetaryMultiplier(params) {
  const { c, b, k, h } = params;
  const denominator = b * k + h * (1 - c);
  return denominator > 0.001 ? b / denominator : 0;
}

export function getAggregateComponents(params, Y, r, e) {
  const { T, c, b, C0, I0, X0, m, v, G } = params;
  const real_m = (params.m !== undefined) ? params.m : (params.m1 || 0.12);
  const real_v = params.v || params.x2 || 200;
  const real_G = G || params.G0 || 0;
  const real_T = T || params.T0 || 0;

  const C = C0 + c * (Y - real_T);
  const I = I0 - b * r;
  const NX = X0 - real_m * Y + real_v * e;
  
  return { C, I, G: real_G, NX, Y };
}
