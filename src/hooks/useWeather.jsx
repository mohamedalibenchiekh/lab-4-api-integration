import { useState, useEffect, useCallback } from 'react';
import { getWeatherByCoordinates, transformWeatherData } from '../api/weatherApi';
import { cacheManager } from '../utils/cacheManager';

function useWeather(latitude, longitude) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  
  const TTL = 30 * 60 * 1000; // 30 minutes
  const cacheKey = `weather_${latitude}_${longitude}`;

  const fetchWeather = useCallback(async (skipCache = false) => {
    if (!latitude || !longitude) return;

    setLoading(true);
    setError(null);

    // Check cache first (unless skipCache is true)
    if (!skipCache) {
      const cached = cacheManager.get(cacheKey);
      if (cached) {
        setWeatherData(cached);
        setLastUpdated(cached.timestamp);
        setLoading(false);
        return;
      }
    }

    try {
      const rawData = await getWeatherByCoordinates(latitude, longitude);
      const transformed = transformWeatherData(rawData);
      
      if (transformed) {
        transformed.timestamp = Date.now();
        cacheManager.set(cacheKey, transformed, TTL);
        setWeatherData(transformed);
        setLastUpdated(Date.now());
      }
    } catch {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [latitude, longitude, cacheKey, TTL]);

  useEffect(() => {
    if (latitude && longitude) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchWeather();
    }
  }, [latitude, longitude, fetchWeather]);

  const refresh = () => fetchWeather(true);

  return { weatherData, loading, error, lastUpdated, refresh };
}

export default useWeather;