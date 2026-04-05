/**
 * UI Controller - Manages all UI interactions
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
    // Sliders
    const sliderIds = ['G', 'T', 'M', 'e', 'rstar', 'c', 'b', 'k', 'h'];
    sliderIds.forEach(id => {
      this.sliders[id] = document.getElementById(`slider-${id}`);
      this.displays[id] = document.getElementById(`val-${id}`);
    });

    // Toggles
    this.toggleModel = document.getElementById('model-toggle');
    this.labelModel = document.getElementById('model-label');
    this.toggleExchangeContainer = document.getElementById('exchange-toggle-container');
    this.toggleExchange = document.getElementById('exchange-toggle');
    this.labelExchange = document.getElementById('exchange-label');
    
    // Groups
    this.openEcoGroups = document.querySelectorAll('.open-eco-group');
    this.openEcoBtns = document.querySelectorAll('.open-eco-btn');
    this.hint_e = document.getElementById('hint-e');
    
    // Text
    this.explanationText = document.getElementById('explanation-text');
    this.structuralText = document.getElementById('structural-text');
  }

  /**
   * Update all UI elements from state
   */
  updateFromState(state) {
    // Update slider and input values
    Object.keys(this.sliders).forEach(key => {
      if (state.params[key] !== undefined) {
        this.sliders[key].value = state.params[key];
        this.updateDisplay(key, state.params[key]);
      }
    });

    // Update toggles
    this.toggleModel.checked = state.isOpenEconomy;
    this.toggleExchange.checked = state.isFloatingRate;
    
    this.updateEconomyUI(state.isOpenEconomy);
    this.updateExchangeUI(state.isOpenEconomy, state.isFloatingRate);
  }

  /**
   * Update display value (agora são inputs editáveis)
   */
  updateDisplay(key, value) {
    if (!this.displays[key]) return;
    
    // Formatar valor baseado no tipo
    let formattedValue;
    if (key === 'c' || key === 'k' || key === 'e') {
      formattedValue = parseFloat(value).toFixed(2);
    } else if (key === 'rstar') {
      formattedValue = parseFloat(value).toFixed(2);
    } else {
      formattedValue = Math.round(value);
    }
    
    // Atualizar o input apenas se não estiver focado (para não interferir com digitação)
    if (document.activeElement !== this.displays[key]) {
      this.displays[key].value = formattedValue;
    }
  }
  
  /**
   * Setup input listeners for direct value editing
   * Deve ser chamado após a inicialização, passando o callback de atualização
   */
  setupInputListeners(onValueChange) {
    Object.keys(this.displays).forEach(key => {
      const input = this.displays[key];
      const slider = this.sliders[key];
      
      if (!input || !slider) return;
      
      // Listener para quando o input perde o foco
      input.addEventListener('blur', () => {
        let value = parseFloat(input.value);
        const min = parseFloat(slider.min);
        const max = parseFloat(slider.max);
        
        // Validar limites
        if (isNaN(value)) {
          value = parseFloat(slider.value);
        } else {
          value = Math.max(min, Math.min(max, value));
        }
        
        // Atualizar slider
        slider.value = value;
        input.value = value;
        
        // Chamar callback para atualizar state e gráfico
        onValueChange(key, value);
      });
      
      // Listener para Enter
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          input.blur(); // Trigger blur event
        }
      });
      
      // Listener para input em tempo real (opcional, para feedback imediato)
      input.addEventListener('input', () => {
        const value = parseFloat(input.value);
        if (!isNaN(value)) {
          const min = parseFloat(slider.min);
          const max = parseFloat(slider.max);
          const clampedValue = Math.max(min, Math.min(max, value));
          slider.value = clampedValue;
        }
      });
    });
  }

  /**
   * Update economy type UI
   */
  updateEconomyUI(isOpen) {
    this.labelModel.innerText = isOpen 
      ? 'Economia Aberta (IS-LM-BP)' 
      : 'Economia Fechada (IS-LM)';
    
    if (isOpen) {
      this.toggleExchangeContainer.classList.remove('hidden');
      this.openEcoGroups.forEach(g => g.classList.remove('hidden'));
      this.openEcoBtns.forEach(b => b.classList.remove('hidden'));
    } else {
      this.toggleExchangeContainer.classList.add('hidden');
      this.openEcoGroups.forEach(g => g.classList.add('hidden'));
      this.openEcoBtns.forEach(b => b.classList.add('hidden'));
    }
  }

  /**
   * Update exchange regime UI
   */
  updateExchangeUI(isOpen, isFloating) {
    this.labelExchange.innerText = isFloating 
      ? 'Câmbio Flutuante' 
      : 'Câmbio Fixo';
    
    if (!isOpen) {
      // Economia fechada: M é sempre exógeno, e não existe
      this.sliders.M.disabled = false;
      this.sliders.M.style.opacity = '1';
      if (this.sliders.e) {
        this.sliders.e.disabled = true;
        this.sliders.e.style.opacity = '0.5';
      }
      if (this.hint_e) {
        this.hint_e.classList.add('hidden');
      }
      return;
    }
    
    if (isFloating) {
      // M is exogenous, e is endogenous
      this.sliders.M.disabled = false;
      this.sliders.M.style.opacity = '1';
      this.sliders.e.disabled = true;
      this.sliders.e.style.opacity = '0.5';
      this.hint_e.classList.remove('hidden');
    } else {
      // e is exogenous, M is endogenous
      this.sliders.e.disabled = false;
      this.sliders.e.style.opacity = '1';
      this.sliders.M.disabled = true;
      this.sliders.M.style.opacity = '0.5';
      this.hint_e.classList.add('hidden');
    }
  }

  /**
   * Update explanation text with animation
   */
  updateExplanation(text) {
    gsap.fromTo(
      this.explanationText, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.5 }
    );
    this.explanationText.innerHTML = text;
  }

  /**
   * Update structural parameters explanation
   */
  updateStructuralExplanation(text) {
    gsap.fromTo(
      this.structuralText, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.5 }
    );
    this.structuralText.innerHTML = text;
  }

  /**
   * Animate slider on shock
   */
  animateSlider(sliderId) {
    const slider = this.sliders[sliderId];
    if (slider) {
      gsap.fromTo(
        slider, 
        { scale: 1.05 }, 
        { scale: 1.0, duration: 0.2, clearProps: "all" }
      );
    }
  }

  /**
   * Show notification
   */
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 px-6 py-3 rounded-lg shadow-lg z-[200] ${
      type === 'success' ? 'bg-green-500' :
      type === 'error' ? 'bg-red-500' :
      type === 'warning' ? 'bg-yellow-500' :
      'bg-blue-500'
    } text-white font-semibold`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    gsap.fromTo(
      notification,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.3 }
    );
    
    setTimeout(() => {
      gsap.to(notification, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: () => notification.remove()
      });
    }, 3000);
  }

  /**
   * Show loading state
   */
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
