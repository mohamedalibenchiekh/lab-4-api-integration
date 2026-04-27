import { useState, useEffect } from 'react';
import SearchCity from './SearchCity';
import CurrentWeather from './CurrentWeather';
import ForecastList from './ForecastList';
import RecentCities from './RecentCities';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import useWeather from '../hooks/useWeather';
import useRecentCities from '../hooks/useRecentCities';

function DashboardPage() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [unit, setUnit] = useState(() => {
    return localStorage.getItem('tempUnit') || 'C';
  });

  const { weatherData, loading, error, lastUpdated, refresh } = useWeather(
    selectedCity?.latitude,
    selectedCity?.longitude
  );

  const { recentCities, addCity, clearAll } = useRecentCities();

  // Save unit preference
  useEffect(() => {
    localStorage.setItem('tempUnit', unit);
  }, [unit]);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    addCity(city);
  };

  const handleRecentCityClick = (city) => {
    setSelectedCity(city);
  };

  const toggleUnit = () => {
    setUnit(prev => prev === 'C' ? 'F' : 'C');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Weather Dashboard</h1>
        <SearchCity onCitySelect={handleCitySelect} />
      </header>

      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          <RecentCities
            cities={recentCities}
            onCitySelect={handleRecentCityClick}
            onClearAll={clearAll}
          />
        </aside>

        <main className="dashboard-main">
          {!selectedCity ? (
            <div className="no-city-selected">
              <div className="empty-state-icon">🏙️</div>
              <h2>Select a City</h2>
              <p>Search for a city to view its weather</p>
            </div>
          ) : loading ? (
            <LoadingSpinner message="Loading weather data..." />
          ) : error ? (
            <ErrorMessage message={error} onRetry={refresh} />
          ) : (
            <>
              <div className="city-header">
                <h2>{selectedCity.name}, {selectedCity.country}</h2>
                {lastUpdated && (
                  <span className="last-updated">
                    Updated: {new Date(lastUpdated).toLocaleTimeString()}
                  </span>
                )}
                <button onClick={refresh} className="refresh-btn">
                  🔄 Refresh
                </button>
              </div>

              <CurrentWeather
                weatherData={weatherData}
                unit={unit}
                onUnitToggle={toggleUnit}
              />

              <ForecastList
                forecast={weatherData?.forecast}
                unit={unit}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;