# Guia Detalhado de Simulações do Modelo IS-LM-BP

Este guia apresenta uma série de simulações do modelo IS-LM-BP (Mundell-Fleming), detalhando os deslocamentos das curvas e os efeitos resultantes de políticas econômicas sob diferentes regimes de câmbio e mobilidade de capitais. As análises são baseadas nos conceitos apresentados na playlist de vídeos fornecida.

## 1. Fundamentos do Modelo IS-LM-BP

O modelo IS-LM-BP estende o modelo IS-LM para uma economia aberta, incorporando o balanço de pagamentos. Ele descreve o equilíbrio simultâneo nos mercados de bens e serviços (curva IS), monetário (curva LM) e externo (curva BP).

*   **Curva IS:** Representa o equilíbrio no mercado de bens e serviços, onde a produção (Y) é igual à demanda agregada. É negativamente inclinada, pois uma queda na taxa de juros (i) estimula o investimento, aumentando a renda. Em economia aberta, é influenciada por exportações líquidas (NX), que dependem da renda interna (Y), renda externa (Y*) e taxa de câmbio real (E).
*   **Curva LM:** Representa o equilíbrio no mercado monetário, onde a oferta de moeda é igual à demanda por moeda. É positivamente inclinada, pois um aumento na renda (Y) eleva a demanda por moeda, exigindo um aumento na taxa de juros (i) para manter o equilíbrio.
*   **Curva BP:** Representa o equilíbrio no balanço de pagamentos (BP=0), onde o saldo da conta corrente (NX) e da conta de capital (CK) se anulam. Sua inclinação depende do grau de mobilidade de capitais.

### Regimes de Mobilidade de Capitais e Inclinação da BP

| Regime de Mobilidade de Capitais | Inclinação da Curva BP | Características |
| :------------------------------- | :--------------------- | :-------------- |
| **Perfeita Mobilidade**          | Horizontal ($i = i*$)  | Fluxos de capital infinitamente sensíveis ao diferencial de juros. Qualquer $i \neq i*$ gera fluxos massivos. |
| **Imperfeita Mobilidade**        | Positivamente Inclinada | Fluxos de capital sensíveis ao diferencial de juros, mas não infinitamente. Um aumento em Y (piora NX) exige aumento em i (melhora CK) para equilíbrio. |
| **Sem Mobilidade**               | Vertical               | Fluxos de capital inexistentes ou insignificantes. BP depende apenas da conta corrente (NX). |

### Regimes de Câmbio

| Regime de Câmbio | Características |
| :--------------- | :-------------- |
| **Fixo**         | A autoridade monetária intervém no mercado de câmbio para manter a taxa de câmbio em um nível predeterminado. |
| **Flexível**     | A taxa de câmbio é determinada livremente pelas forças de mercado (oferta e demanda por moeda estrangeira). |

## 2. Simulações de Políticas Econômicas

### 2.1. Câmbio Fixo e Sem Mobilidade de Capitais

Neste regime, o Banco Central (BC) mantém a taxa de câmbio fixa, e não há fluxos de capital em resposta a diferenciais de juros. A curva BP é vertical, pois o equilíbrio externo depende apenas da renda que iguala exportações e importações.

#### 2.1.1. Política Fiscal Expansionista (Aumento de G)

*   **Choque Inicial:** Aumento dos gastos do governo (G). A curva IS se desloca para a direita (de $IS_1$ para $IS_2$), elevando a renda (Y) e a taxa de juros (i) no equilíbrio interno (ponto B).
*   **Impacto no BP:** O aumento da renda (Y) leva a um aumento das importações, gerando um déficit na conta corrente e, consequentemente, no Balanço de Pagamentos (BP). A economia se encontra à direita da curva BP vertical.
*   **Mecanismo de Ajuste:** Para manter o câmbio fixo, o BC não pode permitir a desvalorização da moeda. Como não há mobilidade de capitais para compensar o déficit, o BC não precisa intervir no mercado monetário. A oferta de moeda permanece inalterada, e a curva LM não se desloca.
*   **Resultado Final:** A política fiscal é **eficaz**. A renda aumenta de $Y_1$ para $Y_2$, e a taxa de juros aumenta de $i_1$ para $i_2$. O novo equilíbrio é o ponto B, com um déficit no BP que o BC precisa financiar com suas reservas.
*   **Por que:** O aumento da demanda agregada via G eleva a renda. A ausência de mobilidade de capitais impede que a elevação dos juros atraia capital, e o câmbio fixo impede a desvalorização que anularia o efeito. O BC apenas cobre o déficit externo sem afetar a oferta monetária interna.

#### 2.1.2. Política Monetária Expansionista (Aumento de M)

*   **Choque Inicial:** Aumento da oferta de moeda (M). A curva LM se desloca para a direita (de $LM_1$ para $LM_2$), reduzindo a taxa de juros (i) e aumentando a renda (Y) no equilíbrio interno (ponto B).
*   **Impacto no BP:** O aumento da renda (Y) leva a um aumento das importações, gerando um déficit na conta corrente e no Balanço de Pagamentos (BP). A economia se encontra à direita da curva BP vertical.
*   **Mecanismo de Ajuste:** Para manter o câmbio fixo, o BC deve intervir vendendo moeda estrangeira e comprando moeda doméstica. Essa intervenção reduz a oferta de moeda interna.
*   **Resultado Final:** A política monetária é **ineficaz**. A curva LM se desloca de volta para a esquerda (de $LM_2$ para $LM_1$), retornando ao equilíbrio inicial (ponto A). A renda e a taxa de juros voltam aos seus níveis originais. O único efeito duradouro é a **perda de reservas internacionais** pelo BC.
*   **Por que:** O BC é obrigado a anular a expansão monetária para defender a taxa de câmbio fixa. A perda de reservas é o custo de tentar uma política monetária independente sob câmbio fixo e sem mobilidade de capitais.

### 2.2. Câmbio Flexível e Sem Mobilidade de Capitais

Neste regime, a taxa de câmbio se ajusta livremente para equilibrar o balanço de pagamentos, e não há fluxos de capital em resposta a diferenciais de juros. A curva BP é vertical, mas sua posição é determinada pela taxa de câmbio de equilíbrio.

#### 2.2.1. Política Fiscal Expansionista (Aumento de G)

*   **Choque Inicial:** Aumento dos gastos do governo (G). A curva IS se desloca para a direita (de $IS_1$ para $IS_2$), elevando a renda (Y) e a taxa de juros (i) no equilíbrio interno (ponto B).
*   **Impacto no BP:** O aumento da renda (Y) leva a um aumento das importações, gerando um déficit na conta corrente e no Balanço de Pagamentos (BP). A economia se encontra à direita da curva BP vertical.
*   **Mecanismo de Ajuste:** Sob câmbio flexível, o déficit no BP causa uma **desvalorização da moeda nacional**. Essa desvalorização torna as exportações mais competitivas e as importações mais caras, aumentando as exportações líquidas (NX). O aumento de NX desloca a curva IS ainda mais para a direita e a curva BP também para a direita.
*   **Resultado Final:** A política fiscal é **eficaz**. A renda aumenta de $Y_1$ para $Y_2$, e a taxa de juros aumenta de $i_1$ para $i_2$. O novo equilíbrio (ponto C) é alcançado com uma renda significativamente maior e uma taxa de câmbio desvalorizada. (Conforme análise do vídeo 6, que, embora tenha se referido a este cenário, a análise parecia mais alinhada com imperfeita mobilidade de capitais, mas a conclusão de eficácia é mantida).
*   **Por que:** A desvalorização cambial atua como um multiplicador do efeito fiscal, impulsionando ainda mais a demanda agregada via exportações líquidas. O câmbio flexível permite que o ajuste externo reforce a política fiscal.

#### 2.2.2. Política Monetária Expansionista (Aumento de M)

*   **Choque Inicial:** Aumento da oferta de moeda (M). A curva LM se desloca para a direita (de $LM_1$ para $LM_2$), reduzindo a taxa de juros (i) e aumentando a renda (Y) no equilíbrio interno (ponto B).
*   **Impacto no BP:** O aumento da renda (Y) leva a um aumento das importações, gerando um déficit na conta corrente e no Balanço de Pagamentos (BP). A economia se encontra à direita da curva BP vertical.
*   **Mecanismo de Ajuste:** Sob câmbio flexível, o déficit no BP causa uma **desvalorização da moeda nacional**. Essa desvalorização torna as exportações mais competitivas e as importações mais caras, aumentando as exportações líquidas (NX). O aumento de NX desloca a curva IS para a direita e a curva BP também para a direita.
*   **Resultado Final:** A política monetária é **eficaz**. A renda aumenta de $Y_1$ para $Y_2$, e a taxa de juros diminui de $i_1$ para $i_2$. O novo equilíbrio (ponto C) é alcançado com uma renda significativamente maior e uma taxa de câmbio desvalorizada. (Conforme análise do vídeo 7, que, embora tenha se referido a este cenário, a análise parecia mais alinhada com imperfeita mobilidade de capitais, mas a conclusão de eficácia é mantida).
*   **Por que:** A desvalorização cambial induzida pela política monetária estimula as exportações líquidas, reforçando o efeito expansionista da política monetária sobre a renda. O câmbio flexível permite que a política monetária seja uma ferramenta poderosa.

### 2.3. Câmbio Fixo e Perfeita Mobilidade de Capitais

Neste regime, o BC mantém a taxa de câmbio fixa, e os fluxos de capital são infinitamente sensíveis a qualquer diferencial entre a taxa de juros doméstica (i) e a internacional (i*). A curva BP é horizontal no nível de $i = i*$.

#### 2.3.1. Política Fiscal Expansionista (Aumento de G)

*   **Choque Inicial:** Aumento dos gastos do governo (G). A curva IS se desloca para a direita (de $IS_1$ para $IS_2$), elevando a renda (Y) e a taxa de juros (i) no equilíbrio interno (ponto B).
*   **Impacto no BP:** O aumento da taxa de juros (i) acima de $i*$ atrai um fluxo massivo de capitais estrangeiros, gerando um superávit no Balanço de Pagamentos (BP). A economia se encontra acima da curva BP horizontal.
*   **Mecanismo de Ajuste:** Para manter o câmbio fixo, o BC é obrigado a intervir comprando moeda estrangeira (para evitar a valorização) e, consequentemente, emitindo moeda doméstica. Essa emissão de moeda aumenta a oferta monetária, deslocando a curva LM para a direita (de $LM_1$ para $LM_2$).
*   **Resultado Final:** A política fiscal é **altamente eficaz**. A renda aumenta de $Y_1$ para $Y_2$, e a taxa de juros retorna ao nível internacional ($i = i*$). O novo equilíbrio (ponto C) é alcançado com uma renda significativamente maior. (Cenário clássico do modelo Mundell-Fleming, não detalhado nos vídeos, mas fundamental).
*   **Por que:** A perfeita mobilidade de capitais e o câmbio fixo forçam o BC a acomodar a política fiscal com uma política monetária expansionista. O BC perde o controle da oferta de moeda, que se torna endógena para defender o câmbio.

#### 2.3.2. Política Monetária Expansionista (Aumento de M)

*   **Choque Inicial:** Aumento da oferta de moeda (M). A curva LM se desloca para a direita (de $LM_1$ para $LM_2$), reduzindo a taxa de juros (i) e aumentando a renda (Y) no equilíbrio interno (ponto B).
*   **Impacto no BP:** A queda da taxa de juros (i) abaixo de $i*$ provoca uma fuga massiva de capitais, gerando um déficit no Balanço de Pagamentos (BP). A economia se encontra abaixo da curva BP horizontal.
*   **Mecanismo de Ajuste:** Para manter o câmbio fixo, o BC é obrigado a intervir vendendo moeda estrangeira (para evitar a desvalorização) e, consequentemente, retirando moeda doméstica de circulação. Essa contração da oferta de moeda desloca a curva LM de volta para a esquerda (de $LM_2$ para $LM_1$).
*   **Resultado Final:** A política monetária é **ineficaz**. A renda e a taxa de juros retornam aos seus níveis originais (ponto A). O único efeito duradouro é a **perda de reservas internacionais** pelo BC. (Cenário clássico do modelo Mundell-Fleming, não detalhado nos vídeos, mas fundamental).
*   **Por que:** A perfeita mobilidade de capitais e o câmbio fixo tornam a política monetária completamente ineficaz. Qualquer tentativa de alterar a oferta de moeda é anulada pela intervenção do BC para defender a taxa de câmbio.

### 2.4. Câmbio Flexível e Perfeita Mobilidade de Capitais

Neste regime, a taxa de câmbio se ajusta livremente, e os fluxos de capital são infinitamente sensíveis ao diferencial de juros. A curva BP é horizontal no nível de $i = i*$, e a taxa de câmbio se ajusta para manter o equilíbrio externo.

#### 2.4.1. Política Fiscal Expansionista (Aumento de G)

*   **Choque Inicial:** Aumento dos gastos do governo (G). A curva IS se desloca para a direita (de $IS_1$ para $IS_2$), elevando a renda (Y) e a taxa de juros (i) no equilíbrio interno (ponto B).
*   **Impacto no BP:** O aumento da taxa de juros (i) acima de $i*$ atrai um fluxo massivo de capitais estrangeiros, gerando um superávit no Balanço de Pagamentos (BP). A economia se encontra acima da curva BP horizontal.
*   **Mecanismo de Ajuste:** Sob câmbio flexível, o superávit no BP causa uma **valorização da moeda nacional**. Essa valorização torna as exportações menos competitivas e as importações mais baratas, reduzindo as exportações líquidas (NX). A redução de NX desloca a curva IS de volta para a esquerda (de $IS_2$ para $IS_1$).
*   **Resultado Final:** A política fiscal é **ineficaz**. A renda e a taxa de juros retornam aos seus níveis originais (ponto A). O efeito expansionista inicial é completamente anulado pela valorização cambial. (Cenário clássico do modelo Mundell-Fleming, não detalhado nos vídeos, mas fundamental).
*   **Por que:** A valorização cambial induzida pelos fluxos de capital anula o efeito da política fiscal sobre a demanda agregada. O 
crowding out" ocorre via setor externo.

#### 2.4.2. Política Monetária Expansionista (Aumento de M)

*   **Choque Inicial:** Aumento da oferta de moeda (M). A curva LM se desloca para a direita (de $LM_1$ para $LM_2$), reduzindo a taxa de juros (i) e aumentando a renda (Y) no equilíbrio interno (ponto B).
*   **Impacto no BP:** A queda da taxa de juros (i) abaixo de $i*$ provoca uma fuga massiva de capitais, gerando um déficit no Balanço de Pagamentos (BP). A economia se encontra abaixo da curva BP horizontal.
*   **Mecanismo de Ajuste:** Sob câmbio flexível, o déficit no BP causa uma **desvalorização da moeda nacional**. Essa desvalorização torna as exportações mais competitivas e as importações mais caras, aumentando as exportações líquidas (NX). O aumento de NX desloca a curva IS para a direita (de $IS_1$ para $IS_2$).
*   **Resultado Final:** A política monetária é **altamente eficaz**. A renda aumenta de $Y_1$ para $Y_2$, e a taxa de juros retorna ao nível internacional ($i = i*$). O novo equilíbrio (ponto C) é alcançado com uma renda significativamente maior e uma taxa de câmbio desvalorizada. (Cenário clássico do modelo Mundell-Fleming, não detalhado nos vídeos, mas fundamental).
*   **Por que:** A desvalorização cambial induzida pela política monetária reforça o efeito expansionista, tornando-a uma ferramenta muito poderosa para influenciar a renda.

### 2.5. Câmbio Fixo e Imperfeita Mobilidade de Capitais

Neste regime, o BC mantém a taxa de câmbio fixa, e os fluxos de capital são sensíveis ao diferencial de juros, mas não infinitamente. A curva BP é positivamente inclinada.

#### 2.5.1. Política Fiscal Expansionista (Aumento de G)

*   **Choque Inicial:** Aumento dos gastos do governo (G). A curva IS se desloca para a direita (de $IS_1$ para $IS_2$), elevando a renda (Y) e a taxa de juros (i) no equilíbrio interno (ponto B).
*   **Impacto no BP:** No ponto B, a economia pode estar em superávit ou déficit no BP, dependendo da inclinação relativa da BP e da LM. Se a BP for mais inclinada que a LM, haverá déficit (aumento de importações supera entrada de capital). Se a BP for menos inclinada que a LM, haverá superávit (entrada de capital supera aumento de importações).
*   **Mecanismo de Ajuste:** Para manter o câmbio fixo, o BC intervém. Se houver déficit, vende moeda estrangeira e retira moeda doméstica, deslocando a LM para a esquerda. Se houver superávit, compra moeda estrangeira e emite moeda doméstica, deslocando a LM para a direita.
*   **Resultado Final:** A política fiscal é **eficaz**, mas sua magnitude depende da inclinação relativa das curvas BP e LM. Se a BP for menos inclinada que a LM, a política fiscal é mais eficaz, pois o BC é forçado a expandir a oferta de moeda, reforçando o efeito fiscal. (Conforme análise do vídeo 7, que aborda este cenário).
*   **Por que:** A intervenção do BC para defender o câmbio fixo pode reforçar ou atenuar o efeito da política fiscal, dependendo dos fluxos de capital resultantes.

#### 2.5.2. Política Monetária Expansionista (Aumento de M)

*   **Choque Inicial:** Aumento da oferta de moeda (M). A curva LM se desloca para a direita (de $LM_1$ para $LM_2$), reduzindo a taxa de juros (i) e aumentando a renda (Y) no equilíbrio interno (ponto B).
*   **Impacto no BP:** A queda da taxa de juros (i) e o aumento da renda (Y) levam a um déficit no Balanço de Pagamentos (saída de capital e aumento de importações). A economia se encontra à direita da curva BP.
*   **Mecanismo de Ajuste:** Para manter o câmbio fixo, o BC é obrigado a intervir vendendo moeda estrangeira e retirando moeda doméstica de circulação. Essa contração da oferta de moeda desloca a curva LM de volta para a esquerda (de $LM_2$ para $LM_1$).
*   **Resultado Final:** A política monetária é **ineficaz**. A renda e a taxa de juros retornam aos seus níveis originais (ponto A). O único efeito duradouro é a **perda de reservas internacionais** pelo BC. (Conforme análise do vídeo 8, que aborda este cenário).
*   **Por que:** Assim como no caso de perfeita mobilidade, o BC perde o controle da política monetária para defender o câmbio fixo. A diferença é que os fluxos de capital não são infinitos, mas ainda suficientes para anular a política monetária.

### 2.6. Câmbio Flexível e Imperfeita Mobilidade de Capitais

Neste regime, a taxa de câmbio se ajusta livremente, e os fluxos de capital são sensíveis ao diferencial de juros, mas não infinitamente. A curva BP é positivamente inclinada, e a taxa de câmbio se ajusta para manter o equilíbrio externo.

#### 2.6.1. Política Fiscal Expansionista (Aumento de G)

*   **Choque Inicial:** Aumento dos gastos do governo (G). A curva IS se desloca para a direita (de $IS_1$ para $IS_2$), elevando a renda (Y) e a taxa de juros (i) no equilíbrio interno (ponto B).
*   **Impacto no BP:** No ponto B, a economia pode estar em superávit ou déficit no BP. Se houver superávit (i sobe mais que Y aumenta importações), a moeda valoriza. Se houver déficit (Y aumenta importações mais que i sobe atrai capital), a moeda desvaloriza.
*   **Mecanismo de Ajuste:** Sob câmbio flexível, a taxa de câmbio se ajusta para equilibrar o BP. Se houver superávit, a moeda valoriza, reduzindo NX e deslocando a IS para a esquerda. Se houver déficit, a moeda desvaloriza, aumentando NX e deslocando a IS para a direita.
*   **Resultado Final:** A política fiscal é **eficaz**, mas seu efeito é atenuado ou potencializado pela variação cambial. Se a BP for mais inclinada que a LM, a política fiscal é mais eficaz, pois a desvalorização cambial reforça o efeito. Se a BP for menos inclinada que a LM, a política fiscal é menos eficaz, pois a valorização cambial atenua o efeito. (Cenário abordado no vídeo 6, que, embora tenha se referido a câmbio flexível e sem mobilidade de capitais, a análise se encaixa melhor aqui).
*   **Por que:** A variação cambial atua como um mecanismo de ajuste que pode reforçar ou atenuar o impacto da política fiscal, dependendo da sensibilidade dos fluxos de capital e da propensão a importar.

#### 2.6.2. Política Monetária Expansionista (Aumento de M)

*   **Choque Inicial:** Aumento da oferta de moeda (M). A curva LM se desloca para a direita (de $LM_1$ para $LM_2$), reduzindo a taxa de juros (i) e aumentando a renda (Y) no equilíbrio interno (ponto B).
*   **Impacto no BP:** A queda da taxa de juros (i) e o aumento da renda (Y) levam a um déficit no Balanço de Pagamentos (saída de capital e aumento de importações). A economia se encontra à direita da curva BP.
*   **Mecanismo de Ajuste:** Sob câmbio flexível, o déficit no BP causa uma **desvalorização da moeda nacional**. Essa desvalorização torna as exportações mais competitivas e as importações mais caras, aumentando as exportações líquidas (NX). O aumento de NX desloca a curva IS para a direita (de $IS_1$ para $IS_2$).
*   **Resultado Final:** A política monetária é **eficaz**. A renda aumenta de $Y_1$ para $Y_2$, e a taxa de juros diminui de $i_1$ para $i_2$. O novo equilíbrio (ponto C) é alcançado com uma renda significativamente maior e uma taxa de câmbio desvalorizada. (Cenário abordado no vídeo 9, que se refere a este cenário).
*   **Por que:** A desvalorização cambial induzida pela política monetária reforça o efeito expansionista, tornando-a uma ferramenta eficaz para influenciar a renda.

## 3. Conclusão e Recomendações para o Simulador

Este guia detalha os principais cenários de política econômica no modelo IS-LM-BP. Para o seu simulador na IDE Kiro, é crucial que ele permita:

*   **Configuração de Regimes:** Seleção clara entre câmbio fixo/flexível e perfeita/imperfeita/sem mobilidade de capitais.
*   **Aplicação de Choques:** Simulação de políticas fiscais (G, T), monetárias (M) e cambiais (E, para câmbio fixo).
*   **Visualização Dinâmica:** Mostrar os deslocamentos das curvas IS, LM e BP e o trajeto do equilíbrio inicial ao final.
*   **Análise de Resultados:** Apresentar os valores numéricos de Y, i e E antes e depois do choque, juntamente com uma interpretação da eficácia da política.

Ao implementar esses cenários, seu simulador será uma ferramenta poderosa para entender as complexas interações macroeconômicas em uma economia aberta.
