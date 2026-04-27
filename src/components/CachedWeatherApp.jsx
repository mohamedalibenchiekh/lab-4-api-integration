import { useState, useEffect } from 'react';
import axios from 'axios';

function CachedWeatherApp() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fromCache, setFromCache] = useState(false);

  const url = 'https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current=temperature_2m,relative_humidity_2m,weather_code';
  const cacheKey = 'weather_tokyo';

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      
      // Try to get cached data first
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsedCache = JSON.parse(cached);
        setWeather(parsedCache.data);
        setFromCache(true);
        
        // Check if cache is still valid (30 minutes)
        if (Date.now() - parsedCache.timestamp < 30 * 60 * 1000) {
          setLoading(false);
        }
      }

      try {
        const res = await axios.get(url);
        const weatherData = res.data;
        
        // Save to localStorage
        localStorage.setItem(cacheKey, JSON.stringify({
          data: weatherData,
          timestamp: Date.now()
        }));
        
        setWeather(weatherData);
        setFromCache(false);
      } catch {
        if (!weather) {
          setError('Failed to fetch weather data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <div className="loading">Loading weather...</div>;
  if (error && !weather) return <div className="error">{error}</div>;

  const weatherCode = weather?.current?.weather_code;
  const temp = weather?.current?.temperature_2m;
  const humidity = weather?.current?.relative_humidity_2m;

  const getWeatherIcon = (code) => {
    if (code <= 2) return '☀️';
    if (code <= 3) return '⛅';
    if (code <= 48) return '🌫️';
    if (code <= 55) return '🌧️';
    if (code <= 65) return '🌧️';
    if (code <= 75) return '🌨️';
    if (code <= 95) return '⛈️';
    return '❓';
  };

  return (
    <div className="cached-weather">
      <h2>Tokyo Weather (localStorage Cached)</h2>
      {fromCache && <div className="cache-notice">📦 Loaded from cache (refreshing...)</div>}
      
      <div className="weather-display">
        <div className="weather-icon">
          {getWeatherIcon(weatherCode)}
        </div>
        <div className="weather-details">
          <div className="temperature">{temp}°C</div>
          <div className="humidity">Humidity: {humidity}%</div>
          <div className="cache-time">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CachedWeatherApp;