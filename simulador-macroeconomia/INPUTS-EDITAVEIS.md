# Implementação: Inputs Editáveis para Parâmetros

## Funcionalidade Adicionada

Agora é possível alterar os valores dos parâmetros tanto pelos sliders quanto digitando diretamente nos campos numéricos.

## Mudanças Implementadas

### 1. HTML (index.html)

Substituídos todos os `<span>` de exibição de valores por `<input type="number">` editáveis:

**Antes:**
```html
<span class="text-sm font-bold text-mackenzie-green val-display px-2 py-0.5 bg-white rounded" id="val-G">2200</span>
```

**Depois:**
```html
<input type="number" id="val-G" min="1000" max="3500" step="100" value="2200" 
  class="text-sm font-bold text-mackenzie-green val-input px-2 py-0.5 bg-white rounded border border-gray-300 w-20 text-right focus:outline-none focus:ring-2 focus:ring-mackenzie-green">
```

**Parâmetros com inputs editáveis:**
- Variáveis de Política: G, T, M, e, rstar
- Parâmetros Estruturais: c, b, k, h

### 2. UIController.js

#### Método `updateDisplay()` Atualizado

Agora verifica se o input está focado antes de atualizar, para não interferir com a digitação do usuário:

```javascript
updateDisplay(key, value) {
  if (!this.displays[key]) return;
  
  // Formatar valor baseado no tipo
  let formattedValue;
  if (key === 'c' || key === 'k' || key === 'e') {
    formattedValue = parseFloat(value).toFixed(2);
  } else if (key === 'rstar') {
    formattedValue = parseFloat(value).toFixed(2);
  } else {
    formattedValue = Math.round(value);
  }
  
  // Atualizar o input apenas se não estiver focado
  if (document.activeElement !== this.displays[key]) {
    this.displays[key].value = formattedValue;
  }
}
```

#### Novo Método `getInputListeners()`

Retorna objeto com callbacks para configurar listeners dos inputs:

```javascript
getInputListeners() {
  const listeners = {};
  
  Object.keys(this.displays).forEach(key => {
    const input = this.displays[key];
    const slider = this.sliders[key];
    
    if (!input || !slider) return;
    
    listeners[key] = {
      input,
      slider,
      onChange: (callback) => {
        // Listener para blur (perda de foco)
        input.addEventListener('blur', () => {
          let value = parseFloat(input.value);
          const min = parseFloat(slider.min);
          const max = parseFloat(slider.max);
          
          // Validar limites
          if (isNaN(value)) {
            value = parseFloat(slider.value);
          } else {
            value = Math.max(min, Math.min(max, value));
          }
          
          // Atualizar slider e chamar callback
          slider.value = value;
          input.value = value;
          callback(key, value);
        });
        
        // Listener para Enter
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            input.blur(); // Trigger blur event
          }
        });
      }
    };
  });
  
  return listeners;
}
```

### 3. main-new.js

Adicionados event listeners para os inputs editáveis em `setupEventListeners()`:

```javascript
// Value input listeners (digitação direta)
const inputListeners = uiController.getInputListeners();
Object.keys(inputListeners).forEach(key => {
  const listener = inputListeners[key];
  listener.onChange((paramKey, value) => {
    stateManager.updateParams({ [paramKey]: value });
    uiController.updateDisplay(paramKey, value);
    updateApp();
  });
});
```

## Como Usar

### Digitação Direta

1. Clique no campo numérico ao lado do nome do parâmetro
2. Digite o valor desejado
3. Pressione Enter ou clique fora do campo
4. O valor será validado (respeitando min/max) e aplicado
5. O slider será sincronizado automaticamente
6. O gráfico será atualizado

### Validação Automática

- Valores fora dos limites são automaticamente ajustados para o min/max
- Valores inválidos (não numéricos) são revertidos para o valor anterior
- A validação ocorre ao perder o foco ou pressionar Enter

### Sincronização Bidirecional

- Mover o slider → atualiza o input
- Digitar no input → atualiza o slider
- Ambos atualizam o gráfico em tempo real

## Estilo Visual

Os inputs têm:
- Borda cinza clara (`border-gray-300`)
- Foco com anel colorido (`focus:ring-2`)
- Texto alinhado à direita (`text-right`)
- Largura fixa apropriada (`w-20` para valores grandes, `w-16` para pequenos)
- Cores que correspondem ao tipo de parâmetro:
  - Verde (`text-mackenzie-green`) para variáveis de política
  - Roxo (`text-purple-600`) para economia aberta
  - Cinza (`text-gray-700`) para parâmetros estruturais

## Benefícios

✅ Maior precisão na definição de valores
✅ Mais rápido para valores específicos
✅ Mantém a funcionalidade dos sliders
✅ Validação automática de limites
✅ Interface intuitiva e responsiva
✅ Sincronização perfeita entre input e slider

## Arquivos Modificados

- `index.html` - Substituição de spans por inputs
- `src/ui/UIController.js` - Métodos `updateDisplay()` e `getInputListeners()`
- `src/main-new.js` - Adição de event listeners para inputs

## Data

2026-04-05
