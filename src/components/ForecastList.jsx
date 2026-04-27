import { getWeatherDescription, getWeatherIcon } from '../api/weatherApi';

function ForecastList({ forecast, unit }) {
  if (!forecast || forecast.length === 0) return null;

  const convertTemp = (tempC) => {
    if (unit === 'F') {
      return (tempC * 9/5 + 32).toFixed(1);
    }
    return tempC.toFixed(1);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
    }
  };

  // Show only next 7 days
  const next7Days = forecast.slice(0, 7);

  return (
    <div className="forecast-list">
      <h3>7-Day Forecast</h3>
      <div className="forecast-grid">
        {next7Days.map((day, index) => (
          <div key={index} className="forecast-card">
            <div className="forecast-date">{formatDate(day.date)}</div>
            <div className="forecast-icon">
              {getWeatherIcon(day.weatherCode)}
            </div>
            <div className="forecast-desc">
              {getWeatherDescription(day.weatherCode)}
            </div>
            <div className="forecast-temps">
              <span className="temp-high">
                {convertTemp(day.tempMax)}°{unit}
              </span>
              <span className="temp-separator">/</span>
              <span className="temp-low">
                {convertTemp(day.tempMin)}°{unit}
              </span>
            </div>
            <div className="forecast-precip">
              🌧️ {day.precipitationProbability}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastList;