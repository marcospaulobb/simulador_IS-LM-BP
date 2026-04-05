# Anotações Visuais de Políticas Econômicas

## 🎯 Objetivo

Adicionar anotações visuais no gráfico IS-LM-BP que mostram automaticamente:
- Qual curva se desloca (IS, LM ou BP)
- Direção do deslocamento (→ direita, ← esquerda, ↑ cima, ↓ baixo)
- Efeitos sobre Y e i (↑ aumenta, ↓ diminui)

**Data de Implementação**: 04 de Abril de 2026  
**Versão**: 2.2.0 (Anotações de Políticas)

---

## 📊 Políticas Implementadas

### 1. Política Fiscal

#### Expansão Fiscal (↑ G ou ↓ T)
- **Curva afetada**: IS → direita
- **Cor da seta**: Laranja (#f97316)
- **Efeito**: ↑ Y, ↑ i
- **Cor do texto**: Vermelho (#dc2626)

#### Contração Fiscal (↓ G ou ↑ T)
- **Curva afetada**: IS ← esquerda
- **Cor da seta**: Laranja (#f97316)
- **Efeito**: ↓ Y, ↓ i
- **Cor do texto**: Vermelho (#dc2626)

### 2. Política Monetária

#### Expansão Monetária (↑ M)
- **Curva afetada**: LM → direita
- **Cor da seta**: Verde (#22c55e)
- **Efeito**: ↑ Y, ↓ i
- **Cor do texto**: Verde (#22c55e)

#### Contração Monetária (↓ M)
- **Curva afetada**: LM ← esquerda
- **Cor da seta**: Verde (#22c55e)
- **Efeito**: ↓ Y, ↑ i
- **Cor do texto**: Verde (#22c55e)

### 3. Política Cambial

#### Desvalorização (↑ e)
- **Curva afetada**: IS → direita
- **Cor da seta**: Laranja (#f97316)
- **Efeito**: ↑ NX → ↑ Y
- **Cor do texto**: Roxo (#8b5cf6)
- **Mecanismo**: Exportações mais competitivas, importações mais caras

#### Valorização (↓ e)
- **Curva afetada**: IS ← esquerda
- **Cor da seta**: Laranja (#f97316)
- **Efeito**: ↓ NX → ↓ Y
- **Cor do texto**: Roxo (#8b5cf6)
- **Mecanismo**: Exportações menos competitivas, importações mais baratas

### 4. Choques Externos

#### Aumento da Renda Externa (↑ Y*)
- **Curva afetada**: IS → direita
- **Cor da seta**: Laranja (#f97316)
- **Efeito**: ↑ X → ↑ Y
- **Cor do texto**: Laranja (#f97316)
- **Mecanismo**: Maior demanda por exportações

#### Redução da Renda Externa (↓ Y*)
- **Curva afetada**: IS ← esquerda
- **Cor da seta**: Laranja (#f97316)
- **Efeito**: ↓ X → ↓ Y
- **Cor do texto**: Laranja (#f97316)
- **Mecanismo**: Menor demanda por exportações

#### Aumento dos Juros Externos (↑ i*)
- **Curva afetada**: BP ↑ (desloca para cima)
- **Cor da seta**: Roxo (#8b5cf6)
- **Efeito**: ↑ i* → saída K
- **Cor do texto**: Roxo (#8b5cf6)
- **Mecanismo**: Capital sai em busca de maior retorno externo

#### Redução dos Juros Externos (↓ i*)
- **Curva afetada**: BP ↓ (desloca para baixo)
- **Cor da seta**: Roxo (#8b5cf6)
- **Efeito**: ↓ i* → entrada K
- **Cor do texto**: Roxo (#8b5cf6)
- **Mecanismo**: Capital entra em busca de maior retorno doméstico

### 5. Parâmetros Estruturais

Para mudanças em parâmetros como c, k, m, x1, x2, m2:
- **Texto genérico**: "Parâmetro alterado"
- **Cor**: Cinza (#6b7280)
- **Sem seta**: Efeitos variam conforme o parâmetro

---

## 🎨 Elementos Visuais

### Setas de Deslocamento

```javascript
// Características das setas
- Comprimento: 35px
- Espessura: 2.5px
- Ponta da seta: 10px
- Cores: Correspondem à curva afetada
```

#### Direções Possíveis:
- **→ Direita**: Expansão (IS, LM)
- **← Esquerda**: Contração (IS, LM)
- **↑ Cima**: Aumento de i* (BP)
- **↓ Baixo**: Redução de i* (BP)

### Texto de Resultado

```javascript
// Características do texto
- Fonte: Inter Bold 11px
- Fundo: Branco semi-transparente (90%)
- Padding: 2px horizontal
- Altura: 16px
```

#### Exemplos de Texto:
- "↑ Y, ↑ i" - Expansão fiscal
- "↑ Y, ↓ i" - Expansão monetária
- "↑ NX → ↑ Y" - Desvalorização cambial
- "↑ X → ↑ Y" - Aumento de Y*
- "↑ i* → saída K" - Aumento de i*

---

## 🔧 Implementação Técnica

### Arquivos Modificados

#### 1. src/chart.js

**Função `drawPolicyAnnotations()`**
```javascript
// Detecta tipo de política e desenha anotações apropriadas
// Suporta: G, T, M, e, Ystar, rstar, e parâmetros estruturais
```

**Função `drawCurveShift()`**
```javascript
// Desenha seta de deslocamento em 4 direções
// Parâmetros: ctx, x, y, direction, color, label
// Direções: 'right', 'left', 'up', 'down'
```

**Função `drawResultText()`**
```javascript
// Desenha texto de resultado com fundo
// Parâmetros: ctx, x, y, text, color
// Fundo branco semi-transparente para legibilidade
```

**Plugin `equilibriumPoint`**
```javascript
// Verifica se eq.policy existe
// Chama drawPolicyAnnotations() se houver política
```

#### 2. src/main-new.js

**Função `updateApp()`**
```javascript
// Recebe source e direction como parâmetros
// Cria eqData com policy: { type, direction }
// Passa para updateChart()
```

**Exemplo de chamada:**
```javascript
updateApp('G', 'up')      // Aumento de gastos
updateApp('M', 'down')    // Contração monetária
updateApp('e', 'up')      // Desvalorização
```

---

## 📐 Posicionamento das Anotações

### Setas
- **IS/LM horizontal**: 50px à esquerda/direita do equilíbrio
- **LM vertical**: 35px abaixo do equilíbrio (para não sobrepor IS)
- **BP vertical**: 40px acima/abaixo do equilíbrio

### Texto de Resultado
- **Posição padrão**: 15px à direita, 40px abaixo do equilíbrio
- **Fundo branco**: Garante legibilidade sobre o grid
- **Ajuste automático**: Evita sair dos limites do gráfico

---

## 🎓 Benefícios Pedagógicos

### 1. Visualização Imediata
- Estudante vê qual curva se desloca
- Direção do deslocamento é clara
- Não precisa deduzir mentalmente

### 2. Causa e Efeito
- Política aplicada → Curva que desloca → Efeito sobre Y e i
- Fluxo causal explícito
- Facilita compreensão do mecanismo

### 3. Cores Contextuais
- Laranja: Mercado de bens (IS)
- Verde: Mercado monetário (LM)
- Roxo: Setor externo (BP)
- Vermelho: Resultados fiscais
- Cores reforçam associações mentais

### 4. Comparação com Teoria
- Anotações correspondem aos diagramas dos livros-texto
- Estudante pode comparar com material didático
- Reforça aprendizado teórico

---

## 🧪 Exemplos de Uso

### Exemplo 1: Política Fiscal Expansionista

**Ação do usuário:**
- Clica em "↑" no controle de G
- Ou move slider de G para direita

**Resultado visual:**
1. Curva IS se desloca para direita (tracejada mostra posição inicial)
2. Seta laranja aparece: "IS" com → apontando para direita
3. Texto vermelho: "↑ Y, ↑ i"
4. Novo equilíbrio destacado em vermelho

### Exemplo 2: Política Monetária Expansionista

**Ação do usuário:**
- Clica em "↑" no controle de M
- Ou move slider de M para direita

**Resultado visual:**
1. Curva LM se desloca para direita (tracejada mostra posição inicial)
2. Seta verde aparece: "LM" com → apontando para direita
3. Texto verde: "↑ Y, ↓ i"
4. Novo equilíbrio destacado em vermelho

### Exemplo 3: Desvalorização Cambial

**Ação do usuário:**
- Clica em "↑" no controle de e (câmbio)
- Ou move slider de e para direita

**Resultado visual:**
1. Curva IS se desloca para direita (↑ NX)
2. Seta laranja aparece: "IS" com → apontando para direita
3. Texto roxo: "↑ NX → ↑ Y"
4. Novo equilíbrio destacado em vermelho

### Exemplo 4: Choque Externo (↑ Y*)

**Ação do usuário:**
- Clica em "↑" no controle de Y* (renda externa)
- Ou move slider de Y* para direita

**Resultado visual:**
1. Curva IS se desloca para direita (↑ exportações)
2. Seta laranja aparece: "IS" com → apontando para direita
3. Texto laranja: "↑ X → ↑ Y"
4. Novo equilíbrio destacado em vermelho

---

## 🔄 Fluxo de Dados

```
1. Usuário interage com controle
   ↓
2. Event listener captura ação
   ↓
3. updateApp(source, direction) é chamado
   ↓
4. Equilíbrio é recalculado
   ↓
5. eqData = { Y, r, policy: { type, direction } }
   ↓
6. updateChart() recebe eqData
   ↓
7. Plugin equilibriumPoint detecta eq.policy
   ↓
8. drawPolicyAnnotations() é chamado
   ↓
9. Setas e texto são desenhados no canvas
```

---

## 📊 Tabela de Políticas e Efeitos

| Política | Variável | Direção | Curva | Deslocamento | Efeito Y | Efeito i | Cor Texto |
|----------|----------|---------|-------|--------------|----------|----------|-----------|
| Fiscal Exp | G | ↑ | IS | → | ↑ | ↑ | Vermelho |
| Fiscal Contr | G | ↓ | IS | ← | ↓ | ↓ | Vermelho |
| Fiscal Exp | T | ↓ | IS | → | ↑ | ↑ | Vermelho |
| Fiscal Contr | T | ↑ | IS | ← | ↓ | ↓ | Vermelho |
| Monet Exp | M | ↑ | LM | → | ↑ | ↓ | Verde |
| Monet Contr | M | ↓ | LM | ← | ↓ | ↑ | Verde |
| Desvalor | e | ↑ | IS | → | ↑ | - | Roxo |
| Valor | e | ↓ | IS | ← | ↓ | - | Roxo |
| Choque Ext + | Y* | ↑ | IS | → | ↑ | - | Laranja |
| Choque Ext - | Y* | ↓ | IS | ← | ↓ | - | Laranja |
| Juros Ext + | i* | ↑ | BP | ↑ | - | - | Roxo |
| Juros Ext - | i* | ↓ | BP | ↓ | - | - | Roxo |

---

## ✅ Checklist de Implementação

- [x] Função drawPolicyAnnotations() completa
- [x] Função drawCurveShift() implementada
- [x] Função drawResultText() implementada
- [x] Integração com plugin equilibriumPoint
- [x] Modificação de updateApp() para passar policy
- [x] Criação de eqData com informações de política
- [x] Suporte para políticas fiscais (G, T)
- [x] Suporte para política monetária (M)
- [x] Suporte para política cambial (e)
- [x] Suporte para choques externos (Y*, i*)
- [x] Suporte para parâmetros estruturais
- [x] Testes com diferentes políticas
- [x] Build compilado com sucesso
- [x] Documentação criada

---

## 🎯 Próximos Passos (Opcional)

### Melhorias Futuras

1. **Animações**
   - Animar o deslocamento das curvas
   - Fade in/out das anotações
   - Transição suave do equilíbrio

2. **Múltiplas Políticas**
   - Suportar anotações simultâneas
   - Exemplo: ↑ G + ↑ M ao mesmo tempo
   - Mostrar efeito combinado

3. **Histórico de Políticas**
   - Mostrar sequência de políticas aplicadas
   - Timeline de mudanças
   - Comparação de efeitos acumulados

4. **Explicações Detalhadas**
   - Tooltip com explicação completa
   - Link para teoria correspondente
   - Exemplos práticos

5. **Exportação**
   - Exportar gráfico com anotações
   - Formato PNG/SVG
   - Incluir legenda das políticas

---

## 🎉 Resultado Final

As anotações visuais transformam o simulador em uma ferramenta pedagógica ainda mais poderosa. Agora, cada política aplicada é imediatamente visualizada com:

- ✅ Seta mostrando qual curva se desloca
- ✅ Direção clara do deslocamento
- ✅ Efeitos explícitos sobre Y e i
- ✅ Cores contextuais para reforçar conceitos
- ✅ Integração perfeita com curvas de referência

### Feedback Esperado:
- ✅ Mais intuitivo para estudantes
- ✅ Facilita compreensão de mecanismos
- ✅ Reforça aprendizado teórico
- ✅ Reduz carga cognitiva
- ✅ Aumenta engajamento

---

**Data de Implementação**: 04 de Abril de 2026  
**Versão**: 2.2.0 (Anotações de Políticas)  
**Status**: ✅ Implementado e Testado

**Arquivos Modificados**:
- src/chart.js (funções de anotação)
- src/main-new.js (integração de políticas)

**Build**: Compilado com sucesso (539.45 kB)
