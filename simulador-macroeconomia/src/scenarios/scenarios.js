/**
 * Pre-configured economic scenarios for educational purposes
 */

export const scenarios = {
  default: {
    name: 'Economia Brasileira 2024',
    description: 'Configuração baseada em dados reais da economia brasileira',
    category: 'basic',
    isOpenEconomy: false,
    isFloatingRate: true,
    params: {
      G: 2200,      // ~22% do PIB
      T: 3500,      // Carga tributária ~35%
      M: 5000,      // M2 Brasil
      c: 0.65,      // PMgC Brasil
      b: 80,
      k: 0.4,
      h: 100,
      C0: 1500,
      I0: 2000,     // Investimento ~20% PIB
      X0: 1500,     // Exportações ~15% PIB
      m: 0.12,      // Importações ~12%
      v: 200,
      e: 5.0,       // R$ 5,00/USD
      rstar: 5.25   // Fed Funds 2024
    }
  },

  fiscalExpansion: {
    name: 'Expansão Fiscal',
    description: 'Aumento do gasto público para estimular a economia',
    category: 'fiscal',
    isOpenEconomy: false,
    isFloatingRate: true,
    params: {
      G: 2800,      // Expansão: +27% nos gastos
      T: 3500,
      M: 5000,
      c: 0.65,
      b: 80,
      k: 0.4,
      h: 100,
      C0: 1500,
      I0: 2000,
      X0: 1500,
      m: 0.12,
      v: 200
    },
    explanation: 'O governo aumenta gastos para combater recessão. Observe o efeito crowding-out: juros sobem e investimento privado cai.'
  },

  monetaryExpansion: {
    name: 'Expansão Monetária',
    description: 'Aumento da oferta de moeda para reduzir juros',
    category: 'monetary',
    isOpenEconomy: false,
    isFloatingRate: true,
    params: {
      G: 2200,
      T: 3500,
      M: 6500,      // Expansão: +30% na oferta monetária
      c: 0.65,
      b: 80,
      k: 0.4,
      h: 100,
      C0: 1500,
      I0: 2000,
      X0: 1500,
      m: 0.12,
      v: 200
    },
    explanation: 'O Banco Central aumenta a oferta monetária. Juros caem, investimento aumenta, renda sobe.'
  },

  austerity: {
    name: 'Austeridade Fiscal',
    description: 'Redução de gastos e aumento de impostos',
    category: 'fiscal',
    isOpenEconomy: false,
    isFloatingRate: true,
    params: {
      G: 1700,      // Corte de 23% nos gastos
      T: 4200,      // Aumento de 20% nos impostos
      M: 5000,
      c: 0.65,
      b: 80,
      k: 0.4,
      h: 100,
      C0: 1500,
      I0: 2000,
      X0: 1500,
      m: 0.12,
      v: 200
    },
    explanation: 'Política de austeridade: gastos caem e impostos sobem. Renda diminui significativamente.'
  },

  liquidityTrap: {
    name: 'Armadilha da Liquidez',
    description: 'LM muito elástica - política monetária ineficaz',
    category: 'special',
    isOpenEconomy: false,
    isFloatingRate: true,
    params: {
      G: 2200,
      T: 3500,
      M: 5000,
      c: 0.65,
      b: 80,
      k: 0.4,
      h: 180,       // h muito alto = LM horizontal
      C0: 1500,
      I0: 2000,
      X0: 1500,
      m: 0.12,
      v: 200
    },
    explanation: 'Alta sensibilidade da demanda por moeda aos juros (h alto). LM quase horizontal - política monetária perde eficácia.'
  },

  investmentInsensitive: {
    name: 'Investimento Insensível',
    description: 'IS muito inclinada - investimento pouco sensível a juros',
    category: 'special',
    isOpenEconomy: false,
    isFloatingRate: true,
    params: {
      G: 2200,
      T: 3500,
      M: 5000,
      c: 0.65,
      b: 25,        // b muito baixo = IS vertical
      k: 0.4,
      h: 100,
      C0: 1500,
      I0: 2000,
      X0: 1500,
      m: 0.12,
      v: 200
    },
    explanation: 'Investimento pouco sensível aos juros (b baixo). IS muito inclinada - política fiscal mais eficaz.'
  },

  openFloating: {
    name: 'Economia Aberta - Câmbio Flutuante',
    description: 'Política monetária eficaz, fiscal ineficaz',
    category: 'open',
    isOpenEconomy: true,
    isFloatingRate: true,
    params: {
      G: 2200,
      T: 3500,
      M: 5000,
      e: 5.0,
      rstar: 5.25,
      c: 0.65,
      b: 80,
      k: 0.4,
      h: 100,
      C0: 1500,
      I0: 2000,
      X0: 1500,
      m: 0.12,
      v: 200
    },
    explanation: 'Com câmbio flutuante e mobilidade perfeita de capital, a política fiscal é totalmente ineficaz (câmbio se ajusta).'
  },

  openFixed: {
    name: 'Economia Aberta - Câmbio Fixo',
    description: 'Política fiscal eficaz, monetária ineficaz',
    category: 'open',
    isOpenEconomy: true,
    isFloatingRate: false,
    params: {
      G: 2200,
      T: 3500,
      M: 5000,
      e: 5.0,
      rstar: 5.25,
      c: 0.65,
      b: 80,
      k: 0.4,
      h: 100,
      C0: 1500,
      I0: 2000,
      X0: 1500,
      m: 0.12,
      v: 200
    },
    explanation: 'Com câmbio fixo, o Banco Central perde controle da oferta monetária. Política fiscal é muito eficaz.'
  },

  devaluation: {
    name: 'Desvalorização Cambial',
    description: 'Desvalorização para estimular exportações',
    category: 'open',
    isOpenEconomy: true,
    isFloatingRate: false,
    params: {
      G: 2200,
      T: 3500,
      M: 5000,
      e: 6.5,       // Desvalorização: R$ 6,50/USD (+30%)
      rstar: 5.25,
      c: 0.65,
      b: 80,
      k: 0.4,
      h: 100,
      C0: 1500,
      I0: 2000,
      X0: 1500,
      m: 0.12,
      v: 200
    },
    explanation: 'Desvalorização cambial torna exportações mais competitivas. IS desloca para direita, renda aumenta.'
  },

  externalShock: {
    name: 'Choque Externo - Alta de Juros',
    description: 'Aumento da taxa de juros internacional',
    category: 'open',
    isOpenEconomy: true,
    isFloatingRate: true,
    params: {
      G: 2200,
      T: 3500,
      M: 5000,
      e: 5.0,
      rstar: 8.5,   // Fed sobe juros para 8.5%
      c: 0.65,
      b: 80,
      k: 0.4,
      h: 100,
      C0: 1500,
      I0: 2000,
      X0: 1500,
      m: 0.12,
      v: 200
    },
    explanation: 'Juros internacionais sobem. Com mobilidade de capital, juros domésticos devem acompanhar, reduzindo investimento.'
  },

  highPropensity: {
    name: 'Alta Propensão a Consumir',
    description: 'Consumidores gastam mais da renda',
    category: 'parameters',
    isOpenEconomy: false,
    isFloatingRate: true,
    params: {
      G: 2200,
      T: 3500,
      M: 5000,
      c: 0.80,      // PMgC muito alta
      b: 80,
      k: 0.4,
      h: 100,
      C0: 1500,
      I0: 2000,
      X0: 1500,
      m: 0.12,
      v: 200
    },
    explanation: 'Alta propensão marginal a consumir (c=0.80). Multiplicador fiscal maior, IS mais horizontal.'
  },

  crisis2008: {
    name: 'Crise 2008 - Resposta Política',
    description: 'Simulação de resposta à crise financeira',
    category: 'historical',
    isOpenEconomy: false,
    isFloatingRate: true,
    params: {
      G: 2600,      // Expansão fiscal anticíclica
      T: 3200,      // Redução temporária de impostos
      M: 6000,      // Expansão monetária agressiva
      c: 0.60,      // PMgC cai em crise (precaução)
      b: 40,        // Investimento insensível (pessimismo)
      k: 0.4,
      h: 150,       // Armadilha da liquidez
      C0: 1200,     // Consumo autônomo cai
      I0: 1500,     // Investimento autônomo cai
      X0: 1200,     // Exportações caem (crise global)
      m: 0.10,
      v: 200
    },
    explanation: 'Resposta à crise: expansão fiscal e monetária combinadas. Investimento pouco sensível (b baixo) devido ao pessimismo. LM mais horizontal (h alto) representa armadilha da liquidez.'
  },

  capitalImmobility: {
    name: 'Imobilidade Perfeita de Capitais',
    description: 'BP vertical - equilíbrio depende apenas da conta corrente',
    category: 'open',
    isOpenEconomy: true,
    isFloatingRate: false,
    capitalMobility: 'zero',
    params: {
      G: 3200,
      T: 3500,
      M: 3500,      // Calibrado
      e: 5.17,
      rstar: 14.75, // Selic Brasil
      c: 0.65,
      b: 80,
      k: 0.5,
      h: 60,
      C0: 1500,
      I0: 2000,
      X0: 1500,
      m: 0.40,      // Calibrado: Y_BP = (3300 + 1000)/0.4 = 10750
      v: 200,
      x1: 0.15,
      Ystar: 12000
    },
    explanation: 'Com imobilidade perfeita de capitais, a curva BP é VERTICAL. O equilíbrio ocorre em Y_BP fixo, onde as exportações líquido de importações é zero (NX=0).'
  },

  imperfectMobility: {
    name: 'Mobilidade Imperfeita de Capitais',
    description: 'BP inclinada - fluxos de capital dependem do diferencial de juros',
    category: 'open',
    isOpenEconomy: true,
    isFloatingRate: true,
    capitalMobility: 'imperfect',
    params: {
      G: 3200,
      T: 3500,
      M: 3800,      // Calibrado
      e: 5.17,
      rstar: 14.75, // Selic Brasil
      c: 0.65,
      b: 80,
      k: 0.5,
      h: 60,
      C0: 1500,
      I0: 2000,
      X0: 1500,
      m: 0.25,      // Calibrado
      v: 200,
      f: 150,       // Inclinação positiva (ajustado)
      x1: 0.15,
      Ystar: 12000,
      K0: 0
    },
    explanation: 'Com mobilidade imperfeita, a curva BP tem inclinação POSITIVA. Aumentos na renda exigem juros maiores para equilibrar o balanço de pagamentos.'
  }
};

/**
 * Get scenarios by category
 */
export function getScenariosByCategory(category) {
  return Object.entries(scenarios)
    .filter(([_, scenario]) => scenario.category === category)
    .map(([key, scenario]) => ({ key, ...scenario }));
}

/**
 * Get all categories
 */
export function getCategories() {
  const categories = new Set();
  Object.values(scenarios).forEach(s => categories.add(s.category));
  return Array.from(categories);
}

/**
 * Get scenario by key
 */
export function getScenario(key) {
  return scenarios[key];
}
