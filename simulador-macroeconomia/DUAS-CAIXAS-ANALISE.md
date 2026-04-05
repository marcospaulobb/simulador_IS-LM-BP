# Duas Caixas de Análise Econômica

## Implementação

Criadas duas caixas de análise separadas para melhor organização e clareza educacional:

### 1. Análise Econômica - Variáveis de Política 📊
**Cor:** Verde (border-mackenzie-green)
**Conteúdo:** Explicações sobre políticas fiscais, monetárias e cambiais

**Cobre:**
- Política Fiscal (G, T)
- Política Monetária (M)
- Política Cambial (e)
- Choques externos (rstar, Ystar)
- Mecanismos de transmissão
- Valores de equilíbrio
- Componentes da Demanda Agregada

### 2. Parâmetros Estruturais ⚙️
**Cor:** Cinza (border-gray-600, fundo degradê)
**Conteúdo:** Explicações sobre parâmetros que determinam a forma das curvas

**Cobre:**
- Propensão Marginal a Consumir (c)
- Sensibilidade do Investimento aos Juros (b)
- Sensibilidade da Demanda por Moeda à Renda (k)
- Sensibilidade da Demanda por Moeda aos Juros (h)

## Explicações dos Parâmetros Estruturais

### Propensão Marginal a Consumir (c)

**Definição:** Fração da renda adicional que é consumida (0 < c < 1)

**Impacto no Modelo:**
- Inclinação da IS: c alto → IS mais inclinada (vertical)
- Multiplicador keynesiano: k = 1/(1-c)
- Eficácia fiscal: c alto → política fiscal MAIS eficaz
- Eficácia monetária: c alto → política monetária MENOS eficaz

**Exemplo:** Se c = 0.65, cada R$ 1,00 adicional de renda gera R$ 0,65 de consumo e R$ 0,35 de poupança.

**Multiplicador:** k = 1/(1-0.65) = 2.86

### Sensibilidade do Investimento aos Juros (b)

**Definição:** Quanto o investimento cai quando a taxa de juros sobe 1 ponto percentual

**Fórmula:** I = I₀ - b·i

**Impacto no Modelo:**
- Inclinação da IS: b alto → IS menos inclinada (horizontal)
- Eficácia monetária: b alto → política monetária MAIS eficaz
- Crowding out: b alto → maior efeito deslocamento

**Exemplo:** Se b = 80 e i sobe de 10% para 11%, o investimento cai 80 unidades.

### Sensibilidade da Demanda por Moeda à Renda (k)

**Definição:** Quanto a demanda por moeda aumenta quando a renda sobe 1 unidade

**Fórmula:** L = k·Y - h·i

**Impacto no Modelo:**
- Inclinação da LM: k alto → LM mais inclinada (vertical)
- Eficácia fiscal: k alto → política fiscal MENOS eficaz (juros sobem mais)
- Eficácia monetária: k alto → política monetária MAIS eficaz

**Interpretação:** Maior necessidade de liquidez para transações quando a renda aumenta.

### Sensibilidade da Demanda por Moeda aos Juros (h)

**Definição:** Quanto a demanda por moeda cai quando os juros sobem 1 ponto percentual

**Fórmula:** L = k·Y - h·i

**Impacto no Modelo:**
- Inclinação da LM: h alto → LM menos inclinada (horizontal)
- Eficácia fiscal: h alto → política fiscal MAIS eficaz (juros sobem menos)
- Eficácia monetária: h alto → política monetária MENOS eficaz

**Casos Extremos:**
- h → ∞: Armadilha da liquidez (LM horizontal)
- h → 0: Teoria Quantitativa da Moeda (LM vertical)

## Comportamento Dinâmico

### Quando Ajustar Variáveis de Política (G, T, M, e)
→ Caixa verde atualiza com explicação detalhada do mecanismo
→ Caixa cinza mostra resumo dos parâmetros atuais

### Quando Ajustar Parâmetros Estruturais (c, b, k, h)
→ Caixa verde mostra explicação do choque (se aplicável)
→ Caixa cinza atualiza com explicação DETALHADA do parâmetro alterado

### Resumo Padrão (Parâmetros Estruturais)
Quando nenhum parâmetro estrutural foi alterado recentemente:
```
Parâmetros Atuais:
• PMgC (c) = 0.65 → Multiplicador = 2.86
• Sen. Investimento (b) = 80 → IS mais horizontal
• Sen. Moeda-Renda (k) = 0.50 → LM mais horizontal
• Sen. Moeda-Juros (h) = 60 → LM mais vertical

Clique nos sliders dos parâmetros estruturais para ver explicações detalhadas.
```

## Benefícios da Separação

✅ **Clareza Visual**: Duas áreas distintas evitam confusão
✅ **Organização Pedagógica**: Separa políticas de parâmetros estruturais
✅ **Cores Diferenciadas**: Verde para políticas, cinza para estrutura
✅ **Ícones Distintos**: 📊 para políticas, ⚙️ para parâmetros
✅ **Contexto Sempre Visível**: Ambas as caixas sempre mostram informação relevante
✅ **Aprendizado Progressivo**: Estudantes entendem a diferença entre variáveis de política e parâmetros estruturais

## Exemplo de Uso

1. **Usuário aumenta G (Gasto Público)**
   - Caixa Verde: Explicação detalhada da política fiscal expansionista
   - Caixa Cinza: Resumo dos parâmetros atuais

2. **Usuário aumenta c (Propensão a Consumir)**
   - Caixa Verde: Explicação do efeito sobre o equilíbrio
   - Caixa Cinza: Explicação DETALHADA de c, multiplicador, impacto na IS

3. **Usuário carrega cenário**
   - Caixa Verde: Explicação do cenário
   - Caixa Cinza: Parâmetros do cenário

## Arquivos Modificados

- `index.html` - Duas caixas de explicação separadas
- `src/ui/UIController.js` - Métodos `updateExplanation()` e `updateStructuralExplanation()`
- `src/ui/ExplanationEngine.js` - Método `getStructuralParameterExplanation()` e explicações de c, b, k, h
- `src/main-new.js` - Lógica para atualizar ambas as caixas

## Data

2026-04-05
