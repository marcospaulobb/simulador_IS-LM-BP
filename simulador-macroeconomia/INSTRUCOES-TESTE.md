# Instruções para Testar as Melhorias

## 🚀 Passo a Passo para Iniciar

### 1. Instalar Dependências
```bash
cd simulador-macroeconomia
npm install
```

### 2. Executar Testes do Modelo
```bash
npm test
```

**Resultado Esperado:**
```
=== Testing Economic Model ===
✓ Closed economy Y should be positive
✓ Closed economy r should be positive
...
✓ All tests passed!
```

### 3. Iniciar o Servidor de Desenvolvimento
```bash
npm run dev
```

**Resultado Esperado:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 4. Abrir no Navegador
Abra: http://localhost:5173

## ✅ Checklist de Funcionalidades para Testar

### Funcionalidades Básicas
- [ ] Página carrega sem erros
- [ ] Gráfico IS-LM aparece
- [ ] Sliders funcionam suavemente
- [ ] Valores são atualizados em tempo real
- [ ] Explicação econômica muda conforme ajustes

### Botões de Choque
- [ ] ↑ Gasto Público aumenta G
- [ ] ↓ Gasto Público diminui G
- [ ] ↑ Oferta Moeda aumenta M
- [ ] ↓ Oferta Moeda diminui M
- [ ] Animação visual nos sliders

### Toggles
- [ ] Toggle Economia Fechada/Aberta funciona
- [ ] Curva BP aparece em economia aberta
- [ ] Toggle Câmbio Fixo/Flutuante funciona
- [ ] Sliders corretos são desabilitados

### Cenários (Pressione S ou clique em 📚 Cenários)
- [ ] Modal de cenários abre
- [ ] 12 cenários estão listados
- [ ] Cenários estão categorizados
- [ ] Clicar em cenário carrega parâmetros
- [ ] Notificação de sucesso aparece
- [ ] Explicação específica do cenário é mostrada

### Histórico (Pressione H ou clique em 📊 Histórico)
- [ ] Modal de histórico abre
- [ ] Simulações são salvas automaticamente
- [ ] Lista mostra últimas simulações
- [ ] Clicar em item restaura estado
- [ ] Botão "Exportar CSV" funciona

### Ajuda (Pressione ? ou clique em ❓)
- [ ] Modal de ajuda abre
- [ ] Tutorial está completo
- [ ] Atalhos de teclado listados
- [ ] Fechar modal funciona

### Equações (Pressione E ou clique em "Ver Equações")
- [ ] Modal de equações abre
- [ ] Equações renderizam com KaTeX
- [ ] Equações estão corretas
- [ ] Fechar modal funciona

### Exportação (Clique em 📸 Exportar)
- [ ] Gráfico é exportado como PNG
- [ ] Imagem tem boa qualidade
- [ ] Nome do arquivo é descritivo
- [ ] Notificação de sucesso aparece

### Resetar (Pressione R ou clique em 🔄 Resetar)
- [ ] Parâmetros voltam aos valores padrão
- [ ] Gráfico é atualizado
- [ ] Notificação aparece

### Atalhos de Teclado
- [ ] R - Resetar funciona
- [ ] S - Cenários funciona
- [ ] H - Histórico funciona
- [ ] E - Equações funciona
- [ ] ? - Ajuda funciona

### Validação e Erros
- [ ] Parâmetros inválidos são rejeitados
- [ ] Mensagens de erro são claras
- [ ] Aplicação não quebra com valores extremos
- [ ] Notificações de erro aparecem

### Performance
- [ ] Sliders respondem suavemente (sem lag)
- [ ] Gráfico atualiza rapidamente
- [ ] Sem travamentos ao mudar parâmetros
- [ ] Animações são fluidas

### Persistência
- [ ] Estado é salvo automaticamente
- [ ] Recarregar página mantém estado
- [ ] Histórico persiste entre sessões
- [ ] LocalStorage funciona

## 🧪 Testes Específicos de Cenários

### Teste 1: Expansão Fiscal (Economia Fechada)
1. Clique em "📚 Cenários"
2. Selecione "Expansão Fiscal"
3. **Verifique:**
   - G aumentou para 1400
   - Curva IS deslocou para direita
   - Y aumentou
   - r aumentou (crowding out)
   - Explicação menciona "efeito deslocamento"

### Teste 2: Armadilha da Liquidez
1. Carregue cenário "Armadilha da Liquidez"
2. **Verifique:**
   - h = 150 (alto)
   - LM está quase horizontal
   - Tente aumentar M
   - Observe que efeito sobre Y é pequeno

### Teste 3: Economia Aberta - Câmbio Flutuante
1. Carregue "Economia Aberta - Câmbio Flutuante"
2. **Verifique:**
   - Curva BP aparece (roxa, horizontal)
   - Slider de e está desabilitado
   - Aumente G
   - Observe que Y volta ao nível inicial
   - e se valoriza (diminui)
   - Explicação diz "política fiscal INEFICAZ"

### Teste 4: Economia Aberta - Câmbio Fixo
1. Carregue "Economia Aberta - Câmbio Fixo"
2. **Verifique:**
   - Slider de M está desabilitado
   - Slider de e está habilitado
   - Aumente G
   - Observe que Y aumenta significativamente
   - M aumenta automaticamente
   - Explicação diz "política fiscal MUITO EFICAZ"

### Teste 5: Crise 2008
1. Carregue "Crise 2008 - Resposta Política"
2. **Verifique:**
   - G = 1300 (expansão fiscal)
   - M = 1600 (expansão monetária)
   - b = 30 (investimento pouco sensível)
   - Explicação menciona "pessimismo"

## 🔍 Testes de Validação

### Teste de Parâmetros Inválidos
1. Abra o console do navegador (F12)
2. Tente ajustar c para 1.0 ou mais
3. **Verifique:** Erro é capturado e notificação aparece

### Teste de Casos Extremos
1. Ajuste b para valor muito baixo (10)
2. **Verifique:** IS fica muito inclinada
3. Ajuste h para valor muito alto (150)
4. **Verifique:** LM fica quase horizontal

### Teste de Eixos Dinâmicos
1. Ajuste parâmetros para valores extremos
2. **Verifique:** Eixos se ajustam automaticamente
3. Todos os dados permanecem visíveis

## 📊 Teste de Exportação

### Exportar Gráfico
1. Configure uma simulação interessante
2. Clique em "📸 Exportar"
3. **Verifique:**
   - Arquivo PNG é baixado
   - Nome: `mackenzie-is-lm-[timestamp].png`
   - Imagem tem boa qualidade
   - Gráfico está completo

### Exportar Histórico
1. Faça várias simulações
2. Abra histórico (H)
3. Clique em "Exportar CSV"
4. **Verifique:**
   - Arquivo CSV é baixado
   - Contém todas as simulações
   - Formato está correto
   - Pode ser aberto no Excel

## 🐛 Problemas Conhecidos e Soluções

### Problema: Equações não renderizam
**Solução:** Aguarde 1-2 segundos após abrir o modal. KaTeX precisa carregar do CDN.

### Problema: Gráfico não aparece
**Solução:** 
1. Verifique console (F12) para erros
2. Limpe cache do navegador
3. Recarregue a página

### Problema: LocalStorage cheio
**Solução:**
1. Abra console (F12)
2. Execute: `localStorage.clear()`
3. Recarregue a página

### Problema: Notificações não aparecem
**Solução:** Verifique se há bloqueador de pop-ups ativo

## 📝 Relatório de Bugs

Se encontrar bugs, anote:
1. **O que você estava fazendo?**
2. **O que esperava que acontecesse?**
3. **O que realmente aconteceu?**
4. **Mensagens de erro no console?**
5. **Passos para reproduzir**

## ✨ Feedback

Após testar, considere:
- [ ] Todas as funcionalidades funcionam?
- [ ] Interface é intuitiva?
- [ ] Explicações são claras?
- [ ] Performance é boa?
- [ ] Há bugs críticos?
- [ ] Sugestões de melhoria?

## 🎓 Teste Educacional

### Para Professores
1. Prepare uma aula usando os cenários
2. Exporte gráficos para slides
3. Use histórico para comparar políticas
4. Avalie se atende necessidades didáticas

### Para Estudantes
1. Explore cenários básicos
2. Leia explicações
3. Experimente variações
4. Use histórico para revisar
5. Avalie se ajuda no aprendizado

## 🚀 Próximos Passos

Após testar com sucesso:
1. [ ] Fazer backup do código original
2. [ ] Substituir main.js por main-new.js
3. [ ] Testar em produção
4. [ ] Coletar feedback de usuários
5. [ ] Iterar com melhorias

---

**Boa sorte com os testes! 🎉**

Se tudo funcionar conforme esperado, você terá um simulador de macroeconomia de nível profissional pronto para uso educacional.
