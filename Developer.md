# Developer Guidelines

Thank you for your interest in contributing to the Accessibility Helper Firefox extension! This document provides guidelines for developers who want to contribute to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Environment](#development-environment)
- [Coding Standards](#coding-standards)
- [Pull Request Process](#pull-request-process)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Release Process](#release-process)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone. Please be considerate of differing viewpoints and experiences, and focus on what is best for the community and users with accessibility needs.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Set up the development environment
4. Create a feature branch
5. Make your changes
6. Submit a pull request

## Development Environment

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (v6 or later)
- [web-ext](https://github.com/mozilla/web-ext) for testing and building

### Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/AccessibilityHelperFirefox.git
cd AccessibilityHelperFirefox

# Install dependencies
npm install

# Run in Firefox
npm run start

# Build extension
npm run build
```

## Coding Standards

### JavaScript

- Follow ES6+ standards
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused
- Use strict mode (`'use strict';`)

### CSS

- Use descriptive class names
- Organize CSS properties logically
- Minimize specificity conflicts
- Consider accessibility in all styles (contrast, focus states, etc.)

### HTML

- Use semantic HTML elements
- Ensure proper ARIA attributes
- Maintain valid HTML structure
- Include appropriate alt text for images

## Pull Request Process

1. **Create a Feature Branch**: Always create a new branch for your changes
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**: Implement your feature or fix

3. **Test Thoroughly**: Ensure your changes work as expected

4. **Update Documentation**: Add or update documentation as needed

5. **Commit Your Changes**: Follow the commit message guidelines

6. **Push to Your Fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**: Submit a PR from your branch to the main repository

8. **Code Review**: Address any feedback from maintainers

9. **Merge**: Once approved, your PR will be merged

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Changes to the build process or auxiliary tools

Examples:
```
feat(color-blind): add support for tritanopia
fix(text-size): correct font scaling in nested elements
docs(readme): update installation instructions
```

## Testing Guidelines

- Test on multiple Firefox versions (ESR, Release, Beta)
- Test with different accessibility settings enabled
- Verify keyboard navigation works properly
- Check color contrast meets WCAG AA standards
- Test with screen readers
- Ensure performance is not degraded

## Documentation

- Update README.md with any new features or changes
- Document any new APIs or functions
- Include JSDoc comments for functions
- Update user documentation as needed

## Release Process

1. Update version number in `manifest.json` and `package.json`
2. Update CHANGELOG.md with all notable changes
3. Create a new release on GitHub
4. Submit the new version to Mozilla Add-ons

---

Thank you for contributing to making the web more accessible for everyone!

If you have any questions, please open an issue or contact the project maintainer.
