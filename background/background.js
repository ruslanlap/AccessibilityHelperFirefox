// Background script for Accessibility Helper extension

// Default settings
const defaultSettings = {
  colorBlindType: 'normal',
  colorBlindIntensity: 100,
  textSize: 100,
  highContrast: false,
  speechRate: 1.0
};

// Initialize settings if not already set
browser.runtime.onInstalled.addListener(() => {
  browser.storage.local.get('accessibilitySettings').then((result) => {
    if (!result.accessibilitySettings) {
      browser.storage.local.set({
        accessibilitySettings: defaultSettings
      });
    }
  });
  
  // Show options page on install
  browser.runtime.openOptionsPage();
});

// Listen for messages from content scripts or popup
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getSettings') {
    return browser.storage.local.get('accessibilitySettings');
  }
  
  if (message.action === 'updateSettings') {
    return browser.storage.local.set({
      accessibilitySettings: message.settings
    });
  }
  
  if (message.action === 'resetSettings') {
    return browser.storage.local.set({
      accessibilitySettings: defaultSettings
    }).then(() => {
      return {success: true};
    });
  }
});

// Apply settings to a newly activated tab
browser.tabs.onActivated.addListener((activeInfo) => {
  applySettingsToTab(activeInfo.tabId);
});

// Apply settings when a tab is updated (e.g., page load completed)
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    applySettingsToTab(tabId);
  }
});

// Handle keyboard shortcuts (commands)
browser.commands.onCommand.addListener((command) => {
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    const activeTab = tabs[0];
    
    // Get the current settings
    browser.storage.local.get('accessibilitySettings').then((result) => {
      let settings = result.accessibilitySettings || defaultSettings;
      let updatedSettings = { ...settings };
      
      switch (command) {
        case 'toggle_high_contrast':
          updatedSettings.highContrast = !settings.highContrast;
          break;
          
        case 'increase_text_size':
          if (settings.textSize < 300) {
            updatedSettings.textSize = settings.textSize + 10;
          }
          break;
          
        case 'decrease_text_size':
          if (settings.textSize > 50) {
            updatedSettings.textSize = settings.textSize - 10;
          }
          break;
          
        case 'read_page':
          // Send command to read the page
          browser.tabs.sendMessage(activeTab.id, {
            action: 'readPage',
            rate: settings.speechRate
          }).catch(error => console.log('Error sending read page command:', error));
          return; // No need to update settings
          
        case 'stop_reading':
          // Send command to stop reading
          browser.tabs.sendMessage(activeTab.id, {
            action: 'stopReading'
          }).catch(error => console.log('Error sending stop reading command:', error));
          return; // No need to update settings
      }
      
      // Update settings in storage
      browser.storage.local.set({
        accessibilitySettings: updatedSettings
      }).then(() => {
        // Apply the updated settings to the current tab
        applySettingsToTab(activeTab.id);
      });
    });
  });
});

// Apply current settings to the specified tab
function applySettingsToTab(tabId) {
  browser.storage.local.get('accessibilitySettings').then((result) => {
    if (result.accessibilitySettings) {
      browser.tabs.sendMessage(tabId, {
        action: 'applySettings',
        settings: result.accessibilitySettings
      }).catch((error) => {
        // Ignore error if content script isn't ready yet
        console.log('Content script not ready yet. Will try again on user interaction.');
      });
    }
  });
}
