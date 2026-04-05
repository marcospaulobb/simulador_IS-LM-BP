# Como Usar o Modelo IS-LM-BP Expandido

## 🚀 Início Rápido

### 1. Iniciar o Simulador
```bash
cd simulador-macroeconomia
npm run dev
```
O simulador abrirá em `http://localhost:5173`

### 2. Acessar Cenários Expandidos

**Método 1 (Recomendado):**
1. Clique em "⚙️ Parâmetros Avançados" no painel direito
2. Clique em "📚 Cenários Expandidos" no modal
3. Escolha um dos 15 cenários disponíveis

**Método 2:**
1. Ajuste manualmente os parâmetros avançados
2. Configure mobilidade de capital
3. Clique em "✓ Aplicar Parâmetros"

## 📚 Guia de Cenários

### Economia Fechada
**Quando usar**: Estudar IS-LM clássico sem comércio exterior

**Cenário**: "Economia Fechada - Brasil 2024"
- Apenas curvas IS e LM
- Sem BP (balanço de pagamentos)
- Política fiscal e monetária ambas eficazes

**Teste**:
1. Aumentar G (gasto público) → IS desloca direita → Y e i aumentam
2. Aumentar M (oferta de moeda) → LM desloca direita → Y aumenta, i cai

### Mobilidade Perfeita de Capitais

#### Câmbio Flutuante
**Quando usar**: Analisar economia com livre movimentação de capitais e câmbio de mercado

**Cenário**: "Mobilidade Perfeita - Câmbio Flutuante"
- BP horizontal em i = i* = 5.25%
- Câmbio (e) se ajusta automaticamente
- **Política monetária MUITO eficaz**
- **Política fiscal INEFICAZ** (crowding-out via câmbio)

**Teste**:
1. Aumentar M → LM direita → i cai → fuga de capitais → desvalorização → NX aumenta → Y aumenta muito
2. Aumentar G → IS direita → i sobe → entrada de capitais → valorização → NX cai → efeito anulado

#### Câmbio Fixo
**Quando usar**: Analisar economia com livre movimentação de capitais e câmbio administrado

**Cenário**: "Mobilidade Perfeita - Câmbio Fixo"
- BP horizontal em i = i*
- Oferta de moeda (M) se ajusta automaticamente
- **Política fiscal MUITO eficaz**
- **Política monetária INEFICAZ** (BC perde controle de M)

**Teste**:
1. Aumentar G → IS direita → i sobe → entrada de capitais → BC compra dólares → M aumenta → LM direita → Y aumenta muito
2. Tentar aumentar M → Slider desabilitado (M é endógena)

### Mobilidade Imperfeita de Capitais

#### Câmbio Flutuante
**Quando usar**: Situação intermediária, mais realista para muitos países

**Cenário**: "Mobilidade Imperfeita - Câmbio Flutuante"
- BP positivamente inclinada (f = 100)
- Câmbio se ajusta
- **Ambas políticas têm efeito parcial**

**Teste**:
1. Aumentar G → IS direita → Y e i aumentam → entrada de capitais → valorização parcial → efeito parcial
2. Aumentar M → LM direita → Y aumenta, i cai → saída de capitais → desvalorização → efeito reforçado

#### Câmbio Fixo
**Quando usar**: Regime de bandas cambiais ou crawling peg

**Cenário**: "Mobilidade Imperfeita - Câmbio Fixo"
- BP positivamente inclinada
- M se ajusta parcialmente
- **Ambas políticas têm efeito**

### Sem Mobilidade de Capitais

#### Câmbio Flutuante
**Quando usar**: Controles de capital rígidos, economia isolada

**Cenário**: "Sem Mobilidade - Câmbio Flutuante"
- BP vertical (f = 0)
- Y determinado por NX = 0
- **Política fiscal eficaz**
- **Política monetária menos eficaz**

**Teste**:
1. Aumentar G → IS direita → Y aumenta até NX = 0
2. Aumentar M → LM direita → efeito limitado por restrição de BP

#### Câmbio Fixo
**Cenário**: "Sem Mobilidade - Câmbio Fixo"
- Similar ao flutuante, mas BC intervém

### Choques Externos

#### Recessão Mundial
**Quando usar**: Simular crise econômica global

**Cenário**: "Recessão Mundial"
- Y* cai de 12.000 para 10.000
- Exportações caem
- IS e BP deslocam para esquerda
- Y doméstico cai

**Observar**:
- Queda de exportações
- Pressão para desvalorização cambial
- Necessidade de políticas compensatórias

#### Alta de Juros Fed
**Quando usar**: Simular aperto monetário nos EUA

**Cenário**: "Alta de Juros Fed"
- i* sobe de 5.25% para 8%
- Fuga de capitais
- BP desloca para cima
- Pressão para desvalorização

**Observar**:
- Saída de capitais
- Necessidade de aumentar i doméstico
- Dilema entre controlar inflação e crescimento

### Políticas Econômicas

#### Expansão Fiscal (Mobilidade Perfeita)
**Cenário**: "Expansão Fiscal - Mobilidade Perfeita"
- G aumenta de 2200 para 2800 (+600)
- Demonstra ineficácia da política fiscal
- Crowding-out via valorização cambial

#### Expansão Monetária (Mobilidade Perfeita)
**Cenário**: "Expansão Monetária - Mobilidade Perfeita"
- M aumenta de 1800 para 2200 (+400)
- Demonstra eficácia da política monetária
- Desvalorização potencializa efeito

#### Desvalorização Cambial
**Cenário**: "Desvalorização Cambial"
- E aumenta de 5.0 para 6.0 (20%)
- Exportações aumentam
- Importações caem
- Y aumenta

### Casos Especiais

#### Armadilha da Liquidez
**Quando usar**: Estudar situações de juros muito baixos (crise 2008, COVID)

**Cenário**: "Armadilha da Liquidez"
- h = 200 (muito alto)
- LM quase horizontal
- **Política monetária INEFICAZ**
- **Política fiscal MUITO eficaz**

**Teste**:
1. Aumentar M → Sem efeito (LM já horizontal)
2. Aumentar G → Efeito máximo (sem crowding-out)

#### Investimento Insensível aos Juros
**Quando usar**: Períodos de incerteza, pessimismo empresarial

**Cenário**: "Investimento Insensível"
- b = 20 (muito baixo)
- IS muito inclinada (quase vertical)
- **Política fiscal MUITO eficaz**
- **Política monetária INEFICAZ**

**Teste**:
1. Aumentar G → Efeito máximo
2. Aumentar M → Pouco efeito (investimento não responde a i)

## 🎯 Exercícios Práticos

### Exercício 1: Trilema de Mundell-Fleming
**Objetivo**: Entender que não é possível ter simultaneamente:
1. Câmbio fixo
2. Mobilidade perfeita de capitais
3. Política monetária independente

**Passos**:
1. Carregar "Mobilidade Perfeita - Câmbio Fixo"
2. Tentar aumentar M → Observar que slider está desabilitado
3. Carregar "Mobilidade Perfeita - Câmbio Flutuante"
4. Aumentar M → Observar que funciona, mas câmbio se ajusta

### Exercício 2: Eficácia de Políticas
**Objetivo**: Comparar eficácia de políticas em diferentes regimes

**Passos**:
1. Carregar "Mobilidade Perfeita - Câmbio Flutuante"
2. Capturar estado inicial (📍 Capturar)
3. Aumentar G em 500
4. Observar efeito pequeno (valorização anula)
5. Resetar
6. Aumentar M em 400
7. Observar efeito grande (desvalorização potencializa)

### Exercício 3: Choque Externo
**Objetivo**: Analisar impacto de crise externa e políticas de resposta

**Passos**:
1. Carregar "Recessão Mundial"
2. Observar queda de Y
3. Testar política fiscal compensatória (aumentar G)
4. Testar política monetária (aumentar M)
5. Comparar eficácia das respostas

### Exercício 4: Desvalorização Competitiva
**Objetivo**: Entender efeitos de desvalorização cambial

**Passos**:
1. Carregar "Mobilidade Imperfeita - Câmbio Fixo"
2. Capturar estado inicial
3. Abrir Parâmetros Avançados
4. Aumentar E de 5.0 para 6.0
5. Aplicar e observar:
   - IS desloca direita (NX aumenta)
   - BP desloca direita
   - Y aumenta

## 🔧 Ajuste Fino de Parâmetros

### Componentes Autônomos
- **C0** (1500): Consumo independente de renda
- **I0** (2000): Investimento independente de juros
- **X0** (1500): Exportações independentes de Y* e E
- **M0** (1300): Importações independentes de Y e E
- **L0** (0): Demanda por moeda independente de Y e i
- **K0** (0): Fluxo de capital independente de i - i*

### Sensibilidades de Economia Aberta
- **x1** (0.15): Quanto X aumenta quando Y* aumenta 1 unidade
- **x2** (300): Quanto X aumenta quando E aumenta 1 unidade
- **m2** (200): Quanto M aumenta quando E aumenta 1 unidade
- **f** (100): Quanto CK aumenta quando i - i* aumenta 1 p.p.
  - f = 0: Sem mobilidade
  - f = 100: Mobilidade imperfeita
  - f = 999999: Mobilidade perfeita

### Variáveis Exógenas
- **Y*** (12000): Renda externa (PIB mundial)
- **P** (1.0): Nível de preços (normalmente fixo em 1.0)

## 💡 Dicas de Uso

### Para Visualização Clara:
1. Sempre use "📍 Capturar" antes de fazer mudanças
2. Curvas tracejadas = estado de referência
3. Curvas sólidas = estado atual
4. Compare visualmente os deslocamentos

### Para Análise Econômica:
1. Leia a explicação gerada automaticamente
2. Observe qual curva deslocou
3. Identifique se variável é endógena ou exógena
4. Verifique se efeito foi o esperado pela teoria

### Para Ensino:
1. Comece com economia fechada (mais simples)
2. Progrida para mobilidade imperfeita (intermediário)
3. Termine com mobilidade perfeita (casos extremos)
4. Use casos especiais para situações reais

## 📊 Interpretação de Resultados

### Deslocamento de IS para Direita:
- Causas: ↑G, ↓T, ↑C0, ↑I0, ↑X0, ↓M0, ↑Y*, desvalorização (↑E)
- Efeito: ↑Y, ↑i (em economia fechada)

### Deslocamento de LM para Direita:
- Causas: ↑M, ↓P, ↓L0
- Efeito: ↑Y, ↓i (em economia fechada)

### Deslocamento de BP para Direita:
- Causas: ↑Y*, desvalorização (↑E), ↓i*
- Efeito: Permite maior Y para mesmo i

### Deslocamento de BP para Cima:
- Causas: ↑i*
- Efeito: Requer maior i para mesmo Y

## 🎓 Recursos Adicionais

### Documentação:
- `MODELO-EXPANDIDO.md`: Especificação técnica completa
- `TESTE-MODELO-EXPANDIDO.md`: Checklist de 18 testes
- `IMPLEMENTACAO-COMPLETA.md`: Resumo da implementação
- `DADOS-ECONOMIA-BRASILEIRA.md`: Calibração e fontes

### Atalhos de Teclado:
- **R**: Resetar simulação
- **C**: Capturar estado de referência
- **S**: Abrir cenários
- **H**: Abrir histórico
- **E**: Ver equações
- **?**: Ajuda

### Suporte:
- Documentação completa na pasta do projeto
- Código-fonte comentado
- Exemplos de uso em cada cenário

---

**Versão**: 2.0.0
**Última Atualização**: 2026-04-04
