# Consolidação do Modelo IS-LM-BP para Simulador

## 1. Introdução ao Modelo IS-LM-BP
O modelo IS-LM-BP, também conhecido como modelo Mundell-Fleming, é uma extensão do modelo IS-LM para uma economia aberta, incorporando o mercado externo. Ele é utilizado para analisar o equilíbrio macroeconômico em termos de renda (Y) e taxa de juros (i), considerando o balanço de pagamentos (BP) e diferentes regimes cambiais e de mobilidade de capitais.

## 2. Componentes do Modelo

### 2.1. Curva IS (Investment-Savings)
Representa o equilíbrio no mercado de bens e serviços. Em uma economia aberta, a demanda agregada (DA) é dada por:

$Y = C(Y-T) + I(i) + G + NX(Y, Y*, E)$

Onde:
*   **Y:** Renda/Produto
*   **C:** Consumo (função da renda disponível $Y-T$)
*   **I:** Investimento (função inversa da taxa de juros $i$)
*   **G:** Gastos do Governo (política fiscal)
*   **NX:** Exportações Líquidas (Exportações - Importações)
    *   **Exportações (X):** Dependem positivamente da renda externa ($Y*$) e da taxa de câmbio real ($E$).
    *   **Importações (M):** Dependem positivamente da renda interna ($Y$) e negativamente da taxa de câmbio real ($E$).

**Fatores de Deslocamento da IS:**
*   **Política Fiscal:** Aumento de G ou redução de T desloca a IS para a direita.
*   **Taxa de Câmbio Real (E):** Desvalorização (aumento de E) desloca a IS para a direita (aumenta NX).
*   **Renda Externa (Y*):** Aumento de Y* desloca a IS para a direita (aumenta X).

### 2.2. Curva LM (Liquidity-Money)
Representa o equilíbrio no mercado monetário. A oferta de moeda (M/P) é igual à demanda por moeda (L), que depende positivamente da renda (Y) e negativamente da taxa de juros (i).

$M/P = L(Y, i)$

Onde:
*   **M:** Oferta Nominal de Moeda (política monetária)
*   **P:** Nível de Preços
*   **L:** Demanda por Moeda

**Fatores de Deslocamento da LM:**
*   **Política Monetária:** Aumento da oferta de moeda (M) desloca a LM para a direita.

### 2.3. Curva BP (Balanço de Pagamentos)
Representa o equilíbrio no balanço de pagamentos (BP = 0), onde o saldo da conta corrente (CC) mais o saldo da conta de capital (CK) é zero.

$BP = CC + CK = 0$

Onde:
*   **CC:** Conta Corrente (principalmente Exportações Líquidas NX)
*   **CK:** Conta de Capital (depende do diferencial de juros $i - i*$)

**Fatores de Deslocamento da BP:**
*   **Renda Externa (Y*):** Aumento de Y* desloca a BP para a direita (melhora CC).
*   **Taxa de Câmbio Real (E):** Desvalorização (aumento de E) desloca a BP para a direita (melhora CC).
*   **Taxa de Juros Externa (i*):** Aumento de i* desloca a BP para a esquerda (piora CK).

## 3. Regimes de Mobilidade de Capitais e Inclinação da BP

| Regime de Mobilidade de Capitais | Inclinação da Curva BP | Características Principais |
| :------------------------------- | :--------------------- | :------------------------- |
| **Perfeita Mobilidade**          | Horizontal ($i = i*$)  | Fluxos de capital infinitamente sensíveis a $i - i*$. Qualquer desvio de $i$ de $i*$ causa fluxos massivos. |
| **Imperfeita Mobilidade**        | Positivamente Inclinada | Fluxos de capital sensíveis a $i - i*$, mas não infinitamente. Um aumento na renda (piora CC) exige aumento nos juros (melhora CK) para equilíbrio. |
| **Sem Mobilidade**               | Vertical               | Fluxos de capital inexistentes ou insignificantes. BP depende apenas da conta corrente (NX). |

## 4. Regimes de Câmbio

| Regime de Câmbio | Características Principais |
| :--------------- | :------------------------- |
| **Fixo**         | A autoridade monetária intervém para manter a taxa de câmbio em um nível predeterminado. |
| **Flexível**     | A taxa de câmbio é determinada pelas forças de mercado (oferta e demanda por moeda estrangeira). |

## 5. Análise de Políticas Econômicas

### 5.1. Câmbio Fixo e Sem Mobilidade de Capitais
*   **Política Fiscal Expansionista:** Eficaz. Aumento de G desloca IS para a direita, aumentando Y. O déficit no BP resultante é coberto por intervenção do BC, que não afeta a oferta de moeda (já que não há mobilidade de capitais para gerar fluxos compensatórios). A LM permanece estável.
*   **Política Monetária Expansionista:** Ineficaz. Aumento de M desloca LM para a direita, reduzindo i e aumentando Y. O déficit no BP resultante (devido ao aumento de importações) força o BC a vender reservas e contrair a oferta de moeda, deslocando a LM de volta à posição original. O único efeito é a perda de reservas.

### 5.2. Câmbio Flexível e Sem Mobilidade de Capitais
*   **Política Fiscal Expansionista:** Eficaz. Aumento de G desloca IS para a direita, aumentando Y e i. O déficit no BP (aumento de importações) causa desvalorização cambial, que desloca IS e BP ainda mais para a direita, potencializando o aumento de Y. (Conforme vídeo 6, embora o vídeo tenha se referido a este cenário como câmbio flexível e sem mobilidade de capitais, a análise do vídeo 6 pareceu focar em câmbio flexível com mobilidade imperfeita, mas sem explicitar o grau de mobilidade de capitais. No entanto, a conclusão de eficácia da política fiscal é mantida).
*   **Política Monetária Expansionista:** Eficaz. Aumento de M desloca LM para a direita, reduzindo i e aumentando Y. O déficit no BP (aumento de importações e saída de capitais) causa desvalorização cambial, que desloca IS e BP para a direita, potencializando o aumento de Y. (Conforme vídeo 7, embora o vídeo tenha se referido a este cenário como câmbio flexível e sem mobilidade de capitais, a análise do vídeo 7 pareceu focar em câmbio flexível com mobilidade imperfeita, mas sem explicitar o grau de mobilidade de capitais. No entanto, a conclusão de eficácia da política monetária é mantida).

### 5.3. Câmbio Fixo e Perfeita Mobilidade de Capitais
*   **Política Fiscal Expansionista:** Eficaz. Aumento de G desloca IS para a direita, aumentando Y e i. O aumento de i atrai capital estrangeiro, gerando superávit no BP. Para manter o câmbio fixo, o BC compra moeda estrangeira e emite moeda doméstica, deslocando a LM para a direita e reforçando o aumento de Y. (Não detalhado nos vídeos, mas é um resultado padrão do modelo Mundell-Fleming).
*   **Política Monetária Expansionista:** Ineficaz. Aumento de M desloca LM para a direita, reduzindo i. A queda de i causa fuga de capitais, gerando déficit no BP. Para manter o câmbio fixo, o BC vende moeda estrangeira e retira moeda doméstica, deslocando a LM de volta à posição original. O único efeito é a perda de reservas.

### 5.4. Câmbio Flexível e Perfeita Mobilidade de Capitais
*   **Política Fiscal Expansionista:** Ineficaz. Aumento de G desloca IS para a direita, aumentando Y e i. O aumento de i atrai capital, gerando superávit no BP. Sob câmbio flexível, isso causa valorização cambial, que reduz NX e desloca a IS de volta à posição original, anulando o efeito da política fiscal. (Não detalhado nos vídeos, mas é um resultado padrão do modelo Mundell-Fleming).
*   **Política Monetária Expansionista:** Eficaz. Aumento de M desloca LM para a direita, reduzindo i. A queda de i causa fuga de capitais, gerando déficit no BP. Sob câmbio flexível, isso causa desvalorização cambial, que aumenta NX e desloca a IS para a direita, potencializando o aumento de Y. (Não detalhado nos vídeos, mas é um resultado padrão do modelo Mundell-Fleming).

## 6. Observações sobre os Vídeos
*   O vídeo 6 e 7, embora mencionem 
câmbio flexível e sem mobilidade de capitais, a análise apresentada parece mais alinhada com imperfeita mobilidade de capitais, sem explicitar o grau. No entanto, as conclusões sobre a eficácia das políticas são mantidas.
*   Alguns cenários clássicos do modelo Mundell-Fleming (perfeita mobilidade de capitais com câmbio fixo e flexível) não foram detalhados nos vídeos, mas são cruciais para uma compreensão completa do modelo e serão incluídos na estrutura do simulador.

## 7. Estrutura para o Simulador (IDE Kiro)

Com base na análise, a estrutura do simulador deve permitir:

1.  **Definição de Parâmetros Iniciais:**
    *   Parâmetros das equações IS, LM e BP (e.g., propensão marginal a consumir, sensibilidade do investimento à taxa de juros, sensibilidade da demanda por moeda à renda e juros, sensibilidade dos fluxos de capital ao diferencial de juros).
    *   Valores iniciais para variáveis exógenas (G, T, M, Y*, i*, E).

2.  **Seleção de Regime:**
    *   **Regime de Câmbio:** Fixo ou Flexível.
    *   **Mobilidade de Capitais:** Perfeita, Imperfeita ou Nula.

3.  **Aplicação de Choques de Política:**
    *   **Política Fiscal:** Variação em G ou T.
    *   **Política Monetária:** Variação em M.
    *   **Política Cambial:** Variação em E (apenas para câmbio fixo, ou como choque exógeno em flexível).
    *   **Choques Externos:** Variação em Y* ou i*.

4.  **Cálculo do Novo Equilíbrio:**
    *   O simulador deve resolver o sistema de equações para encontrar os novos valores de equilíbrio de Y e i após o choque.
    *   Para câmbio flexível, o simulador deve ajustar E até que o BP esteja em equilíbrio.

5.  **Visualização Gráfica:**
    *   Representação das curvas IS, LM e BP.
    *   Deslocamento das curvas após o choque.
    *   Identificação dos pontos de equilíbrio inicial e final.

6.  **Análise de Resultados:**
    *   Exibição dos valores numéricos das variáveis antes e depois do choque.
    *   Interpretação da eficácia das políticas sob o regime selecionado.

## 8. Equações Detalhadas para o Simulador

### 8.1. Curva IS
$Y = C_0 + c(Y-T_0) + I_0 - b i + G_0 + X_0 + x_1 Y^* + x_2 E - M_0 - m_1 Y - m_2 E$

Simplificando:
$Y = \frac{1}{1 - c + m_1} [C_0 - cT_0 + I_0 - b i + G_0 + X_0 + x_1 Y^* + (x_2 - m_2) E - M_0]$

Onde:
*   $C_0, I_0, G_0, T_0, X_0, M_0$: Componentes autônomos
*   $c$: Propensão marginal a consumir
*   $b$: Sensibilidade do investimento à taxa de juros
*   $x_1$: Sensibilidade das exportações à renda externa
*   $x_2$: Sensibilidade das exportações à taxa de câmbio
*   $m_1$: Propensão marginal a importar
*   $m_2$: Sensibilidade das importações à taxa de câmbio

### 8.2. Curva LM
$M/P = L_0 + k Y - h i$

Onde:
*   $L_0$: Demanda autônoma por moeda
*   $k$: Sensibilidade da demanda por moeda à renda
*   $h$: Sensibilidade da demanda por moeda à taxa de juros

### 8.3. Curva BP
$BP = NX + CK = 0$

$NX = X_0 + x_1 Y^* + x_2 E - M_0 - m_1 Y - m_2 E$
$CK = K_0 + f (i - i^*)$

Onde:
*   $K_0$: Fluxo autônomo de capital
*   $f$: Sensibilidade dos fluxos de capital ao diferencial de juros

**Observações para BP:**
*   **Perfeita Mobilidade:** $f \to \infty$, então $i = i^*$.
*   **Sem Mobilidade:** $f = 0$, então $BP = NX = 0$.
*   **Imperfeita Mobilidade:** $f > 0$ e finito.

## 9. Considerações para a Implementação na IDE Kiro

*   **Linguagem de Programação:** Python é uma excelente escolha para modelagem econômica e visualização (bibliotecas como NumPy, SciPy, Matplotlib, Plotly).
*   **Interface do Usuário:** Uma interface gráfica simples para entrada de parâmetros e visualização dos resultados seria ideal. Pode ser implementada com bibliotecas como Tkinter, PyQt, ou frameworks web como Flask/Django para uma solução mais interativa.
*   **Módulos:** Separar o código em módulos para cada curva (IS, LM, BP) e para a lógica de equilíbrio e simulação de choques.
*   **Validação:** Implementar validações para os parâmetros de entrada para garantir que os valores sejam economicamente razoáveis.
*   **Documentação:** Comentar o código e fornecer documentação clara sobre as equações e a lógica do simulador.

Este documento serve como uma base completa para o desenvolvimento do simulador, cobrindo os aspectos teóricos e práticos necessários para a implementação na IDE Kiro.
