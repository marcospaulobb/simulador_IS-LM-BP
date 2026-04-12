# Simulador IS-LM-BP — Inventário de Implementação

> **Versão:** 2.0 | **Data:** 2026-04-10 | **Projeto:** Estágio Docência — Mackenzie

---

## 📐 Arquitetura do Projeto

```
simulador-macroeconomia/
├── index.html                  ← UI principal + controles do cabeçalho
├── src/
│   ├── main-new.js             ← Controlador principal (event listeners)
│   ├── model.js                ← Equações IS-LM-BP (matemática)
│   ├── chart.js                ← Renderização Chart.js
│   ├── model-expanded.js       ← Modelo expandido (Mundell-Fleming completo)
│   ├── state/
│   │   └── StateManager.js     ← Gerenciamento centralizado de estado
│   └── ui/
│       ├── UIController.js     ← Controles da interface
│       └── ExplanationEngine.js← Motor de explicações textuais
```

---

## ✅ O Que Foi Implementado (Esta Sessão)

### 1. Reestruturação do Cabeçalho — 2 Modelos + Submenu BP

| Controle | Valores | Comportamento |
|---|---|---|
| **MODELO** | IS-LM Fechado · IS-LM-BP | Sempre visível; azul quando ativo |
| **MOBILIDADE** | Perfeita · Imperfeita · Sem Mobilidade | Aparece apenas com IS-LM-BP; verde quando ativo |
| **CÂMBIO** | Fixo · Flutuante | Aparece apenas com IS-LM-BP; roxo quando ativo |

- Elementos `mob-group` e `exchange-group` recebem `opacity: 0.35` + `pointer-events: none` quando IS-LM Fechado está ativo
- CSS classes: `.active-blue`, `.active-green`, `.active-purple`

### 2. Lógica de Estado (`main-new.js`)

- `applyModelType(value)` — mapeia seleção para flags `isOpen`, `showBP`, `setExchangeRegime()`
- `setGroupActive(id, bool)` — controla visibilidade dos submenus
- `highlightRadios(name, cls)` — marca o radio ativo com a cor correspondente
- Listener separado para `exchangeRegime` e `capitalMobility`
- `stateManager.state.showBP = true` inicializado antes do primeiro `updateApp()`

### 3. Correção de Crashes Silenciosos (`UIController.js`)

**Causa raiz:** referências a elementos DOM inexistentes (`this.toggleModel`, `this.labelModel`, `this.toggleExchange`) causavam erros que bloqueavam toda a inicialização.

**Solução:**
- Reescrita completa de `UIController.js` removendo todas as referências mortas
- Guard `if (!slider) return` no loop de sliders
- `updateFromState()` agora é crash-safe

### 4. Remoção do Listener Duplicado de Mobilidade

- Existia um segundo listener para `capitalMobility` que tentava acionar `btn-apply-advanced` (inexistente), conflitando com o listener correto
- Removido na seção `setupEventListeners()`

### 5. Eixos Estáticos do Gráfico (`chart.js`)

```
Eixo X — Renda (Y):   fixo de 0 a 14.000
Eixo Y — Juros (i):   fixo de 0% a 40%
```

- Substituída toda a lógica dinâmica de `adjustAxes()` por valores constantes
- Inicialização do `initChart()` alinhada com os mesmos valores
- **Objetivo pedagógico:** deslocamentos das curvas IS₁→IS₂ e LM₁→LM₂ ficam visualmente evidentes num eixo de referência imóvel

### 6. Curvas Calibradas para o Range Visível (`model.js`)

| Curva | Antes | Agora |
|---|---|---|
| **IS** | Gerava Y de 0 a 25.000, r de -20 a 60 | Clipa dentro de `[0,14000] × [0,40]` |
| **LM** | Gerava Y de 0 a 25.000, r de -20 a 60 | Clipa dentro de `[0,14000] × [0,40]` |
| **BP horizontal** | 50 pontos redundantes | 2 pontos: extremo esquerdo e direito |
| **BP vertical** | Pontos fora do range | Dois pontos: `(Y_BP, 0)` e `(Y_BP, 40)` |
| **BP imperfeita** | Pontos além do range | Filtrado para r ∈ [0, 40] |

### 7. Motor de Explicações — 6 Combinações IS-LM-BP (`ExplanationEngine.js`)

`getDefaultExplanation()` agora recebe `capitalMobility` e gera texto específico para:

| Mobilidade | Câmbio | Texto |
|---|---|---|
| Perfeita | Flutuante | Fiscal INEFICAZ · Monetária SUPER EFICAZ |
| Perfeita | Fixo | Fiscal EFICAZ · Monetária INEFICAZ |
| Imperfeita | Flutuante | Fiscal MODERADA · Monetária MAIS EFICAZ |
| Imperfeita | Fixo | Políticas mistas EFICAZES · Monetária parcial |
| Sem Mobilidade | Flutuante | Fiscal INEFICAZ · Monetária EFICAZ |
| Sem Mobilidade | Fixo | Fiscal EFICAZ · Monetária LIMITADA |
| IS-LM Fechado | — | Ambas as políticas EFICAZES com crowding-out |

---

## 🎨 Referência Visual (Imagens do Usuário)

As imagens fornecidas confirmam o padrão de cores:
- **IS** → 🟠 laranja (`#f97316`)
- **LM** → 🟢 verde (`#22c55e`)
- **BP** → 🟣 violeta (`#8b5cf6`)

---

## 🔢 Parâmetros Padrão (StateManager.js)

| Parâmetro | Valor | Descrição |
|---|---|---|
| c | 0.65 | Propensão marginal a consumir |
| b | 80 | Sensibilidade do investimento a i |
| k | 0.50 | Sensibilidade da demanda por moeda à renda |
| h | 60 | Sensibilidade da demanda por moeda a i |
| rstar | 15.00% | Taxa de juros externa (Selic Brasil) |
| E | 1.75 | Taxa de câmbio (Equilíbrio centralizado) |
| M | 1.750 | Oferta nominal de moeda |
| G | 1.500 | Gastos do governo |
| T | 3.000 | Tributação |
| X0 | 1.500 | Exportações autônomas |
| M0 | 1.300 | Importações autônomas |
| m1 | 0.30 | Propensão marginal a importar |
| f | 100/1000/0| Mobilidade de capitais (ajustável) |

---

## 🚧 Próximas Melhorias Sugeridas

- [ ] Animação de deslocamento de curva (IS₁ → IS₂ com seta visível no gráfico)
- [ ] Exportação em PDF com o relatório da simulação formatado em LaTeX.
- [ ] Implementação de Gráfico de Balanço de Pagamentos (Curva de Reservas) como visualização auxiliar.

---

## 📁 Arquivos Modificados Nesta Sessão

| Arquivo | Tipo de Mudança |
|---|---|
| `index.html` | Inserção da 3ª caixa explicativa e inputs de parâmetros autônomos. |
| `src/main-new.js` | Refatoração para leitura segura de inputs e integração das novas explicações. |
| `src/ui/ExplanationEngine.js`| Implementação da teoria detalhada de regimes e drivers de economia aberta. |
| `src/ui/UIController.js` | Controle de visibilidade e animação da caixa `open-economy-text`. |
| `src/model-expanded.js` | Estabilização dos solvers analíticos para evitar divisões por zero em f=0. |
