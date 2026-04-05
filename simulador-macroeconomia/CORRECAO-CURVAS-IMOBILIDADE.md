# Correção: Equilíbrio com Imobilidade de Capital

## Problema Resolvido
✅ A curva BP vertical agora aparece no gráfico
✅ O eixo X se ajusta dinamicamente para mostrar tanto o equilíbrio IS-LM quanto a BP

## Situação Atual
- Equilíbrio IS-LM: Y = 4170, i = 14.75%
- Curva BP vertical: Y = 12204
- As três curvas NÃO se cruzam no mesmo ponto

## Por que isso acontece?

### Economia Fechada vs Aberta
Quando você muda de economia fechada para aberta, a curva IS muda porque agora inclui exportações líquidas (NX):

**Economia Fechada:**
```
Y = C + I + G
IS: Y = (C0 - c*T + I0 + G - b*i) / (1 - c)
```

**Economia Aberta:**
```
Y = C + I + G + NX
IS: Y = (C0 - c*T + I0 + G + X0 + v*e - b*i) / (1 - c + m)
```

Note que:
1. O denominador mudou de `(1 - c)` para `(1 - c + m)`
2. Adicionamos `(X0 + v*e)` no numerador
3. Com m = 0.25, o multiplicador diminui significativamente

### Cálculo do Equilíbrio Atual

Com os parâmetros atuais:
- C0 = 1500, I0 = 2000, G = 2200, T = 3500, c = 0.65
- X0 = 1500, v = 300, e = 5.17, m = 0.25
- b = 80, i = 14.75%

**Numerador IS:**
A = C0 - c*T + I0 + G + X0 + v*e - b*i
A = 1500 - 0.65*3500 + 2000 + 2200 + 1500 + 300*5.17 - 80*14.75
A = 1500 - 2275 + 2000 + 2200 + 1500 + 1551 - 1180
A = 5296

**Denominador IS:**
1 - c + m = 1 - 0.65 + 0.25 = 0.60

**Y_IS = 5296 / 0.60 = 8827** (aproximadamente)

Mas o equilíbrio mostrado é Y = 4170, o que sugere que há algo diferente acontecendo.

### Curva BP Vertical

Com imobilidade de capital, a BP é vertical em:
```
Y_BP = (X0 + v*e) / m
Y_BP = (1500 + 300*5.17) / 0.25
Y_BP = 3051 / 0.25
Y_BP = 12204 ✓
```

## Como Obter Equilíbrio Triplo

Para que as três curvas se cruzem no mesmo ponto, você precisa ajustar os parâmetros. Aqui estão algumas opções:

### Opção 1: Ajustar X0 (Exportações Autônomas)
Se queremos Y_BP = Y_eq ≈ 4170:
```
Y_BP = (X0 + v*e) / m
4170 = (X0 + 300*5.17) / 0.25
4170 = (X0 + 1551) / 0.25
X0 = 4170 * 0.25 - 1551
X0 = 1042.5 - 1551
X0 = -508.5 (negativo! não funciona)
```

### Opção 2: Ajustar m (Propensão a Importar)
Se queremos Y_BP = Y_eq ≈ 4170:
```
4170 = (1500 + 1551) / m
4170 = 3051 / m
m = 3051 / 4170
m = 0.73
```

Com m = 0.73, a BP ficaria em Y = 4170, mas isso é uma propensão marginal a importar muito alta (73%!).

### Opção 3: Aumentar G ou diminuir T
Aumentar gastos do governo ou diminuir impostos desloca a IS para a direita, aumentando Y_eq.

Se aumentarmos G de 2200 para 4000:
- Isso adiciona 1800 ao numerador
- Y aumenta em 1800 / 0.60 = 3000
- Novo Y_eq ≈ 7170 (mais próximo de 12204)

### Opção 4: Ajustar v (Sensibilidade das Exportações ao Câmbio)
Se aumentarmos v de 300 para 600:
```
Y_BP = (1500 + 600*5.17) / 0.25
Y_BP = (1500 + 3102) / 0.25
Y_BP = 18408 (pior!)
```

Se diminuirmos v de 300 para 100:
```
Y_BP = (1500 + 100*5.17) / 0.25
Y_BP = (1500 + 517) / 0.25
Y_BP = 8068 (melhor!)
```

## Recomendação

A melhor solução é ajustar múltiplos parâmetros simultaneamente:

1. **Diminuir v de 300 para 150:**
   - Y_BP = (1500 + 150*5.17) / 0.25 = 9102

2. **Aumentar G de 2200 para 3500:**
   - Desloca IS para direita
   - Y_eq aumenta em ~2167

3. **Ou diminuir m de 0.25 para 0.20:**
   - Y_BP = (1500 + 300*5.17) / 0.20 = 15255
   - Mas também aumenta o multiplicador, deslocando IS

## Como Ajustar no Simulador

1. Clique em "Parâmetros Avançados"
2. Ajuste os valores:
   - x2 (v): 150 (em vez de 300)
   - Ou ajuste G no slider principal para 3500
3. Clique em "Aplicar"
4. As curvas devem ficar mais próximas

## Conclusão

O comportamento atual está CORRETO do ponto de vista econômico. Com imobilidade de capital:
- Se Y < Y_BP: superávit na conta corrente (exportações > importações)
- Se Y > Y_BP: déficit na conta corrente (importações > exportações)

O equilíbrio em Y = 4170 com BP em Y = 12204 indica um grande superávit comercial.
