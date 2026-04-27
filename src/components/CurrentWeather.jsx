import { getWeatherDescription, getWeatherIcon } from '../api/weatherApi';

function CurrentWeather({ weatherData, unit, onUnitToggle }) {
  if (!weatherData) return null;

  const { current } = weatherData;
  
  const convertTemp = (tempC) => {
    if (unit === 'F') {
      return (tempC * 9/5 + 32).toFixed(1);
    }
    return tempC.toFixed(1);
  };

  const getWindDirection = (degrees) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  return (
    <div className="current-weather">
      <div className="weather-main">
        <div className="weather-icon-large">
          {getWeatherIcon(current.weatherCode)}
        </div>
        <div className="temperature-display">
          <span className="temp-value">{convertTemp(current.temperature)}</span>
          <span className="temp-unit">°{unit}</span>
          <button onClick={onUnitToggle} className="unit-toggle">
            Switch to °{unit === 'C' ? 'F' : 'C'}
          </button>
        </div>
      </div>

      <div className="weather-description">
        {getWeatherDescription(current.weatherCode)}
      </div>

      <div className="weather-details-grid">
        <div className="detail-item">
          <span className="detail-label">Feels Like</span>
          <span className="detail-value">{convertTemp(current.feelsLike)}°{unit}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{current.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind</span>
          <span className="detail-value">
            {current.windSpeed} km/h {getWindDirection(current.windDirection)}
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Pressure</span>
          <span className="detail-value">{current.pressure} hPa</span>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;