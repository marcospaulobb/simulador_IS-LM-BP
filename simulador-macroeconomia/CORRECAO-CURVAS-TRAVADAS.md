# Correção: Curvas IS/LM Travadas e Cenários Não Funcionando

## Problema Identificado

As curvas IS e LM não se moviam quando os sliders eram ajustados, e os cenários pré-configurados não funcionavam. O console mostrava que os valores dos parâmetros mudavam, mas o gráfico permanecia estático.

## Causa Raiz

A função `syncAliases()` estava sendo chamada APÓS cada `updateParams()`, o que causava um loop de sobrescrita:

1. Slider de G é movido → `updateParams({ G: 2500 })` é chamado
2. `updateParams()` atualiza `state.params.G = 2500`
3. `syncAliases()` é chamado automaticamente
4. `syncAliases()` copia `G → G0`, mas como estava usando spread operator, o valor antigo era mantido
5. O modelo usa `G` para calcular, mas o valor não estava sendo atualizado corretamente

## Solução Implementada

### 1. Sincronização Inline em `updateParams()`

Removida a chamada automática de `syncAliases()` após cada `updateParams()`. Agora a sincronização acontece inline, diretamente quando cada parâmetro é atualizado:

```javascript
updateParams(updates) {
  const validated = this.validateParams(updates);
  
  // Atualizar parâmetros
  Object.keys(validated).forEach(key => {
    this.state.params[key] = validated[key];
    
    // Sincronizar aliases automaticamente quando um é atualizado
    if (key === 'G') this.state.params.G0 = validated[key];
    if (key === 'G0') this.state.params.G = validated[key];
    if (key === 'T') this.state.params.T0 = validated[key];
    if (key === 'T0') this.state.params.T = validated[key];
    // ... outros aliases
  });
  
  this.notify('params');
}
```

### 2. Simplificação de `syncAliases()`

A função `syncAliases()` agora é usada apenas ao carregar cenários (que usam nomes antigos como G, T, e, rstar):

```javascript
syncAliases() {
  const p = this.state.params;
  
  // Copiar valores dos aliases antigos para os novos (cenários usam nomes antigos)
  if (p.G !== undefined) p.G0 = p.G;
  if (p.T !== undefined) p.T0 = p.T;
  if (p.e !== undefined) p.E = p.e;
  if (p.rstar !== undefined) p.istar = p.rstar;
  if (p.m !== undefined) p.m1 = p.m;
  if (p.v !== undefined) p.x2 = p.v;
}
```

### 3. Remoção de Console.logs de Debug

Removidos os console.logs que estavam poluindo o console:
- `getISData()` em `model.js`
- `loadScenario()` em `StateManager.js`

## Resultado

✅ Sliders agora movem as curvas IS e LM corretamente
✅ Cenários pré-configurados funcionam
✅ Sincronização de aliases mantida para compatibilidade
✅ Performance melhorada (menos chamadas de função)

## Arquivos Modificados

- `src/state/StateManager.js` - Refatoração de `updateParams()` e `syncAliases()`
- `src/model.js` - Remoção de console.logs

## Teste

1. Abra o simulador em http://localhost:5173/
2. Mova o slider de "Gastos do Governo (G)" - a curva IS deve se mover
3. Mova o slider de "Oferta de Moeda (M)" - a curva LM deve se mover
4. Clique em "Cenários" e selecione qualquer cenário - deve carregar corretamente
5. Verifique que o ponto de equilíbrio se move junto com as curvas

## Data

2026-04-05
