import axios from 'axios';

const GEOCODING_BASE = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_BASE = 'https://api.open-meteo.com/v1/forecast';

// Geocode city name to coordinates
export const searchCities = async (query) => {
  if (!query || query.length < 2) return [];
  
  try {
    const response = await axios.get(GEOCODING_BASE, {
      params: {
        name: query,
        count: 10,
        language: 'en',
        format: 'json'
      }
    });
    
    return response.data.results?.map(city => ({
      id: city.id,
      name: city.name,
      country: city.country,
      latitude: city.latitude,
      longitude: city.longitude,
      admin1: city.admin1, // State/Province
      timezone: city.timezone
    })) || [];
  } catch (error) {
    console.error('Geocoding error:', error);
    return [];
  }
};

// Get current weather by coordinates
export const getWeatherByCoordinates = async (lat, lon) => {
  try {
    const response = await axios.get(WEATHER_BASE, {
      params: {
        latitude: lat,
        longitude: lon,
        current: [
          'temperature_2m',
          'relative_humidity_2m',
          'apparent_temperature',
          'weather_code',
          'wind_speed_10m',
          'wind_direction_10m',
          'pressure_msl',
          'surface_pressure'
        ].join(','),
        daily: [
          'weather_code',
          'temperature_2m_max',
          'temperature_2m_min',
          'precipitation_sum',
          'precipitation_probability_max',
          'wind_speed_10m_max'
        ].join(','),
        timezone: 'auto'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Weather fetch error:', error);
    throw error;
  }
};

// Transform raw API data to display format
export const transformWeatherData = (rawData) => {
  if (!rawData) return null;
  
  const current = rawData.current;
  const daily = rawData.daily;
  
  return {
    current: {
      temperature: current.temperature_2m,
      feelsLike: current.apparent_temperature,
      humidity: current.relative_humidity_2m,
      weatherCode: current.weather_code,
      windSpeed: current.wind_speed_10m,
      windDirection: current.wind_direction_10m,
      pressure: current.pressure_msl
    },
    forecast: daily.time.map((date, index) => ({
      date,
      weatherCode: daily.weather_code[index],
      tempMax: daily.temperature_2m_max[index],
      tempMin: daily.temperature_2m_min[index],
      precipitation: daily.precipitation_sum[index],
      precipitationProbability: daily.precipitation_probability_max[index],
      windSpeed: daily.wind_speed_10m_max[index]
    }))
  };
};

// Weather code to description mapping
export const getWeatherDescription = (code) => {
  const codes = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail'
  };
  return codes[code] || 'Unknown';
};

// Get weather icon based on code
export const getWeatherIcon = (code) => {
  if (code === 0) return '☀️';
  if (code === 1) return '🌤️';
  if (code === 2) return '⛅';
  if (code === 3) return '☁️';
  if (code <= 48) return '🌫️';
  if (code <= 57) return '🌧️';
  if (code <= 67) return '🌧️';
  if (code <= 77) return '🌨️';
  if (code <= 86) return '🌧️';
  if (code <= 99) return '⛈️';
  return '❓';
};