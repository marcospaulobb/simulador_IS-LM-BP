# 📚 Modelo IS-LM-BP Expandido - Documentação Completa

## Visão Geral

O simulador agora implementa o modelo IS-LM-BP completo conforme especificado no documento "Consolidação do Modelo IS-LM-BP para Simulador". Todas as variáveis e parâmetros do modelo teórico foram incluídos.

## Novas Variáveis Implementadas

### Componentes Autônomos

| Variável | Nome | Valor Padrão | Descrição |
|----------|------|--------------|-----------|
| **C0** | Consumo Autônomo | 1.500 | Consumo independente da renda |
| **I0** | Investimento Autônomo | 2.000 | Investimento base |
| **G0** | Gastos do Governo | 2.200 | Gastos públicos |
| **T0** | Tributação | 3.500 | Impostos |
| **X0** | Exportações Autônomas | 1.500 | Exportações base |
| **M0** | Importações Autônomas | 1.300 | Importações base |
| **L0** | Demanda Autônoma por Moeda | 0 | Demanda por moeda independente de Y e i |
| **K0** | Fluxo Autônomo de Capital | 0 | Fluxo de capital independente de i - i* |

### Parâmetros Comportamentais

| Parâmetro | Nome | Valor Padrão | Faixa | Descrição |
|-----------|------|--------------|-------|-----------|
| **c** | Propensão Marginal a Consumir | 0,65 | 0 < c < 1 | Quanto do aumento da renda é consumido |
| **b** | Sensibilidade Investimento-Juros | 80 | b > 0 | Quanto o investimento cai quando juros sobem |
| **m1** | Propensão Marginal a Importar | 0,12 | 0 < m1 < 1 | Quanto do aumento da renda é importado |
| **k** | Sensibilidade Moeda-Renda | 0,5 | k > 0 | Elasticidade-renda da demanda por moeda |
| **h** | Sensibilidade Moeda-Juros | 60 | h > 0 | Elasticidade-juros da demanda por moeda |

### Parâmetros de Economia Aberta

| Parâmetro | Nome | Valor Padrão | Descrição |
|-----------|------|--------------|-----------|
| **x1** | Sensibilidade Exportações-Renda Externa | 0,15 | Quanto as exportações aumentam com Y* |
| **x2** | Sensibilidade Exportações-Câmbio | 300 | Quanto as exportações aumentam com desvalorização |
| **m2** | Sensibilidade Importações-Câmbio | 200 | Quanto as importações caem com desvalorização |
| **f** | Sensibilidade Capital-Juros | 100 | Fluxo de capital em resposta a i - i* |

### Variáveis Exógenas

| Variável | Nome | Valor Padrão | Descrição |
|----------|------|--------------|-----------|
| **Y*** | Renda Externa | 12.000 | PIB mundial (escala: R$ 100 bi) |
| **i*** | Taxa de Juros Externa | 5,25% | Fed Funds Rate |
| **E** | Taxa de Câmbio | 5,0 | R$/USD |
| **M** | Oferta de Moeda | 1.800 | Oferta nominal de moeda |
| **P** | Nível de Preços | 1,0 | Normalizado em 1 |

## Equações do Modelo Expandido

### Curva IS

```
Y = C(Y-T) + I(i) + G + NX(Y, Y*, E)
```

Detalhando:
```
C = C0 + c(Y - T0)
I = I0 - b·i
X = X0 + x1·Y* + x2·E
M = M0 + m1·Y + m2·E
NX = X - M

Y = C0 + c(Y - T0) + I0 - b·i + G0 + X0 + x1·Y* + x2·E - M0 - m1·Y - m2·E
```

Resolvendo para i:
```
i = [C0 - c·T0 + I0 + G0 + X0 + x1·Y* + (x2-m2)·E - M0 - (1-c+m1)·Y] / b
```

### Curva LM

```
M/P = L(Y, i)
```

Detalhando:
```
M/P = L0 + k·Y - h·i
```

Resolvendo para i:
```
i = (k·Y - M/P - L0) / h
```

### Curva BP

```
BP = NX + CK = 0
```

Detalhando:
```
NX = X0 + x1·Y* + x2·E - M0 - m1·Y - m2·E
CK = K0 + f·(i - i*)

BP = X0 + x1·Y* + x2·E - M0 - m1·Y - m2·E + K0 + f·(i - i*) = 0
```

Resolvendo para i (mobilidade imperfeita):
```
i = i* + [m1·Y - X0 - x1·Y* - (x2-m2)·E + M0 - K0] / f
```

## Regimes de Mobilidade de Capital

### 1. Mobilidade Perfeita (f → ∞)

**Característica**: i = i* (BP horizontal)

**Câmbio Flutuante**:
- LM determina Y
- IS ajusta E endogenamente
- Política monetária eficaz
- Política fiscal ineficaz

**Câmbio Fixo**:
- IS determina Y
- LM ajusta M endogenamente
- Política fiscal eficaz
- Política monetária ineficaz

### 2. Mobilidade Imperfeita (0 < f < ∞)

**Característica**: BP positivamente inclinada

**Câmbio Flutuante**:
- Sistema de 3 equações (IS, LM, BP)
- Todas as variáveis endógenas (Y, i, E)
- Ambas as políticas têm efeito

**Câmbio Fixo**:
- Sistema de 3 equações (IS, LM, BP)
- Variáveis endógenas: Y, i, M
- Ambas as políticas têm efeito

### 3. Sem Mobilidade (f = 0)

**Característica**: BP vertical (Y determinado por NX = 0)

**Câmbio Flutuante**:
- BP determina Y
- LM determina i
- IS ajusta E
- Política fiscal eficaz
- Política monetária ineficaz

**Câmbio Fixo**:
- BP determina Y
- IS determina i
- LM ajusta M
- Política fiscal eficaz
- Política monetária ineficaz

## Comparação: Modelo Simples vs Expandido

| Aspecto | Modelo Simples | Modelo Expandido |
|---------|----------------|------------------|
| **Exportações** | X0 + v·E | X0 + x1·Y* + x2·E |
| **Importações** | m·Y | M0 + m1·Y + m2·E |
| **Fluxos de Capital** | Implícito | K0 + f·(i - i*) |
| **Demanda por Moeda** | k·Y - h·i | L0 + k·Y - h·i |
| **Renda Externa** | Não incluída | Y* explícita |
| **Mobilidade Capital** | Perfeita ou Zero | Perfeita, Imperfeita ou Zero |

## Calibração Brasileira (Valores Padrão)

### Escala
```
1 unidade = R$ 100 bilhões
```

### Componentes Autônomos
- **C0** = 1.500 (R$ 1,5 tri) - Consumo base
- **I0** = 2.000 (R$ 2,0 tri) - Investimento ~20% PIB
- **G0** = 2.200 (R$ 2,2 tri) - Gastos governo ~22% PIB
- **T0** = 3.500 (R$ 3,5 tri) - Carga tributária ~35% PIB
- **X0** = 1.500 (R$ 1,5 tri) - Exportações base ~15% PIB
- **M0** = 1.300 (R$ 1,3 tri) - Importações base ~12% PIB

### Parâmetros Comportamentais
- **c** = 0,65 - PMgC Brasil
- **b** = 80 - Sensibilidade moderada
- **m1** = 0,12 - Propensão a importar Brasil
- **k** = 0,5 - Demanda por moeda
- **h** = 60 - Sensibilidade aos juros

### Economia Aberta
- **x1** = 0,15 - Elasticidade-renda das exportações
- **x2** = 300 - Elasticidade-câmbio das exportações
- **m2** = 200 - Elasticidade-câmbio das importações
- **f** = 100 - Mobilidade de capital moderada

### Variáveis Exógenas
- **Y*** = 12.000 (R$ 1,2 quatrilhão) - PIB mundial
- **i*** = 5,25% - Fed Funds Rate 2024
- **E** = 5,0 - R$ 5,00/USD
- **M** = 1.800 (R$ 1,8 tri) - M2 ajustado
- **P** = 1,0 - Normalizado

## Como Usar o Modelo Expandido

### 1. Selecionar Regime

```javascript
// Economia fechada
capitalMobility = 'closed'

// Economia aberta - mobilidade perfeita
capitalMobility = 'perfect'

// Economia aberta - mobilidade imperfeita
capitalMobility = 'imperfect'

// Economia aberta - sem mobilidade
capitalMobility = 'zero'
```

### 2. Selecionar Regime Cambial

```javascript
// Câmbio flutuante
isFloating = true

// Câmbio fixo
isFloating = false
```

### 3. Aplicar Choques

**Política Fiscal**:
```javascript
// Expansão fiscal
G0 += 400  // Aumentar gastos em R$ 400 bi

// Contração fiscal
T0 += 500  // Aumentar impostos em R$ 500 bi
```

**Política Monetária**:
```javascript
// Expansão monetária
M += 300  // Aumentar oferta de moeda em R$ 300 bi
```

**Choques Externos**:
```javascript
// Aumento da renda externa
Ystar += 1000

// Aumento dos juros externos
istar += 2.0  // Fed sobe juros em 2 p.p.
```

**Política Cambial**:
```javascript
// Desvalorização (apenas câmbio fixo)
E += 1.0  // Desvalorizar para R$ 6,00/USD
```

## Benefícios do Modelo Expandido

### Para Ensino

✅ **Completude Teórica**: Todas as variáveis do modelo teórico  
✅ **Renda Externa**: Permite analisar choques externos  
✅ **Mobilidade Imperfeita**: Caso intermediário mais realista  
✅ **Sensibilidades ao Câmbio**: Efeitos mais precisos  
✅ **Fluxos de Capital**: Explícitos e parametrizáveis  

### Para Análise

✅ **Maior Realismo**: Parâmetros calibrados com dados reais  
✅ **Flexibilidade**: Múltiplos regimes de mobilidade  
✅ **Choques Externos**: Y* e i* explícitos  
✅ **Efeitos Cambiais**: x2 e m2 separados  
✅ **Conta de Capital**: K0 e f parametrizáveis  

## Limitações e Simplificações

1. **Preços Fixos**: P = 1 (modelo de curto prazo)
2. **Expectativas**: Não incluídas explicitamente
3. **Oferta Agregada**: Não modelada
4. **Mercado de Trabalho**: Não incluído
5. **Setor Financeiro**: Simplificado

## Próximos Passos

- [ ] Interface para ajustar todas as novas variáveis
- [ ] Cenários pré-configurados com modelo expandido
- [ ] Visualização de fluxos de capital
- [ ] Análise de sensibilidade automática
- [ ] Exportação de resultados detalhados
- [ ] Comparação entre regimes
- [ ] Simulação de crises externas

---

**Versão**: 2.3.0  
**Data**: Abril 2026  
**Status**: ✅ Modelo Implementado

**📚 Baseado em**: "Consolidação do Modelo IS-LM-BP para Simulador"
