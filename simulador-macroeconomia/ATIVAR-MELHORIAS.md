# Como Ativar as Melhorias

## 🚀 Guia Rápido de Ativação

Este guia mostra como ativar todas as melhorias implementadas no simulador.

## ⚡ Ativação Rápida (5 minutos)

### Passo 1: Instalar Dependências
```bash
cd simulador-macroeconomia
npm install
```

### Passo 2: Executar Testes
```bash
npm test
```

**Resultado esperado:** Todos os testes devem passar ✅

### Passo 3: Iniciar Servidor
```bash
npm run dev
```

### Passo 4: Testar no Navegador
Abra: http://localhost:5173

**Pronto!** O simulador com todas as melhorias está funcionando.

## 📋 Checklist de Ativação

### Antes de Começar
- [ ] Node.js instalado (v14+)
- [ ] npm instalado
- [ ] Navegador moderno (Chrome, Firefox, Safari, Edge)
- [ ] Backup do código original (se necessário)

### Instalação
- [ ] `cd simulador-macroeconomia`
- [ ] `npm install` executado com sucesso
- [ ] Sem erros de dependências

### Testes
- [ ] `npm test` executado
- [ ] Todos os 30+ testes passaram
- [ ] Sem erros no console

### Desenvolvimento
- [ ] `npm run dev` iniciado
- [ ] Servidor rodando em http://localhost:5173
- [ ] Página carrega sem erros

### Funcionalidades
- [ ] Gráfico IS-LM aparece
- [ ] Sliders funcionam
- [ ] Botão "Cenários" abre modal
- [ ] Botão "Histórico" abre modal
- [ ] Botão "Ajuda" abre modal
- [ ] Atalhos de teclado funcionam (R, S, H, E, ?)
- [ ] Exportação de gráfico funciona

## 🔧 Configuração Detalhada

### 1. Verificar Ambiente

```bash
# Verificar Node.js
node --version
# Deve ser v14 ou superior

# Verificar npm
npm --version
# Deve ser v6 ou superior
```

### 2. Instalar Dependências

```bash
cd simulador-macroeconomia
npm install
```

**Dependências instaladas:**
- vite (build tool)
- chart.js (gráficos)
- gsap (animações)
- html2canvas (exportação)
- tailwindcss (estilos)
- autoprefixer
- postcss

### 3. Estrutura de Arquivos

Verifique se todos os arquivos foram criados:

```bash
# Verificar estrutura
ls -la src/

# Deve mostrar:
# - state/
# - ui/
# - scenarios/
# - utils/
# - config/
# - tests/
# - model.js
# - chart.js
# - main-new.js
# - style.css
```

### 4. Configuração do HTML

O arquivo `index.html` já está configurado para usar `main-new.js`:

```html
<script type="module" src="/src/main-new.js"></script>
```

### 5. Executar Testes

```bash
npm test
```

**Saída esperada:**
```
=== Testing Economic Model ===

Test Group: Closed Economy
✓ Closed economy Y should be positive
✓ Closed economy r should be positive
...

=== Test Summary ===
Passed: 30+
Failed: 0
Total: 30+

✓ All tests passed!
```

### 6. Iniciar Desenvolvimento

```bash
npm run dev
```

**Saída esperada:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

## 🌐 Acessar o Simulador

### Desenvolvimento
```
http://localhost:5173
```

### Build para Produção
```bash
npm run build
npm run preview
```

## ✅ Verificação de Funcionalidades

### Teste Rápido (2 minutos)

1. **Abrir página**
   - [ ] Página carrega
   - [ ] Gráfico aparece
   - [ ] Sem erros no console (F12)

2. **Testar sliders**
   - [ ] Mover slider de G
   - [ ] Gráfico atualiza
   - [ ] Explicação muda

3. **Testar cenários**
   - [ ] Clicar em "📚 Cenários" ou pressionar S
   - [ ] Modal abre
   - [ ] Clicar em "Expansão Fiscal"
   - [ ] Parâmetros carregam
   - [ ] Notificação aparece

4. **Testar histórico**
   - [ ] Fazer algumas simulações
   - [ ] Pressionar H
   - [ ] Ver histórico
   - [ ] Clicar em item
   - [ ] Estado restaura

5. **Testar exportação**
   - [ ] Clicar em "📸 Exportar"
   - [ ] Arquivo PNG baixa
   - [ ] Imagem está correta

### Teste Completo (10 minutos)

Siga o arquivo `INSTRUCOES-TESTE.md` para teste completo.

## 🐛 Solução de Problemas

### Problema: npm install falha

**Solução:**
```bash
# Limpar cache
npm cache clean --force

# Tentar novamente
npm install
```

### Problema: Porta 5173 em uso

**Solução:**
```bash
# Usar porta diferente
npm run dev -- --port 3000
```

### Problema: Testes falham

**Solução:**
```bash
# Verificar se todos os arquivos foram criados
ls -la src/state/
ls -la src/ui/
ls -la src/scenarios/

# Reinstalar dependências
rm -rf node_modules
npm install
npm test
```

### Problema: Página em branco

**Solução:**
1. Abrir console (F12)
2. Verificar erros
3. Verificar se `main-new.js` existe
4. Verificar se imports estão corretos

### Problema: Modais não aparecem

**Solução:**
```javascript
// Verificar se ModalManager foi inicializado
// Em main-new.js, linha ~200:
modalManager.init();
```

### Problema: LocalStorage não funciona

**Solução:**
1. Verificar se localStorage está habilitado no navegador
2. Limpar dados antigos:
```javascript
// No console do navegador (F12)
localStorage.clear();
location.reload();
```

## 📊 Monitoramento

### Console do Navegador

Abra o console (F12) e verifique:

**Sem erros:**
```
✓ Sem mensagens de erro vermelhas
✓ Sem warnings críticos
✓ Apenas logs informativos
```

**Com melhorias ativas:**
```
StateManager initialized
UIController initialized
ModalManager initialized
Chart initialized
```

### Performance

Use o DevTools para verificar:
- Tempo de carregamento < 2s
- FPS > 30 durante animações
- Memória estável (sem leaks)

## 🎯 Próximos Passos

Após ativação bem-sucedida:

### 1. Explorar Funcionalidades
- [ ] Testar todos os 12 cenários
- [ ] Experimentar atalhos de teclado
- [ ] Usar sistema de histórico
- [ ] Exportar gráficos e dados

### 2. Ler Documentação
- [ ] README.md - Visão geral
- [ ] GUIA-RAPIDO.md - Guia de uso
- [ ] MELHORIAS-IMPLEMENTADAS.md - Detalhes técnicos

### 3. Coletar Feedback
- [ ] Testar com professores
- [ ] Testar com estudantes
- [ ] Documentar sugestões
- [ ] Reportar bugs

### 4. Preparar para Produção
- [ ] Build de produção: `npm run build`
- [ ] Testar build: `npm run preview`
- [ ] Deploy em servidor
- [ ] Configurar domínio

## 📞 Suporte

### Recursos Disponíveis

1. **Documentação**
   - README.md
   - GUIA-RAPIDO.md
   - INSTRUCOES-TESTE.md
   - MIGRACAO.md

2. **Testes**
   - `npm test` - Testes automatizados
   - INSTRUCOES-TESTE.md - Testes manuais

3. **Código**
   - Comentários inline
   - JSDoc em funções
   - Exemplos de uso

### Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Testes
npm test

# Build
npm run build

# Preview
npm run preview

# Limpar
rm -rf node_modules dist
npm install
```

## 🎉 Conclusão

Se você chegou até aqui e todos os checkboxes estão marcados, parabéns! 🎊

O Simulador IS-LM & Mundell-Fleming com todas as melhorias está ativo e funcionando.

### Status Final
- ✅ Dependências instaladas
- ✅ Testes passando
- ✅ Servidor rodando
- ✅ Funcionalidades testadas
- ✅ Pronto para uso

### Próximos Passos
1. Explorar todas as funcionalidades
2. Ler documentação completa
3. Coletar feedback de usuários
4. Preparar para produção

---

**Bem-vindo ao novo Simulador IS-LM! 🚀**

Aproveite todas as melhorias implementadas e boa sorte com o ensino de macroeconomia!
