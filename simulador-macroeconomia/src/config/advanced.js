/**
 * Advanced configuration for the simulator
 * These settings can be adjusted for different teaching scenarios
 */

export const advancedConfig = {
  // Chart configuration
  chart: {
    animationDuration: 800,
    animationEasing: 'easeOutQuart',
    minYAxis: 0,
    maxYAxis: 15,
    minXAxis: 1000,
    maxXAxis: 4500,
    dynamicAxes: true, // Auto-adjust axes based on data
    axisPadding: 0.2 // 20% padding around data
  },

  // Performance settings
  performance: {
    debounceDelay: 100, // ms
    throttleDelay: 100, // ms
    maxHistorySize: 50,
    autoSaveEnabled: true
  },

  // UI settings
  ui: {
    notificationDuration: 3000, // ms
    showWelcomeMessage: true,
    enableKeyboardShortcuts: true,
    enableTooltips: true
  },

  // Model constraints
  constraints: {
    // Parameter bounds (calibrados para economia brasileira)
    G: { min: 1000, max: 3500, default: 2200, step: 100 },
    T: { min: 2000, max: 5000, default: 3500, step: 100 },
    M: { min: 3000, max: 7000, default: 5000, step: 100 },
    e: { min: 3.0, max: 8.0, default: 5.0, step: 0.1 },
    rstar: { min: 1.0, max: 12.0, default: 5.25, step: 0.25 },
    c: { min: 0, max: 0.99, default: 0.65, step: 0.05 },
    b: { min: 10, max: 150, default: 80, step: 5 },
    k: { min: 0.1, max: 1.0, default: 0.4, step: 0.05 },
    h: { min: 20, max: 200, default: 100, step: 10 },
    C0: { min: 500, max: 2500, default: 1500, step: 100 },
    I0: { min: 500, max: 3000, default: 2000, step: 100 },
    X0: { min: 500, max: 2500, default: 1500, step: 100 },
    m: { min: 0, max: 0.3, default: 0.12, step: 0.01 },
    v: { min: 50, max: 400, default: 200, step: 10 }
  },

  // Validation thresholds
  validation: {
    minDenominator: 0.001, // Minimum value before considering division by zero
    maxEquilibriumY: 100000, // Maximum reasonable Y value
    maxEquilibriumR: 100, // Maximum reasonable r value
    minEquilibriumY: 0, // Minimum Y (must be non-negative)
    minEquilibriumR: 0 // Minimum r (must be non-negative)
  },

  // Educational features
  education: {
    showMultipliers: true,
    showComponents: false, // Show C, I, G, NX breakdown
    showTrajectory: false, // Show adjustment path (future feature)
    detailedExplanations: true
  },

  // Export settings
  export: {
    imageFormat: 'png',
    imageQuality: 1.0,
    csvDelimiter: ',',
    jsonIndent: 2,
    includeMetadata: true
  },

  // Accessibility
  accessibility: {
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReaderAnnouncements: true
  }
};

/**
 * Get constraint for a parameter
 */
export function getConstraint(param) {
  return advancedConfig.constraints[param] || null;
}

/**
 * Validate value against constraints
 */
export function validateValue(param, value) {
  const constraint = getConstraint(param);
  if (!constraint) return value;
  
  return Math.max(constraint.min, Math.min(constraint.max, value));
}

/**
 * Get default value for parameter
 */
export function getDefault(param) {
  const constraint = getConstraint(param);
  return constraint ? constraint.default : null;
}

/**
 * Update configuration (for runtime changes)
 */
export function updateConfig(path, value) {
  const keys = path.split('.');
  let obj = advancedConfig;
  
  for (let i = 0; i < keys.length - 1; i++) {
    obj = obj[keys[i]];
  }
  
  obj[keys[keys.length - 1]] = value;
}

/**
 * Reset to defaults
 */
export function resetConfig() {
  // This would reload the default configuration
  // Implementation depends on how you want to handle this
  console.log('Config reset to defaults');
}
