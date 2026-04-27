function RecentCities({ cities, onCitySelect, onClearAll }) {
  if (!cities || cities.length === 0) return null;

  return (
    <div className="recent-cities">
      <div className="recent-header">
        <h3>Recent Cities</h3>
        <button onClick={onClearAll} className="clear-btn">
          Clear All
        </button>
      </div>
      <div className="recent-cities-list">
        {cities.map((city) => (
          <button
            key={city.id}
            className="recent-city-btn"
            onClick={() => onCitySelect(city)}
          >
            <span className="recent-city-name">{city.name}</span>
            <span className="recent-city-country">{city.country}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default RecentCities;