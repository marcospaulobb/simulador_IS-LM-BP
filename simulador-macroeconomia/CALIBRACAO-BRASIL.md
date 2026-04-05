# Calibração com Dados da Economia Brasileira

## Visão Geral

O simulador foi calibrado com dados reais da economia brasileira (2024) para tornar a experiência mais relevante e interessante para estudantes brasileiros. Esta calibração permite que os alunos trabalhem com valores próximos à realidade econômica do país.

## Escala Utilizada

**1 unidade no simulador = R$ 100 bilhões**

Esta escala foi escolhida para:
- Facilitar a visualização e compreensão dos valores
- Manter os números em faixas manejáveis (centenas/milhares)
- Refletir a magnitude real da economia brasileira

## PIB Brasileiro 2024

- **PIB Nominal**: ~R$ 10,9 trilhões
- **PIB no simulador**: ~10.900 unidades (109 × 100 bilhões)

## Parâmetros Calibrados

### Variáveis de Política

| Variável | Valor Padrão | Valor Real | % do PIB | Fonte |
|----------|--------------|------------|----------|-------|
| **G** (Gastos Públicos) | 2.200 | R$ 2,2 tri | ~22% | Tesouro Nacional 2024 |
| **T** (Tributação) | 3.500 | R$ 3,5 tri | ~35% | Carga tributária IBPT 2024 |
| **M** (Oferta Monetária M2) | 5.000 | R$ 5,0 tri | ~50% | BCB - Nota de Política Monetária |

### Variáveis de Economia Aberta

| Variável | Valor Padrão | Valor Real | Descrição |
|----------|--------------|------------|-----------|
| **e** (Taxa de Câmbio) | 5.0 | R$ 5,00/USD | Câmbio médio 2024 |
| **r*** (Juros Internacional) | 5.25% | 5.25% | Fed Funds Rate 2024 |
| **X0** (Exportações Base) | 1.500 | R$ 1,5 tri | ~15% PIB (MDIC 2024) |
| **m** (Propensão a Importar) | 0.12 | 12% | Importações/PIB (MDIC) |

### Parâmetros Estruturais

| Parâmetro | Valor | Justificativa |
|-----------|-------|---------------|
| **c** (PMgC) | 0.65 | Propensão marginal a consumir típica do Brasil |
| **b** (Sensibilidade Investimento) | 80 | Investimento moderadamente sensível aos juros |
| **k** (Demanda Moeda vs Renda) | 0.4 | Elasticidade-renda da demanda por moeda |
| **h** (Demanda Moeda vs Juros) | 100 | Sensibilidade aos juros da demanda por moeda |
| **C0** (Consumo Autônomo) | 1.500 | R$ 1,5 tri - consumo base das famílias |
| **I0** (Investimento Autônomo) | 2.000 | R$ 2,0 tri - ~20% PIB (IBGE FBCF) |
| **v** (Sensibilidade Câmbio) | 200 | Elasticidade das exportações líquidas ao câmbio |

## Ranges dos Controles

Os ranges dos sliders foram ajustados para refletir variações realistas:

### Política Fiscal
- **G**: 1.000 a 3.500 (R$ 1,0 tri a R$ 3,5 tri)
  - Permite simular desde austeridade severa até expansão fiscal significativa
- **T**: 2.000 a 5.000 (R$ 2,0 tri a R$ 5,0 tri)
  - Carga tributária de 20% a 50% do PIB

### Política Monetária
- **M**: 3.000 a 7.000 (R$ 3,0 tri a R$ 7,0 tri)
  - Permite simular desde contração monetária até expansão agressiva

### Economia Aberta
- **e**: 3,0 a 8,0 (R$/USD)
  - Cobre desde valorização forte até desvalorização significativa
- **r***: 1,0% a 12,0%
  - Cobre ciclos completos de política monetária internacional

## Cenários Calibrados

Todos os 13 cenários foram recalibrados com valores brasileiros:

1. **Economia Brasileira 2024** (default): Valores atuais da economia
2. **Expansão Fiscal**: G aumenta 27% (R$ 2,8 tri)
3. **Expansão Monetária**: M aumenta 30% (R$ 6,5 tri)
4. **Austeridade Fiscal**: G cai 23%, T sobe 20%
5. **Armadilha da Liquidez**: h = 180 (LM horizontal)
6. **Investimento Insensível**: b = 25 (IS vertical)
7. **Economia Aberta - Câmbio Flutuante**: Valores base brasileiros
8. **Economia Aberta - Câmbio Fixo**: Valores base brasileiros
9. **Desvalorização Cambial**: e = 6,5 (desvalorização de 30%)
10. **Choque Externo**: r* = 8,5% (Fed sobe juros)
11. **Alta Propensão a Consumir**: c = 0,80
12. **Crise 2008**: Simulação de resposta à crise com valores brasileiros
13. **Imobilidade de Capitais**: BP vertical, m = 0,15

## Ajuste Automático de Eixos

O gráfico foi otimizado para garantir boa visualização:

- **Padding adaptativo**: Se o equilíbrio ficar muito embaixo (< 30% da altura), o padding inferior aumenta para 50%
- **Eixos dinâmicos**: Ajustam-se automaticamente aos dados
- **Altura máxima**: 600px para evitar gráfico muito grande

## Fontes dos Dados

1. **PIB e Contas Nacionais**: IBGE - Contas Nacionais Trimestrais 2024
2. **Carga Tributária**: IBPT - Instituto Brasileiro de Planejamento Tributário
3. **Gastos Públicos**: Tesouro Nacional - Resultado do Tesouro Nacional
4. **Agregados Monetários**: Banco Central do Brasil - Nota de Política Monetária
5. **Comércio Exterior**: MDIC - Ministério do Desenvolvimento, Indústria e Comércio
6. **Taxa de Câmbio**: BCB - Cotação PTAX média 2024
7. **Juros Internacional**: Federal Reserve - Fed Funds Rate
8. **FBCF (Investimento)**: IBGE - Formação Bruta de Capital Fixo

## Benefícios da Calibração

1. **Relevância**: Estudantes trabalham com valores reais da economia brasileira
2. **Contextualização**: Facilita a compreensão dos impactos das políticas
3. **Escala apropriada**: Valores em centenas/milhares são fáceis de visualizar
4. **Realismo**: Cenários refletem situações econômicas plausíveis
5. **Aprendizado**: Conexão direta entre teoria e realidade brasileira

## Notas Técnicas

- Os valores são aproximações para fins didáticos
- Alguns parâmetros (b, h, k, v) são estimativas baseadas em literatura econômica
- A escala simplificada facilita cálculos mentais
- Os ranges permitem explorar cenários extremos sem perder realismo

## Atualização dos Dados

Para atualizar a calibração com dados mais recentes:

1. Consultar fontes oficiais (IBGE, BCB, Tesouro)
2. Converter valores para escala de R$ 100 bilhões
3. Atualizar `StateManager.js` (valores padrão)
4. Atualizar `scenarios.js` (todos os cenários)
5. Ajustar ranges em `index.html` se necessário
6. Revisar constraints em `advanced.js`

---

**Última atualização**: Abril 2026  
**Versão do simulador**: 2.1.0
