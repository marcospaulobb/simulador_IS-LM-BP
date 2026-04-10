/**
 * UI Controller - Manages all UI interactions
 * Clean version: no references to old toggle elements
 */
import gsap from 'gsap';

export class UIController {
  constructor(stateManager) {
    this.state = stateManager;
    this.sliders = {};
    this.displays = {};
    this.initElements();
  }

  initElements() {
    // Sliders & numeric inputs
    const sliderIds = ['G', 'T', 'M', 'e', 'rstar', 'c', 'b', 'k', 'h'];
    sliderIds.forEach(id => {
      this.sliders[id] = document.getElementById(`slider-${id}`);
      this.displays[id] = document.getElementById(`val-${id}`);
    });

    // Panel groups that show/hide based on open economy
    this.openEcoGroups = document.querySelectorAll('.open-eco-group');
    this.openEcoBtns   = document.querySelectorAll('.open-eco-btn');
    this.hint_e        = document.getElementById('hint-e');

    // Text areas
    this.explanationText = document.getElementById('explanation-text');
    this.structuralText  = document.getElementById('structural-text');
  }

  /**
   * Update all UI elements from state.
   * Called after any state change.
   */
  updateFromState(state) {
    // --- Sliders ---
    Object.keys(this.sliders).forEach(key => {
      const slider  = this.sliders[key];
      const display = this.displays[key];
      if (!slider || state.params[key] === undefined) return;
      slider.value = state.params[key];
      this.updateDisplay(key, state.params[key]);
    });

    // --- Panel visibility (side panel params) ---
    this.updateEconomyUI(state.isOpenEconomy);
    this.updateExchangeUI(state.isOpenEconomy, state.isFloatingRate);
  }

  /**
   * Format and display a parameter value.
   */
  updateDisplay(key, value) {
    const display = this.displays[key];
    if (!display) return;

    let formatted;
    if (key === 'c' || key === 'k' || key === 'e') {
      formatted = parseFloat(value).toFixed(2);
    } else if (key === 'rstar') {
      formatted = parseFloat(value).toFixed(2);
    } else {
      formatted = Math.round(value);
    }

    if (document.activeElement !== display) {
      display.value = formatted;
    }
  }

  /**
   * Wire direct-edit inputs so users can type values.
   */
  setupInputListeners(onValueChange) {
    Object.keys(this.displays).forEach(key => {
      const input  = this.displays[key];
      const slider = this.sliders[key];
      if (!input || !slider) return;

      input.addEventListener('blur', () => {
        let value = parseFloat(input.value);
        const min = parseFloat(slider.min);
        const max = parseFloat(slider.max);
        if (isNaN(value)) {
          value = parseFloat(slider.value);
        } else {
          value = Math.max(min, Math.min(max, value));
        }
        slider.value = value;
        input.value  = value;
        onValueChange(key, value);
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') input.blur();
      });

      input.addEventListener('input', () => {
        const value = parseFloat(input.value);
        if (!isNaN(value)) {
          const min = parseFloat(slider.min);
          const max = parseFloat(slider.max);
          slider.value = Math.max(min, Math.min(max, value));
        }
      });
    });
  }

  /**
   * Show/hide sidebar parameter groups for open economy.
   */
  updateEconomyUI(isOpen) {
    this.openEcoGroups.forEach(g => g.classList.toggle('hidden', !isOpen));
    this.openEcoBtns.forEach(b => b.classList.toggle('hidden', !isOpen));
  }

  /**
   * Enable/disable sliders based on exchange regime.
   * In floating rate: M is exogenous, e is endogenous.
   * In fixed rate:    e is exogenous, M is endogenous.
   */
  updateExchangeUI(isOpen, isFloating) {
    const sM = this.sliders.M;
    const se = this.sliders.e;
    if (!sM || !se) return;

    if (!isOpen) {
      // Closed economy: M free, e irrelevant
      sM.disabled = false; sM.style.opacity = '1';
      se.disabled = true;  se.style.opacity = '0.5';
      if (this.hint_e) this.hint_e.classList.add('hidden');
      return;
    }

    if (isFloating) {
      sM.disabled = false; sM.style.opacity = '1';
      se.disabled = true;  se.style.opacity = '0.5';
      if (this.hint_e) this.hint_e.classList.remove('hidden');
    } else {
      se.disabled = false; se.style.opacity = '1';
      sM.disabled = true;  sM.style.opacity = '0.5';
      if (this.hint_e) this.hint_e.classList.add('hidden');
    }
  }

  updateExplanation(text) {
    if (!this.explanationText) return;
    gsap.fromTo(this.explanationText, { opacity: 0 }, { opacity: 1, duration: 0.4 });
    this.explanationText.innerHTML = text;
  }

  updateStructuralExplanation(text) {
    if (!this.structuralText) return;
    gsap.fromTo(this.structuralText, { opacity: 0 }, { opacity: 1, duration: 0.4 });
    this.structuralText.innerHTML = text;
  }

  animateSlider(sliderId) {
    const slider = this.sliders[sliderId];
    if (slider) {
      gsap.fromTo(slider, { scale: 1.05 }, { scale: 1.0, duration: 0.2, clearProps: 'all' });
    }
  }

  showNotification(message, type = 'info') {
    const colors = { success: 'bg-green-500', error: 'bg-red-500', warning: 'bg-yellow-500', info: 'bg-blue-500' };
    const el = document.createElement('div');
    el.className = `fixed top-20 right-4 px-6 py-3 rounded-lg shadow-lg z-[200] ${colors[type] || colors.info} text-white font-semibold`;
    el.textContent = message;
    document.body.appendChild(el);
    gsap.fromTo(el, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.3 });
    setTimeout(() => {
      gsap.to(el, { opacity: 0, y: -20, duration: 0.3, onComplete: () => el.remove() });
    }, 3000);
  }

  showLoading(show = true) {
    let loader = document.getElementById('app-loader');
    if (show && !loader) {
      loader = document.createElement('div');
      loader.id = 'app-loader';
      loader.className = 'fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-[300]';
      loader.innerHTML = '<div class="bg-white px-8 py-6 rounded-lg shadow-xl"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-mackenzie-green mx-auto"></div><p class="mt-4 text-gray-700 font-semibold">Calculando...</p></div>';
      document.body.appendChild(loader);
    } else if (!show && loader) {
      loader.remove();
    }
  }
}
