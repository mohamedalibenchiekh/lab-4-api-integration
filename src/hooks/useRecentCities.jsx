import { useState, useEffect } from 'react';

const MAX_RECENT_CITIES = 5;
const STORAGE_KEY = 'recentCities';

function useRecentCities() {
  const [recentCities, setRecentCities] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setRecentCities(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse recent cities:', e);
      }
    }
  }, []);

  // Save to localStorage when updated
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentCities));
  }, [recentCities]);

  const addCity = (city) => {
    setRecentCities(prev => {
      // Remove if already exists
      const filtered = prev.filter(c => c.id !== city.id);
      // Add to front and limit to 5
      return [city, ...filtered].slice(0, MAX_RECENT_CITIES);
    });
  };

  const removeCity = (cityId) => {
    setRecentCities(prev => prev.filter(c => c.id !== cityId));
  };

  const clearAll = () => {
    setRecentCities([]);
  };

  return { recentCities, addCity, removeCity, clearAll };
}

export default useRecentCities;