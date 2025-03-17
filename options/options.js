// Options page script for Accessibility Helper extension

// Current settings
let currentSettings = {
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
const textSizeSlider = document.getElementById('textSize');
const textSizeValueSpan = document.getElementById('textSizeValue');
const textSizeDownBtn = document.getElementById('textSizeDown');
const textSizeResetBtn = document.getElementById('textSizeReset');
const textSizeUpBtn = document.getElementById('textSizeUp');
const sampleParagraph = document.getElementById('sampleParagraph');
const highContrastToggle = document.getElementById('highContrastToggle');
const contrastSample = document.getElementById('contrastSample');
const speechRateSlider = document.getElementById('speechRate');
const rateValueSpan = document.getElementById('rateValue');
const testSpeechBtn = document.getElementById('testSpeechBtn');
const stopSpeechBtn = document.getElementById('stopSpeechBtn');
const saveSettingsBtn = document.getElementById('saveSettings');
const resetSettingsBtn = document.getElementById('resetSettings');
const statusMessage = document.getElementById('statusMessage');

// Load saved settings when the page opens
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  
  // Set up event listeners
  setupEventListeners();
});

// Load settings from storage
function loadSettings() {
  browser.storage.local.get('accessibilitySettings').then((result) => {
    if (result.accessibilitySettings) {
      currentSettings = result.accessibilitySettings;
      updateUIFromSettings();
    }
  });
}

// Update UI to reflect current settings
function updateUIFromSettings() {
  colorBlindTypeSelect.value = currentSettings.colorBlindType;
  colorBlindIntensitySlider.value = currentSettings.colorBlindIntensity;
  intensityValueSpan.textContent = `${currentSettings.colorBlindIntensity}%`;
  
  textSizeSlider.value = currentSettings.textSize;
  textSizeValueSpan.textContent = `${currentSettings.textSize}%`;
  sampleParagraph.style.fontSize = `${currentSettings.textSize}%`;
  
  highContrastToggle.checked = currentSettings.highContrast;
  if (currentSettings.highContrast) {
    contrastSample.classList.add('high-contrast');
  } else {
    contrastSample.classList.remove('high-contrast');
  }
  
  speechRateSlider.value = currentSettings.speechRate;
  rateValueSpan.textContent = `${currentSettings.speechRate.toFixed(1)}x`;
}

// Set up all event listeners
function setupEventListeners() {
  // Color blindness type
  colorBlindTypeSelect.addEventListener('change', () => {
    currentSettings.colorBlindType = colorBlindTypeSelect.value;
  });
  
  // Color blindness intensity
  colorBlindIntensitySlider.addEventListener('input', () => {
    currentSettings.colorBlindIntensity = parseInt(colorBlindIntensitySlider.value);
    intensityValueSpan.textContent = `${currentSettings.colorBlindIntensity}%`;
  });
  
  // Text size slider
  textSizeSlider.addEventListener('input', () => {
    currentSettings.textSize = parseInt(textSizeSlider.value);
    textSizeValueSpan.textContent = `${currentSettings.textSize}%`;
    sampleParagraph.style.fontSize = `${currentSettings.textSize}%`;
  });
  
  // Text size buttons
  textSizeDownBtn.addEventListener('click', () => {
    if (currentSettings.textSize > 50) {
      currentSettings.textSize -= 10;
      updateTextSizeUI();
    }
  });
  
  textSizeResetBtn.addEventListener('click', () => {
    currentSettings.textSize = 100;
    updateTextSizeUI();
  });
  
  textSizeUpBtn.addEventListener('click', () => {
    if (currentSettings.textSize < 200) {
      currentSettings.textSize += 10;
      updateTextSizeUI();
    }
  });
  
  // High contrast toggle
  highContrastToggle.addEventListener('change', () => {
    currentSettings.highContrast = highContrastToggle.checked;
    
    if (currentSettings.highContrast) {
      contrastSample.classList.add('high-contrast');
    } else {
      contrastSample.classList.remove('high-contrast');
    }
  });
  
  // Speech rate slider
  speechRateSlider.addEventListener('input', () => {
    currentSettings.speechRate = parseFloat(speechRateSlider.value);
    rateValueSpan.textContent = `${currentSettings.speechRate.toFixed(1)}x`;
  });
  
  // Test speech button
  testSpeechBtn.addEventListener('click', () => {
    testSpeech();
  });
  
  // Stop speech button
  stopSpeechBtn.addEventListener('click', () => {
    stopSpeech();
  });
  
  // Save settings button
  saveSettingsBtn.addEventListener('click', () => {
    saveSettings();
  });
  
  // Reset settings button
  resetSettingsBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all settings to default values?')) {
      resetSettings();
    }
  });
}

// Update text size UI elements
function updateTextSizeUI() {
  textSizeSlider.value = currentSettings.textSize;
  textSizeValueSpan.textContent = `${currentSettings.textSize}%`;
  sampleParagraph.style.fontSize = `${currentSettings.textSize}%`;
}

// Test text-to-speech with sample text
function testSpeech() {
  const sampleText = "This is a test of the text-to-speech feature with your current speech rate settings.";
  
  // Use the Web Speech API
  const utterance = new SpeechSynthesisUtterance(sampleText);
  utterance.rate = currentSettings.speechRate;
  
  // Stop any ongoing speech
  stopSpeech();
  
  // Start speaking
  window.speechSynthesis.speak(utterance);
}

// Stop text-to-speech
function stopSpeech() {
  window.speechSynthesis.cancel();
}

// Save settings to storage
function saveSettings() {
  browser.storage.local.set({
    accessibilitySettings: currentSettings
  }).then(() => {
    showStatusMessage('Settings saved successfully!', 'success');
    
    // Notify all tabs about the settings update
    browser.tabs.query({}).then((tabs) => {
      tabs.forEach(tab => {
        browser.tabs.sendMessage(tab.id, {
          action: 'applySettings',
          settings: currentSettings
        }).catch(error => {
          // Ignore errors from tabs where content script isn't loaded
          console.log('Could not update tab: ' + tab.id);
        });
      });
    });
  }).catch((error) => {
    showStatusMessage('Error saving settings: ' + error.message, 'error');
  });
}

// Reset settings to defaults
function resetSettings() {
  browser.runtime.sendMessage({
    action: 'resetSettings'
  }).then((response) => {
    if (response.success) {
      // Reload the settings
      loadSettings();
      showStatusMessage('Settings reset to defaults!', 'success');
    }
  });
}

// Show status message
function showStatusMessage(message, type) {
  statusMessage.textContent = message;
  statusMessage.className = 'status-message ' + type;
  
  // Clear the message after 3 seconds
  setTimeout(() => {
    statusMessage.textContent = '';
    statusMessage.className = 'status-message';
  }, 3000);
}
