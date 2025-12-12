# Azure Cosmos DB Visual Storybook 🌐

An interactive, visually stunning website for learning Azure Cosmos DB through infographics. Built as a static site for GitHub Pages.

![Azure Cosmos DB](https://img.shields.io/badge/Azure-Cosmos%20DB-0078D4?style=for-the-badge&logo=microsoft-azure)
![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-222222?style=for-the-badge&logo=github)
![License](https://img.shields.io/badge/License-Educational-green?style=for-the-badge)

## 🎯 Features

- **📚 Interactive Storybook Layout**: Navigate through chapters covering all aspects of Azure Cosmos DB
- **🎨 Beautiful Infographics**: Custom-designed visual content for each topic
- **🔒 Image Protection**: Canvas-based rendering prevents easy downloading of images
- **✨ Smooth Animations**: Engaging transitions and scroll effects
- **📱 Fully Responsive**: Works perfectly on desktop, tablet, and mobile
- **♿ Accessible**: Built with accessibility best practices
- **🚀 Fast Loading**: Optimized performance for quick page loads

## 📖 Content Covered

### 1. Getting Started
- What is Azure Cosmos DB?
- Choosing the Right API

### 2. NoSQL API
- NoSQL API Overview
- Comparing with Other Databases
- Understanding Distributed NoSQL

### 3. AI & Advanced Search
- Why Cosmos DB for AI?
- Vector Search
- Hybrid Search
- Full-Text Search
- Semantic Reranker
- DiskANN Technology

### 4. Quick Start Guides
- .NET
- Java
- Python
- JavaScript/Node.js
- TypeScript
- Go
- Rust

## 🚀 Quick Start

### Local Development

1. Clone this repository:
```bash
git clone https://github.com/sajeetharan/cosmos-graphic.git
cd cosmos-graphic
```

2. Serve the site locally using any static server:

**Using Python:**
```bash
python -m http.server 8000
```

**Using Node.js (http-server):**
```bash
npx http-server
```

**Using VS Code Live Server:**
- Install the "Live Server" extension
- Right-click on `index.html` and select "Open with Live Server"

3. Open your browser and navigate to `http://localhost:8000`

### Deploy to GitHub Pages

1. Push your code to GitHub
2. Go to your repository Settings
3. Navigate to "Pages" section
4. Under "Source", select the branch you want to deploy (usually `main`)
5. Click "Save"
5. Your site will be available at `https://sajeetharan.github.io/cosmos-graphic/`

## 📁 Project Structure

```
cosmos-graphic/
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # All styling and animations
├── js/
│   └── app.js            # JavaScript functionality
├── data/
│   └── content.json      # Content data with descriptions
├── assets/
│   └── images/
│       ├── overview/     # Getting started images
│       ├── nosql/        # NoSQL API images
│       ├── ai/           # AI & search images
│       └── quickstarts/  # Quickstart guide images
└── README.md             # This file
```

## 🔒 Image Protection Features

This site implements multiple layers of image protection:

- **Canvas Rendering**: Images are rendered on HTML5 canvas elements
- **Right-Click Prevention**: Context menu is disabled on images
- **Drag Prevention**: Images cannot be dragged
- **Watermarking**: Semi-transparent watermarks embedded in images
- **Keyboard Shortcuts Blocked**: Common save shortcuts are intercepted
- **User Notifications**: Users are informed about protection

> **Note**: While these measures prevent casual downloading, determined users may still find ways to save images. These protections are primarily educational.

## 🎨 Customization

### Changing Colors

Edit the CSS variables in `css/styles.css`:

```css
:root {
    --primary-color: #0078D4;
    --secondary-color: #50E6FF;
    --accent-color: #8661C5;
    /* ... more variables */
}
```

### Adding New Content

Edit `data/content.json` to add new chapters or sections:

```json
{
  "id": "new-chapter",
  "title": "New Chapter",
  "icon": "🎯",
  "color": "#FF6B6B",
  "sections": [...]
}
```

### Modifying Layout

The layout uses CSS Grid and Flexbox. Adjust in `css/styles.css`:

- Hero section: `.hero`
- Navigation: `.sticky-nav`
- Content cards: `.section-card`
- Modal: `.modal`

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and Canvas API
- **CSS3**: Custom properties, Grid, Flexbox, Animations
- **JavaScript**: Vanilla JS (no frameworks)
- **Google Fonts**: Poppins & Playfair Display

## 📊 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ Internet Explorer (not supported)

## 🤝 Contributing

This is an educational project. If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is created for educational purposes. All Azure Cosmos DB trademarks and documentation are property of Microsoft Corporation.

The infographics and content are based on the official [Azure Cosmos DB Documentation](https://learn.microsoft.com/azure/cosmos-db/).

## 🔗 Useful Links

- [Azure Cosmos DB Documentation](https://learn.microsoft.com/azure/cosmos-db/)
- [Azure Cosmos DB Product Page](https://azure.microsoft.com/services/cosmos-db/)
- [Azure Cosmos DB Pricing](https://azure.microsoft.com/pricing/details/cosmos-db/)
- [Azure Cosmos DB GitHub](https://github.com/Azure/azure-cosmos-dotnet-v3)
- [Microsoft Learn Training](https://learn.microsoft.com/training/paths/get-started-azure-cosmos-db-sql-api/)

## 📧 Contact

For questions or suggestions, please open an issue on GitHub.

## 🙏 Acknowledgments

- Microsoft for Azure Cosmos DB documentation
- The Azure community for inspiration
- All contributors and users of this educational resource

---

**Made with ❤️ for learning Azure Cosmos DB**

*Last updated: December 2025*
