/**
 * Cenários pré-configurados usando o modelo IS-LM-BP expandido
 * Baseado nos documentos:
 * - "Consolidação do Modelo IS-LM-BP para Simulador"
 * - "Guia Detalhado de Simulações do Modelo IS-LM-BP"
 */

export const scenariosExpanded = {
  // ========== ECONOMIA FECHADA ==========
  
  closedEconomy: {
    name: 'Economia Fechada - Base',
    description: 'Modelo IS-LM clássico com dados centralizados',
    category: 'basic',
    capitalMobility: 'closed',
    isFloatingRate: true,
    params: {
      C0: 1000, I0: 1500, G0: 1500, T0: 3000,
      X0: 0, M0: 0, L0: 0, K0: 0,
      c: 0.70, b: 60, m1: 0, k: 0.5, h: 50,
      x1: 0, x2: 0, m2: 0, f: 0,
      Ystar: 0, istar: 0, E: 0, M: 1750, P: 1.0
    },
    explanation: 'Economia fechada (sem comércio exterior). Foco no equilíbrio entre mercado de bens (IS) e mercado monetário (LM).'
  },

  // ========== 2.1 CÂMBIO FIXO + SEM MOBILIDADE ==========
  
  fixedZeroFiscal: {
    name: 'Expansão Fiscal (Fixo + Sem Mobilidade)',
    description: 'Expansão fiscal com câmbio fixo e sem mobilidade de capitais',
    category: 'simulation-2-1',
    capitalMobility: 'zero',
    isFloatingRate: false,
    params: {
      C0: 1000, I0: 1500, G0: 2200, T0: 3000, // G aumentado
      X0: 1000, M0: 800, L0: 0, K0: 0,
      c: 0.70, b: 60, m1: 0.30, k: 0.5, h: 50,
      x1: 0.10, x2: 200, m2: 100, f: 0,
      Ystar: 2000, istar: 15.0, E: 3.2, M: 1750, P: 1.0
    },
    explanation: 'Política fiscal EFICAZ. IS desloca para direita → Y e r aumentam. Déficit no balanço de pagamentos é coberto com perda de reservas, mas a TR fixo impede o ajuste pela LM no curto prazo.'
  },

  // ========== 2.3 CÂMBIO FIXO + MOBILIDADE PERFEITA ==========
  
  fixedPerfectFiscal: {
    name: 'Expansão Fiscal (Fixo + Perfeita)',
    description: 'Expansão fiscal com câmbio fixo e mobilidade perfeita de capitais',
    category: 'simulation-2-3',
    capitalMobility: 'perfect',
    isFloatingRate: false,
    params: {
      C0: 1000, I0: 1500, G0: 2200, T0: 3000,
      X0: 1000, M0: 800, L0: 0, K0: 0,
      c: 0.70, b: 60, m1: 0.30, k: 0.5, h: 50,
      x1: 0.10, x2: 200, m2: 100, f: 999999,
      Ystar: 2000, istar: 15.0, E: 3.2, M: 1750, P: 1.0
    },
    explanation: 'Política fiscal MUITO EFICAZ. IS direita → r sobe → entrada massiva de capital → BC compra moeda estrangeira → oferta de moeda (M) aumenta → LM direita → renda (Y) aumenta drasticamente.'
  },

  fixedPerfectMonetary: {
    name: 'Expansão Monetária (Fixo + Perfeita)',
    description: 'Expansão monetária com câmbio fixo e mobilidade perfeita de capitais',
    category: 'simulation-2-3',
    capitalMobility: 'perfect',
    isFloatingRate: false,
    params: {
      C0: 1000, I0: 1500, G0: 1500, T0: 3000,
      X0: 1000, M0: 800, L0: 0, K0: 0,
      c: 0.70, b: 60, m1: 0.30, k: 0.5, h: 50,
      x1: 0.10, x2: 200, m2: 100, f: 999999,
      Ystar: 2000, istar: 15.0, E: 3.2, M: 2200, P: 1.0 // M aumentado
    },
    explanation: 'Política monetária INEFICAZ. LM direita → r cai → fuga massiva de capital → BC vende reservas → M diminui automaticamente até o nível original. Apenas perda de reservas.'
  },

  // ========== 2.4 CÂMBIO FLEXÍVEL + MOBILIDADE PERFEITA ==========
  
  floatingPerfectFiscal: {
    name: 'Expansão Fiscal (Flexível + Perfeita)',
    description: 'Expansão fiscal com câmbio flexível e mobilidade perfeita de capitais',
    category: 'simulation-2-4',
    capitalMobility: 'perfect',
    isFloatingRate: true,
    params: {
      C0: 1000, I0: 1500, G0: 2200, T0: 3000,
      X0: 1000, M0: 800, L0: 0, K0: 0,
      c: 0.70, b: 60, m1: 0.30, k: 0.5, h: 50,
      x1: 0.10, x2: 200, m2: 100, f: 999999,
      Ystar: 2000, istar: 15.0, E: 3.2, M: 1750, P: 1.0
    },
    explanation: 'Política fiscal TOTALMENTE INEFICAZ. IS direita → r sobe → entrada de capital → valorização cambial → exportações líquidas caem → IS volta para a posição original. Crowding-out via setor externo.'
  },

  floatingPerfectMonetary: {
    name: 'Expansão Monetária (Flexível + Perfeita)',
    description: 'Expansão monetária com câmbio flexível e mobilidade perfeita de capitais',
    category: 'simulation-2-4',
    capitalMobility: 'perfect',
    isFloatingRate: true,
    params: {
      C0: 1000, I0: 1500, G0: 1500, T0: 3000,
      X0: 1000, M0: 800, L0: 0, K0: 0,
      c: 0.70, b: 60, m1: 0.30, k: 0.5, h: 50,
      x1: 0.10, x2: 200, m2: 100, f: 999999,
      Ystar: 2000, istar: 15.0, E: 3.2, M: 2200, P: 1.0
    },
    explanation: 'Política monetária MUITO EFICAZ. LM direita → r cai → fuga de capital → desvalorização cambial → exportações aumentam → IS se desloca para a direita → grande aumento da renda (Y).'
  },

  // ========== CHOQUES EXTERNOS ==========
  
  externalShockIstar: {
    name: 'Alta de Juros do Fed',
    description: 'Aumento da taxa de juros externa (i*)',
    category: 'external',
    capitalMobility: 'imperfect',
    isFloatingRate: true,
    params: {
      C0: 1000, I0: 1500, G0: 1500, T0: 3000,
      X0: 1000, M0: 800, L0: 0, K0: 0,
      c: 0.70, b: 60, m1: 0.30, k: 0.5, h: 50,
      x1: 0.10, x2: 200, m2: 100, f: 100,
      Ystar: 2000,
      istar: 20.0, // Fed sobe de 15% para 20%
      E: 3.2, M: 1750, P: 1.0
    },
    explanation: 'Fed sobe juros. Fuga de capitais do país, BP desloca para cima. Há pressão por desvalorização cambial e aumento compensatório dos juros domésticos.'
  },

  // ========== CASOS ESPECIAIS ==========
  
  investmentInsensitive: {
    name: 'Pessimismo Empresarial',
    description: 'IS vertical (b muito baixo)',
    category: 'special',
    capitalMobility: 'closed',
    isFloatingRate: true,
    params: {
      C0: 1000, I0: 1500, G0: 1500, T0: 3000,
      X0: 0, M0: 0, L0: 0, K0: 0,
      c: 0.70,
      b: 10, // b muito baixo
      m1: 0, k: 0.5, h: 50,
      x1: 0, x2: 0, m2: 0, f: 0,
      Ystar: 0, istar: 0, E: 0, M: 1750, P: 1.0
    },
    explanation: 'Cenário de pessimismo: investimento insensível aos juros. A política monetária torna-se ineficaz para estimular a renda, focando o debate na política fiscal.'
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

