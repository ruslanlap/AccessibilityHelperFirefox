// Current state of accessibility features
let accessibilityState = {
  colorBlindType: 'normal',
  colorBlindIntensity: 100,
  textSize: 100,
  highContrast: false,
  speechRate: 1.0
};

// DOM elements
const colorBlindTypeSelect = document.getElementById('colorBlindType');
const colorBlindIntensitySlider = document.getElementById('colorBlindIntensity');
const intensityValueSpan = document.getElementById('intensityValue');
const decreaseTextBtn = document.getElementById('decreaseText');
const resetTextBtn = document.getElementById('resetText');
const increaseTextBtn = document.getElementById('increaseText');
const textSizeValueSpan = document.getElementById('textSizeValue');
const highContrastToggle = document.getElementById('highContrastToggle');
const readPageBtn = document.getElementById('readPageBtn');
const stopReadingBtn = document.getElementById('stopReadingBtn');
const speechRateSlider = document.getElementById('speechRate');
const rateValueSpan = document.getElementById('rateValue');
const openSettingsBtn = document.getElementById('openSettings');

// Load stored settings when the popup opens
document.addEventListener('DOMContentLoaded', () => {
  // Load settings from storage
  browser.storage.local.get('accessibilitySettings').then((result) => {
    if (result.accessibilitySettings) {
      accessibilityState = result.accessibilitySettings;
      
      // Update UI to reflect current settings
      colorBlindTypeSelect.value = accessibilityState.colorBlindType;
      colorBlindIntensitySlider.value = accessibilityState.colorBlindIntensity;
      intensityValueSpan.textContent = `${accessibilityState.colorBlindIntensity}%`;
      textSizeValueSpan.textContent = `${accessibilityState.textSize}%`;
      highContrastToggle.checked = accessibilityState.highContrast;
      speechRateSlider.value = accessibilityState.speechRate;
      rateValueSpan.textContent = `${accessibilityState.speechRate.toFixed(1)}x`;
    }
  });
});

// Color blindness type change
colorBlindTypeSelect.addEventListener('change', () => {
  accessibilityState.colorBlindType = colorBlindTypeSelect.value;
  updateSettings();
  applySettings();
});

// Color blindness intensity change
colorBlindIntensitySlider.addEventListener('input', () => {
  accessibilityState.colorBlindIntensity = parseInt(colorBlindIntensitySlider.value);
  intensityValueSpan.textContent = `${accessibilityState.colorBlindIntensity}%`;
  updateSettings();
  applySettings();
});

// Text size controls
decreaseTextBtn.addEventListener('click', () => {
  if (accessibilityState.textSize > 50) {
    accessibilityState.textSize -= 10;
    textSizeValueSpan.textContent = `${accessibilityState.textSize}%`;
    updateSettings();
    applySettings();
  }
});

increaseTextBtn.addEventListener('click', () => {
  if (accessibilityState.textSize < 300) {
    accessibilityState.textSize += 10;
    textSizeValueSpan.textContent = `${accessibilityState.textSize}%`;
    updateSettings();
    applySettings();
  }
});

resetTextBtn.addEventListener('click', () => {
  accessibilityState.textSize = 100;
  textSizeValueSpan.textContent = '100%';
  updateSettings();
  applySettings();
});

// High contrast toggle
highContrastToggle.addEventListener('change', () => {
  accessibilityState.highContrast = highContrastToggle.checked;
  updateSettings();
  applySettings();
});

// Text-to-speech controls
readPageBtn.addEventListener('click', () => {
  browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, {
      action: 'readPage',
      rate: accessibilityState.speechRate
    });
  });
});

stopReadingBtn.addEventListener('click', () => {
  browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, {
      action: 'stopReading'
    });
  });
});

// Speech rate slider
speechRateSlider.addEventListener('input', () => {
  accessibilityState.speechRate = parseFloat(speechRateSlider.value);
  rateValueSpan.textContent = `${accessibilityState.speechRate.toFixed(1)}x`;
  updateSettings();
});

// Open settings page
openSettingsBtn.addEventListener('click', () => {
  browser.runtime.openOptionsPage();
});

// Update settings in storage
function updateSettings() {
  browser.storage.local.set({
    accessibilitySettings: accessibilityState
  });
}

// Apply settings to current tab
function applySettings() {
  browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, {
      action: 'applySettings',
      settings: accessibilityState
    });
  });
}
