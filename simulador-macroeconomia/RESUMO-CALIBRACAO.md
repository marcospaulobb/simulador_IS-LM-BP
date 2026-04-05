# 🇧🇷 Resumo da Calibração Brasileira

## O Que Foi Feito

Calibramos completamente o simulador com dados reais da economia brasileira (2024) para tornar a experiência mais relevante e interessante para estudantes brasileiros.

## Mudanças Principais

### ✅ Valores Padrão Atualizados

| Antes | Depois | Descrição |
|-------|--------|-----------|
| G: 1.000 | **G: 2.200** | Gastos públicos (~22% PIB) |
| T: 800 | **T: 3.500** | Carga tributária (~35% PIB) |
| M: 1.200 | **M: 5.000** | M2 Brasil (R$ 5 trilhões) |
| e: 1.0 | **e: 5.0** | Taxa de câmbio R$/USD |
| r*: 5.0% | **r*: 5.25%** | Fed Funds Rate 2024 |
| c: 0.6 | **c: 0.65** | PMgC Brasil |
| I0: 400 | **I0: 2.000** | Investimento (~20% PIB) |
| X0: 200 | **X0: 1.500** | Exportações (~15% PIB) |
| m: 0.1 | **m: 0.12** | Propensão a importar |

### ✅ Ranges dos Sliders Ajustados

| Variável | Range Anterior | Range Novo | Justificativa |
|----------|----------------|------------|---------------|
| **G** | 500 - 1.500 | **1.000 - 3.500** | Escala brasileira |
| **T** | 400 - 1.200 | **2.000 - 5.000** | Carga tributária realista |
| **M** | 600 - 1.800 | **3.000 - 7.000** | M2 Brasil |
| **e** | 0.5 - 2.0 | **3.0 - 8.0** | Variação cambial R$/USD |
| **r*** | 1.0 - 10.0 | **1.0 - 12.0** | Ciclos Fed |

### ✅ Todos os 13 Cenários Recalibrados

1. **Economia Brasileira 2024** (novo default)
2. **Expansão Fiscal**: G = 2.800 (+27%)
3. **Expansão Monetária**: M = 6.500 (+30%)
4. **Austeridade**: G = 1.700 (-23%), T = 4.200 (+20%)
5. **Armadilha da Liquidez**: h = 180
6. **Investimento Insensível**: b = 25
7. **Economia Aberta - Flutuante**: Valores base BR
8. **Economia Aberta - Fixo**: Valores base BR
9. **Desvalorização**: e = 6.5 (+30%)
10. **Choque Externo**: r* = 8.5%
11. **Alta PMgC**: c = 0.80
12. **Crise 2008**: Valores ajustados
13. **Imobilidade Capitais**: m = 0.15

### ✅ Melhorias na Visualização

- **Padding adaptativo**: Equilíbrio não fica mais muito embaixo
- **Eixos dinâmicos**: Ajustam-se aos valores brasileiros
- **Altura otimizada**: Max 600px para melhor visualização

## Escala Utilizada

```
1 unidade no simulador = R$ 100 bilhões
```

### Exemplos:
- PIB Brasil: ~10.900 unidades = R$ 10,9 trilhões
- Gastos públicos: 2.200 = R$ 2,2 trilhões
- M2: 5.000 = R$ 5,0 trilhões

## Benefícios

✅ **Relevância**: Valores reais da economia brasileira  
✅ **Contextualização**: Facilita compreensão dos impactos  
✅ **Escala apropriada**: Números fáceis de visualizar  
✅ **Realismo**: Cenários economicamente plausíveis  
✅ **Aprendizado**: Conexão teoria ↔ realidade brasileira  

## Arquivos Modificados

1. ✅ `src/state/StateManager.js` - Valores padrão
2. ✅ `src/scenarios/scenarios.js` - Todos os 13 cenários
3. ✅ `index.html` - Ranges dos sliders
4. ✅ `src/config/advanced.js` - Constraints
5. ✅ `src/chart.js` - Padding adaptativo
6. ✅ `CALIBRACAO-BRASIL.md` - Documentação completa
7. ✅ `CHANGELOG.md` - Versão 2.1.0
8. ✅ `README.md` - Destaque da calibração

## Fontes dos Dados

- 📊 **IBGE**: PIB, Contas Nacionais, FBCF
- 🏦 **Banco Central**: M2, câmbio, política monetária
- 💰 **Tesouro Nacional**: Gastos públicos
- 📈 **IBPT**: Carga tributária
- 🌍 **MDIC**: Comércio exterior
- 🇺🇸 **Federal Reserve**: Fed Funds Rate

## Próximos Passos

Para testar a calibração:

1. Abra o simulador
2. Observe os valores padrão (já em escala brasileira)
3. Teste os cenários pré-configurados
4. Ajuste os sliders e veja os impactos
5. Compare com notícias econômicas reais do Brasil

## Documentação Completa

📖 Veja detalhes técnicos em [CALIBRACAO-BRASIL.md](./CALIBRACAO-BRASIL.md)

---

**Versão**: 2.1.0  
**Data**: Abril 2026  
**Status**: ✅ Completo
