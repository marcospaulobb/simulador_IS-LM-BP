# Simulador IS-LM & Mundell-Fleming | Mackenzie

Simulador interativo de macroeconomia para ensino dos modelos IS-LM (economia fechada) e Mundell-Fleming (economia aberta).

## 🇧🇷 Calibrado com Dados da Economia Brasileira

O simulador utiliza valores reais da economia brasileira (2024) para tornar a experiência mais relevante e interessante:

- **Escala**: 1 unidade = R$ 100 bilhões
- **PIB**: ~10.900 unidades (R$ 10,9 trilhões)
- **Gastos Públicos**: 2.200 (~22% do PIB)
- **Carga Tributária**: 3.500 (~35% do PIB)
- **Oferta Monetária M2**: 5.000 (R$ 5 trilhões)
- **Taxa de Câmbio**: R$ 5,00/USD
- **Todos os cenários** calibrados com valores brasileiros

📖 Veja detalhes completos em [CALIBRACAO-BRASIL.md](./CALIBRACAO-BRASIL.md)

## 📊 Histórico Visual de Curvas (NOVO!)

O simulador agora mantém as curvas iniciais como referência visual, permitindo comparar o deslocamento das curvas IS, LM e BP:

- **Curvas de Referência**: Aparecem tracejadas e transparentes
- **Comparação Visual**: Veja claramente o deslocamento das curvas
- **Botão Capturar**: Defina qualquer estado como nova referência
- **Automático**: Captura estado inicial ao carregar cenários
- **Educacional**: Ideal para demonstrar efeitos de políticas

📖 Veja guia completo em [HISTORICO-VISUAL-CURVAS.md](./HISTORICO-VISUAL-CURVAS.md)

## 🚀 Melhorias Implementadas

### 1. Arquitetura e Organização
- ✅ **StateManager**: Gerenciamento centralizado de estado com validação
- ✅ **UIController**: Separação clara entre lógica e interface
- ✅ **ExplanationEngine**: Sistema inteligente de explicações econômicas
- ✅ **ModalManager**: Gerenciamento de modais e diálogos
- ✅ Validação robusta de parâmetros econômicos
- ✅ Tratamento de erros e casos extremos

### 2. Modelo Econômico
- ✅ **Calibração Brasileira**: Valores baseados em dados reais do Brasil 2024
- ✅ Parâmetros autônomos (C0, I0, X0, m, v) agora configuráveis
- ✅ Validação de limites econômicos realistas
- ✅ Cálculo de multiplicadores fiscais e monetários
- ✅ Tratamento de casos extremos (divisão por zero, valores infinitos)
- ✅ Cálculo de componentes da demanda agregada

### 3. Interface do Usuário
- ✅ **13 Cenários Pré-Configurados**: Casos clássicos de política econômica
  - Economia Brasileira 2024 (default)
  - Expansão/Contração Fiscal e Monetária
  - Austeridade
  - Armadilha da Liquidez
  - Economia Aberta (Câmbio Fixo/Flutuante)
  - Desvalorização Cambial
  - Imobilidade de Capitais
  - Crise 2008
- ✅ **Sistema de Histórico**: Salva últimas 20 simulações
- ✅ **Exportação de Dados**: CSV e JSON
- ✅ **Modal de Ajuda**: Tutorial integrado
- ✅ **Notificações**: Feedback visual de ações
- ✅ **Atalhos de Teclado**:
  - `R` - Resetar
  - `S` - Cenários
  - `H` - Histórico
  - `E` - Equações
  - `?` - Ajuda

### 4. Visualização
- ✅ **Eixos Dinâmicos**: Ajuste automático baseado nos dados
- ✅ **Padding Adaptativo**: Evita equilíbrio muito embaixo no gráfico
- ✅ Animações suaves com GSAP
- ✅ Melhor feedback visual em mudanças
- ✅ Exportação de gráficos em alta qualidade

### 5. Performance
- ✅ **Debouncing**: Otimização de recálculos
- ✅ Validação eficiente de parâmetros
- ✅ Auto-save em localStorage

### 6. Funcionalidades Educacionais
- ✅ Explicações contextuais detalhadas
- ✅ Cenários históricos e teóricos
- ✅ Sistema de categorização de cenários
- ✅ Cálculo e exibição de multiplicadores

## 📁 Estrutura do Projeto

```
simulador-macroeconomia/
├── src/
│   ├── state/
│   │   └── StateManager.js          # Gerenciamento de estado
│   ├── ui/
│   │   ├── UIController.js          # Controle de interface
│   │   ├── ExplanationEngine.js     # Motor de explicações
│   │   └── ModalManager.js          # Gerenciamento de modais
│   ├── scenarios/
│   │   └── scenarios.js             # Cenários pré-configurados
│   ├── utils/
│   │   ├── debounce.js              # Utilitários de performance
│   │   └── storage.js               # Persistência de dados
│   ├── model.js                     # Modelo econômico
│   ├── chart.js                     # Visualização
│   ├── main-new.js                  # Aplicação principal (nova)
│   └── style.css                    # Estilos
├── public/
│   └── mackenzie-logo-1.png
├── index.html
├── package.json
└── README.md
```

## 🎯 Como Usar

### Instalação

```bash
cd simulador-macroeconomia
npm install
```

### Desenvolvimento

```bash
npm run dev
```

### Build para Produção

```bash
npm run build
```

### Preview da Build

```bash
npm run preview
```

## 🎓 Guia Rápido

### Economia Fechada (IS-LM)
1. Mantenha o toggle em "Economia Fechada"
2. Ajuste G (gasto público) e M (oferta monetária)
3. Observe os efeitos nas curvas IS e LM
4. Leia a análise econômica abaixo do gráfico

### Economia Aberta (Mundell-Fleming)
1. Ative "Economia Aberta" no toggle
2. Escolha o regime cambial (Fixo ou Flutuante)
3. Experimente políticas fiscais e monetárias
4. Observe como a curva BP e o câmbio reagem

### Cenários Pré-Configurados
1. Clique em "📚 Cenários" ou pressione `S`
2. Escolha um cenário da lista
3. Explore os efeitos das políticas
4. Compare diferentes regimes

### Histórico
1. Clique em "📊 Histórico" ou pressione `H`
2. Veja suas simulações anteriores
3. Clique em qualquer item para restaurar
4. Exporte para CSV para análise externa

## 🔧 Tecnologias

- **Vite**: Build tool e dev server
- **Chart.js**: Visualização de gráficos
- **GSAP**: Animações
- **Tailwind CSS**: Estilização
- **KaTeX**: Renderização de equações matemáticas
- **html2canvas**: Exportação de imagens

## 📊 Cenários Disponíveis

### Básico
- Equilíbrio Padrão

### Política Fiscal
- Expansão Fiscal
- Austeridade Fiscal

### Política Monetária
- Expansão Monetária
- Contração Monetária

### Economia Aberta
- Câmbio Flutuante
- Câmbio Fixo
- Desvalorização Cambial
- Choque Externo
- **Imobilidade Perfeita de Capitais** (BP vertical) (Alta de Juros)

### Casos Especiais
- Armadilha da Liquidez
- Investimento Insensível

### Parâmetros
- Alta Propensão a Consumir

### Histórico
- Crise 2008 - Resposta Política

## 🎨 Personalização

### Adicionar Novos Cenários

Edite `src/scenarios/scenarios.js`:

```javascript
export const scenarios = {
  meuCenario: {
    name: 'Meu Cenário',
    description: 'Descrição do cenário',
    category: 'custom',
    isOpenEconomy: false,
    isFloatingRate: true,
    params: {
      G: 1200,
      T: 800,
      M: 1400,
      // ... outros parâmetros
    },
    explanation: 'Explicação detalhada do que acontece'
  }
};
```

### Ajustar Validação de Parâmetros

Edite `src/state/StateManager.js` no método `validateParams()`.

## 📝 Notas Técnicas

### Modelo Econômico

**Economia Fechada (IS-LM):**
- IS: Y = C + I + G
- LM: M/P = L(Y, r)

**Economia Aberta (Mundell-Fleming):**
- IS: Y = C + I + G + NX
- LM: M/P = L(Y, r)
- BP: r = r* (mobilidade perfeita de capital)

### Regimes Cambiais

**Câmbio Flutuante:**
- M é exógeno (controlado pelo Banco Central)
- e é endógeno (ajusta-se pelo mercado)
- Política monetária eficaz, fiscal ineficaz

**Câmbio Fixo:**
- e é exógeno (fixado pelo Banco Central)
- M é endógeno (ajusta-se via intervenção)
- Política fiscal eficaz, monetária ineficaz

## 🐛 Troubleshooting

### Gráfico não aparece
- Verifique o console do navegador
- Certifique-se de que o Chart.js foi carregado
- Limpe o cache do navegador

### Equações não renderizam
- Aguarde o carregamento completo do KaTeX
- Verifique a conexão com o CDN

### Estado não salva
- Verifique se localStorage está habilitado
- Limpe dados antigos se necessário

## 📄 Licença

Projeto educacional - Universidade Presbiteriana Mackenzie

## 👥 Contribuindo

Este é um projeto educacional. Sugestões e melhorias são bem-vindas!

## 📧 Contato

Para dúvidas sobre o simulador, entre em contato com o departamento de Economia da Mackenzie.

---

Desenvolvido com ❤️ para o ensino de Macroeconomia
