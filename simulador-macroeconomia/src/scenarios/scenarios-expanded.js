/**
 * Cenários pré-configurados usando o modelo IS-LM-BP expandido
 * Baseado nos documentos:
 * - "Consolidação do Modelo IS-LM-BP para Simulador"
 * - "Guia Detalhado de Simulações do Modelo IS-LM-BP"
 */

export const scenariosExpanded = {
  // ========== ECONOMIA FECHADA ==========
  
  closedEconomy: {
    name: 'Economia Fechada - Brasil 2024',
    description: 'Modelo IS-LM clássico com dados brasileiros',
    category: 'basic',
    capitalMobility: 'closed',
    isFloatingRate: true,
    params: {
      C0: 1500, I0: 2000, G0: 2200, T0: 3500,
      X0: 0, M0: 0, L0: 0, K0: 0,
      c: 0.65, b: 80, m1: 0, k: 0.5, h: 60,
      x1: 0, x2: 0, m2: 0, f: 0,
      Ystar: 0, istar: 0, E: 0, M: 1800, P: 1.0
    },
    explanation: 'Economia fechada (sem comércio exterior). Apenas políticas fiscal e monetária domésticas.'
  },

  // ========== 2.1 CÂMBIO FIXO + SEM MOBILIDADE ==========
  
  fixedZeroFiscal: {
    name: '2.1.1 Política Fiscal - Fixo + Sem Mobilidade',
    description: 'Expansão fiscal com câmbio fixo e sem mobilidade de capitais',
    category: 'simulation-2-1',
    capitalMobility: 'zero',
    isFloatingRate: false,
    params: {
      C0: 1500, I0: 2000, G0: 2800, T0: 3500, // G aumentado +600
      X0: 1500, M0: 1300, L0: 0, K0: 0,
      c: 0.65, b: 80, m1: 0.12, k: 0.5, h: 60,
      x1: 0.15, x2: 300, m2: 200, f: 0,
      Ystar: 12000, istar: 5.25, E: 5.0, M: 1800, P: 1.0
    },
    explanation: 'Política fiscal EFICAZ. IS desloca direita → Y e i aumentam. Déficit BP coberto com reservas. LM não se desloca.'
  },

  fixedZeroMonetary: {
    name: '2.1.2 Política Monetária - Fixo + Sem Mobilidade',
    description: 'Expansão monetária com câmbio fixo e sem mobilidade de capitais',
    category: 'simulation-2-1',
    capitalMobility: 'zero',
    isFloatingRate: false,
    params: {
      C0: 1500, I0: 2000, G0: 2200, T0: 3500,
      X0: 1500, M0: 1300, L0: 0, K0: 0,
      c: 0.65, b: 80, m1: 0.12, k: 0.5, h: 60,
      x1: 0.15, x2: 300, m2: 200, f: 0,
      Ystar: 12000, istar: 5.25, E: 5.0, M: 2200, P: 1.0 // M aumentado +400
    },
    explanation: 'Política monetária INEFICAZ. LM desloca direita → déficit BP → BC vende reservas → LM volta. Apenas perda de reservas.'
  },

  // ========== 2.2 CÂMBIO FLEXÍVEL + SEM MOBILIDADE ==========
  
  floatingZeroFiscal: {
    name: '2.2.1 Política Fiscal - Flexível + Sem Mobilidade',
    description: 'Expansão fiscal com câmbio flexível e sem mobilidade de capitais',
    category: 'simulation-2-2',
    capitalMobility: 'zero',
    isFloatingRate: true,
    params: {
      C0: 1500, I0: 2000, G0: 2800, T0: 3500, // G aumentado +600
      X0: 1500, M0: 1300, L0: 0, K0: 0,
      c: 0.65, b: 80, m1: 0.12, k: 0.5, h: 60,
      x1: 0.15, x2: 300, m2: 200, f: 0,
      Ystar: 12000, istar: 5.25, E: 5.0, M: 1800, P: 1.0
    },
    explanation: 'Política fiscal EFICAZ. IS direita → déficit BP → desvalorização → NX aumenta → IS e BP deslocam mais → Y aumenta muito.'
  },

  floatingZeroMonetary: {
    name: '2.2.2 Política Monetária - Flexível + Sem Mobilidade',
    description: 'Expansão monetária com câmbio flexível e sem mobilidade de capitais',
    category: 'simulation-2-2',
    capitalMobility: 'zero',
    isFloatingRate: true,
    params: {
      C0: 1500, I0: 2000, G0: 2200, T0: 3500,
      X0: 1500, M0: 1300, L0: 0, K0: 0,
      c: 0.65, b: 80, m1: 0.12, k: 0.5, h: 60,
      x1: 0.15, x2: 300, m2: 200, f: 0,
      Ystar: 12000, istar: 5.25, E: 5.0, M: 2200, P: 1.0 // M aumentado +400
    },
    explanation: 'Política monetária EFICAZ. LM direita → déficit BP → desvalorização → NX aumenta → IS direita → Y aumenta muito.'
  },

  // ========== 2.3 CÂMBIO FIXO + MOBILIDADE PERFEITA ==========
  
  fixedPerfectFiscal: {
    name: '2.3.1 Política Fiscal - Fixo + Mobilidade Perfeita',
    description: 'Expansão fiscal com câmbio fixo e mobilidade perfeita de capitais',
    category: 'simulation-2-3',
    capitalMobility: 'perfect',
    isFloatingRate: false,
    params: {
      C0: 1500, I0: 2000, G0: 2800, T0: 3500, // G aumentado +600
      X0: 1500, M0: 1300, L0: 0, K0: 0,
      c: 0.65, b: 80, m1: 0.12, k: 0.5, h: 60,
      x1: 0.15, x2: 300, m2: 200, f: 999999,
      Ystar: 12000, istar: 5.25, E: 5.0, M: 1800, P: 1.0
    },
    explanation: 'Política fiscal MUITO EFICAZ. IS direita → i sobe → entrada massiva de capital → BC compra dólares → M aumenta → LM direita → Y aumenta muito.'
  },

  fixedPerfectMonetary: {
    name: '2.3.2 Política Monetária - Fixo + Mobilidade Perfeita',
    description: 'Expansão monetária com câmbio fixo e mobilidade perfeita de capitais',
    category: 'simulation-2-3',
    capitalMobility: 'perfect',
    isFloatingRate: false,
    params: {
      C0: 1500, I0: 2000, G0: 2200, T0: 3500,
      X0: 1500, M0: 1300, L0: 0, K0: 0,
      c: 0.65, b: 80, m1: 0.12, k: 0.5, h: 60,
      x1: 0.15, x2: 300, m2: 200, f: 999999,
      Ystar: 12000, istar: 5.25, E: 5.0, M: 2200, P: 1.0 // M aumentado +400
    },
    explanation: 'Política monetária INEFICAZ. LM direita → i cai → fuga massiva de capital → BC vende dólares → M volta → equilíbrio original. Perda de reservas.'
  },

  // ========== 2.4 CÂMBIO FLEXÍVEL + MOBILIDADE PERFEITA ==========
  
  floatingPerfectFiscal: {
    name: '2.4.1 Política Fiscal - Flexível + Mobilidade Perfeita',
    description: 'Expansão fiscal com câmbio flexível e mobilidade perfeita de capitais',
    category: 'simulation-2-4',
    capitalMobility: 'perfect',
    isFloatingRate: true,
    params: {
      C0: 1500, I0: 2000, G0: 2800, T0: 3500, // G aumentado +600
      X0: 1500, M0: 1300, L0: 0, K0: 0,
      c: 0.65, b: 80, m1: 0.12, k: 0.5, h: 60,
      x1: 0.15, x2: 300, m2: 200, f: 999999,
      Ystar: 12000, istar: 5.25, E: 5.0, M: 1800, P: 1.0
    },
    explanation: 'Política fiscal INEFICAZ. IS direita → i sobe → entrada massiva de capital → valorização → NX cai → IS volta. Crowding-out via câmbio.'
  },

  floatingPerfectMonetary: {
    name: '2.4.2 Política Monetária - Flexível + Mobilidade Perfeita',
    description: 'Expansão monetária com câmbio flexível e mobilidade perfeita de capitais',
    category: 'simulation-2-4',
    capitalMobility: 'perfect',
    isFloatingRate: true,
    params: {
      C0: 1500, I0: 2000, G0: 2200, T0: 3500,
      X0: 1500, M0: 1300, L0: 0, K0: 0,
      c: 0.65, b: 80, m1: 0.12, k: 0.5, h: 60,
      x1: 0.15, x2: 300, m2: 200, f: 999999,
      Ystar: 12000, istar: 5.25, E: 5.0, M: 2200, P: 1.0 // M aumentado +400
    },
    explanation: 'Política monetária MUITO EFICAZ. LM direita → i cai → fuga massiva de capital → desvalorização → NX aumenta → IS direita → Y aumenta muito.'
  },

  // ========== 2.5 CÂMBIO FIXO + MOBILIDADE IMPERFEITA ==========
  
  fixedImperfectFiscal: {
    name: '2.5.1 Política Fiscal - Fixo + Mobilidade Imperfeita',
    description: 'Expansão fiscal com câmbio fixo e mobilidade imperfeita de capitais',
    category: 'simulation-2-5',
    capitalMobility: 'imperfect',
    isFloatingRate: false,
    params: {
      C0: 1500, I0: 2000, G0: 2800, T0: 3500, // G aumentado +600
      X0: 1500, M0: 1300, L0: 0, K0: 0,
      c: 0.65, b: 80, m1: 0.12, k: 0.5, h: 60,
      x1: 0.15, x2: 300, m2: 200, f: 100,
      Ystar: 12000, istar: 5.25, E: 5.0, M: 1800, P: 1.0
    },
    explanation: 'Política fiscal EFICAZ. IS direita → Y e i sobem. Se BP < LM: entrada de capital → BC compra dólares → M aumenta → reforça efeito.'
  },

  fixedImperfectMonetary: {
    name: '2.5.2 Política Monetária - Fixo + Mobilidade Imperfeita',
    description: 'Expansão monetária com câmbio fixo e mobilidade imperfeita de capitais',
    category: 'simulation-2-5',
    capitalMobility: 'imperfect',
    isFloatingRate: false,
    params: {
      C0: 1500, I0: 2000, G0: 2200, T0: 3500,
      X0: 1500, M0: 1300, L0: 0, K0: 0,
      c: 0.65, b: 80, m1: 0.12, k: 0.5, h: 60,
      x1: 0.15, x2: 300, m2: 200, f: 100,
      Ystar: 12000, istar: 5.25, E: 5.0, M: 2200, P: 1.0 // M aumentado +400
    },
    explanation: 'Política monetária INEFICAZ. LM direita → déficit BP → BC vende dólares → M volta. Perda de reservas anula política.'
  },

  // ========== 2.6 CÂMBIO FLEXÍVEL + MOBILIDADE IMPERFEITA ==========
  
  floatingImperfectFiscal: {
    name: '2.6.1 Política Fiscal - Flexível + Mobilidade Imperfeita',
    description: 'Expansão fiscal com câmbio flexível e mobilidade imperfeita de capitais',
    category: 'simulation-2-6',
    capitalMobility: 'imperfect',
    isFloatingRate: true,
    params: {
      C0: 1500, I0: 2000, G0: 2800, T0: 3500, // G aumentado +600
      X0: 1500, M0: 1300, L0: 0, K0: 0,
      c: 0.65, b: 80, m1: 0.12, k: 0.5, h: 60,
      x1: 0.15, x2: 300, m2: 200, f: 100,
      Ystar: 12000, istar: 5.25, E: 5.0, M: 1800, P: 1.0
    },
    explanation: 'Política fiscal EFICAZ. IS direita → se BP > LM: valorização atenua. Se BP < LM: desvalorização reforça. Efeito depende de inclinações.'
  },

  floatingImperfectMonetary: {
    name: '2.6.2 Política Monetária - Flexível + Mobilidade Imperfeita',
    description: 'Expansão monetária com câmbio flexível e mobilidade imperfeita de capitais',
    category: 'simulation-2-6',
    capitalMobility: 'imperfect',
    isFloatingRate: true,
    params: {
      C0: 1500, I0: 2000, G0: 2200, T0: 3500,
      X0: 1500, M0: 1300, L0: 0, K0: 0,
      c: 0.65, b: 80, m1: 0.12, k: 0.5, h: 60,
      x1: 0.15, x2: 300, m2: 200, f: 100,
      Ystar: 12000, istar: 5.25, E: 5.0, M: 2200, P: 1.0 // M aumentado +400
    },
    explanation: 'Política monetária EFICAZ. LM direita → déficit BP → desvalorização → NX aumenta → IS direita → Y aumenta significativamente.'
  },

  // ========== CHOQUES EXTERNOS ==========
  
  externalShockYstar: {
    name: 'Choque Externo - Recessão Mundial',
    description: 'Queda da renda externa (Y*)',
    category: 'external',
    capitalMobility: 'imperfect',
    isFloatingRate: true,
    params: {
      C0: 1500, I0: 2000, G0: 2200, T0: 3500,
      X0: 1500, M0: 1300, L0: 0, K0: 0,
      c: 0.65, b: 80, m1: 0.12, k: 0.5, h: 60,
      x1: 0.15, x2: 300, m2: 200, f: 100,
      Ystar: 10000, // Queda de 12000 para 10000
      istar: 5.25, E: 5.0, M: 1800, P: 1.0
    },
    explanation: 'Recessão mundial: Y* cai de 12.000 para 10.000. Exportações caem, IS e BP deslocam para esquerda. Desvalorização cambial ajuda a compensar.'
  },

  externalShockIstar: {
    name: 'Choque Externo - Alta de Juros Fed',
    description: 'Aumento da taxa de juros externa (i*)',
    category: 'external',
    capitalMobility: 'imperfect',
    isFloatingRate: true,
    params: {
      C0: 1500, I0: 2000, G0: 2200, T0: 3500,
      X0: 1500, M0: 1300, L0: 0, K0: 0,
      c: 0.65, b: 80, m1: 0.12, k: 0.5, h: 60,
      x1: 0.15, x2: 300, m2: 200, f: 100,
      Ystar: 12000,
      istar: 8.0, // Fed sobe de 5.25% para 8%
      E: 5.0, M: 1800, P: 1.0
    },
    explanation: 'Fed sobe juros de 5.25% para 8%. Fuga de capitais, BP desloca para cima. Desvalorização cambial e aumento de juros domésticos.'
  },

  // ========== DESVALORIZAÇÃO CAMBIAL ==========
  
  devaluation: {
    name: 'Desvalorização Cambial',
    description: 'Desvalorização de 20% (E: 5.0 → 6.0)',
    category: 'policy',
    capitalMobility: 'imperfect',
    isFloatingRate: false,
    params: {
      C0: 1500, I0: 2000, G0: 2200, T0: 3500,
      X0: 1500, M0: 1300, L0: 0, K0: 0,
      c: 0.65, b: 80, m1: 0.12, k: 0.5, h: 60,
      x1: 0.15, x2: 300, m2: 200, f: 100,
      Ystar: 12000, istar: 5.25,
      E: 6.0, // Desvalorização de 20%
      M: 1800, P: 1.0
    },
    explanation: 'Desvalorização cambial de 20%. Exportações aumentam, importações caem. IS e BP deslocam para direita. Renda aumenta.'
  },

  // ========== CASOS ESPECIAIS ==========
  
  liquidityTrap: {
    name: 'Armadilha da Liquidez',
    description: 'LM horizontal (h muito alto)',
    category: 'special',
    capitalMobility: 'closed',
    isFloatingRate: true,
    params: {
      C0: 1500, I0: 2000, G0: 2200, T0: 3500,
      X0: 0, M0: 0, L0: 0, K0: 0,
      c: 0.65, b: 80, m1: 0, k: 0.5,
      h: 200, // h muito alto = LM horizontal
      x1: 0, x2: 0, m2: 0, f: 0,
      Ystar: 0, istar: 0, E: 0, M: 1800, P: 1.0
    },
    explanation: 'Armadilha da liquidez: demanda por moeda muito sensível aos juros. LM quase horizontal. Política monetária ineficaz, fiscal muito eficaz.'
  },

  investmentInsensitive: {
    name: 'Investimento Insensível aos Juros',
    description: 'IS vertical (b muito baixo)',
    category: 'special',
    capitalMobility: 'closed',
    isFloatingRate: true,
    params: {
      C0: 1500, I0: 2000, G0: 2200, T0: 3500,
      X0: 0, M0: 0, L0: 0, K0: 0,
      c: 0.65,
      b: 20, // b muito baixo = IS vertical
      m1: 0, k: 0.5, h: 60,
      x1: 0, x2: 0, m2: 0, f: 0,
      Ystar: 0, istar: 0, E: 0, M: 1800, P: 1.0
    },
    explanation: 'Investimento insensível aos juros (b baixo). IS muito inclinada. Política fiscal muito eficaz, monetária ineficaz.'
  }
};

/**
 * Get scenarios by category
 */
export function getScenariosByCategory(category) {
  return Object.entries(scenariosExpanded)
    .filter(([_, scenario]) => scenario.category === category)
    .map(([key, scenario]) => ({ key, ...scenario }));
}

/**
 * Get all categories
 */
export function getCategories() {
  const categories = new Set();
  Object.values(scenariosExpanded).forEach(s => categories.add(s.category));
  return Array.from(categories);
}

/**
 * Get scenario by key
 */
export function getScenarioExpanded(key) {
  return scenariosExpanded[key];
}
