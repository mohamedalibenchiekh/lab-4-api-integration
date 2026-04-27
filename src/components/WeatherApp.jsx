import { useState, useEffect } from 'react';
import axios from 'axios';

function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const url = 'https://api.open-meteo.com/v1/forecast?latitude=51.5074&longitude=-0.1278&current=temperature_2m,weather_code';
      
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(url);
        setWeather(res.data);
      } catch (err) {
        setError('Failed to load weather. Please try again.');
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherDescription = (code) => {
    const weatherCodes = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Slight snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      95: 'Thunderstorm'
    };
    return weatherCodes[code] || 'Unknown';
  };

  if (loading) return <div className="loading">Loading weather data...</div>;
  
  if (error) return (
    <div className="error">
      <p>{error}</p>
      <button onClick={() => window.location.reload()}>Retry</button>
    </div>
  );

  return (
    <div className="weather-app">
      <h2>London Weather</h2>
      {weather && weather.current && (
        <div className="weather-info">
          <div className="temperature">
            <span className="temp-value">{weather.current.temperature_2m}°C</span>
          </div>
          <div className="weather-desc">
            {getWeatherDescription(weather.current.weather_code)}
          </div>
          <div className="weather-details">
            <p>Time: {new Date(weather.current.time).toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;