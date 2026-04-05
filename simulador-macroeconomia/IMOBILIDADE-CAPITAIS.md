# Debug: Curva BP com Imobilidade de Capital

## Problema
Quando selecionamos "Sem Mobilidade de Capital" nos Parâmetros Avançados, a curva BP não aparece no gráfico.

## Análise do Código

### 1. Função `getBPData()` em `model.js`
```javascript
export function getBPData(rstar, capitalMobility = 'perfect', params = null) {
  const data = [];
  
  console.log('getBPData called with:', { rstar, capitalMobility, params });
  
  if (capitalMobility === 'zero' && params) {
    // Imobilidade perfeita: BP vertical em Y_BP
    // Y_BP é onde CA = 0, ou seja: X0 + v*e - m*Y = 0
    // Resolvendo: Y_BP = (X0 + v*e) / m
    const { X0, v, e, m } = params;
    const Y_BP = (X0 + v * e) / m;
    
    console.log('Zero mobility - Y_BP calculated:', Y_BP, 'from X0:', X0, 'v:', v, 'e:', e, 'm:', m);
    
    // Criar linha vertical em Y_BP
    for (let r = 0; r <= 50; r += 0.5) {
      data.push({ x: Y_BP, y: r });
    }
  } else {
    // Mobilidade perfeita: BP horizontal em r*
    for (let Y = 0; Y <= 12000; Y += 100) {
      data.push({ x: Y, y: rstar });
    }
  }
  
  console.log('getBPData returning', data.length, 'points');
  
  return data;
}
```

### 2. Chamada em `main-new.js`
```javascript
// BP só existe em economia aberta
if (state.isOpenEconomy) {
  console.log('Generating BP with mobility:', state.capitalMobility, 'params:', state.params);
  dataBP = getBPData(state.params.rstar, state.capitalMobility, state.params);
  console.log('BP data points:', dataBP.length, 'first point:', dataBP[0]);
} else {
  dataBP = []; // Economia fechada não tem BP
}
```

### 3. Função `applyAdvancedParams()`
```javascript
// Atualizar mobilidade de capital
const selectedMobility = document.querySelector('input[name="capitalMobility"]:checked').value;
stateManager.state.capitalMobility = selectedMobility;

console.log('Capital Mobility set to:', selectedMobility);

// Se não for economia fechada, ativar economia aberta
if (selectedMobility !== 'closed') {
  stateManager.setEconomyType(true); // Ativar economia aberta
  uiController.updateFromState(stateManager.getState());
}
```

## Possíveis Causas

### Causa 1: Parâmetros undefined
Os parâmetros `X0`, `v`, `e`, `m` podem estar undefined ou com valores incorretos quando passados para `getBPData()`.

**Verificação necessária:**
- `params.X0` existe? (deveria ser 1500)
- `params.v` existe? (deveria ser 300, alias de x2)
- `params.e` existe? (deveria ser 5.17, alias de E)
- `params.m` existe? (deveria ser 0.12, alias de m1)

### Causa 2: Aliases não sincronizados
O código usa aliases (`v` para `x2`, `e` para `E`, `m` para `m1`), mas esses aliases podem não estar sincronizados quando carregamos parâmetros avançados.

### Causa 3: Economia não está aberta
Se `state.isOpenEconomy` for `false`, a BP não será gerada mesmo com mobilidade zero.

## Solução Proposta

### Opção 1: Garantir aliases na função getBPData
Modificar `getBPData()` para usar os nomes corretos dos parâmetros:

```javascript
if (capitalMobility === 'zero' && params) {
  // Usar nomes corretos ou aliases
  const X0 = params.X0 || 1500;
  const v = params.v || params.x2 || 300;
  const e = params.e || params.E || 5.17;
  const m = params.m || params.m1 || 0.12;
  
  const Y_BP = (X0 + v * e) / m;
  // ...
}
```

### Opção 2: Sincronizar aliases antes de chamar getBPData
Em `main-new.js`, garantir que os aliases estão sincronizados:

```javascript
if (state.isOpenEconomy) {
  // Garantir aliases
  const paramsWithAliases = {
    ...state.params,
    v: state.params.v || state.params.x2,
    e: state.params.e || state.params.E,
    m: state.params.m || state.params.m1
  };
  
  dataBP = getBPData(state.params.rstar, state.capitalMobility, paramsWithAliases);
}
```

## Próximos Passos

1. Abrir o console do navegador (F12)
2. Selecionar "Parâmetros Avançados"
3. Escolher "Sem Mobilidade de Capital"
4. Clicar em "Aplicar"
5. Verificar os logs:
   - "Capital Mobility set to: zero"
   - "Economy opened. isOpenEconomy: true"
   - "Params for BP: {X0: ..., v: ..., e: ..., m: ...}"
   - "Generating BP with mobility: zero"
   - "getBPData called with: ..."
   - "Zero mobility - params extracted: ..."
   - "Zero mobility - Y_BP calculated: ..."
   - "getBPData returning ... points first point: ..."

## Correções Implementadas

### 1. Aliases robustos em getBPData()
Modificada a função para usar fallbacks nos aliases:
```javascript
const X0 = params.X0 || 1500;
const v = params.v || params.x2 || 300;
const e = params.e || params.E || 5.17;
let m = params.m || params.m1 || 0.12;
```

### 2. Validação de parâmetros
Adicionada validação para evitar divisão por zero e valores inválidos:
```javascript
if (Math.abs(m) < 0.001) {
  console.error('m is too small, using default 0.12');
  m = 0.12;
}

if (!isFinite(Y_BP) || Y_BP < 0) {
  console.error('Invalid Y_BP:', Y_BP, 'using default 14475');
  Y_BP = 14475;
}
```

### 3. Logs detalhados
Adicionados logs em múltiplos pontos para rastrear o fluxo:
- Em `applyAdvancedParams()`: estado da economia e parâmetros
- Em `getBPData()`: parâmetros extraídos e Y_BP calculado
- Em `updateApp()`: mobilidade e dados da BP

## Teste

Após recarregar a página (F5):
1. Abrir console (F12)
2. Clicar em "Parâmetros Avançados"
3. Selecionar "Sem Mobilidade de Capital"
4. Clicar em "Aplicar"
5. A curva BP deve aparecer como uma linha VERTICAL
6. Verificar os logs no console

Se a curva ainda não aparecer, os logs mostrarão exatamente onde está o problema.

## Logs Esperados

```
Capital Mobility set to: zero
Generating BP with mobility: zero params: {X0: 1500, v: 300, e: 5.17, m: 0.12, ...}
getBPData called with: {rstar: 14.75, capitalMobility: 'zero', params: {...}}
Zero mobility - Y_BP calculated: 14475 from X0: 1500 v: 300 e: 5.17 m: 0.12
getBPData returning 101 points
BP data points: 101 first point: {x: 14475, y: 0}
```

Se algum desses valores estiver `undefined`, encontramos o problema.
