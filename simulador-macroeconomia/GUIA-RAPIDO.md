# Guia Rápido - Simulador IS-LM & Mundell-Fleming

## 🚀 Início Rápido

### 1. Instalação
```bash
cd simulador-macroeconomia
npm install
npm run dev
```

Abra http://localhost:5173 no navegador.

## 🎯 Primeiros Passos

### Explorar o Modelo Básico
1. O simulador inicia em **Economia Fechada (IS-LM)**
2. Use os sliders para ajustar:
   - **G** (Gasto Público): 500-1500
   - **T** (Tributação): 400-1200
   - **M** (Oferta Monetária): 600-1800
3. Observe como as curvas IS (vermelha) e LM (azul) se movem
4. Leia a explicação econômica abaixo do gráfico

### Usar Cenários Pré-Configurados
1. Clique em **📚 Cenários** (ou pressione `S`)
2. Escolha um cenário, por exemplo: "Expansão Fiscal"
3. Observe os parâmetros carregados automaticamente
4. Leia a explicação específica do cenário

### Experimentar Economia Aberta
1. Ative o toggle **"Economia Aberta (IS-LM-BP)"**
2. Escolha o regime cambial:
   - **Flutuante**: Taxa de câmbio se ajusta automaticamente
   - **Fixo**: Banco Central mantém câmbio constante
3. Observe a curva BP (roxa) aparecer
4. Experimente políticas e veja os efeitos diferentes

## 📊 Funcionalidades Principais

### Botões de Choque Rápido
Use os botões coloridos para aplicar mudanças rápidas:
- **↑/↓ Gasto Público (G)**: Política fiscal expansionista/contracionista
- **↑/↓ Oferta Moeda (M/P)**: Política monetária expansionista/contracionista
- **↑/↓ Câmbio (e)**: Desvalorização/Valorização (apenas economia aberta)

### Atalhos de Teclado
- `R` - Resetar simulação
- `S` - Abrir cenários
- `H` - Ver histórico
- `E` - Ver equações
- `?` - Ajuda

### Histórico
1. Pressione `H` ou clique em **📊 Histórico**
2. Veja suas últimas 20 simulações
3. Clique em qualquer item para restaurar
4. Exporte para CSV para análise

### Exportar Gráfico
1. Configure a simulação desejada
2. Clique em **📸 Exportar**
3. O gráfico será salvo como PNG

## 🎓 Casos de Uso Educacionais

### Caso 1: Efeito Crowding Out
```
Cenário: Economia Fechada
1. Observe Y e r iniciais
2. Aumente G (Gasto Público)
3. Note: Y aumenta, mas r também sobe
4. Conclusão: Investimento privado é "deslocado"
```

### Caso 2: Armadilha da Liquidez
```
Cenário: "Armadilha da Liquidez"
1. Carregue o cenário pré-configurado
2. Tente aumentar M (Oferta Monetária)
3. Note: Pouco efeito sobre Y
4. Conclusão: Política monetária ineficaz
```

### Caso 3: Mundell-Fleming - Câmbio Flutuante
```
Cenário: "Economia Aberta - Câmbio Flutuante"
1. Ative economia aberta + flutuante
2. Aumente G (Política Fiscal)
3. Note: Y volta ao nível inicial
4. Observe: e (câmbio) se valoriza
5. Conclusão: Política fiscal ineficaz
```

### Caso 4: Mundell-Fleming - Câmbio Fixo
```
Cenário: "Economia Aberta - Câmbio Fixo"
1. Ative economia aberta + fixo
2. Aumente G (Política Fiscal)
3. Note: Y aumenta significativamente
4. Observe: M aumenta automaticamente
5. Conclusão: Política fiscal muito eficaz
```

### Caso 5: Imobilidade Perfeita de Capitais
```
Cenário: "Imobilidade Perfeita de Capitais"
1. Carregue o cenário
2. Observe: BP é VERTICAL (não horizontal)
3. Note: BP não depende de r
4. Equilíbrio externo: apenas conta corrente
5. Y_BP fixo onde exportações = importações
6. Conclusão: Restrição externa rígida
```

## 🔧 Parâmetros Estruturais

### Sensibilidades (Seção inferior do painel)
- **c** (PMgC): Propensão Marginal a Consumir (0.1-0.9)
  - Maior c = IS mais horizontal = maior multiplicador
- **b** (Sen. Inv): Sensibilidade do Investimento aos Juros (10-100)
  - Maior b = IS mais horizontal = política monetária mais eficaz
- **k** (Sen. Moeda a Y): Sensibilidade da Demanda por Moeda à Renda (0.1-1.0)
  - Maior k = LM mais vertical
- **h** (Sen. Moeda a r): Sensibilidade da Demanda por Moeda aos Juros (10-150)
  - Maior h = LM mais horizontal = armadilha da liquidez

## 💡 Dicas

### Para Professores
1. Use **Cenários** para demonstrar casos clássicos
2. **Exporte gráficos** para slides
3. Use **Histórico** para comparar políticas
4. Ajuste **parâmetros estruturais** para casos especiais

### Para Estudantes
1. Comece com **cenários básicos**
2. Leia as **explicações** cuidadosamente
3. Experimente **variações** dos cenários
4. Use o **histórico** para revisar
5. Consulte as **equações** quando necessário

### Para Pesquisa
1. **Exporte dados** em CSV para análise
2. **Salve estados** em JSON para reprodução
3. Use **parâmetros customizados** para calibração
4. Compare **multiplicadores** entre regimes

## ❓ Perguntas Frequentes

### Por que o slider de câmbio está desabilitado?
No regime de **Câmbio Flutuante**, a taxa de câmbio (e) é determinada pelo mercado (endógena). O Banco Central não controla e diretamente.

### Por que o slider de M está desabilitado?
No regime de **Câmbio Fixo**, a oferta monetária (M) é determinada pelas intervenções do Banco Central para manter o câmbio fixo (endógena).

### Como interpretar a curva BP?
A curva BP (Balanço de Pagamentos) mostra combinações de Y e r onde o balanço de pagamentos está equilibrado. Com mobilidade perfeita de capital, BP é horizontal em r = r*.

### O que são os multiplicadores?
- **Multiplicador Fiscal**: Quanto Y aumenta para cada unidade de aumento em G
- **Multiplicador Monetário**: Quanto Y aumenta para cada unidade de aumento em M

### Como salvar minha simulação?
O estado é salvo automaticamente no navegador (localStorage). Use **Histórico** para acessar simulações anteriores ou exporte para JSON.

## 📚 Recursos Adicionais

### Equações do Modelo
Pressione `E` ou clique em **"Ver Equações do Modelo"** para revisar as equações matemáticas completas.

### Ajuda Completa
Pressione `?` ou clique em **❓** para o tutorial completo integrado.

### Documentação Técnica
Consulte `README.md` para detalhes técnicos e arquitetura do código.

---

**Desenvolvido para o ensino de Macroeconomia | Universidade Presbiteriana Mackenzie**
