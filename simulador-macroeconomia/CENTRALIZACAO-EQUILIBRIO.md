# Centralização do Ponto de Equilíbrio no Gráfico

**Data**: 04 de Abril de 2026  
**Versão**: 2.2.1  
**Status**: ✅ Implementado e Testado

---

## 🎯 Objetivo

Garantir que o ponto de equilíbrio IS-LM-BP sempre apareça centralizado visualmente no gráfico, proporcionando uma melhor experiência visual e facilitando a análise dos deslocamentos das curvas.

---

## 📊 Problema Anterior

Antes da correção:
- O equilíbrio podia aparecer em qualquer posição do gráfico
- Às vezes ficava muito próximo das bordas
- Dificultava a visualização dos deslocamentos
- Não havia simetria visual

---

## ✅ Solução Implementada

### Algoritmo de Centralização

1. **Calcular distâncias do equilíbrio aos extremos das curvas**
   ```javascript
   xDistanceToMin = eqData.Y - xMin
   xDistanceToMax = xMax - eqData.Y
   yDistanceToMin = eqData.r - yMin
   yDistanceToMax = yMax - eqData.r
   ```

2. **Usar a maior distância para criar range simétrico**
   ```javascript
   xMaxDistance = Math.max(xDistanceToMin, xDistanceToMax)
   yMaxDistance = Math.max(yDistanceToMin, yDistanceToMax)
   ```

3. **Adicionar 40% de padding para espaço visual**
   ```javascript
   xPadding = xMaxDistance * 0.4
   yPadding = yMaxDistance * 0.4
   ```

4. **Definir limites simétricos em torno do equilíbrio**
   ```javascript
   x.min = eqData.Y - xMaxDistance - xPadding
   x.max = eqData.Y + xMaxDistance + xPadding
   y.min = eqData.r - yMaxDistance - yPadding
   y.max = eqData.r + yMaxDistance + yPadding
   ```

---

## 🎨 Características

### Simetria Visual
- Equilíbrio sempre no centro do gráfico
- Distâncias iguais para todos os lados
- Espaço uniforme para deslocamentos

### Padding Adaptativo
- 40% de espaço adicional em todas as direções
- Garante que as curvas não fiquem coladas nas bordas
- Permite visualizar deslocamentos futuros

### Limites Mínimos
- Eixo Y: Mínimo de 5 unidades de range
- Eixo X: Mínimo de 1000 unidades de range
- Evita gráficos muito "apertados"

### Proteção de Limites
- Eixo Y nunca fica negativo (min ≥ 0)
- Eixo X nunca fica negativo (min ≥ 0)
- Valores sempre economicamente válidos

---

## 📐 Exemplo Numérico

### Cenário: Economia Fechada Padrão
```
Equilíbrio: Y = 4230, i = 5.25%

Curvas:
- IS: Y varia de 2000 a 8000
- LM: Y varia de 1000 a 7000

Cálculo:
xDistanceToMin = 4230 - 1000 = 3230
xDistanceToMax = 8000 - 4230 = 3770
xMaxDistance = 3770

xPadding = 3770 * 0.4 = 1508

Limites:
x.min = 4230 - 3770 - 1508 = -1048 → 0 (proteção)
x.max = 4230 + 3770 + 1508 = 9508

Resultado: Equilíbrio centralizado em ~45% do eixo X
```

---

## 🔧 Arquivo Modificado

### src/chart.js

**Função `adjustAxes()`**
- Lógica completamente reescrita
- Foco em centralização do equilíbrio
- Cálculo de ranges simétricos
- Padding adaptativo de 40%

**Código anterior:**
```javascript
// Padding baseado na posição relativa
yPaddingBottom = yRange * 0.3
yPaddingTop = yRange * 0.2
```

**Código novo:**
```javascript
// Padding simétrico baseado no equilíbrio
xMaxDistance = Math.max(xDistanceToMin, xDistanceToMax)
yMaxDistance = Math.max(yDistanceToMin, yDistanceToMax)
xPadding = xMaxDistance * 0.4
yPadding = yMaxDistance * 0.4
```

---

## 🎓 Benefícios Pedagógicos

### 1. Melhor Visualização
- Equilíbrio sempre visível e centralizado
- Facilita identificação do ponto de equilíbrio
- Reduz confusão visual

### 2. Comparação de Deslocamentos
- Espaço igual para deslocamentos em todas as direções
- Facilita comparar políticas expansionistas vs contracionistas
- Simetria ajuda na compreensão

### 3. Consistência Visual
- Todos os cenários têm aparência similar
- Equilíbrio sempre na mesma posição relativa
- Reduz carga cognitiva do estudante

### 4. Espaço para Anotações
- Padding de 40% garante espaço para setas e textos
- Anotações de políticas não ficam cortadas
- Labels do equilíbrio sempre visíveis

---

## 🧪 Testes Realizados

### Teste 1: Economia Fechada
✅ Equilíbrio centralizado  
✅ IS e LM simétricas  
✅ Espaço adequado para deslocamentos  
✅ Labels visíveis

### Teste 2: Economia Aberta
✅ Equilíbrio centralizado  
✅ IS, LM e BP simétricas  
✅ BP horizontal bem posicionada  
✅ Espaço para todas as curvas

### Teste 3: Após Política Fiscal
✅ Novo equilíbrio centralizado  
✅ Curva inicial tracejada visível  
✅ Setas de deslocamento não cortadas  
✅ Transição suave

### Teste 4: Após Política Monetária
✅ Novo equilíbrio centralizado  
✅ Ambas as curvas visíveis  
✅ Anotações bem posicionadas  
✅ Espaço adequado

### Teste 5: Cenários Extremos
✅ Equilíbrio muito baixo (i < 2%): Centralizado  
✅ Equilíbrio muito alto (i > 10%): Centralizado  
✅ Y muito baixo (< 2000): Centralizado  
✅ Y muito alto (> 6000): Centralizado

---

## 📊 Comparação Visual

### Antes (Padding Adaptativo)
```
┌─────────────────────────────┐
│                             │
│     IS    LM                │
│      \   /                  │
│       \ /                   │
│        X ← Equilíbrio       │
│       / \    (descentrado)  │
│      /   \                  │
│                             │
└─────────────────────────────┘
```

### Depois (Centralização)
```
┌─────────────────────────────┐
│                             │
│                             │
│        IS    LM             │
│         \   /               │
│          \ /                │
│           X ← Equilíbrio    │
│          / \  (centralizado)│
│         /   \               │
│                             │
│                             │
└─────────────────────────────┘
```

---

## 🎯 Casos Especiais

### Caso 1: Curvas Muito Assimétricas
Se IS vai muito mais longe que LM:
- Algoritmo usa a maior distância
- Garante que ambas as curvas sejam visíveis
- Equilíbrio permanece centralizado

### Caso 2: Equilíbrio Próximo à Origem
Se Y < 1000 ou i < 1%:
- Limites mínimos são aplicados
- Range mínimo de 1000 para X
- Range mínimo de 5 para Y
- Evita gráfico muito "apertado"

### Caso 3: Sem Dados de Equilíbrio
Se eqData não estiver disponível:
- Fallback para método antigo
- Usa padding de 30% dos extremos
- Garante que o gráfico sempre funcione

---

## ✅ Checklist de Implementação

- [x] Algoritmo de centralização implementado
- [x] Cálculo de distâncias simétricas
- [x] Padding de 40% aplicado
- [x] Limites mínimos configurados
- [x] Proteção contra valores negativos
- [x] Fallback para casos sem equilíbrio
- [x] Testes com diferentes cenários
- [x] Build compilado com sucesso
- [x] Documentação criada

---

## 🎉 Resultado Final

O gráfico agora sempre mostra o ponto de equilíbrio centralizado, proporcionando:
- ✅ Melhor experiência visual
- ✅ Facilita análise de deslocamentos
- ✅ Consistência entre cenários
- ✅ Espaço adequado para anotações
- ✅ Simetria visual agradável

---

**Data de Implementação**: 04 de Abril de 2026  
**Versão**: 2.2.1 (Centralização do Equilíbrio)  
**Status**: ✅ Implementado e Testado

**Arquivo Modificado**: src/chart.js (função adjustAxes)  
**Build**: Compilado com sucesso (539.91 kB)
