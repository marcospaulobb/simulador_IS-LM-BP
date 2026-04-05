/**
 * Modal Manager - Handles all modal dialogs
 */
import { scenarios, getCategories } from '../scenarios/scenarios.js';
import { getHistory, exportToCSV } from '../utils/storage.js';

export class ModalManager {
  constructor() {
    this.modals = {};
    this.callbacks = {};
  }

  /**
   * Initialize modals
   */
  init() {
    this.createScenariosModal();
    this.createHistoryModal();
    this.createHelpModal();
  }

  /**
   * Create scenarios modal
   */
  createScenariosModal() {
    const modal = document.createElement('div');
    modal.id = 'scenarios-modal';
    modal.className = 'fixed inset-0 z-[100] hidden bg-black bg-opacity-50 flex items-center justify-center p-4';
    
    const categories = getCategories();
    const categoryNames = {
      basic: 'Básico',
      fiscal: 'Política Fiscal',
      monetary: 'Política Monetária',
      open: 'Economia Aberta',
      special: 'Casos Especiais',
      parameters: 'Parâmetros',
      historical: 'Histórico'
    };
    
    let categoriesHTML = '';
    categories.forEach(cat => {
      const catScenarios = Object.entries(scenarios)
        .filter(([_, s]) => s.category === cat)
        .map(([key, s]) => `
          <button class="scenario-btn w-full text-left p-3 rounded-lg border border-gray-200 hover:border-mackenzie-green hover:bg-green-50 transition" data-scenario="${key}">
            <div class="font-semibold text-gray-800">${s.name}</div>
            <div class="text-xs text-gray-600 mt-1">${s.description}</div>
          </button>
        `).join('');
      
      categoriesHTML += `
        <div class="mb-6">
          <h3 class="font-bold text-mackenzie-green mb-3 text-sm uppercase tracking-wide">${categoryNames[cat] || cat}</h3>
          <div class="space-y-2">
            ${catScenarios}
          </div>
        </div>
      `;
    });
    
    modal.innerHTML = `
      <div class="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] flex flex-col">
        <div class="p-6 border-b flex justify-between items-center">
          <h2 class="text-2xl font-bold text-mackenzie-green">Cenários Pré-Configurados</h2>
          <button id="btn-close-scenarios" class="text-gray-500 hover:text-gray-800">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div class="p-6 overflow-y-auto flex-1">
          ${categoriesHTML}
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    this.modals.scenarios = modal;
    
    // Event listeners
    modal.querySelector('#btn-close-scenarios').addEventListener('click', () => this.hide('scenarios'));
    modal.querySelectorAll('.scenario-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const key = e.currentTarget.getAttribute('data-scenario');
        if (this.callbacks.onScenarioSelect) {
          this.callbacks.onScenarioSelect(key);
        }
        this.hide('scenarios');
      });
    });
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.hide('scenarios');
    });
  }

  /**
   * Create history modal
   */
  createHistoryModal() {
    const modal = document.createElement('div');
    modal.id = 'history-modal';
    modal.className = 'fixed inset-0 z-[100] hidden bg-black bg-opacity-50 flex items-center justify-center p-4';
    
    modal.innerHTML = `
      <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] flex flex-col">
        <div class="p-6 border-b flex justify-between items-center">
          <h2 class="text-2xl font-bold text-mackenzie-green">Histórico de Simulações</h2>
          <div class="flex items-center space-x-2">
            <button id="btn-export-csv" class="px-4 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition">
              Exportar CSV
            </button>
            <button id="btn-close-history" class="text-gray-500 hover:text-gray-800">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
        </div>
        <div class="p-6 overflow-y-auto flex-1">
          <div id="history-content" class="space-y-3">
            <p class="text-gray-500 text-center py-8">Nenhuma simulação no histórico</p>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    this.modals.history = modal;
    
    // Event listeners
    modal.querySelector('#btn-close-history').addEventListener('click', () => this.hide('history'));
    modal.querySelector('#btn-export-csv').addEventListener('click', () => {
      const history = getHistory();
      exportToCSV(history);
    });
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.hide('history');
    });
  }

  /**
   * Create help/tutorial modal
   */
  createHelpModal() {
    const modal = document.createElement('div');
    modal.id = 'help-modal';
    modal.className = 'fixed inset-0 z-[100] hidden bg-black bg-opacity-50 flex items-center justify-center p-4';
    
    modal.innerHTML = `
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
        <div class="p-6 border-b flex justify-between items-center">
          <h2 class="text-2xl font-bold text-mackenzie-green">Guia de Uso</h2>
          <button id="btn-close-help" class="text-gray-500 hover:text-gray-800">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div class="p-6 overflow-y-auto flex-1 space-y-4 text-sm">
          <div>
            <h3 class="font-bold text-lg mb-2">Como usar o simulador</h3>
            <ol class="list-decimal list-inside space-y-2 text-gray-700">
              <li>Use os <strong>sliders</strong> para ajustar variáveis de política (G, T, M) e parâmetros estruturais</li>
              <li>Clique nos <strong>botões de choque</strong> para aplicar mudanças rápidas</li>
              <li>Alterne entre <strong>Economia Fechada e Aberta</strong> usando o toggle superior</li>
              <li>Em economia aberta, escolha entre <strong>Câmbio Fixo ou Flutuante</strong></li>
              <li>Observe como as curvas IS, LM e BP se deslocam no gráfico</li>
              <li>Leia a <strong>análise econômica</strong> abaixo do gráfico para entender os efeitos</li>
            </ol>
          </div>
          
          <div>
            <h3 class="font-bold text-lg mb-2">Curvas do Modelo</h3>
            <ul class="space-y-2 text-gray-700">
              <li><span class="text-red-600 font-bold">IS (Vermelha):</span> Equilíbrio no mercado de bens. Mostra combinações de Y e r onde investimento = poupança</li>
              <li><span class="text-blue-600 font-bold">LM (Azul):</span> Equilíbrio no mercado monetário. Mostra combinações de Y e r onde oferta = demanda por moeda</li>
              <li><span class="text-purple-600 font-bold">BP (Roxa):</span> Equilíbrio no balanço de pagamentos (apenas economia aberta)</li>
            </ul>
          </div>
          
          <div>
            <h3 class="font-bold text-lg mb-2">Dicas</h3>
            <ul class="list-disc list-inside space-y-1 text-gray-700">
              <li>Experimente os <strong>cenários pré-configurados</strong> para casos clássicos</li>
              <li>Use o <strong>Modo Professor</strong> para exportar o gráfico como imagem</li>
              <li>Consulte o <strong>histórico</strong> para revisar simulações anteriores</li>
              <li>Clique em <strong>Ver Equações</strong> para revisar o modelo matemático</li>
            </ul>
          </div>
          
          <div>
            <h3 class="font-bold text-lg mb-2">Atalhos de Teclado</h3>
            <ul class="list-disc list-inside space-y-1 text-gray-700">
              <li><kbd class="px-2 py-1 bg-gray-200 rounded text-xs">R</kbd> - Resetar simulação</li>
              <li><kbd class="px-2 py-1 bg-gray-200 rounded text-xs">S</kbd> - Abrir cenários</li>
              <li><kbd class="px-2 py-1 bg-gray-200 rounded text-xs">H</kbd> - Abrir histórico</li>
              <li><kbd class="px-2 py-1 bg-gray-200 rounded text-xs">E</kbd> - Ver equações</li>
              <li><kbd class="px-2 py-1 bg-gray-200 rounded text-xs">?</kbd> - Abrir ajuda</li>
            </ul>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    this.modals.help = modal;
    
    modal.querySelector('#btn-close-help').addEventListener('click', () => this.hide('help'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.hide('help');
    });
  }

  /**
   * Show modal
   */
  show(name) {
    if (name === 'history') {
      this.updateHistoryContent();
    }
    
    if (this.modals[name]) {
      this.modals[name].classList.remove('hidden');
    }
  }

  /**
   * Hide modal
   */
  hide(name) {
    if (this.modals[name]) {
      this.modals[name].classList.add('hidden');
    }
  }

  /**
   * Update history modal content
   */
  updateHistoryContent() {
    const history = getHistory();
    const container = document.getElementById('history-content');
    
    if (!history || history.length === 0) {
      container.innerHTML = '<p class="text-gray-500 text-center py-8">Nenhuma simulação no histórico</p>';
      return;
    }
    
    container.innerHTML = history.map(item => `
      <div class="border border-gray-200 rounded-lg p-4 hover:border-mackenzie-green transition cursor-pointer history-item" data-id="${item.id}">
        <div class="flex justify-between items-start mb-2">
          <div class="font-semibold text-gray-800">
            ${new Date(item.savedAt).toLocaleString('pt-BR')}
          </div>
          <div class="text-xs text-gray-500">
            ${item.isOpenEconomy ? 'Aberta' : 'Fechada'} | 
            ${item.isFloatingRate ? 'Flutuante' : 'Fixo'}
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div>Y = ${item.equilibrium?.Y?.toFixed(2) || 'N/A'}</div>
          <div>r = ${item.equilibrium?.r?.toFixed(2) || 'N/A'}</div>
          <div>G = ${item.params.G}</div>
          <div>M = ${item.params.M}</div>
        </div>
      </div>
    `).join('');
    
    // Add click listeners
    container.querySelectorAll('.history-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = parseInt(item.getAttribute('data-id'));
        const historyItem = history.find(h => h.id === id);
        if (historyItem && this.callbacks.onHistorySelect) {
          this.callbacks.onHistorySelect(historyItem);
          this.hide('history');
        }
      });
    });
  }

  /**
   * Register callback
   */
  on(event, callback) {
    this.callbacks[event] = callback;
  }
}
