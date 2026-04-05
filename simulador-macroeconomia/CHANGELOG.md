# Changelog

## [2.3.0] - 2026-04-04

### 🎓 Modelo IS-LM-BP Expandido Completo - INTEGRADO

### Adicionado
- **Modelo Expandido**: Implementação completa conforme documento de consolidação
- **Interface de Parâmetros Avançados**: Modal completo para ajustar todas as variáveis
- **15 Cenários Expandidos**: Cobrindo todos os regimes e casos especiais
- **Novas Variáveis Autônomas**: L0 (demanda por moeda), K0 (fluxo de capital), M0 (importações base)
- **Parâmetros de Economia Aberta**: x1, x2, m2, f (sensibilidades e mobilidade)
- **Variáveis Exógenas**: Y* (renda externa), P (nível de preços)
- **Mobilidade Imperfeita**: Novo regime com BP positivamente inclinada
- **Arquivo model-expanded.js**: Implementação completa do modelo teórico
- **Arquivo scenarios-expanded.js**: 15 cenários pré-configurados

### Modificado
- **main-new.js**: Integração completa do modelo expandido com seleção automática
- **StateManager**: Expandido com todas as novas variáveis e parâmetros
- **index.html**: Modal de parâmetros avançados com interface intuitiva
- **Estrutura de Parâmetros**: Organizada em categorias (autônomos, comportamentais, economia aberta, exógenas)
- **Compatibilidade**: Mantidos aliases para variáveis legadas (G→G0, T→T0, etc.)

### Interface de Parâmetros Avançados

**Componentes Autônomos**:
- C0, I0, X0, M0, L0, K0

**Economia Aberta**:
- x1 (sensibilidade exportações à renda externa)
- x2 (sensibilidade exportações ao câmbio)
- m2 (sensibilidade importações ao câmbio)
- f (sensibilidade fluxos de capital)
- Y* (renda externa)
- P (nível de preços)

**Mobilidade de Capital**:
- Economia Fechada
- Mobilidade Perfeita (BP horizontal)
- Mobilidade Imperfeita (BP inclinada)
- Sem Mobilidade (BP vertical)

### Cenários Expandidos (15)

**Economia Fechada**: IS-LM clássico

**Mobilidade Perfeita**: Câmbio flutuante e fixo

**Mobilidade Imperfeita**: Câmbio flutuante e fixo

**Sem Mobilidade**: Câmbio flutuante e fixo

**Choques Externos**: Recessão mundial, alta de juros Fed

**Políticas**: Expansão fiscal/monetária, desvalorização

**Casos Especiais**: Armadilha da liquidez, investimento insensível

### Equações Expandidas

**IS Expandida**:
```
i = [C0 - c·T0 + I0 + G0 + X0 + x1·Y* + (x2-m2)·E - M0 - (1-c+m1)·Y] / b
```

**LM Expandida**:
```
i = (k·Y - M/P - L0) / h
```

**BP Expandida**:
```
Perfeita: i = i*
Imperfeita: i = i* + [m1·Y - X0 - x1·Y* - (x2-m2)·E + M0 - K0] / f
Zero: Y = (X0 + x1·Y* + (x2-m2)·E - M0) / m1
```

### Regimes Implementados

1. **Economia Fechada** (closed): IS-LM clássico
2. **Mobilidade Perfeita** (perfect): i = i*, BP horizontal
3. **Mobilidade Imperfeita** (imperfect): BP inclinada, 0 < f < ∞
4. **Sem Mobilidade** (zero): BP vertical, f = 0

### Documentação
- **MODELO-EXPANDIDO.md**: Documentação completa do modelo expandido
- **INTEGRACAO-MODELO-EXPANDIDO.md**: Guia de integração e uso
- **scenarios-expanded.js**: 15 cenários documentados
- Todas as variáveis explicadas com valores padrão
- Equações detalhadas para cada regime
- Guia de uso e calibração brasileira

### Benefícios
- ✅ Completude teórica: todas as variáveis do modelo acadêmico
- ✅ Maior realismo: parâmetros mais precisos
- ✅ Flexibilidade: múltiplos regimes de mobilidade
- ✅ Choques externos: Y* e i* explícitos
- ✅ Análise mais rica: efeitos cambiais separados (x2, m2)
- ✅ Interface intuitiva: modal organizado por categorias
- ✅ 15 cenários pré-configurados: todos os casos importantes
- ✅ Compatibilidade: modelo simples ainda disponível

### Como Usar
1. Clique em "⚙️ Parâmetros Avançados"
2. Ajuste os parâmetros desejados
3. Selecione o regime de mobilidade
4. Clique em "✓ Aplicar Parâmetros"
5. Ou carregue um dos 15 cenários expandidos

## [2.2.0] - 2026-04-04

### 🎯 Histórico Visual de Curvas

### Adicionado
- **Curvas de Referência**: Sistema de comparação visual que mantém as curvas iniciais (IS, LM, BP) como referência
- **Botão "Capturar"**: Permite definir o estado atual como novo ponto de referência
- **Comparação Automática**: Curvas iniciais aparecem tracejadas e transparentes quando há mudanças
- **Atalho de Teclado**: Tecla `C` para capturar estado de referência

### Modificado
- **StateManager**: Adicionado `initialState` para armazenar estado de referência
- **chart.js**: Adicionados 3 novos datasets para curvas de referência (IS, LM, BP iniciais)
- **updateChart**: Agora aceita parâmetro `initialData` para mostrar curvas de referência
- **Legenda**: Curvas iniciais não aparecem na legenda para manter interface limpa

### Comportamento
- Ao carregar cenário ou resetar: captura automaticamente novo estado inicial
- Ao ajustar parâmetros: mostra curvas iniciais tracejadas para comparação
- Curvas iniciais aparecem em vermelho, azul e roxo transparentes (30% opacidade)
- Curvas iniciais são ocultadas automaticamente se não houver mudanças

### Benefícios Educacionais
- Visualização clara do deslocamento das curvas IS, LM e BP
- Facilita compreensão dos efeitos de políticas econômicas
- Permite comparar "antes e depois" de choques econômicos
- Ideal para demonstrações em sala de aula

## [2.1.0] - 2026-04-04

### 🇧🇷 Calibração com Dados da Economia Brasileira

### Adicionado
- **Calibração Brasileira**: Todos os valores padrão calibrados com dados reais do Brasil 2024
- **Escala Realista**: 1 unidade = R$ 100 bilhões
- **Documentação**: Novo arquivo `CALIBRACAO-BRASIL.md` explicando a metodologia

### Modificado
- **StateManager**: Valores padrão atualizados para economia brasileira
  - G: 2.200 (~22% PIB = R$ 2,2 tri)
  - T: 3.500 (carga tributária ~35% = R$ 3,5 tri)
  - M: 5.000 (M2 Brasil = R$ 5,0 tri)
  - e: 5.0 (R$ 5,00/USD)
  - rstar: 5.25% (Fed Funds 2024)
  - c: 0.65 (PMgC Brasil)
  - I0: 2.000 (~20% PIB)
  - X0: 1.500 (~15% PIB)
  - m: 0.12 (importações ~12%)

- **Todos os 13 Cenários**: Recalibrados com valores brasileiros
  - Economia Brasileira 2024 (default)
  - Expansão Fiscal (G: 2.800)
  - Expansão Monetária (M: 6.500)
  - Austeridade Fiscal (G: 1.700, T: 4.200)
  - Armadilha da Liquidez (h: 180)
  - Investimento Insensível (b: 25)
  - Economia Aberta - Câmbio Flutuante
  - Economia Aberta - Câmbio Fixo
  - Desvalorização Cambial (e: 6.5)
  - Choque Externo (r*: 8.5%)
  - Alta Propensão a Consumir (c: 0.80)
  - Crise 2008 (valores ajustados)
  - Imobilidade de Capitais

- **Ranges dos Sliders**: Ajustados para escalas brasileiras
  - G: 1.000 a 3.500
  - T: 2.000 a 5.000
  - M: 3.000 a 7.000
  - e: 3.0 a 8.0
  - r*: 1.0% a 12.0%

- **Constraints**: Atualizadas em `advanced.js` para refletir valores brasileiros

### Melhorado
- **Visualização do Gráfico**: Padding adaptativo para evitar equilíbrio muito embaixo
  - Se equilíbrio < 30% da altura, padding inferior aumenta para 50%
- **Relevância**: Simulação mais interessante com valores reais do Brasil
- **Aprendizado**: Conexão direta entre teoria e realidade brasileira

### Fontes dos Dados
- IBGE (PIB, FBCF)
- Banco Central do Brasil (M2, câmbio)
- Tesouro Nacional (gastos públicos)
- IBPT (carga tributária)
- MDIC (comércio exterior)
- Federal Reserve (Fed Funds Rate)

## [2.0.3] - 2026-04-04

### Melhorado - Design e UX
- **Layout do Gráfico**: Gráfico agora em container com tamanho máximo e centralizado
- **Área de Explicação**: Redesenhada com ícone informativo e borda colorida
- **Painel de Controle**: Header com gradiente e melhor organização visual
- **Botões de Choque**: Efeito hover com escala e sombra
- **Sliders**: Thumbs maiores (20px) com efeito hover e animações suaves
- **Grupos de Controle**: Backgrounds com gradientes e ícones visuais
- **Scrollbar**: Estilizada com cores suaves e efeito hover
- **Responsividade**: Melhor adaptação para diferentes tamanhos de tela
- **Acessibilidade**: Focus rings para navegação por teclado
- **Animações**: Transições suaves em todos os elementos interativos

### Técnico
- CSS completamente refatorado com classes utilitárias
- Novos componentes: `.control-group-enhanced`, `.slider-enhanced`
- Gradientes aplicados em backgrounds
- Sombras e elevações para profundidade visual

## [2.0.2] - 2026-04-04

### Adicionado
- **Novo Cenário**: Imobilidade Perfeita de Capitais (BP vertical)
- **Modelo**: Suporte para BP vertical quando capitalMobility = 'zero'
- **StateManager**: Propriedade capitalMobility ('perfect' ou 'zero')
- **getBPData**: Agora aceita parâmetro capitalMobility para desenhar BP vertical ou horizontal

### Modificado
- **getBPData**: Função modificada para suportar BP vertical em Y_BP = (X0 + v*e) / m
- **ExplanationEngine**: Adicionada explicação para imobilidade de capitais
- **Documentação**: Atualizada para incluir novo cenário

## [2.0.1] - 2026-04-04

### Corrigido
- **Cenário Crise 2008**: Adicionados parâmetros autônomos faltantes (C0, I0, X0, m, v) em todos os cenários
- **Cenário Crise 2008**: Ajustados parâmetros para gerar equilíbrio válido (T: 700→800, I0: 400→300)
- **Cenário Crise 2008**: Melhorada explicação para mencionar armadilha da liquidez

## [2.0.0] - 2026-04-04

### 🎉 Major Release - Refatoração Completa

### Adicionado
- **Arquitetura Modular**
  - StateManager para gerenciamento centralizado de estado
  - UIController para separação de lógica e interface
  - ExplanationEngine para explicações econômicas contextuais
  - ModalManager para gerenciamento de diálogos

- **Cenários Pré-Configurados** (12 cenários)
  - Equilíbrio Padrão
  - Expansão/Contração Fiscal
  - Expansão/Contração Monetária
  - Austeridade Fiscal
  - Armadilha da Liquidez
  - Investimento Insensível
  - Economia Aberta (Câmbio Fixo/Flutuante)
  - Desvalorização Cambial
  - Choque Externo
  - Alta Propensão a Consumir
  - Crise 2008

- **Sistema de Histórico**
  - Salva últimas 20 simulações automaticamente
  - Visualização de simulações anteriores
  - Restauração de estados salvos
  - Exportação para CSV

- **Funcionalidades de Exportação**
  - Exportar gráfico como PNG
  - Exportar histórico como CSV
  - Exportar/Importar estado como JSON
  - Auto-save em localStorage

- **Interface Melhorada**
  - Modal de cenários com categorização
  - Modal de histórico com busca
  - Modal de ajuda/tutorial
  - Notificações visuais
  - Atalhos de teclado (R, S, H, E, ?)

- **Melhorias no Modelo**
  - Parâmetros autônomos (C0, I0, X0, m, v) configuráveis
  - Validação robusta de parâmetros
  - Cálculo de multiplicadores fiscais e monetários
  - Cálculo de componentes da demanda agregada
  - Tratamento de casos extremos

- **Visualização**
  - Eixos dinâmicos que se ajustam aos dados
  - Melhor feedback visual em mudanças
  - Animações suaves

- **Performance**
  - Debouncing em sliders (100ms)
  - Validação eficiente
  - Otimização de recálculos

- **Testes**
  - Suite de testes para o modelo econômico
  - Validação de equilíbrios
  - Testes de políticas econômicas
  - Testes de casos extremos

### Modificado
- Refatoração completa do main.js
- Modelo econômico com validação aprimorada
- Sistema de explicações mais detalhado e contextual
- Chart.js com eixos dinâmicos
- Interface mais intuitiva e responsiva

### Corrigido
- Tratamento de divisão por zero
- Validação de valores infinitos
- Comportamento de variáveis endógenas
- Sincronização de estado
- Casos extremos de parâmetros

### Técnico
- Separação de responsabilidades (SoC)
- Padrão Observer para gerenciamento de estado
- Modularização do código
- Melhor tratamento de erros
- Documentação inline (JSDoc)

---

## [1.0.0] - Data Original

### Inicial
- Modelo IS-LM básico
- Modelo Mundell-Fleming
- Interface com sliders
- Gráfico interativo
- Equações matemáticas
- Exportação de imagem
