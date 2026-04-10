/**
 * Pre-configured economic scenarios for educational purposes
 */

export const scenarios = {
  default: {
    name: 'Economia Brasileira - Base',
    description: 'Configuração equilibrada e centralizada para o simulador',
    category: 'basic',
    isOpenEconomy: false,
    isFloatingRate: true,
    params: {
      G: 1500, T: 3000, M: 1750, c: 0.70, b: 60, k: 0.5, h: 50,
      C0: 1000, I0: 1500, X0: 1000, m: 0.30, v: 100, e: 3.2, rstar: 15.0
    }
  },

  fiscalExpansion: {
    name: 'Expansão Fiscal',
    description: 'Aumento do gasto público para estimular a economia',
    category: 'fiscal',
    isOpenEconomy: false,
    isFloatingRate: true,
    params: {
      G: 2200,      // Expansão de G
      T: 3000,
      M: 1750,
      c: 0.70, b: 60, k: 0.5, h: 50,
      C0: 1000, I0: 1500, X0: 1000, m: 0.30, v: 100
    },
    explanation: 'O governo aumenta gastos (G). A curva IS se desloca para a direita, aumentando a renda (Y) e a taxa de juros (r).'
  },

  monetaryExpansion: {
    name: 'Expansão Monetária',
    description: 'Aumento da oferta de moeda para reduzir juros',
    category: 'monetary',
    isOpenEconomy: false,
    isFloatingRate: true,
    params: {
      G: 1500,
      T: 3000,
      M: 2200,      // Expansão de M
      c: 0.70, b: 60, k: 0.5, h: 50,
      C0: 1000, I0: 1500, X0: 1000, m: 0.30, v: 100
    },
    explanation: 'O Banco Central aumenta a oferta monetária (M). A curva LM se desloca para a direita, reduzindo os juros e estimulando o investimento.'
  },

  austerity: {
    name: 'Austeridade Fiscal',
    description: 'Redução de gastos e aumento de impostos',
    category: 'fiscal',
    isOpenEconomy: false,
    isFloatingRate: true,
    params: {
      G: 1000,      // Corte de gastos
      T: 3500,      // Aumento de impostos
      M: 1750,
      c: 0.70, b: 60, k: 0.5, h: 50,
      C0: 1000, I0: 1500, X0: 1000, m: 0.30, v: 100
    },
    explanation: 'Política de austeridade: gastos caem e impostos sobem. A renda diminui significativamente para equilibrar as contas.'
  },

  liquidityTrap: {
    name: 'Armadilha da Liquidez',
    description: 'LM muito elástica - política monetária ineficaz',
    category: 'special',
    isOpenEconomy: false,
    isFloatingRate: true,
    params: {
      G: 1500,
      T: 3000,
      M: 1750,
      c: 0.70, b: 60, k: 0.5, 
      h: 200,       // h muito alto = LM horizontal
      C0: 1000, I0: 1500, X0: 1000, m: 0.30, v: 100
    },
    explanation: 'Alta sensibilidade da demanda por moeda aos juros (h alto). LM quase horizontal - a política monetária perde eficácia pois não consegue mais baixar os juros.'
  },

  investmentInsensitive: {
    name: 'Investimento Insensível',
    description: 'IS muito inclinada - investimento pouco sensível a juros',
    category: 'special',
    isOpenEconomy: false,
    isFloatingRate: true,
    params: {
      G: 1500,
      T: 3000,
      M: 1750,
      c: 0.70, 
      b: 15,        // b muito baixo = IS vertical
      k: 0.5, h: 50,
      C0: 1000, I0: 1500, X0: 1000, m: 0.30, v: 100
    },
    explanation: 'Investimento pouco sensível aos juros (b baixo). IS muito inclinada - a política fiscal torna-se muito eficaz em comparação à monetária.'
  },

  openFloating: {
    name: 'Ec. Aberta - Câmbio Flutuante',
    description: 'Política monetária eficaz, fiscal ineficaz',
    category: 'open',
    isOpenEconomy: true,
    isFloatingRate: true,
    params: {
      G: 1500, T: 3000, M: 1750, e: 3.2, rstar: 15.0,
      c: 0.70, b: 60, k: 0.5, h: 50,
      C0: 1000, I0: 1500, X0: 1000, m: 0.30, v: 100
    },
    explanation: 'Com câmbio flutuante e mobilidade perfeita de capital, a política monetária é soberana.'
  },

  externalShock: {
    name: 'Choque Externo (Juros)',
    description: 'Aumento da taxa de juros internacional',
    category: 'open',
    isOpenEconomy: true,
    isFloatingRate: true,
    params: {
      G: 1500, T: 3000, M: 1750, e: 3.2, 
      rstar: 20.0,   // Fed sobe juros
      c: 0.70, b: 60, k: 0.5, h: 50,
      C0: 1000, I0: 1500, X0: 1000, m: 0.30, v: 100
    },
    explanation: 'Juros internacionais sobem. Com mobilidade de capital, há fuga de divisas e pressão para aumento dos juros domésticos.'
  },

  capitalImmobility: {
    name: 'Imobilidade de Capitais',
    description: 'BP vertical - equilíbrio via balança comercial',
    category: 'open',
    isOpenEconomy: true,
    isFloatingRate: false,
    capitalMobility: 'zero',
    params: {
      G: 1500, T: 3000, M: 1400, e: 3.2, rstar: 15.0,
      c: 0.70, b: 60, k: 0.5, h: 50,
      C0: 1000, I0: 1500, X0: 1000, m: 0.30, v: 100, x1: 0.10, Ystar: 2000
    },
    explanation: 'Com imobilidade perfeita de capitais, a curva BP é VERTICAL. O equilíbrio de longo prazo depende do ajuste das contas externas (NX=0).'
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
