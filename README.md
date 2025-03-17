# AccessibilityHelper for Firefox 🌈

[![Firefox Add-on](https://img.shields.io/badge/Firefox-Add--on-FF7139?style=for-the-badge&logo=firefox-browser&logoColor=white)](https://addons.mozilla.org/en-US/firefox/addon/accessibility-helper/)
[![Version](https://img.shields.io/badge/Version-1.0-brightgreen?style=for-the-badge)](https://github.com/ruslanlap/AccessibilityHelperFirefox/releases)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![WCAG](https://img.shields.io/badge/WCAG-2.1-00A98F?style=for-the-badge)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](https://makeapullrequest.com)

<div align="center">
    <img src="icons/logo.svg" alt="AccessibilityHelper Logo" width="128" height="128">
    <h3>Enhanced Web Accessibility for Everyone</h3>
    <p>
        <a href="https://github.com/ruslanlap/AccessibilityHelperFirefox"><strong>GitHub Repository</strong></a> •
        <a href="https://ruslanlap.github.io/ruslanlap_buymeacoffe/"><strong>Support This Project</strong></a> •
        <a href="Description.md"><strong>Add-on Description</strong></a> •
        <a href="Developer.md"><strong>Developer Guide</strong></a>
    </p>
</div>

## 📋 Table of Contents

- [📸 Screenshots](#-screenshots)
- [🌟 Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [⌨️ Keyboard Shortcuts](#️-keyboard-shortcuts)
- [🛠️ Technical Details](#️-technical-details)
- [🧪 Development](#-development)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)
- [🔒 Privacy](#-privacy)
- [☕ Support](#-support)
- [👤 Author](#-author)
- [📄 Additional Documentation](#-additional-documentation)

## 📸 Screenshots

<div align="center">
    <img src="assets/screen1.png" alt="Screenshot 1" width="280">
    <img src="assets/screen2.png" alt="Screenshot 2" width="280">
    <img src="assets/screen3.png" alt="Screenshot 3" width="280">
    <img src="assets/screen4.png" alt="Screenshot 4" width="280">
    <img src="assets/screen5.png" alt="Screenshot 5" width="280">
    <img src="assets/screen6.png" alt="Screenshot 6" width="280">
</div>

## 🌟 Features

- 🎨 **Color Blindness Correction**
  - Protanopia (red-blind)
  - Deuteranopia (green-blind)
  - Tritanopia (blue-blind)
  - Achromatopsia (monochromacy)
- 📏 **Text Size Adjustment**
  - Increase/decrease text size on any webpage
  - Custom font scaling options
  - Remember settings per website
- 🔄 **High Contrast Mode**
  - Multiple contrast themes
  - Custom color schemes
  - Inverted colors option
- 🔊 **Text-to-Speech**
  - Read selected text or entire page
  - Adjustable speech rate and pitch
  - Multiple language support

## 🚀 Quick Start

1. Install from [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/accessibility-helper/)
2. Click the extension icon in your toolbar
3. Choose your accessibility preferences
4. Enjoy a more accessible web!

<div align="center">
    <img src="icons/color-blind.svg" alt="Color Blind Icon" width="48">
    <img src="icons/text-size.svg" alt="Text Size Icon" width="48">
    <img src="icons/contrast.svg" alt="Contrast Icon" width="48">
    <img src="icons/speech.svg" alt="Speech Icon" width="48">
</div>

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Alt+A` | Open Accessibility Helper |
| `Alt+C` | Toggle high contrast |
| `Alt+.` | Increase text size |
| `Alt+,` | Decrease text size |
| `Alt+R` | Read page aloud |
| `Alt+S` | Stop reading |

## 🛠️ Technical Details

### Project Structure
```
├── background/          # Background scripts
│   └── background.js    # Extension state management
├── icons/               # Extension icons
│   ├── logo.svg         # Main extension logo
│   ├── color-blind.svg  # Feature icons
│   └── ...
├── libs/                # Utility libraries
│   └── color-blind.js   # Color transformation algorithms
├── options/             # Settings page
│   ├── options.html     # Settings UI
│   ├── options.css      # Styles for settings
│   └── options.js       # Settings logic
├── popup/               # Quick access panel
│   ├── popup.html       # Popup UI
│   ├── popup.css        # Styles for popup
│   └── popup.js         # Popup logic
├── assets/              # Documentation assets
│   └── screen1.png      # Screenshots
├── manifest.json        # Extension configuration
└── package.json         # Dependencies and scripts
```

### Technologies

<div align="center">
    <img src="https://img.shields.io/badge/Firefox_WebExtensions-API-FF7139?style=flat-square&logo=firefox-browser&logoColor=white" alt="Firefox WebExtensions API">
    <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript ES6+">
    <img src="https://img.shields.io/badge/CSS-Custom_Properties-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS Custom Properties">
    <img src="https://img.shields.io/badge/Web_Speech-API-4285F4?style=flat-square&logo=google&logoColor=white" alt="Web Speech API">
    <img src="https://img.shields.io/badge/SVG-Transformations-FFB13B?style=flat-square&logo=svg&logoColor=white" alt="SVG Transformations">
</div>

## 🧪 Development

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or later)
- [web-ext](https://github.com/mozilla/web-ext) for testing and building

### Setup
```bash
# Clone the repository
git clone https://github.com/ruslanlap/AccessibilityHelperFirefox.git
cd AccessibilityHelperFirefox

# Install dependencies
npm install

# Run in Firefox
npm run start

# Build extension
npm run build
```

### Testing in Firefox
1. Open Firefox and navigate to `about:debugging`
2. Click "This Firefox"
3. Click "Load Temporary Add-on..."
4. Select the `manifest.json` file from this project

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

We welcome contributions of all kinds:
- 🐛 Bug reports and fixes
- ✨ New features
- 📚 Documentation improvements
- 🧪 Test cases

For detailed guidelines on contributing to this project, please see our [Developer Guide](Developer.md).

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Privacy

- No data collection or transmission
- All settings stored locally in browser storage
- No external resources loaded
- No tracking or analytics

## ☕ Support

If you find this extension helpful, consider supporting its development:

<div align="center">
    <a href="https://ruslanlap.github.io/ruslanlap_buymeacoffe/">
        <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=ruslanlap&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" alt="Buy Me A Coffee" height="50">
    </a>
</div>

Your support helps maintain this project and develop new features!

## 👤 Author

**Ruslan**

- GitHub: [@ruslanlap](https://github.com/ruslanlap)
- Project Repository: [AccessibilityHelperFirefox](https://github.com/ruslanlap/AccessibilityHelperFirefox)

## 📄 Additional Documentation

- [Add-on Description](Description.md) - Detailed description used for Mozilla Add-ons submission
- [Developer Guide](Developer.md) - Guidelines for contributing to the project

---

<div align="center">
    <p>Made with ❤️ for improving web accessibility</p>
    <p>© 2025 Ruslan ruslanlap | All Rights Reserved</p>
</div>
