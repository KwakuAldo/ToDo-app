# To Do App

A modern, responsive To Do application built with vanilla JavaScript, following industry best practices.

## Features

- ✅ Add, edit, and delete tasks
- 📅 Due dates and priorities
- 🏷️ Task categories and tags
- 🔍 Search and filter functionality
- 💾 Local storage persistence
- 📱 Responsive design
- ♿ Accessibility features

## Project Structure

```
todo-app/
├── public/                 # Static files served directly
│   └── index.html
├── src/                   # Source code
│   ├── js/               # JavaScript modules
│   │   ├── components/   # UI components
│   │   ├── services/     # Business logic
│   │   ├── utils/        # Utility functions
│   │   └── models/       # Data models
│   ├── css/              # Stylesheets
│   │   ├── base/         # Base styles
│   │   ├── components/   # Component styles
│   │   ├── pages/        # Page-specific styles
│   │   └── utilities/    # Utility classes
│   └── assets/           # Images, icons, etc.
├── dist/                 # Production build output
├── tests/                # Test files
└── docs/                 # Documentation
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run watch` - Watch for changes during development
- `npm run test` - Run tests
- `npm run lint` - Lint JavaScript code
- `npm run format` - Format code with Prettier

## Technologies Used

- Vanilla JavaScript (ES6+)
- CSS3 with modern features
- HTML5 semantic elements
- Webpack for bundling
- PostCSS for CSS processing
- Jest for testing
- ESLint for code linting
- Prettier for code formatting

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)