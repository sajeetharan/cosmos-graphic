# Contributing to Azure Cosmos DB Visual Storybook

Thank you for your interest in contributing! This document provides guidelines for contributing to this educational project.

## 🎯 Ways to Contribute

### 1. Improve Infographics
- Create new infographics for additional topics
- Improve existing infographics with better visuals
- Ensure consistency in style and branding

### 2. Add Content
- Write better descriptions for existing topics
- Add new sections or chapters
- Improve key points and explanations

### 3. Enhance Code
- Improve performance
- Add new features
- Fix bugs
- Improve accessibility

### 4. Documentation
- Improve README
- Add tutorials
- Fix typos and grammar
- Translate content (future enhancement)

## 📋 Before You Start

1. Check existing [issues](../../issues) to avoid duplicate work
2. For major changes, open an issue first to discuss
3. Make sure you can run the project locally

## 🔧 Development Setup

1. Fork the repository
2. Clone your fork:
```bash
git clone https://github.com/YOUR-USERNAME/cosmos-graphic.git
cd cosmos-graphic
```

3. Create a branch:
```bash
git checkout -b feature/your-feature-name
```

4. Start a local server:
```bash
# Using Python
python -m http.server 8000

# OR using Node.js
npx http-server
```

5. Make your changes and test thoroughly

## 📝 Adding New Content

### Adding a New Section

1. Add your image to the appropriate folder:
   - `assets/images/overview/`
   - `assets/images/nosql/`
   - `assets/images/ai/`
   - `assets/images/quickstarts/`

2. Update `data/content.json`:
```json
{
  "id": "your-section-id",
  "title": "Your Section Title",
  "image": "assets/images/category/your-image.jpg",
  "description": "Detailed description here...",
  "keyPoints": [
    "Key point 1",
    "Key point 2",
    "Key point 3"
  ],
  "learnMoreUrl": "https://learn.microsoft.com/..."
}
```

### Adding a New Chapter

1. Update `data/content.json`:
```json
{
  "id": "your-chapter",
  "title": "Your Chapter Title",
  "icon": "🎯",
  "color": "#FF6B6B",
  "sections": [...]
}
```

2. Test the navigation and layout

## 🎨 Style Guidelines

### Code Style

- Use consistent indentation (2 spaces)
- Add comments for complex logic
- Use meaningful variable names
- Follow existing patterns in the codebase

### CSS
```css
/* Use CSS variables for colors */
.my-element {
  color: var(--primary-color);
  background: var(--surface);
}
```

### JavaScript
```javascript
// Use clear function names
function loadContent() {
  // Implementation
}

// Add JSDoc comments for complex functions
/**
 * Loads image to canvas with protection
 * @param {HTMLCanvasElement} canvas - Target canvas
 * @param {string} imagePath - Path to image
 */
function loadImageToCanvas(canvas, imagePath) {
  // Implementation
}
```

## 🖼️ Infographic Guidelines

### Image Requirements

- **Format**: JPG or PNG
- **Size**: Optimize for web (max 500KB recommended)
- **Dimensions**: Minimum 1200px width for quality
- **Style**: Consistent with existing infographics
- **Content**: Clear, readable text
- **Branding**: Include Azure Cosmos DB branding appropriately

### Naming Convention

Use descriptive, kebab-case names:
- `cosmosdb-nosql-feature-name.jpg`
- `cosmosdb-ai-capability-name.jpg`

### Image Optimization

Before adding images, optimize them:

```bash
# Using ImageMagick
convert input.jpg -quality 85 -strip output.jpg

# Using online tools
# https://tinypng.com/
# https://squoosh.app/
```

## 🧪 Testing

Before submitting, test:

1. **Functionality**:
   - All navigation works
   - Modal opens and closes
   - Images load correctly
   - Links work

2. **Responsive Design**:
   - Test on mobile (320px+)
   - Test on tablet (768px+)
   - Test on desktop (1024px+)

3. **Browser Compatibility**:
   - Chrome
   - Firefox
   - Safari
   - Edge

4. **Accessibility**:
   - Keyboard navigation works
   - Screen reader friendly
   - Color contrast is sufficient

5. **Performance**:
   - Page loads quickly
   - Images are optimized
   - No console errors

## 📤 Submitting Changes

1. Commit your changes:
```bash
git add .
git commit -m "feat: Add new AI capabilities section"
```

Use conventional commit messages:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding tests
- `chore:` - Maintenance tasks

2. Push to your fork:
```bash
git push origin feature/your-feature-name
```

3. Create a Pull Request:
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill in the PR template
   - Submit!

## 📋 Pull Request Checklist

- [ ] Code follows the style guidelines
- [ ] Changes have been tested locally
- [ ] Images are optimized
- [ ] Documentation is updated
- [ ] No console errors
- [ ] Commits follow conventional format
- [ ] PR description explains the changes

## 🐛 Reporting Bugs

When reporting bugs, include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: How to trigger the bug
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Screenshots**: If applicable
6. **Environment**: Browser, OS, device

## 💡 Suggesting Features

When suggesting features:

1. **Use Case**: Why is this needed?
2. **Proposed Solution**: How should it work?
3. **Alternatives**: Other approaches considered
4. **Additional Context**: Screenshots, mockups, etc.

## 📜 Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Assume good intentions
- Learn from mistakes

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or insulting comments
- Personal attacks
- Publishing private information
- Spam or self-promotion

## ❓ Questions?

- Open an [issue](../../issues/new)
- Check existing [discussions](../../discussions)

## 🙏 Recognition

Contributors will be acknowledged in:
- README.md contributors section
- Release notes for significant contributions

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project (Educational).

---

**Thank you for contributing to Azure Cosmos DB Visual Storybook!** 🎉

Every contribution, no matter how small, helps make learning Azure Cosmos DB better for everyone.
