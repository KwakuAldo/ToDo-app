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
├── .github/workflows/      # GitHub Actions CI workflow
├── public/                 # Static files served in development
├── src/
│   ├── css/                # Source styles
│   ├── js/                 # Application logic
│   └── assets/             # Icons and other assets
├── dist/                   # Production build output
├── Dockerfile              # Production container image
├── webpack.config.js       # JavaScript bundling config
└── postcss.config.js       # CSS processing config
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
- `npm run test` - Run Jest with `--passWithNoTests`
- `npm run lint` - Lint JavaScript code
- `npm run format` - Format code with Prettier

## CI/CD

GitHub Actions is configured in `.github/workflows/ci.yml` to:

- run on pushes to `Main` and `main`
- support manual runs with `workflow_dispatch`
- install dependencies
- run lint and test checks
- build and push the Docker image when Docker Hub secrets are configured

## Recent Updates

The following maintenance was completed in this repo:

- fixed the GitHub Actions trigger definition so the workflow is recognized correctly
- updated the workflow branch filter to include the current `Main` branch
- fixed ESLint errors in `src/js/main.js`
- updated the Jest script so CI passes when no test files exist yet

Right now the project does not include Jest test files. `npm test` is intentionally configured to exit successfully in that case so CI can still run the rest of the pipeline.

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
