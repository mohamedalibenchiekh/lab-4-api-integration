# Lab 4: API Integration & Data Management - Weather Dashboard

**Name:** Mohamed Ali Ben Cheikh

**Course:** React Development

## APIs Used

- **Open-Meteo Weather API** - Free weather data (no key required)
  - Geocoding: https://geocoding-api.open-meteo.com/v1/search
  - Weather: https://api.open-meteo.com/v1/forecast
- **JSONPlaceholder** - Mock data for posts/comments
- **PokeAPI** - Pokemon data
- **Random User API** - User data generation
- **GitHub API** - Repository and user data
- **Open Library API** - Book search

## Features Implemented

### Must-Have Features
- ✅ City search with autocomplete (debounced)
- ✅ Current weather display (temperature, humidity, wind, pressure)
- ✅ 7-day forecast with daily high/low temperatures
- ✅ Loading skeletons and spinners
- ✅ User-friendly error messages with retry
- ✅ Weather data caching with TTL (30 minutes)
- ✅ Recent cities stored in localStorage
- ✅ Temperature unit toggle (°C/°F)
- ✅ AbortController for request cancellation

### Stretch Goals
- ✅ Responsive design (mobile and desktop)
- ✅ Debounced search (300ms)
- ✅ Smooth transitions and hover effects
- ✅ Professional gradient UI design

## How to Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## No API Keys Required!

All APIs used are free and require no authentication.

## Performance Optimizations

1. **Caching Strategy:**
   - In-memory cache with TTL (30 minutes for weather)
   - localStorage for city preferences and recent cities
   - Cache-first strategy with background refresh

2. **Request Optimization:**
   - AbortController for canceling stale requests
   - Debounced search (300ms)
   - Lazy loading for images

3. **State Management:**
   - Custom hooks for reusable logic
   - Centralized API service
   - Proper cleanup in useEffect

## Known Limitations

- Weather data updates every 30 minutes due to caching
- Limited to 5 recent cities in localStorage
- No offline support in this version
- Rate limiting possible on GitHub API (60 requests/hour unauthenticated)

## Project Structure

```
lab-4-api-integration/
├── src/
│   ├── api/
│   │   └── weatherApi.js
│   ├── components/
│   │   ├── AddPostForm.js
│   │   ├── AdvancedSearch.js
│   │   ├── BookSearch.js
│   │   ├── CancelableDataFetcher.js
│   │   ├── CachedPokemon.js
│   │   ├── CachedWeatherApp.js
│   │   ├── CommitHistory.js
│   │   ├── CurrentWeather.js
│   │   ├── DashboardPage.js
│   │   ├── ErrorMessage.js
│   │   ├── ForecastList.js
│   │   ├── GitHubUserLookup.js
│   │   ├── LoadingSpinner.js
│   │   ├── PaginatedPosts.js
│   │   ├── PokemonList.js
│   │   ├── RecentCities.js
│   │   ├── SearchCity.js
│   │   ├── SlowAPIComponent.js
│   │   ├── TTLCacheDemo.js
│   │   ├── UserSearch.js
│   │   └── WeatherApp.js
│   ├── hooks/
│   │   ├── useDebounce.js
│   │   ├── useFetch.js
│   │   ├── useRecentCities.js
│   │   └── useWeather.js
│   ├── utils/
│   │   └── cacheManager.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
└── package.json
```
