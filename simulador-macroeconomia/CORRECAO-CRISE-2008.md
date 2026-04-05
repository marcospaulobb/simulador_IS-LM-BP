# Correção: Cenário Crise 2008

## 🐛 Problema Identificado

O cenário "Crise 2008 - Resposta Política" não estava funcionando devido a:

1. **Parâmetros autônomos faltantes**: Todos os cenários estavam sem C0, I0, X0, m, v
2. **Parâmetros gerando equilíbrio inválido**: Combinação de T=700, c=0.5, I0=400 resultava em taxa de juros negativa

## ✅ Correção Aplicada

### 1. Adicionados Parâmetros Autônomos em TODOS os Cenários

Todos os 12 cenários agora incluem:
```javascript
params: {
  // ... parâmetros existentes
  C0: 200,   // Consumo autônomo
  I0: 400,   // Investimento autônomo (300 para Crise 2008)
  X0: 200,   // Exportações base
  m: 0.1,    // Propensão a importar
  v: 150     // Sensibilidade ao câmbio
}
```

### 2. Ajustados Parâmetros do Cenário Crise 2008

**Antes:**
```javascript
crisis2008: {
  params: {
    G: 1300,
    T: 700,    // ❌ Muito baixo
    M: 1600,
    c: 0.5,    // ❌ Muito baixo
    b: 30,
    k: 0.5,
    h: 100,
    // ❌ Faltavam: C0, I0, X0, m, v
  }
}
```

**Depois:**
```javascript
crisis2008: {
  params: {
    G: 1300,
    T: 800,    // ✅ Ajustado
    M: 1600,
    c: 0.6,    // ✅ Ajustado
    b: 30,
    k: 0.5,
    h: 100,
    C0: 200,   // ✅ Adicionado
    I0: 300,   // ✅ Adicionado (menor devido ao pessimismo)
    X0: 200,   // ✅ Adicionado
    m: 0.1,    // ✅ Adicionado
    v: 150     // ✅ Adicionado
  }
}
```

### 3. Melhorada Explicação

**Antes:**
> "Resposta à crise: expansão fiscal e monetária combinadas. Investimento pouco sensível (b baixo) devido ao pessimismo."

**Depois:**
> "Resposta à crise: expansão fiscal e monetária combinadas. Investimento pouco sensível (b baixo) devido ao pessimismo. LM mais horizontal (h alto) representa armadilha da liquidez."

## 📊 Resultado do Equilíbrio

Com os novos parâmetros:
- **Y (Renda)**: 3272.73
- **r (Juros)**: 0.36%

Valores válidos e economicamente coerentes com uma situação de crise onde:
- Juros muito baixos (próximos de zero)
- Renda elevada devido às políticas expansionistas
- Armadilha da liquidez (h=100, LM quase horizontal)

## 🧪 Teste de Verificação

Executado teste automatizado que confirma:
- ✅ Cenário carrega corretamente
- ✅ Todos os parâmetros presentes
- ✅ Equilíbrio calculado com sucesso
- ✅ Y é finito e positivo
- ✅ r é finito e não-negativo

## 📝 Arquivos Modificados

1. `src/scenarios/scenarios.js` - Todos os 12 cenários atualizados
2. `CHANGELOG.md` - Documentada a correção (v2.0.1)
3. `CORRECAO-CRISE-2008.md` - Este documento

## ✅ Status

**Problema:** ❌ Resolvido  
**Versão:** 2.0.1  
**Data:** 04 de Abril de 2026  
**Testado:** ✅ Sim

## 🚀 Como Testar

```bash
# 1. Instalar/atualizar
npm install

# 2. Executar testes
npm test

# 3. Iniciar simulador
npm run dev

# 4. No navegador:
# - Pressionar 'S' para abrir cenários
# - Selecionar "Crise 2008 - Resposta Política"
# - Verificar que carrega sem erros
# - Observar Y ≈ 3273 e r ≈ 0.36%
```

## 💡 Lições Aprendidas

1. **Sempre incluir todos os parâmetros**: O modelo refatorado requer C0, I0, X0, m, v
2. **Validar equilíbrios**: Parâmetros devem gerar Y > 0 e r ≥ 0
3. **Testar cenários individualmente**: Cada cenário deve ser testado após criação
4. **Documentar correções**: Manter CHANGELOG atualizado

## 📞 Suporte

Se encontrar problemas similares em outros cenários:
1. Verificar se todos os parâmetros estão presentes
2. Executar `npm test` para validar modelo
3. Consultar `src/model.js` para ver validações
4. Ajustar parâmetros se necessário

---

**Correção aplicada com sucesso! ✅**

Todos os 12 cenários agora funcionam corretamente.
