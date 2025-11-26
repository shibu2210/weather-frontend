# Weather AQI Frontend

React-based frontend application for displaying real-time weather and air quality information with a modern, responsive interface.

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **Recharts** - Data visualization
- **React Icons** - Icon library

## Features

- 🌤️ Real-time weather display with current conditions
- 📊 Air Quality Index (AQI) monitoring with pollutant breakdown
- 📅 7-day weather forecast
- ⏰ 24-hour hourly forecast
- 🔍 Location search with autocomplete
- 🌓 Dark/Light theme toggle
- 🌡️ Temperature unit conversion (°C/°F)
- 📱 Fully responsive design (mobile, tablet, desktop)
- ⚡ Skeleton loading states
- 🎨 Modern glassmorphism UI with smooth animations

<img width="1907" height="943" alt="image" src="https://github.com/user-attachments/assets/e747bf39-ec0f-49be-b61c-d5ea9a0d2879" />

## Prerequisites

- Node.js 18+ and npm

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (optional):
```env
VITE_API_BASE_URL=http://localhost:8080
```

3. Start the development server:
```bash
npm run dev
```

The app will run on `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── common/      # Shared components (Header, Footer, etc.)
│   ├── search/      # Search functionality
│   └── weather/     # Weather-specific components
├── context/         # React Context providers
├── hooks/           # Custom React hooks
├── pages/           # Page components
├── services/        # API service layer
├── utils/           # Helper functions
├── App.jsx          # Main app component
└── main.jsx         # Entry point
```

## Building for Production

```bash
npm run build
```

Build output will be in the `dist/` directory.

## Deployment

The app is configured for deployment on Vercel with automatic redirects for SPA routing.

## Environment Variables

- `VITE_API_BASE_URL` - Backend API URL (defaults to `http://localhost:8080`)

## Browser Support

Modern browsers with ES6+ support (Chrome, Firefox, Safari, Edge)
