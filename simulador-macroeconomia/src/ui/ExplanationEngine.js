/**
 * Explanation Engine - Generates economic explanations
 */

export class ExplanationEngine {
  constructor() {
    this.lastExplanation = '';
  }

  /**
   * Generate explanation based on context
   */
  getExplanation(context) {
    const { cause, direction, isOpenEconomy, isFloatingRate, capitalMobility, scenario, equilibrium, params } = context;
    
    // Scenario explanation takes precedence
    if (scenario && scenario.explanation) {
      return this.enrichExplanation(scenario.explanation, equilibrium, params, isOpenEconomy, isFloatingRate);
    }
    
    // Default explanation
    if (!cause) {
      return this.getDefaultExplanation(isOpenEconomy, isFloatingRate, equilibrium, params, capitalMobility);
    }
    
    // Shock-based explanation
    return this.getShockExplanation(cause, direction, isOpenEconomy, isFloatingRate, equilibrium, params);
  }

  /**
   * Default explanation with equilibrium values
   */
  getDefaultExplanation(isOpen, isFloating, eq, params, capitalMobility) {
    let html = '';

    // ── IS-LM Fechado ──
    if (!isOpen) {
      html = `<strong>📊 IS-LM — Economia Fechada</strong><br><br>
Sem comércio internacional nem fluxos de capital. O equilíbrio ocorre onde o mercado de bens (IS) cruza o mercado monetário (LM).<br><br>
<strong>Política Fiscal:</strong> EFICAZ — Desloca IS, mas com efeito crowding-out sobre o investimento.<br>
<strong>Política Monetária:</strong> EFICAZ — Desloca LM, altera juros e estimula investimento.`;
    }

    // ── IS-LM-BP: Mobilidade Perfeita ──
    else if (capitalMobility === 'perfect') {
      const istar = params?.rstar?.toFixed(2) || params?.istar?.toFixed(2) || 'i*';
      if (isFloating) {
        html = `<strong>📊 IS-LM-BP — Mobilidade Perfeita de Capitais · Câmbio Flutuante</strong><br><br>
<em>Ativos domésticos/estrangeiros perfeitamente substituíveis; equilíbrio BP só depende de i = i* = ${istar}%.</em><br><br>
<strong>🔵 Política Fiscal:</strong> <span style="color:#dc2626">INEFICAZ</span><br>
→ Expansão IS eleva i acima de i* → entrada de capitais aprecia e (câmbio cai) → reduz exportações líquidas (Xn) → IS retorna ao ponto inicial.<br><br>
<strong>🟢 Política Monetária:</strong> <span style="color:#16a34a">SUPER EFICAZ</span><br>
→ Expansão LM baixa i abaixo de i* → saída de capitais deprecia e → eleva Xn → IS desloca à direita → Y aumenta fortemente via canal cambial.`;
      } else {
        html = `<strong>📊 IS-LM-BP — Mobilidade Perfeita de Capitais · Câmbio Fixo</strong><br><br>
<em>Ativos domésticos/estrangeiros perfeitamente substituíveis; equilíbrio BP só depende de i = i* = ${istar}%.</em><br><br>
<strong>🔵 Política Fiscal:</strong> <span style="color:#16a34a">EFICAZ</span><br>
→ Expansão IS eleva i acima de i* → entrada de capitais pressiona valorização → BC compra moeda para fixar e, expandindo M automaticamente → LM desloca à direita, sustentando Y maior.<br><br>
<strong>🟢 Política Monetária:</strong> <span style="color:#dc2626">INEFICAZ</span><br>
→ Expansão LM baixa i abaixo de i* → saída de capitais pressiona desvalorização → BC vende reservas, reabsorvendo moeda → LM retorna ao ponto inicial.`;
      }
    }

    // ── IS-LM-BP: Mobilidade Imperfeita ──
    else if (capitalMobility === 'imperfect') {
      if (isFloating) {
        html = `<strong>📊 IS-LM-BP — Mobilidade Imperfeita de Capitais · Câmbio Flutuante</strong><br><br>
<em>Equilíbrio BP depende de Y (transações correntes) e i (capitais); inclinação positiva reflete elasticidades.</em><br><br>
<strong>🔵 Política Fiscal:</strong> <span style="color:#16a34a">MODERADAMENTE EFICAZ</span><br>
→ Expansão IS eleva Y e i → apreciação parcial de e reduz Xn, mas não totalmente → equilíbrio em Y e i mais altos, com ajuste cambial parcial.<br><br>
<strong>🟢 Política Monetária:</strong> <span style="color:#16a34a">MAIS EFICAZ QUE FISCAL</span><br>
→ Expansão LM baixa i → saída de capitais deprecia e → Xn sobe → maior ajuste em Y. Equilíbrio com volatilidade cambial maior.`;
      } else {
        html = `<strong>📊 IS-LM-BP — Mobilidade Imperfeita de Capitais · Câmbio Fixo</strong><br><br>
<em>Equilíbrio BP depende de Y (transações correntes) e i (capitais); inclinação positiva reflete elasticidades.</em><br><br>
<strong>🔵 Políticas Mistas:</strong> <span style="color:#16a34a">EFICAZES</span><br>
→ Expansão fiscal eleva Y e i → entrada de capitais pressiona valorização → BC intervém vendendo reservas para fixar e → expansão moderada de Y com juros mais altos.<br><br>
<strong>🟢 Política Monetária:</strong> PARCIALMENTE EFICAZ<br>
→ Queda de i aumenta déficits BP (saída de capitais), mas Y cresce moderadamente. BC intervém com reservas para manter e fixo.`;
      }
    }

    // ── IS-LM-BP: Sem Mobilidade (BP Vertical) ──
    else if (capitalMobility === 'zero') {
      if (isFloating) {
        html = `<strong>📊 IS-LM-BP — Sem Mobilidade de Capitais · Câmbio Flutuante</strong><br><br>
<em>Sem fluxos de capitais; BP = apenas transações correntes Xn(Y, e). BP vertical.</em><br><br>
<strong>🔵 Política Fiscal:</strong> <span style="color:#dc2626">INEFICAZ</span><br>
→ Expansão IS aumenta Y → piora BP (mais importações) → deprecia e, restaurando Xn → IS retorna e Y muda pouco.<br><br>
<strong>🟢 Política Monetária:</strong> <span style="color:#16a34a">EFICAZ</span><br>
→ Expansão LM baixa i → deprecia e → eleva Xn → IS desloca à direita → Y aumenta. Ajuste se dá inteiramente pelo câmbio.`;
      } else {
        html = `<strong>📊 IS-LM-BP — Sem Mobilidade de Capitais · Câmbio Fixo</strong><br><br>
<em>Sem fluxos de capitais; BP = apenas transações correntes Xn(Y, e). BP vertical.</em><br><br>
<strong>🔵 Política Fiscal:</strong> <span style="color:#16a34a">EFICAZ</span><br>
→ Expansão IS aumenta Y → piora BP → BC intervém com reservas para fixar e → Y sobe mas com perda de reservas.<br><br>
<strong>🟢 Política Monetária:</strong> LIMITADA<br>
→ Expansão LM pode conflitar com nível de reservas do BC. Se reservas forem baixas, a sustentação do câmbio é comprometida.`;
      }
    }

    // Fallback
    else {
      html = `<strong>📊 Modelo IS-LM-BP</strong><br><br>Selecione uma combinação de Mobilidade e Câmbio para ver a análise detalhada.`;
    }

    // Equilibrium values
    if (eq) {
      html += `<br><br><strong>🎯 Equilíbrio Atual:</strong><br>`;
      html += `• Renda (Y): ${Math.round(eq.Y)}<br>`;
      html += `• Taxa de Juros (i): ${eq.r?.toFixed(2)}%<br>`;
      if (isOpen && isFloating && eq.e_eq)  html += `• Câmbio (e): R$ ${eq.e_eq.toFixed(2)}/USD<br>`;
      if (isOpen && !isFloating && eq.M_eq) html += `• Oferta de Moeda (M): ${Math.round(eq.M_eq)}<br>`;
    }

    return html;
  }

  /**
   * Shock-based explanation with detailed analysis
   */
  getShockExplanation(cause, direction, isOpen, isFloating, eq, params) {
    const key = `${cause}_${direction}_${isOpen ? 'open' : 'closed'}_${isFloating ? 'float' : 'fixed'}`;
    
    const explanations = {
      // Fiscal policy - Closed economy
      'G_up_closed_float': `<strong>🔴 Política Fiscal Expansionista (↑ Gasto Público)</strong><br><br>
        <strong>Mecanismo de Transmissão:</strong><br>
        1️⃣ G aumenta → Demanda Agregada (DA) aumenta<br>
        2️⃣ Curva IS desloca para DIREITA<br>
        3️⃣ Renda (Y) aumenta → Demanda por moeda aumenta<br>
        4️⃣ Com M fixo, taxa de juros (i) SOBE<br>
        5️⃣ Juros maiores reduzem Investimento (I) → <em>Efeito Crowding Out</em><br><br>
        <strong>Resultado Final:</strong> ↑ Y, ↑ i, ↓ I (parcial)<br>
        O aumento da renda é menor que o multiplicador keynesiano simples devido ao crowding out.`,
      
      'G_down_closed_float': `<strong>🔵 Política Fiscal Contracionista (↓ Gasto Público)</strong><br><br>
        <strong>Mecanismo:</strong><br>
        1️⃣ G diminui → DA diminui → IS desloca ESQUERDA<br>
        2️⃣ Renda (Y) cai → Demanda por moeda cai<br>
        3️⃣ Taxa de juros (i) CAI<br>
        4️⃣ Juros menores estimulam Investimento (I) → <em>Crowding In</em><br><br>
        <strong>Resultado:</strong> ↓ Y, ↓ i, ↑ I (parcial)<br>
        A queda da renda é parcialmente compensada pelo aumento do investimento privado.`,
      
      // Fiscal policy - Open floating
      'G_up_open_float': `<strong>🔴 Política Fiscal Expansionista + Câmbio Flutuante</strong><br><br>
        <strong>Mecanismo (Mundell-Fleming):</strong><br>
        1️⃣ G aumenta → IS desloca DIREITA<br>
        2️⃣ Pressão para i subir acima de i* = ${params?.rstar?.toFixed(2)}%<br>
        3️⃣ Capitais ENTRAM no país (arbitragem)<br>
        4️⃣ Moeda nacional VALORIZA (e cai)<br>
        5️⃣ Exportações caem, Importações sobem → NX cai<br>
        6️⃣ IS desloca de VOLTA para esquerda<br><br>
        <strong>⚠️ Resultado: POLÍTICA FISCAL INEFICAZ!</strong><br>
        Y retorna ao nível inicial. Apenas a composição muda: ↑ G, ↓ NX, e↓ (valorização)`,
      
      'G_down_open_float': `<strong>🔵 Política Fiscal Contracionista + Câmbio Flutuante</strong><br><br>
        <strong>Mecanismo:</strong><br>
        1️⃣ G diminui → IS desloca ESQUERDA<br>
        2️⃣ Pressão para i cair abaixo de i*<br>
        3️⃣ Capitais SAEM do país<br>
        4️⃣ Moeda DESVALORIZA (e sobe)<br>
        5️⃣ Exportações sobem, Importações caem → NX sobe<br>
        6️⃣ IS desloca de VOLTA para direita<br><br>
        <strong>Resultado:</strong> Y retorna ao inicial. Composição: ↓ G, ↑ NX, e↑ (desvalorização)`,
      
      // Fiscal policy - Open fixed
      'G_up_open_fixed': `<strong>🔴 Política Fiscal Expansionista + Câmbio Fixo</strong><br><br>
        <strong>Mecanismo (Regime de Câmbio Fixo):</strong><br>
        1️⃣ G aumenta → IS desloca DIREITA<br>
        2️⃣ Pressão para i subir acima de i* = ${params?.rstar?.toFixed(2)}%<br>
        3️⃣ Capitais ENTRAM no país<br>
        4️⃣ Pressão para VALORIZAÇÃO cambial<br>
        5️⃣ Banco Central INTERVÉM: compra USD, vende BRL<br>
        6️⃣ Oferta de moeda (M) AUMENTA automaticamente<br>
        7️⃣ LM desloca DIREITA, amplificando o efeito<br><br>
        <strong>✅ Resultado: POLÍTICA FISCAL MUITO EFICAZ!</strong><br>
        ↑↑ Y (grande aumento), i = i*, M↑ (endógeno), e fixo`,
      
      'G_down_open_fixed': `<strong>🔵 Política Fiscal Contracionista + Câmbio Fixo</strong><br><br>
        <strong>Mecanismo:</strong><br>
        1️⃣ G diminui → IS desloca ESQUERDA<br>
        2️⃣ Pressão para i cair abaixo de i*<br>
        3️⃣ Capitais SAEM (fuga de capitais)<br>
        4️⃣ Pressão para DESVALORIZAÇÃO<br>
        5️⃣ BC intervém: vende USD, compra BRL<br>
        6️⃣ M DIMINUI automaticamente<br>
        7️⃣ LM desloca ESQUERDA, amplificando a queda<br><br>
        <strong>Resultado:</strong> ↓↓ Y (grande queda), i = i*, M↓, e fixo`,
      
      // Monetary policy - Closed economy
      'M_up_closed_float': `<strong>🟢 Política Monetária Expansionista</strong><br><br>
        <strong>Mecanismo de Transmissão:</strong><br>
        1️⃣ Banco Central aumenta M (compra títulos, reduz compulsório, etc.)<br>
        2️⃣ Curva LM desloca para DIREITA<br>
        3️⃣ Com mais liquidez, taxa de juros (i) CAI<br>
        4️⃣ Juros menores estimulam Investimento (I)<br>
        5️⃣ Investimento maior aumenta Demanda Agregada<br>
        6️⃣ Renda (Y) AUMENTA<br><br>
        <strong>Resultado:</strong> ↑ Y, ↓ i, ↑ I<br>
        Política eficaz para estimular a economia em recessão.`,
      
      'M_down_closed_float': `<strong>🟢 Política Monetária Contracionista</strong><br><br>
        <strong>Mecanismo:</strong><br>
        1️⃣ BC reduz M (vende títulos, aumenta compulsório)<br>
        2️⃣ LM desloca ESQUERDA<br>
        3️⃣ Menos liquidez → i SOBE<br>
        4️⃣ Juros maiores desestimulam I<br>
        5️⃣ DA cai → Y CAI<br><br>
        <strong>Resultado:</strong> ↓ Y, ↑ i, ↓ I<br>
        Usada para controlar inflação, mas reduz atividade econômica.`,
      
      // Monetary policy - Open floating
      'M_up_open_float': `<strong>🟢 Política Monetária Expansionista + Câmbio Flutuante</strong><br><br>
        <strong>Mecanismo (Canal Cambial):</strong><br>
        1️⃣ BC aumenta M → LM desloca DIREITA<br>
        2️⃣ Pressão para i cair abaixo de i* = ${params?.rstar?.toFixed(2)}%<br>
        3️⃣ Capitais SAEM do país (buscam maior rentabilidade)<br>
        4️⃣ Moeda DESVALORIZA (e sobe)<br>
        5️⃣ Desvalorização estimula Exportações, reduz Importações<br>
        6️⃣ NX aumenta → IS desloca DIREITA<br>
        7️⃣ Novo equilíbrio: Y maior, i = i*, e maior<br><br>
        <strong>✅ Resultado: POLÍTICA MONETÁRIA EFICAZ!</strong><br>
        ↑ Y, i = i*, e↑ (desvalorização), ↑ NX`,
      
      'M_down_open_float': `<strong>🟢 Política Monetária Contracionista + Câmbio Flutuante</strong><br><br>
        <strong>Mecanismo:</strong><br>
        1️⃣ BC reduz M → LM desloca ESQUERDA<br>
        2️⃣ Pressão para i subir acima de i*<br>
        3️⃣ Capitais ENTRAM no país<br>
        4️⃣ Moeda VALORIZA (e cai)<br>
        5️⃣ Exportações caem, Importações sobem → NX cai<br>
        6️⃣ IS desloca ESQUERDA<br><br>
        <strong>Resultado:</strong> ↓ Y, i = i*, e↓ (valorização), ↓ NX`,
      
      // Monetary policy - Open fixed
      'M_up_open_fixed': `<strong>🟢 Política Monetária Expansionista + Câmbio Fixo</strong><br><br>
        <strong>Mecanismo (Esterilização Impossível):</strong><br>
        1️⃣ BC tenta aumentar M → LM desloca DIREITA<br>
        2️⃣ Pressão para i cair abaixo de i*<br>
        3️⃣ Capitais SAEM do país<br>
        4️⃣ Pressão para DESVALORIZAÇÃO cambial<br>
        5️⃣ Para manter e fixo, BC vende USD e compra BRL<br>
        6️⃣ M DIMINUI automaticamente (reverte a expansão)<br>
        7️⃣ LM volta à posição original<br><br>
        <strong>⚠️ Resultado: POLÍTICA MONETÁRIA INEFICAZ!</strong><br>
        Y não muda, i = i*, e fixo, M volta ao inicial<br>
        <em>Trilema de Mundell: não é possível ter câmbio fixo, mobilidade de capitais E política monetária independente simultaneamente.</em>`,
      
      'M_down_open_fixed': `<strong>🟢 Política Monetária Contracionista + Câmbio Fixo</strong><br><br>
        <strong>Mecanismo:</strong><br>
        1️⃣ BC tenta reduzir M → LM desloca ESQUERDA<br>
        2️⃣ Pressão para i subir acima de i*<br>
        3️⃣ Capitais ENTRAM<br>
        4️⃣ Pressão para VALORIZAÇÃO<br>
        5️⃣ BC compra USD, vende BRL para manter e fixo<br>
        6️⃣ M AUMENTA (reverte a contração)<br>
        7️⃣ LM volta à posição original<br><br>
        <strong>Resultado:</strong> Política monetária neutralizada. Y, i, e, M não mudam.`,
      
      // Exchange rate shocks
      'e_up_open_fixed': `<strong>🟣 Desvalorização Cambial (↑ e)</strong><br><br>
        <strong>Mecanismo:</strong><br>
        1️⃣ Governo/BC desvaloriza a moeda (e aumenta)<br>
        2️⃣ Bens domésticos ficam MAIS BARATOS para estrangeiros<br>
        3️⃣ Exportações (X) AUMENTAM<br>
        4️⃣ Bens importados ficam MAIS CAROS<br>
        5️⃣ Importações (M) DIMINUEM<br>
        6️⃣ Saldo Comercial (NX = X - M) melhora<br>
        7️⃣ IS desloca DIREITA<br><br>
        <strong>Resultado:</strong> ↑ Y, ↑ NX, e↑<br>
        Política comum em crises de balanço de pagamentos. Melhora competitividade externa.`,
      
      'e_down_open_fixed': `<strong>🟣 Valorização Cambial (↓ e)</strong><br><br>
        <strong>Mecanismo:</strong><br>
        1️⃣ Moeda valoriza (e diminui)<br>
        2️⃣ Bens domésticos ficam MAIS CAROS para estrangeiros<br>
        3️⃣ Exportações (X) CAEM<br>
        4️⃣ Importações (M) AUMENTAM (ficam mais baratas)<br>
        5️⃣ NX piora<br>
        6️⃣ IS desloca ESQUERDA<br><br>
        <strong>Resultado:</strong> ↓ Y, ↓ NX, e↓<br>
        Pode ser usada para controlar inflação (importados mais baratos), mas prejudica setor exportador.`,
      
      // Tax changes
      'T_up_closed_float': `<strong>🔵 Aumento de Impostos (Política Fiscal Contracionista)</strong><br><br>
        <strong>Mecanismo:</strong><br>
        1️⃣ T aumenta → Renda Disponível (Y - T) diminui<br>
        2️⃣ Consumo (C) cai [C = C₀ + c(Y - T)]<br>
        3️⃣ Demanda Agregada cai → IS desloca ESQUERDA<br>
        4️⃣ Y diminui → Demanda por moeda cai<br>
        5️⃣ Taxa de juros (i) CAI<br>
        6️⃣ Investimento (I) aumenta parcialmente<br><br>
        <strong>Resultado:</strong> ↓ Y, ↓ i, ↓ C, ↑ I (parcial)<br>
        Usado para controlar déficit público, mas reduz atividade econômica.`,
      
      'T_down_closed_float': `<strong>🔴 Redução de Impostos (Política Fiscal Expansionista)</strong><br><br>
        <strong>Mecanismo:</strong><br>
        1️⃣ T diminui → Renda Disponível (Y - T) aumenta<br>
        2️⃣ Consumo (C) aumenta<br>
        3️⃣ DA aumenta → IS desloca DIREITA<br>
        4️⃣ Y aumenta → Demanda por moeda aumenta<br>
        5️⃣ i SOBE<br>
        6️⃣ I diminui parcialmente (crowding out)<br><br>
        <strong>Resultado:</strong> ↑ Y, ↑ i, ↑ C, ↓ I (parcial)<br>
        Estimula economia, mas aumenta déficit público.`,
      
      'T_up_open_float': `<strong>🔵 Aumento de Impostos + Câmbio Flutuante</strong><br><br>
        Similar à redução de G: IS desloca esquerda, mas o ajuste cambial (desvalorização) neutraliza o efeito sobre Y. 
        Resultado: Y retorna ao inicial, ↓ C, ↑ NX, e↑`,
      
      'T_down_open_float': `<strong>🔴 Redução de Impostos + Câmbio Flutuante</strong><br><br>
        Similar ao aumento de G: IS desloca direita, mas valorização cambial neutraliza. 
        Resultado: Y retorna ao inicial, ↑ C, ↓ NX, e↓`,
      
      'T_up_open_fixed': `<strong>🔵 Aumento de Impostos + Câmbio Fixo</strong><br><br>
        IS desloca esquerda, capitais saem, BC contrai M automaticamente. 
        Resultado: ↓↓ Y (grande queda), política fiscal muito eficaz.`,
      
      'T_down_open_fixed': `<strong>🔴 Redução de Impostos + Câmbio Fixo</strong><br><br>
        IS desloca direita, capitais entram, BC expande M automaticamente. 
        Resultado: ↑↑ Y (grande aumento), política fiscal muito eficaz.`,
      
      // Structural parameters
      'c_up_closed_float': `<strong>⚙️ Aumento da Propensão Marginal a Consumir (c)</strong><br><br>
        <strong>Significado:</strong> c representa a fração da renda adicional que é consumida (0 < c < 1).<br><br>
        <strong>Efeito:</strong><br>
        1️⃣ c maior → Consumidores gastam mais de cada real adicional de renda<br>
        2️⃣ Curva IS fica MAIS INCLINADA (menos sensível a juros)<br>
        3️⃣ Multiplicador keynesiano aumenta: k = 1/(1-c)<br>
        4️⃣ Políticas fiscais ficam MAIS EFICAZES<br>
        5️⃣ Políticas monetárias ficam MENOS EFICAZES<br><br>
        <strong>Exemplo:</strong> Se c = 0.8, cada R$ 1 de renda gera R$ 0,80 de consumo adicional.`,
      
      'c_down_closed_float': `<strong>⚙️ Redução da Propensão Marginal a Consumir (c)</strong><br><br>
        c menor → Consumidores poupam mais, gastam menos<br>
        IS fica MENOS INCLINADA (mais sensível a juros)<br>
        Multiplicador keynesiano diminui<br>
        Políticas fiscais ficam MENOS EFICAZES<br>
        Políticas monetárias ficam MAIS EFICAZES`,
      
      'b_up_closed_float': `<strong>⚙️ Aumento da Sensibilidade do Investimento aos Juros (b)</strong><br><br>
        <strong>Significado:</strong> b mede quanto o investimento cai quando os juros sobem.<br><br>
        <strong>Efeito:</strong><br>
        1️⃣ b maior → Investimento é MAIS SENSÍVEL aos juros<br>
        2️⃣ Curva IS fica MENOS INCLINADA (mais horizontal)<br>
        3️⃣ Políticas monetárias ficam MAIS EFICAZES<br>
        4️⃣ Efeito crowding out é MAIOR (política fiscal menos eficaz)<br><br>
        <strong>Interpretação:</strong> Empresas reagem fortemente a mudanças nos juros ao decidir investir.<br>
        Fórmula: I = I₀ - b·i`,
      
      'b_down_closed_float': `<strong>⚙️ Redução da Sensibilidade do Investimento (b)</strong><br><br>
        b menor → Investimento é MENOS SENSÍVEL aos juros<br>
        IS fica MAIS INCLINADA (mais vertical)<br>
        Políticas monetárias ficam MENOS EFICAZES<br>
        Políticas fiscais ficam MAIS EFICAZES (menos crowding out)`,
      
      'k_up_closed_float': `<strong>⚙️ Aumento da Sensibilidade da Demanda por Moeda à Renda (k)</strong><br><br>
        <strong>Significado:</strong> k mede quanto a demanda por moeda aumenta quando a renda sobe.<br><br>
        <strong>Efeito:</strong><br>
        1️⃣ k maior → Pessoas demandam MAIS moeda quando Y aumenta<br>
        2️⃣ Curva LM fica MAIS INCLINADA (mais vertical)<br>
        3️⃣ Políticas fiscais ficam MENOS EFICAZES (juros sobem mais)<br>
        4️⃣ Políticas monetárias ficam MAIS EFICAZES<br><br>
        <strong>Interpretação:</strong> Maior necessidade de liquidez para transações.<br>
        Fórmula: L = k·Y - h·i`,
      
      'k_down_closed_float': `<strong>⚙️ Redução da Sensibilidade da Demanda por Moeda (k)</strong><br><br>
        k menor → Menor demanda por moeda quando Y aumenta<br>
        LM fica MENOS INCLINADA (mais horizontal)<br>
        Políticas fiscais ficam MAIS EFICAZES<br>
        Políticas monetárias ficam MENOS EFICAZES`,
      
      'h_up_closed_float': `<strong>⚙️ Aumento da Sensibilidade da Demanda por Moeda aos Juros (h)</strong><br><br>
        <strong>Significado:</strong> h mede quanto a demanda por moeda cai quando os juros sobem.<br><br>
        <strong>Efeito:</strong><br>
        1️⃣ h maior → Pessoas são MAIS SENSÍVEIS aos juros ao decidir quanto dinheiro segurar<br>
        2️⃣ Curva LM fica MENOS INCLINADA (mais horizontal)<br>
        3️⃣ Políticas fiscais ficam MAIS EFICAZES (juros sobem menos)<br>
        4️⃣ Políticas monetárias ficam MENOS EFICAZES<br><br>
        <strong>Interpretação:</strong> Juros altos incentivam aplicações financeiras em vez de liquidez.<br>
        Fórmula: L = k·Y - h·i`,
      
      'h_down_closed_float': `<strong>⚙️ Redução da Sensibilidade aos Juros (h)</strong><br><br>
        h menor → Demanda por moeda MENOS SENSÍVEL aos juros<br>
        LM fica MAIS INCLINADA (mais vertical)<br>
        Políticas fiscais ficam MENOS EFICAZES<br>
        Políticas monetárias ficam MAIS EFICAZES<br>
        Caso extremo (h→0): LM vertical = Teoria Quantitativa da Moeda`,
    };
    
    let explanation = explanations[key] || this.getGenericShockExplanation(cause, direction);
    
    // Add equilibrium values
    if (eq) {
      explanation += `<br><br><strong>🎯 Novo Equilíbrio:</strong><br>`;
      explanation += `• Renda (Y): ${Math.round(eq.Y)} (≈ R$ ${(eq.Y * 100).toFixed(0)} bilhões)<br>`;
      explanation += `• Taxa de Juros (i): ${eq.r?.toFixed(2)}%<br>`;
      
      if (isOpen && isFloating && eq.e_eq) {
        explanation += `• Taxa de Câmbio (e): R$ ${eq.e_eq.toFixed(2)}/USD<br>`;
      }
      if (isOpen && !isFloating && eq.M_eq) {
        explanation += `• Oferta de Moeda (M): ${Math.round(eq.M_eq)}<br>`;
      }
    }
    
    // Add component analysis
    if (params && eq) {
      explanation += this.getComponentAnalysis(params, eq, isOpen);
    }
    
    return explanation;
  }

  /**
   * Get component analysis (C, I, G, NX)
   */
  getComponentAnalysis(params, eq, isOpen) {
    if (!eq || !params) return '';
    
    const Y = eq.Y;
    const r = eq.r;
    const e = eq.e_eq || params.e || params.E;
    
    // Calculate components
    const C = (params.C0 || 1500) + params.c * (Y - params.T);
    const I = (params.I0 || 2000) - params.b * r;
    const G = params.G;
    
    let analysis = `<br><br><strong>📈 Componentes da Demanda Agregada:</strong><br>`;
    analysis += `• Consumo (C): ${Math.round(C)} [C₀ + c(Y-T)]<br>`;
    analysis += `• Investimento (I): ${Math.round(I)} [I₀ - b·i]<br>`;
    analysis += `• Gastos Governo (G): ${Math.round(G)}<br>`;
    
    if (isOpen) {
      const X = (params.X0 || 1500) + (params.x1 || 0.15) * (params.Ystar || 12000) + (params.x2 || 300) * e;
      const M_imports = (params.M0 || 1300) + (params.m1 || params.m || 0.12) * Y - (params.m2 || 200) * e;
      const NX = X - M_imports;
      
      analysis += `• Exportações (X): ${Math.round(X)}<br>`;
      analysis += `• Importações (M): ${Math.round(M_imports)}<br>`;
      analysis += `• Exportações Líquidas (NX): ${Math.round(NX)}<br>`;
      analysis += `<br><strong>Verificação:</strong> Y = C + I + G + NX = ${Math.round(C + I + G + NX)}`;
    } else {
      analysis += `<br><strong>Verificação:</strong> Y = C + I + G = ${Math.round(C + I + G)}`;
    }
    
    return analysis;
  }

  /**
   * Get structural parameter explanation
   */
  getStructuralParameterExplanation(param, value, isOpen) {
    const explanations = {
      c: `<strong>⚙️ Propensão Marginal a Consumir (c) = ${value.toFixed(2)}</strong><br><br>
          <strong>📖 Definição:</strong> Fração da renda adicional que é consumida (0 < c < 1).<br><br>
          <strong>📊 Impacto no Modelo:</strong><br>
          • <strong>Inclinação da IS:</strong> c ↑ → IS MENOS INCLINADA (mais horizontal)<br>
          • <strong>Multiplicador keynesiano:</strong> k = 1/(1-c) = <strong>${(1/(1-value)).toFixed(2)}</strong><br>
          • <strong>Eficácia fiscal:</strong> c ↑ → Política fiscal MAIS eficaz<br>
          • <strong>Eficácia monetária:</strong> c ↑ → Política monetária MENOS eficaz<br><br>
          <strong>💡 Interpretação Atual:</strong><br>
          De cada R$ 1,00 adicional de renda:<br>
          → R$ ${value.toFixed(2)} são CONSUMIDOS<br>
          → R$ ${(1-value).toFixed(2)} são POUPADOS<br><br>
          <strong>🔄 Efeito Multiplicador:</strong><br>
          Um aumento de R$ 100 em G gera aumento de R$ ${((1/(1-value)) * 100).toFixed(0)} na renda total.<br><br>
          <strong>📈 Por que isso acontece?</strong><br>
          c alto → Consumidores gastam mais de cada real adicional → Maior efeito cascata → Multiplicador maior → Para qualquer nível de juros, Y é maior → IS mais horizontal → Mudanças em i têm MENOS efeito sobre Y (IS menos sensível a juros).`,
      
      b: `<strong>⚙️ Sensibilidade do Investimento aos Juros (b) = ${value.toFixed(0)}</strong><br><br>
          <strong>📖 Definição:</strong> Quanto o investimento cai quando a taxa de juros sobe 1 ponto percentual.<br><br>
          <strong>📊 Impacto no Modelo:</strong><br>
          • <strong>Inclinação da IS:</strong> b ↑ → IS MENOS INCLINADA (mais horizontal)<br>
          • <strong>Eficácia monetária:</strong> b ↑ → Política monetária MAIS eficaz<br>
          • <strong>Crowding out:</strong> b ↑ → MAIOR efeito deslocamento<br>
          • <strong>Eficácia fiscal:</strong> b ↑ → Política fiscal MENOS eficaz<br><br>
          <strong>📐 Fórmula:</strong> I = I₀ - b·i<br><br>
          <strong>💡 Interpretação Atual:</strong><br>
          Se a taxa de juros sobe de 10% para 11%:<br>
          → Investimento CAI ${value.toFixed(0)} unidades (≈ R$ ${(value * 100).toFixed(0)} bilhões)<br><br>
          <strong>🔄 Exemplo Prático:</strong><br>
          • b = ${value} (atual): Empresas são ${value > 60 ? 'MUITO' : 'POUCO'} sensíveis aos juros<br>
          • Política monetária: ${value > 60 ? 'Muito eficaz' : 'Pouco eficaz'} (via canal do investimento)<br>
          • Política fiscal: ${value > 60 ? 'Menos eficaz' : 'Mais eficaz'} (crowding out ${value > 60 ? 'forte' : 'fraco'})<br><br>
          <strong>📈 Por que isso acontece?</strong><br>
          b alto → Investimento muito sensível a i → Pequenas mudanças em i causam grandes mudanças em I e Y → IS mais horizontal (mais sensível a juros) → Política monetária muito eficaz.`,
      
      k: `<strong>⚙️ Sensibilidade da Demanda por Moeda à Renda (k) = ${value.toFixed(2)}</strong><br><br>
          <strong>📖 Definição:</strong> Quanto a demanda por moeda aumenta quando a renda sobe 1 unidade.<br><br>
          <strong>📊 Impacto no Modelo:</strong><br>
          • <strong>Inclinação da LM:</strong> k ↑ → LM mais INCLINADA (vertical)<br>
          • <strong>Eficácia fiscal:</strong> k ↑ → Política fiscal MENOS eficaz<br>
          • <strong>Eficácia monetária:</strong> k ↑ → Política monetária MAIS eficaz<br>
          • <strong>Crowding out:</strong> k ↑ → MAIOR (juros sobem mais)<br><br>
          <strong>📐 Fórmula:</strong> L = k·Y - h·i<br><br>
          <strong>💡 Interpretação Atual:</strong><br>
          Cada unidade adicional de renda (R$ 100 bi) requer:<br>
          → ${value.toFixed(2)} unidades de moeda para transações<br>
          → Demanda por liquidez: ${value > 0.5 ? 'ALTA' : 'BAIXA'}<br><br>
          <strong>🔄 Exemplo Prático:</strong><br>
          Se Y aumenta de 3000 para 3100 (ΔY = 100):<br>
          → Demanda por moeda aumenta ${(value * 100).toFixed(0)} unidades<br>
          → Com M fixo, juros sobem ${value > 0.5 ? 'MUITO' : 'POUCO'}<br>
          → Crowding out é ${value > 0.5 ? 'FORTE' : 'FRACO'}<br><br>
          <strong>📈 Por que isso acontece?</strong><br>
          k alto → Maior necessidade de moeda para transações → Quando Y sobe, demanda por moeda sobe muito → Com M fixo, i sobe muito → LM mais vertical → Política fiscal menos eficaz.`,
      
      h: `<strong>⚙️ Sensibilidade da Demanda por Moeda aos Juros (h) = ${value.toFixed(0)}</strong><br><br>
          <strong>📖 Definição:</strong> Quanto a demanda por moeda cai quando os juros sobem 1 ponto percentual.<br><br>
          <strong>📊 Impacto no Modelo:</strong><br>
          • <strong>Inclinação da LM:</strong> h ↑ → LM MENOS INCLINADA (mais horizontal)<br>
          • <strong>Eficácia fiscal:</strong> h ↑ → Política fiscal MAIS eficaz<br>
          • <strong>Eficácia monetária:</strong> h ↑ → Política monetária MENOS eficaz<br>
          • <strong>Crowding out:</strong> h ↑ → MENOR (juros sobem menos)<br><br>
          <strong>📐 Fórmula:</strong> L = k·Y - h·i<br><br>
          <strong>💡 Interpretação Atual:</strong><br>
          Se a taxa de juros sobe de 10% para 11%:<br>
          → Demanda por moeda CAI ${value.toFixed(0)} unidades<br>
          → Pessoas preferem aplicações financeiras à liquidez<br>
          → Sensibilidade aos juros: ${value > 80 ? 'MUITO ALTA' : value > 40 ? 'MODERADA' : 'BAIXA'}<br><br>
          <strong>🔄 Exemplo Prático:</strong><br>
          • h = ${value} (atual): Demanda por moeda ${value > 80 ? 'MUITO' : 'POUCO'} sensível a i<br>
          • Política fiscal: ${value > 80 ? 'Muito eficaz' : 'Menos eficaz'} (juros sobem ${value > 80 ? 'pouco' : 'muito'})<br>
          • Política monetária: ${value > 80 ? 'Menos eficaz' : 'Mais eficaz'}<br><br>
          <strong>📈 Por que isso acontece?</strong><br>
          h alto → Pessoas muito sensíveis a i → Pequenas mudanças em i causam grandes mudanças na demanda por moeda → Para qualquer Y, i varia pouco → LM mais horizontal (mais sensível a i) → Política fiscal muito eficaz (pouco crowding out).<br><br>
          <strong>⚠️ Casos Extremos:</strong><br>
          • h → ∞: <em>Armadilha da Liquidez</em> (LM horizontal, i mínimo)<br>
          • h → 0: <em>Teoria Quantitativa</em> (LM vertical, V constante)`
    };
    
    return explanations[param] || '';
  }

  /**
   * Generic shock explanation
   */
  getGenericShockExplanation(cause, direction) {
    const varNames = {
      G: 'Gasto Público',
      T: 'Tributação',
      M: 'Oferta Monetária',
      e: 'Taxa de Câmbio',
      rstar: 'Taxa de Juros Internacional',
      c: 'Propensão Marginal a Consumir',
      b: 'Sensibilidade do Investimento aos Juros',
      k: 'Sensibilidade da Demanda por Moeda à Renda',
      h: 'Sensibilidade da Demanda por Moeda aos Juros'
    };
    
    const varName = varNames[cause] || cause;
    const action = direction === 'up' ? 'aumentou' : 'diminuiu';
    
    return `<strong>Alteração de Parâmetro:</strong> ${varName} ${action}.<br><br>
            Observe como as curvas se deslocam e o novo ponto de equilíbrio é estabelecido. 
            Parâmetros estruturais (c, b, k, h) alteram a inclinação das curvas IS e LM, 
            afetando a magnitude dos multiplicadores fiscais e monetários.`;
  }

  /**
   * Enrich explanation with equilibrium data
   */
  enrichExplanation(baseExplanation, eq, params, isOpen, isFloating) {
    let enriched = baseExplanation;
    
    if (eq) {
      enriched += `<br><br><strong>🎯 Equilíbrio:</strong><br>`;
      enriched += `• Y = ${Math.round(eq.Y)}, i = ${eq.r?.toFixed(2)}%`;
      
      if (isOpen && isFloating && eq.e_eq) {
        enriched += `, e = R$ ${eq.e_eq.toFixed(2)}/USD`;
      }
      if (isOpen && !isFloating && eq.M_eq) {
        enriched += `, M = ${Math.round(eq.M_eq)}`;
      }
    }
    
    return enriched;
  }
}
