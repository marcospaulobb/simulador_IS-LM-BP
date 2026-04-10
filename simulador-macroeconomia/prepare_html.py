import re

with open('c:\\Users\\USER\\Documents\\Estágio Docência\\simulador-macroeconomia\\index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update Graph height
html = html.replace('max-h-[500px]', 'max-h-[350px]')

# 2. Replace Header Buttons (remove history and capture, add mobility filter)
header_str = """          </div>
          
          <div class="flex items-center space-x-3 bg-green-50 px-3 py-1.5 rounded border border-green-200 mr-2" id="header-capital-mobility">
            <span class="text-[11px] font-bold text-green-800 uppercase tracking-wide">Mobilidade de Capitais:</span>
            <label class="flex items-center space-x-1 cursor-pointer">
              <input type="radio" name="capitalMobility" value="perfect" class="text-green-600 w-3 h-3" checked>
              <span class="text-xs text-gray-700">Perfeita</span>
            </label>
            <label class="flex items-center space-x-1 cursor-pointer">
              <input type="radio" name="capitalMobility" value="imperfect" class="text-green-600 w-3 h-3">
              <span class="text-xs text-gray-700">Imperfeita</span>
            </label>
            <label class="flex items-center space-x-1 cursor-pointer">
              <input type="radio" name="capitalMobility" value="zero" class="text-green-600 w-3 h-3">
              <span class="text-xs text-gray-700">Nula</span>
            </label>
            <label class="flex items-center space-x-1 cursor-pointer hidden">
              <input type="radio" name="capitalMobility" value="closed" class="text-green-600 w-3 h-3">
            </label>
          </div>

          <button id="btn-scenarios" class="px-3 py-2 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-100 transition" title="Cenários (S)">📚 Cenários</button>
          <button id="btn-help" class="px-3 py-2 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-100 transition" title="Ajuda (?)">❓</button>
          <button id="btn-reset" class="px-3 py-2 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-100 transition" title="Resetar (R)">🔄 Resetar</button>
          <button id="btn-export" class="px-4 py-2 bg-mackenzie-green text-white rounded text-sm hover:bg-green-700 transition">📸 Exportar</button>
        </div>"""

pattern_header = r'          </div>\s+<button id="btn-scenarios".*?<button id="btn-export".*?</div>'
html = re.sub(pattern_header, header_str, html, flags=re.DOTALL)

# 3. Replace Right Column with Tabs Design
right_column = """      <!-- Right Column: Controls -->
      <section class="w-full lg:w-[480px] bg-white border-l border-gray-200 flex flex-col overflow-hidden shadow-2xl z-40">
        <!-- Header do Painel -->
        <div class="bg-gradient-to-r from-mackenzie-green to-teal-700 text-white p-3 flex-none">
          <h2 class="text-sm font-bold border-b border-green-600 pb-2 mb-2">Painel de Controle</h2>
          
          <div class="flex space-x-1">
            <button class="flex-1 px-1 py-1.5 text-xs bg-white text-teal-800 rounded font-bold shadow transition" id="tabbtn-policy" onclick="document.getElementById('pane-policy').classList.remove('hidden'); document.getElementById('pane-auto').classList.add('hidden'); document.getElementById('pane-open').classList.add('hidden'); document.getElementById('tabbtn-policy').classList.add('bg-white', 'text-teal-800'); document.getElementById('tabbtn-policy').classList.remove('bg-teal-800', 'text-white', 'hover:bg-teal-600'); document.getElementById('tabbtn-auto').classList.remove('bg-white', 'text-teal-800'); document.getElementById('tabbtn-auto').classList.add('bg-teal-800', 'text-white', 'hover:bg-teal-600'); document.getElementById('tabbtn-open').classList.remove('bg-white', 'text-teal-800'); document.getElementById('tabbtn-open').classList.add('bg-teal-800', 'text-white', 'hover:bg-teal-600');">Políticas</button>
            <button class="flex-1 px-1 py-1.5 text-xs bg-teal-800 text-white rounded hover:bg-teal-600 font-bold transition" id="tabbtn-auto" onclick="document.getElementById('pane-auto').classList.remove('hidden'); document.getElementById('pane-policy').classList.add('hidden'); document.getElementById('pane-open').classList.add('hidden'); document.getElementById('tabbtn-auto').classList.add('bg-white', 'text-teal-800'); document.getElementById('tabbtn-auto').classList.remove('bg-teal-800', 'text-white', 'hover:bg-teal-600'); document.getElementById('tabbtn-policy').classList.remove('bg-white', 'text-teal-800'); document.getElementById('tabbtn-policy').classList.add('bg-teal-800', 'text-white', 'hover:bg-teal-600'); document.getElementById('tabbtn-open').classList.remove('bg-white', 'text-teal-800'); document.getElementById('tabbtn-open').classList.add('bg-teal-800', 'text-white', 'hover:bg-teal-600');">Autônomos / Estruturais</button>
            <button class="flex-1 px-1 py-1.5 text-xs bg-teal-800 text-white rounded hover:bg-teal-600 font-bold transition open-eco-group hidden" id="tabbtn-open" onclick="document.getElementById('pane-open').classList.remove('hidden'); document.getElementById('pane-policy').classList.add('hidden'); document.getElementById('pane-auto').classList.add('hidden'); document.getElementById('tabbtn-open').classList.add('bg-white', 'text-teal-800'); document.getElementById('tabbtn-open').classList.remove('bg-teal-800', 'text-white', 'hover:bg-teal-600'); document.getElementById('tabbtn-policy').classList.remove('bg-white', 'text-teal-800'); document.getElementById('tabbtn-policy').classList.add('bg-teal-800', 'text-white', 'hover:bg-teal-600'); document.getElementById('tabbtn-auto').classList.remove('bg-white', 'text-teal-800'); document.getElementById('tabbtn-auto').classList.add('bg-teal-800', 'text-white', 'hover:bg-teal-600');">Economia Aberta</button>
          </div>
        </div>
        
        <!-- Scrollable Content -->
        <div class="flex-1 overflow-y-auto p-3 bg-gray-50">
          
          <!-- PANE 1: POLÍTICA -->
          <div id="pane-policy" class="space-y-4">
            <!-- Shock Buttons -->
            <div class="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
              <h3 class="text-[10px] font-bold text-gray-600 uppercase tracking-wide mb-2 flex items-center gap-2">
                <span class="w-4 h-4 bg-mackenzie-green rounded text-white flex items-center justify-center text-[8px]">⚡</span>
                Choques Rápidos
              </h3>
              <div class="grid grid-cols-2 gap-1.5">
                <button class="shock-btn bg-blue-50 hover:bg-blue-100 text-blue-700 p-1.5 rounded-lg text-xs font-semibold border border-blue-200 transition-all hover:scale-[1.02]" data-shock="G" data-dir="up">↑ Gasto</button>
                <button class="shock-btn bg-blue-50 hover:bg-blue-100 text-blue-700 p-1.5 rounded-lg text-xs font-semibold border border-blue-200 transition-all hover:scale-[1.02]" data-shock="G" data-dir="down">↓ Gasto</button>
                <button class="shock-btn bg-green-50 hover:bg-green-100 text-green-700 p-1.5 rounded-lg text-xs font-semibold border border-green-200 transition-all hover:scale-[1.02]" data-shock="M" data-dir="up">↑ Moeda</button>
                <button class="shock-btn bg-green-50 hover:bg-green-100 text-green-700 p-1.5 rounded-lg text-xs font-semibold border border-green-200 transition-all hover:scale-[1.02]" data-shock="M" data-dir="down">↓ Moeda</button>
                <button class="shock-btn open-eco-btn hidden bg-purple-50 hover:bg-purple-100 text-purple-700 p-1.5 rounded-lg text-xs font-semibold border border-purple-200 transition-all hover:scale-[1.02]" data-shock="e" data-dir="up">↑ Câmbio</button>
                <button class="shock-btn open-eco-btn hidden bg-purple-50 hover:bg-purple-100 text-purple-700 p-1.5 rounded-lg text-xs font-semibold border border-purple-200 transition-all hover:scale-[1.02]" data-shock="e" data-dir="down">↓ Câmbio</button>
              </div>
            </div>

            <!-- Policy Sliders -->
            <div class="bg-white rounded-lg p-3 border border-blue-200 shadow-sm relative overflow-hidden">
              <div class="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
              <h3 class="text-[10px] font-bold text-blue-800 uppercase tracking-wide mb-3 flex items-center gap-2 pl-2">
                Variáveis de Política
              </h3>
              
              <div class="space-y-3 pl-2">
                <div class="control-group-enhanced">
                  <div class="flex justify-between mb-1">
                    <label class="text-xs font-semibold text-gray-800">Gasto Público (G)</label>
                    <input type="number" id="val-G" min="1000" max="3500" step="100" value="2200" class="text-xs font-bold text-mackenzie-green val-input px-1.5 py-0.5 bg-gray-50 rounded border border-gray-300 w-16 text-right focus:outline-none focus:ring-1 focus:ring-mackenzie-green">
                  </div>
                  <input type="range" id="slider-G" min="1000" max="3500" step="100" value="2200" class="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-mackenzie-green slider-enhanced">
                </div>

                <div class="control-group-enhanced">
                  <div class="flex justify-between mb-1">
                    <label class="text-xs font-semibold text-gray-800">Tributação (T)</label>
                    <input type="number" id="val-T" min="2000" max="5000" step="100" value="3500" class="text-xs font-bold text-mackenzie-green val-input px-1.5 py-0.5 bg-gray-50 rounded border border-gray-300 w-16 text-right focus:outline-none focus:ring-1 focus:ring-mackenzie-green">
                  </div>
                  <input type="range" id="slider-T" min="2000" max="5000" step="100" value="3500" class="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-mackenzie-green slider-enhanced">
                </div>

                <div class="control-group-enhanced">
                  <div class="flex justify-between mb-1">
                    <label class="text-xs font-semibold text-gray-800">Oferta de Moeda (M/P)</label>
                    <input type="number" id="val-M" min="800" max="3000" step="100" value="1800" class="text-xs font-bold text-mackenzie-green val-input px-1.5 py-0.5 bg-gray-50 rounded border border-gray-300 w-16 text-right focus:outline-none focus:ring-1 focus:ring-mackenzie-green">
                  </div>
                  <input type="range" id="slider-M" min="800" max="3000" step="100" value="1800" class="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-mackenzie-green slider-enhanced">
                </div>

                <!-- Open Economy controls -->
                <div class="control-group-enhanced open-eco-group hidden">
                  <div class="flex justify-between mb-1">
                    <label class="text-xs font-semibold text-gray-800">Taxa de Câmbio (e)</label>
                    <input type="number" id="val-e" min="4.0" max="6.0" step="0.01" value="5.17" class="text-xs font-bold text-purple-600 val-input px-1.5 py-0.5 bg-gray-50 rounded border border-gray-300 w-16 text-right focus:outline-none focus:ring-1 focus:ring-purple-600">
                  </div>
                  <input type="range" id="slider-e" min="4.0" max="6.0" step="0.01" value="5.17" class="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600 slider-enhanced">
                  <p class="text-[9px] text-gray-500 mt-0.5 italic" id="hint-e">Desativado no Câmbio Flutuante</p>
                </div>
                
                <div class="control-group-enhanced open-eco-group hidden">
                  <div class="flex justify-between mb-1">
                    <label class="text-xs font-semibold text-gray-800">Tx. Juros Int. (r*)</label>
                    <input type="number" id="val-rstar" min="1.0" max="12.0" step="0.25" value="5.25" class="text-xs font-bold text-purple-600 val-input px-1.5 py-0.5 bg-gray-50 rounded border border-gray-300 w-16 text-right focus:outline-none focus:ring-1 focus:ring-purple-600">
                  </div>
                  <input type="range" id="slider-rstar" min="1.0" max="12.0" step="0.25" value="5.25" class="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600 slider-enhanced">
                </div>
              </div>
            </div>
          </div>

          <!-- PANE 2: AUTÔNOMOS E ESTRUTURAIS -->
          <div id="pane-auto" class="space-y-4 hidden">
             <!-- Autônomos -->
             <div class="bg-white rounded-lg p-3 border border-gray-200 shadow-sm relative overflow-hidden">
              <div class="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
               <h3 class="text-[10px] font-bold text-blue-800 uppercase tracking-wide mb-2 pl-2">Componentes Autônomos</h3>
               <div class="grid grid-cols-2 gap-2 pl-2">
                 <div>
                   <label class="text-[10px] font-semibold text-gray-600">Consumo (C0)</label>
                   <input type="number" id="param-C0" class="w-full px-1.5 py-1 border rounded text-xs bg-gray-50" value="1500" step="100">
                 </div>
                 <div>
                   <label class="text-[10px] font-semibold text-gray-600">Investimento (I0)</label>
                   <input type="number" id="param-I0" class="w-full px-1.5 py-1 border rounded text-xs bg-gray-50" value="2000" step="100">
                 </div>
                 <div class="open-eco-group hidden">
                   <label class="text-[10px] font-semibold text-gray-600">Exportações (X0)</label>
                   <input type="number" id="param-X0" class="w-full px-1.5 py-1 border rounded text-xs bg-gray-50" value="1500" step="100">
                 </div>
                 <div class="open-eco-group hidden">
                   <label class="text-[10px] font-semibold text-gray-600">Importações (M0)</label>
                   <input type="number" id="param-M0" class="w-full px-1.5 py-1 border rounded text-xs bg-gray-50" value="1300" step="100">
                 </div>
                 <div>
                   <label class="text-[10px] font-semibold text-gray-600">Demanda Moeda (L0)</label>
                   <input type="number" id="param-L0" class="w-full px-1.5 py-1 border rounded text-xs bg-gray-50" value="0" step="10">
                 </div>
                 <div class="open-eco-group hidden">
                   <label class="text-[10px] font-semibold text-gray-600">Tx. Capital (K0)</label>
                   <input type="number" id="param-K0" class="w-full px-1.5 py-1 border rounded text-xs bg-gray-50" value="0" step="10">
                 </div>
               </div>
               <button id="btn-apply-auto" class="mt-2 text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded w-full font-bold uppercase transition hover:bg-blue-200" onclick="document.getElementById('btn-apply-advanced').click()">Aplicar Autônomos</button>
             </div>

             <!-- Parâmetros Estruturais -->
             <div class="bg-white rounded-lg p-3 border border-gray-200 shadow-sm relative overflow-hidden">
               <div class="absolute top-0 left-0 w-1 h-full bg-gray-600"></div>
               <h3 class="text-[10px] font-bold text-gray-700 uppercase tracking-wide mb-3 pl-2">Parâmetros Estruturais</h3>
               <div class="space-y-2.5 pl-2">
                <div class="control-group-enhanced-small">
                  <div class="flex justify-between mb-1">
                    <label class="text-[11px] font-medium text-gray-700">PMgC (c)</label>
                    <input type="number" id="val-c" min="0.1" max="0.9" step="0.05" value="0.6" class="text-xs font-bold text-gray-700 val-input px-1 py-0 bg-gray-50 rounded border border-gray-300 w-12 text-right focus:outline-none">
                  </div>
                  <input type="range" id="slider-c" min="0.1" max="0.9" step="0.05" value="0.6" class="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-600">
                </div>

                <div class="control-group-enhanced-small">
                  <div class="flex justify-between mb-1">
                    <label class="text-[11px] font-medium text-gray-700">Sen. Inv (b)</label>
                    <input type="number" id="val-b" min="10" max="100" step="5" value="50" class="text-xs font-bold text-gray-700 val-input px-1 py-0 bg-gray-50 rounded border border-gray-300 w-12 text-right focus:outline-none">
                  </div>
                  <input type="range" id="slider-b" min="10" max="100" step="5" value="50" class="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-600">
                </div>

                <div class="control-group-enhanced-small">
                  <div class="flex justify-between mb-1">
                    <label class="text-[11px] font-medium text-gray-700">Sen. Moeda Y (k)</label>
                    <input type="number" id="val-k" min="0.1" max="1.0" step="0.05" value="0.5" class="text-xs font-bold text-gray-700 val-input px-1 py-0 bg-gray-50 rounded border border-gray-300 w-12 text-right focus:outline-none">
                  </div>
                  <input type="range" id="slider-k" min="0.1" max="1.0" step="0.05" value="0.5" class="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-600">
                </div>

                <div class="control-group-enhanced-small">
                  <div class="flex justify-between mb-1">
                    <label class="text-[11px] font-medium text-gray-700">Sen. Moeda r (h)</label>
                    <input type="number" id="val-h" min="10" max="150" step="5" value="60" class="text-xs font-bold text-gray-700 val-input px-1 py-0 bg-gray-50 rounded border border-gray-300 w-12 text-right focus:outline-none">
                  </div>
                  <input type="range" id="slider-h" min="10" max="150" step="5" value="60" class="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-600">
                </div>
               </div>
             </div>
          </div>

          <!-- PANE 3: ECONOMIA ABERTA -->
          <div id="pane-open" class="space-y-4 hidden">
             <div class="bg-white rounded-lg p-3 border border-purple-200 shadow-sm relative overflow-hidden">
               <div class="absolute top-0 left-0 w-1 h-full bg-purple-600"></div>
               <h3 class="text-[10px] font-bold text-purple-800 uppercase tracking-wide mb-2 pl-2">Parâmetros de Ec. Aberta</h3>
               <div class="grid grid-cols-2 gap-2 pl-2">
                 <div>
                   <label class="text-[10px] font-semibold text-gray-600" title="Sensib. Export. à Renda Externa">Exp a Rend. Ext (x1)</label>
                   <input type="number" id="param-x1" class="w-full px-1.5 py-1 border rounded text-xs bg-gray-50" value="0.15" step="0.01">
                 </div>
                 <div>
                   <label class="text-[10px] font-semibold text-gray-600" title="Sensib. Export. ao Câmbio">Exp ao Câmbio (x2)</label>
                   <input type="number" id="param-x2" class="w-full px-1.5 py-1 border rounded text-xs bg-gray-50" value="300" step="10">
                 </div>
                 <div>
                   <label class="text-[10px] font-semibold text-gray-600" title="Sensib. Import. ao Câmbio">Imp ao Câmbio (m2)</label>
                   <input type="number" id="param-m2" class="w-full px-1.5 py-1 border rounded text-xs bg-gray-50" value="200" step="10">
                 </div>
                 <div>
                   <label class="text-[10px] font-semibold text-gray-600">Mobilidade (f)</label>
                   <input type="number" id="param-f" class="w-full px-1.5 py-1 border rounded text-xs bg-gray-50" value="100" step="10" disabled title="Definido automaticamente pelos botões de mobilidade no cabeçalho">
                 </div>
                 <div>
                   <label class="text-[10px] font-semibold text-gray-600">Renda Ext (Y*)</label>
                   <input type="number" id="param-Ystar" class="w-full px-1.5 py-1 border rounded text-xs bg-gray-50" value="12000" step="100">
                 </div>
                 <div>
                   <label class="text-[10px] font-semibold text-gray-600">Preços (P)</label>
                   <input type="number" id="param-P" class="w-full px-1.5 py-1 border rounded text-xs bg-gray-50" value="1.0" step="0.1">
                 </div>
               </div>
               <button id="btn-apply-open" class="mt-2 text-[10px] bg-purple-100 text-purple-700 px-2 py-1 rounded w-full font-bold uppercase transition hover:bg-purple-200" onclick="document.getElementById('btn-apply-advanced').click()">Aplicar Ec. Aberta</button>
             </div>
          </div>
          
        </div>
        
        <!-- Bottom Actions -->
        <div class="bg-white p-3 border-t border-gray-200 flex gap-2 flex-none">
           <button id="btn-equations" class="flex-1 px-2 py-2 bg-gradient-to-r from-mackenzie-green to-teal-700 text-white rounded text-xs font-bold hover:shadow-md transition whitespace-nowrap">
             📐 Equações
           </button>
           <button id="btn-load-scenario-expanded" class="flex-1 px-2 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded text-xs font-bold hover:shadow-md transition whitespace-nowrap">
             📚 Cenários (+)
           </button>
           <!-- Hidden but kept to prevent logic errors in main-new.js -->
           <button id="btn-apply-advanced" class="hidden"></button>
           <button id="btn-advanced" class="hidden"></button>
           <button id="btn-close-advanced" class="hidden"></button>
           <button id="btn-reset-advanced" class="hidden"></button>
           <button id="btn-history" class="hidden"></button>
           <button id="btn-capture" class="hidden"></button>
        </div>
      </section>"""

pattern_rightcol = r'      <!-- Right Column: Controls -->\s+<section class="w-full lg:w-\[420px\] bg-white border-l border-gray-200 flex flex-col overflow-hidden shadow-2xl z-40">.*?</section>'
html = re.sub(pattern_rightcol, right_column, html, flags=re.DOTALL)

# 4. Remove Advanced Modal since we incorporated its contents
pattern_advanced_modal = r'    <!-- Modal Parâmetros Avançados -->\s+<div id="advanced-modal" .*?</div>\s*</div>\s*</div>'
html = re.sub(pattern_advanced_modal, '', html, flags=re.DOTALL)

with open('c:\\Users\\USER\\Documents\\Estágio Docência\\simulador-macroeconomia\\index_modified.html', 'w', encoding='utf-8') as f:
    f.write(html)
