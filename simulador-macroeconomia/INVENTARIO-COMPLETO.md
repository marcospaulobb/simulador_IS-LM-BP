# Inventário Completo do Projeto
**Simulador de Macroeconomia: Modelo IS-LM-BP (Mundell-Fleming)**

Este documento serve como o inventário definitivo de todas as atualizações, melhorias arquiteturais, refatorações matemáticas e configurações de infraestrutura aplicadas a este projeto desde o seu início.

## 1. Refatoração e Arquitetura de Software
O projeto foi totalmente reconstruído para adotar as melhores práticas de desenvolvimento front-end com JavaScript modular:
- **Modularização:** Separação do arquivo único em módulos (`stateManager.js`, `UIController.js`, `ExplanationEngine.js`, `scenarios.js`).
- **Build System:** Integração com **Vite** para empacotamento, minificação e carregamento instantâneo.
- **Gerência de Estado:** Implementação de um `StateManager` que garante que os inputs, os cálculos e a UI consumam dados de uma única fonte de verdade central.
- **Performance (Debounce):** Redução do peso computacional na movimentação dos "sliders", calculando as novas posições em lotes ao invés de atualizar o DOM em milissegundos a cada arrastada.

## 2. Lógica Econômica e Resolução do Modelo
- **Modelo Expandido:** Inclusão de curvas dinâmicas e suporte a três regimes completos de mobilidade de capitais: Fixo/Nulo, Imperfeito e Perfeito.
- **Dinamismo da Curva BP:** A inclinação da Curva BP agora altera-se matematicamente em tempo real de acordo com as configurações (horizontalização para mobilidade perfeita; verticalização para imobilidade).
- **Cálculo Preciso da Intersecção:** Recalibragem do ponto de equilíbrio macroeconômico simultâneo (IS=LM=BP), corrigindo falhas onde a curva BP não passava exatamente pelo centro das curvas IS e LM e vice-versa.
- **Multiplicadores e Equações:** Cálculos expostos para multiplicadores fiscais e monetários com lógicas estritas para não exibir retornos impossíveis (evitando divisões por zero).

## 3. Experiência de Uso (UX/UI) e Visualização
- **Motor de Gráficos:** Implementação avançada com `Chart.js`, incluindo suporte a animações transicionais suaves (GSAP).
- **Auto-Zoom e Eixos Dinâmicos:** As réguas do gráfico se autoajustam e buscam ativamente o ponto de cruze entre as 3 curvas para impedir que fiquem fora da tela durante a simulação.
- **12 Cenários Interativos:** Inclui botões rápidos para configurar automaticamente o simulador para casos clássicos como "Crise de 2008", "Armadilha da Liquidez", "Paradoxo da Poupança", e comparações diretas de Câmbio Fixo vs Câmbio Flutuante.
- **Histórico e Exportação:** Sistema para salvar as simulações, armazenar os passos recentes em LocalStorage, e capacidade de baixar PDFs e planilhas com os resultados matemáticos.

## 4. Infraestrutura, Controle de Versão e Deploy
- **Controle com Git:** Criação do ambiente local do Git e adição de uma robusta base de exclusão com `.gitignore`.
- **Hospedagem no GitHub:** Criação do branch `main` e commit de toda a codificação moderna acompanhada por dezenas de manuais e documentações em Markdown. 
  - **Repositório:** `https://github.com/marcospaulobb/simulador_IS-LM-BP`
- **Produção no Vercel (CI/CD):** Deploy da versão mais recente automatizando a construção (`vite build`) pela **Vercel CLI**.
  - **Link Ativo:** `https://simulador-macroeconomia-56n0aqfoo-marcospaulobbs-projects.vercel.app` (disponível para acesso imediato de toda a base acadêmica).

## 5. Próximos Passos (Backlog)
Toda a plataforma se encontra num estado maduro, configurável, estável e escalável online. Possíveis intervenções futuras seriam:
1. Adaptações para responsividade extrema em dispositivos móveis menores.
2. Adicionar opção internacional (tradução EN/ES).
3. Testes unitários utilizando frameworks como Jest.
