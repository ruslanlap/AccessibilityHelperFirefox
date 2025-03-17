/**
 * Color Blind - A library that simulates and corrects for various types of color blindness.
 * Updated to use the external skratchdot/color-blind library for simulation.
 *
 * Supported types:
 * - Protanopia (red-blind)
 * - Deuteranopia (green-blind)
 * - Tritanopia (blue-blind)
 * - Achromatopsia (monochromacy, no color perception)
 */
(function(global) {
  'use strict';

  const ColorBlind = {
    /**
     * Clamp a value between min and max.
     * @param {number} value 
     * @param {number} min 
     * @param {number} max 
     * @returns {number}
     */
    clamp: function(value, min, max) {
      return Math.max(min, Math.min(max, value));
    },

    /**
     * Parse a CSS color string into an {r, g, b} object.
     * Supports rgb/rgba and hex formats.
     * @param {string} color - CSS color string.
     * @returns {Object|null} - Object with properties r, g, b or null on failure.
     */
    parseColor: function(color) {
      // Match rgb or rgba format
      const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/i);
      if (rgbMatch) {
        return {
          r: parseInt(rgbMatch[1], 10),
          g: parseInt(rgbMatch[2], 10),
          b: parseInt(rgbMatch[3], 10)
        };
      }
      // Handle hex codes
      if (color.charAt(0) === '#') {
        let hex = color.substring(1);
        if (hex.length === 3) {
          hex = hex.split('').map(function(h) { return h + h; }).join('');
        }
        return {
          r: parseInt(hex.substring(0, 2), 16),
          g: parseInt(hex.substring(2, 4), 16),
          b: parseInt(hex.substring(4, 6), 16)
        };
      }
      return null;
    },

    /**
     * Mix original and simulated colors for a given severity.
     * @param {Object} original - Original {r, g, b} color.
     * @param {Object} simulated - Simulated {r, g, b} color.
     * @param {number} severity - Value between 0 and 1.
     * @returns {Object} - Mixed {r, g, b} color.
     */
    mixColors: function(original, simulated, severity) {
      return {
        r: original.r * (1 - severity) + simulated.r * severity,
        g: original.g * (1 - severity) + simulated.g * severity,
        b: original.b * (1 - severity) + simulated.b * severity
      };
    },

    /**
     * Simulate how colors appear for a given type of color blindness using the external library.
     * Falls back to the original color if the external library isn’t available.
     * @param {string} type - 'protanopia', 'deuteranopia', 'tritanopia', or 'achromatopsia'.
     * @param {string} color - CSS color string.
     * @param {number} severity - Simulation severity (0 to 1).
     * @returns {string} - Simulated color as an RGB string.
     */
    simulate: function(type, color, severity = 1.0) {
      severity = this.clamp(severity, 0, 1);
      if (global.colorBlind) {
        let simulatedColor;
        switch (type) {
          case 'protanopia':
          case 'protanomaly':
            simulatedColor = global.colorBlind.protanopia(color);
            break;
          case 'deuteranopia':
          case 'deuteranomaly':
            simulatedColor = global.colorBlind.deuteranopia(color);
            break;
          case 'tritanopia':
          case 'tritanomaly':
            simulatedColor = global.colorBlind.tritanopia(color);
            break;
          case 'achromatopsia':
          case 'achromatomaly':
            simulatedColor = global.colorBlind.achromatopsia(color);
            break;
          default:
            return color;
        }
        // If severity is less than 1, blend the original and simulated colors.
        if (severity < 1.0) {
          const originalRGB = this.parseColor(color);
          const simulatedRGB = this.parseColor(simulatedColor);
          if (originalRGB && simulatedRGB) {
            const mixed = this.mixColors(originalRGB, simulatedRGB, severity);
            return `rgb(${Math.round(mixed.r)}, ${Math.round(mixed.g)}, ${Math.round(mixed.b)})`;
          }
        }
        return simulatedColor;
      } else {
        console.warn('External color-blind library not found. Returning original color.');
        return color;
      }
    },

    /**
     * Correct a color for a specified type of color blindness.
     * Uses a simple correction logic based on the difference between original and simulated colors.
     * @param {string} type - 'protanopia', 'deuteranopia', etc.
     * @param {string} color - Original CSS color string.
     * @param {number} intensity - Correction intensity (0-100).
     * @returns {string} - Corrected color as an RGB string.
     */
    correct: function(type, color, intensity = 100) {
      intensity = this.clamp(intensity, 0, 100);
      const originalRGB = this.parseColor(color);
      const simulatedColor = this.simulate(type, color);
      const simulatedRGB = this.parseColor(simulatedColor);
      if (!originalRGB || !simulatedRGB) return color;
      const dr = originalRGB.r - simulatedRGB.r,
            dg = originalRGB.g - simulatedRGB.g,
            db = originalRGB.b - simulatedRGB.b;
      const corrected = {
        r: this.clamp(originalRGB.r + dr * (intensity / 100) * 1.5, 0, 255),
        g: this.clamp(originalRGB.g + dg * (intensity / 100) * 1.5, 0, 255),
        b: this.clamp(originalRGB.b + db * (intensity / 100) * 1.5, 0, 255)
      };
      return `rgb(${Math.round(corrected.r)}, ${Math.round(corrected.g)}, ${Math.round(corrected.b)})`;
    },

    /**
     * Generate a CSS filter string for color blindness correction.
     * Note: This is a simple approximation and may need further tuning.
     * @param {string} type - Type of color blindness.
     * @param {number} intensity - Intensity (0-100).
     * @returns {string} - CSS filter string.
     */
    generateFilter: function(type, intensity = 100) {
      intensity = this.clamp(intensity, 0, 100);
      const normalizedIntensity = intensity / 100;
      switch (type) {
        case 'protanopia':
        case 'protanomaly':
          return `contrast(1.2) saturate(${1 - 0.3 * normalizedIntensity}) hue-rotate(${-30 * normalizedIntensity}deg) brightness(${1 + 0.15 * normalizedIntensity})`;
        case 'deuteranopia':
        case 'deuteranomaly':
          return `contrast(1.1) saturate(${1 - 0.2 * normalizedIntensity}) hue-rotate(${10 * normalizedIntensity}deg) brightness(${1 + 0.1 * normalizedIntensity})`;
        case 'tritanopia':
        case 'tritanomaly':
          return `contrast(1.1) saturate(${1 - 0.2 * normalizedIntensity}) hue-rotate(${-60 * normalizedIntensity}deg) brightness(${1 + 0.1 * normalizedIntensity})`;
        case 'achromatopsia':
        case 'achromatomaly':
          return `grayscale(${normalizedIntensity}) contrast(1.1) brightness(1.05)`;
        default:
          return '';
      }
    },

    /**
     * Apply a CSS filter to the entire page for simulation.
     * @param {string} type - Type of color blindness.
     * @param {number} intensity - Intensity (0-100).
     */
    applyCssFilter: function(type, intensity = 100) {
      intensity = this.clamp(intensity, 0, 100);
      if (typeof document === 'undefined') return;
      let style = document.getElementById('colorblind-filter');
      if (!style) {
        style = document.createElement('style');
        style.id = 'colorblind-filter';
        document.head.appendChild(style);
      }
      const filter = this.generateFilter(type, intensity);
      style.textContent = `
        html {
          filter: ${filter} !important;
          -webkit-filter: ${filter} !important;
        }
      `;
    },

    /**
     * Remove any applied CSS filter.
     */
    removeCssFilter: function() {
      if (typeof document === 'undefined') return;
      const style = document.getElementById('colorblind-filter');
      if (style) {
        style.parentNode.removeChild(style);
      }
    }
  };

  global.ColorBlind = ColorBlind;
})(typeof window !== 'undefined' ? window : this);
