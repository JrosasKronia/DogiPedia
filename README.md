# 🐕 Dog Viewer

A modern, responsive dog breed viewer built with React, TypeScript, and Tailwind CSS.

## Features

- **Random Dog Display**: View a random dog image as the main display
- **Thumbnail Gallery**: Browse through 10 random dog thumbnails
- **Interactive Thumbnails**: Hover effects with smooth scaling animations
- **Favorites System**: Save your favorite dogs for quick access
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Type-Safe**: Built with TypeScript for better developer experience
- **Modern UI**: Clean, professional design with Tailwind CSS

## Tech Stack

- **React 18** with Hooks
- **TypeScript** for type safety
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Dog CEO API** for dog images

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm/yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd dog-viewer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
dog-viewer/
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles with Tailwind
├── public/              # Static assets
├── index.html           # HTML template
├── tailwind.config.js   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## Architecture Decisions

### Component Structure
- **Single Component Approach**: For this scope, a single component is sufficient. In a larger app, this would be split into:
  - `DogViewer` (container)
  - `MainDisplay` (main image)
  - `ThumbnailGrid` (thumbnails)
  - `FavoritesList` (sidebar)
  - `DogCard` (reusable card component)

### State Management
- Using React's built-in `useState` for simplicity
- For a larger app, consider:
  - Zustand for global state
  - React Query for API data caching
  - Context API for theme/preferences

### API Service Layer
- Separated API logic into `dogApiService`
- Easy to test and mock
- Can be extracted to a separate file: `src/services/dogApi.ts`

### Type Safety
- Defined clear interfaces for `DogImage` and `FavoriteDog`
- TypeScript ensures data integrity throughout the app

### Styling Approach
- Tailwind CSS for utility-first styling
- Custom animations in Tailwind config
- Responsive design with mobile-first approach

## Future Enhancements

- [ ] Persist favorites to localStorage
- [ ] Add breed filtering/search
- [ ] Implement infinite scroll for thumbnails
- [ ] Add image loading states and error handling
- [ ] Unit tests with Vitest
- [ ] E2E tests with Playwright
- [ ] Accessibility improvements (ARIA labels, keyboard navigation)
- [ ] Share functionality for favorite dogs
- [ ] Dark mode toggle

## API Reference

This app uses the [Dog CEO API](https://dog.ceo/dog-api/):
- `GET /api/breeds/image/random` - Get a random dog image
- `GET /api/breeds/image/random/{count}` - Get multiple random dog images

## Performance Considerations

- Images are loaded on-demand
- Smooth transitions with CSS transforms (GPU-accelerated)
- Efficient re-renders with React's diffing algorithm
- Lazy loading can be added for thumbnails in production

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT

## Author

Created as a coding assignment for Senior Front End Developer position.