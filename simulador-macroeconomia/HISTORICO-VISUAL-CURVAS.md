# 📊 Histórico Visual de Curvas - Guia Completo

## O Que É?

O sistema de histórico visual permite comparar o estado atual das curvas IS, LM e BP com um estado de referência inicial. Isso facilita a visualização dos deslocamentos das curvas causados por políticas econômicas ou choques.

## Como Funciona?

### Curvas Atuais vs Curvas de Referência

O gráfico agora mostra dois conjuntos de curvas:

1. **Curvas Atuais** (linhas sólidas, cores vibrantes)
   - IS: Vermelho sólido
   - LM: Azul sólido
   - BP: Roxo sólido (tracejado)

2. **Curvas de Referência** (linhas tracejadas, transparentes)
   - IS inicial: Vermelho transparente (30% opacidade)
   - LM inicial: Azul transparente (30% opacidade)
   - BP inicial: Roxo transparente (30% opacidade)

### Quando as Curvas de Referência Aparecem?

As curvas de referência aparecem automaticamente quando você:
- Ajusta qualquer parâmetro (G, T, M, c, b, etc.)
- Aplica um choque econômico
- Modifica sliders

As curvas de referência são **ocultadas automaticamente** quando:
- Não há diferença entre estado atual e inicial
- Você captura um novo estado de referência

## Como Usar

### 1. Capturar Estado Inicial

Existem 3 formas de definir um estado de referência:

#### Opção A: Automático ao Carregar Cenário
```
1. Clique em "📚 Cenários"
2. Selecione um cenário
3. O estado inicial é capturado automaticamente
4. Faça ajustes e veja as curvas se deslocarem
```

#### Opção B: Automático ao Resetar
```
1. Clique em "🔄 Resetar"
2. O estado padrão é capturado como referência
3. Faça ajustes e compare com o estado inicial
```

#### Opção C: Manual com Botão Capturar
```
1. Ajuste os parâmetros até o estado desejado
2. Clique em "📍 Capturar" (ou pressione C)
3. Este estado se torna a nova referência
4. Continue ajustando e veja as diferenças
```

### 2. Visualizar Deslocamentos

Após capturar um estado de referência:

```
1. Ajuste qualquer parâmetro (ex: aumente G)
2. Observe as curvas atuais (sólidas) se moverem
3. As curvas iniciais (tracejadas) permanecem fixas
4. Compare visualmente o deslocamento
```

### 3. Capturar Novo Estado

Para redefinir a referência:

```
1. Clique em "📍 Capturar" novamente
2. O estado atual se torna a nova referência
3. As curvas tracejadas desaparecem
4. Faça novos ajustes para ver novos deslocamentos
```

## Casos de Uso Educacionais

### Caso 1: Expansão Fiscal

**Objetivo**: Demonstrar o efeito crowding-out

```
1. Carregue o cenário "Economia Brasileira 2024"
2. Estado inicial capturado automaticamente
3. Aumente G de 2.200 para 2.800
4. Observe:
   - IS desloca para DIREITA (curva vermelha sólida)
   - IS inicial permanece tracejada (referência)
   - LM não muda (azul sólido = azul tracejado)
   - Equilíbrio: Y aumenta, r aumenta
   - Efeito crowding-out visível
```

### Caso 2: Expansão Monetária

**Objetivo**: Mostrar efeito sobre juros e renda

```
1. Carregue cenário padrão
2. Aumente M de 5.000 para 6.500
3. Observe:
   - LM desloca para DIREITA (curva azul sólida)
   - LM inicial permanece tracejada
   - IS não muda
   - Equilíbrio: Y aumenta, r diminui
```

### Caso 3: Política Mista

**Objetivo**: Combinar políticas fiscal e monetária

```
1. Carregue cenário padrão
2. Aumente G de 2.200 para 2.600
3. Clique "📍 Capturar" (nova referência)
4. Aumente M de 5.000 para 6.000
5. Observe:
   - Primeiro deslocamento: IS para direita
   - Segundo deslocamento: LM para direita
   - Comparação com estado intermediário
```

### Caso 4: Desvalorização Cambial

**Objetivo**: Efeito sobre economia aberta

```
1. Ative "Economia Aberta"
2. Selecione "Câmbio Fixo"
3. Estado inicial capturado
4. Aumente e de 5.0 para 6.5
5. Observe:
   - IS desloca para DIREITA (exportações aumentam)
   - BP pode se deslocar
   - Comparação visual clara
```

### Caso 5: Comparação de Cenários

**Objetivo**: Comparar dois cenários diferentes

```
1. Carregue "Economia Brasileira 2024"
2. Clique "📍 Capturar"
3. Carregue "Expansão Fiscal"
4. Observe diferenças entre os dois cenários
5. Todas as três curvas mostram deslocamento
```

## Atalhos de Teclado

| Tecla | Ação | Descrição |
|-------|------|-----------|
| **C** | Capturar | Define estado atual como referência |
| **R** | Resetar | Volta ao padrão e captura nova referência |
| **S** | Cenários | Abre modal de cenários |
| **H** | Histórico | Abre histórico de simulações |
| **E** | Equações | Mostra equações do modelo |
| **?** | Ajuda | Abre modal de ajuda |

## Detalhes Técnicos

### Estrutura dos Datasets

O gráfico possui 6 datasets:

```javascript
[0] IS atual       - Vermelho sólido (#dc2626)
[1] LM atual       - Azul sólido (#2563eb)
[2] BP atual       - Roxo sólido tracejado (#7c3aed)
[3] IS inicial     - Vermelho 30% (rgba(220, 38, 38, 0.3))
[4] LM inicial     - Azul 30% (rgba(37, 99, 235, 0.3))
[5] BP inicial     - Roxo 30% (rgba(124, 58, 237, 0.3))
```

### Lógica de Comparação

```javascript
// Curvas iniciais aparecem se houver mudança
const hasChanged = !arraysEqual(dataIS, initialData.dataIS) || 
                   !arraysEqual(dataLM, initialData.dataLM) ||
                   !arraysEqual(dataBP, initialData.dataBP);

// Compara primeiros 5 pontos com tolerância
// x: diferença > 0.1
// y: diferença > 0.01
```

### Estado Inicial no StateManager

```javascript
initialState: {
  params: { G, T, M, e, rstar, c, b, k, h, ... },
  equilibrium: { Y, r, e_eq, M_eq },
  isOpenEconomy: boolean,
  isFloatingRate: boolean,
  capitalMobility: 'perfect' | 'zero'
}
```

## Benefícios Pedagógicos

### Para Professores

✅ **Demonstração Clara**: Mostra visualmente o deslocamento das curvas  
✅ **Comparação Direta**: Facilita explicar "antes e depois"  
✅ **Flexibilidade**: Pode capturar qualquer estado como referência  
✅ **Múltiplos Choques**: Permite demonstrar políticas sequenciais  
✅ **Economia Aberta**: Funciona com IS-LM e Mundell-Fleming  

### Para Estudantes

✅ **Visualização Intuitiva**: Curvas tracejadas = posição original  
✅ **Aprendizado Ativo**: Experimentar e ver resultados imediatos  
✅ **Compreensão de Políticas**: Ver efeitos de G, T, M, e, etc.  
✅ **Comparação de Cenários**: Entender diferenças entre situações  
✅ **Feedback Visual**: Cores e estilos diferentes facilitam distinção  

## Exemplos Práticos

### Exemplo 1: Aula sobre Política Fiscal

**Roteiro de Aula**:

```
1. Introdução (5 min)
   - Explicar modelo IS-LM
   - Mostrar equilíbrio inicial

2. Demonstração (10 min)
   - Carregar "Economia Brasileira 2024"
   - Mostrar curvas em equilíbrio
   - Explicar: "Vamos aumentar gastos públicos"

3. Aplicação (5 min)
   - Aumentar G gradualmente
   - Observar IS deslocar para direita
   - Curva inicial tracejada mostra posição original
   - Discutir: Y aumenta, r aumenta, crowding-out

4. Comparação (5 min)
   - Capturar novo estado
   - Agora aumentar M
   - Mostrar que LM também pode se deslocar
   - Política mista: efeitos combinados
```

### Exemplo 2: Exercício para Estudantes

**Tarefa**:

```
"Usando o simulador, demonstre o efeito de uma política
de austeridade fiscal seguida de expansão monetária
compensatória. Capture screenshots mostrando:

1. Estado inicial (equilíbrio)
2. Após redução de G (IS desloca)
3. Após aumento de M (LM desloca)
4. Compare Y e r finais com iniciais"
```

### Exemplo 3: Análise de Crise

**Cenário**:

```
"Simule a resposta à Crise de 2008:

1. Carregue cenário 'Crise 2008'
2. Observe: IS à esquerda, LM horizontal
3. Capture este estado (crise)
4. Aplique expansão fiscal (G aumenta)
5. Aplique expansão monetária (M aumenta)
6. Compare com estado de crise inicial
7. Discuta eficácia das políticas"
```

## Perguntas Frequentes

### P: As curvas de referência sempre aparecem?

**R**: Não. Elas aparecem apenas quando há diferença entre o estado atual e o estado de referência. Se você não fez nenhuma mudança, elas ficam ocultas.

### P: Posso ter múltiplos estados de referência?

**R**: Não simultaneamente. Você pode capturar um novo estado a qualquer momento, mas apenas um estado de referência é mostrado por vez.

### P: O que acontece ao trocar de cenário?

**R**: O novo cenário se torna automaticamente o estado de referência. As curvas iniciais são atualizadas.

### P: As curvas de referência afetam os cálculos?

**R**: Não. Elas são apenas visuais. Todos os cálculos usam o estado atual.

### P: Posso desativar as curvas de referência?

**R**: Sim. Basta clicar em "📍 Capturar" quando estiver no estado atual. As curvas de referência desaparecerão até você fazer uma nova mudança.

### P: As curvas de referência são salvas?

**R**: Não. O estado de referência é resetado ao recarregar a página. Isso garante que você sempre comece com um estado limpo.

## Dicas de Uso

### Dica 1: Demonstrações em Aula

```
- Carregue o cenário desejado
- Projete na tela
- Explique o equilíbrio inicial
- Faça ajustes gradualmente
- Curvas tracejadas mostram origem
- Estudantes veem deslocamento claramente
```

### Dica 2: Comparação de Políticas

```
- Capture estado inicial
- Aplique política A (ex: expansão fiscal)
- Anote resultados
- Clique "Resetar"
- Aplique política B (ex: expansão monetária)
- Compare qual foi mais eficaz
```

### Dica 3: Análise Sequencial

```
- Comece com equilíbrio
- Aplique choque 1
- Capture novo estado
- Aplique choque 2
- Veja efeito incremental
- Repita para múltiplos choques
```

### Dica 4: Exercícios Práticos

```
- Dê aos alunos um objetivo (ex: "Aumentar Y em 10%")
- Peça para experimentar diferentes políticas
- Usar "Capturar" para marcar tentativas
- Comparar eficácia de cada abordagem
```

## Limitações

1. **Um Estado por Vez**: Apenas um estado de referência é mantido
2. **Não Persistente**: Estado de referência não é salvo entre sessões
3. **Comparação Visual**: Não há cálculo automático de diferenças numéricas
4. **Curvas Completas**: Mostra curvas inteiras, não apenas deslocamento

## Melhorias Futuras (Roadmap)

- [ ] Múltiplos estados de referência (até 3)
- [ ] Cálculo automático de deslocamentos (ΔY, Δr)
- [ ] Salvar estados de referência no histórico
- [ ] Animação do deslocamento das curvas
- [ ] Modo "comparação lado a lado"
- [ ] Exportar comparação como imagem
- [ ] Anotações nas curvas de referência

---

**Versão**: 2.2.0  
**Data**: Abril 2026  
**Status**: ✅ Implementado e Testado

**💡 Dica**: Pressione `C` para capturar o estado atual como referência!
