/**
 * LocalStorage utilities for saving/loading simulations
 */

const STORAGE_KEY = 'mackenzie-macro-sim';
const HISTORY_KEY = 'mackenzie-macro-history';

/**
 * Save current state to localStorage
 */
export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch (e) {
    console.error('Failed to save state:', e);
    return false;
  }
}

/**
 * Load state from localStorage
 */
export function loadState() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Failed to load state:', e);
    return null;
  }
}

/**
 * Clear saved state
 */
export function clearState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (e) {
    console.error('Failed to clear state:', e);
    return false;
  }
}

/**
 * Save simulation to history
 */
export function saveToHistory(simulation) {
  try {
    const history = getHistory();
    history.unshift({
      ...simulation,
      id: Date.now(),
      savedAt: new Date().toISOString()
    });
    
    // Keep only last 20 simulations
    const trimmed = history.slice(0, 20);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
    return true;
  } catch (e) {
    console.error('Failed to save to history:', e);
    return false;
  }
}

/**
 * Get simulation history
 */
export function getHistory() {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to get history:', e);
    return [];
  }
}

/**
 * Clear history
 */
export function clearHistory() {
  try {
    localStorage.removeItem(HISTORY_KEY);
    return true;
  } catch (e) {
    console.error('Failed to clear history:', e);
    return false;
  }
}

/**
 * Export state as JSON file
 */
export function exportToFile(state, filename = 'simulacao-macro.json') {
  const dataStr = JSON.stringify(state, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  
  URL.revokeObjectURL(url);
}

/**
 * Import state from JSON file
 */
export function importFromFile(callback) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';
  
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        callback(data);
      } catch (error) {
        console.error('Failed to parse file:', error);
        alert('Erro ao importar arquivo. Verifique o formato.');
      }
    };
    reader.readAsText(file);
  };
  
  input.click();
}

/**
 * Export to CSV
 */
export function exportToCSV(history) {
  if (!history || history.length === 0) {
    alert('Nenhum dado para exportar');
    return;
  }
  
  const headers = ['Timestamp', 'Y', 'r', 'G', 'T', 'M', 'e', 'r*', 'Economia', 'Câmbio'];
  const rows = history.map(h => [
    new Date(h.timestamp).toLocaleString('pt-BR'),
    h.equilibrium?.Y?.toFixed(2) || '',
    h.equilibrium?.r?.toFixed(2) || '',
    h.params.G,
    h.params.T,
    h.params.M,
    h.params.e,
    h.params.rstar,
    h.isOpenEconomy ? 'Aberta' : 'Fechada',
    h.isFloatingRate ? 'Flutuante' : 'Fixo'
  ]);
  
  const csv = [headers, ...rows]
    .map(row => row.join(','))
    .join('\n');
  
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `historico-simulacao-${Date.now()}.csv`;
  link.click();
  
  URL.revokeObjectURL(url);
}
