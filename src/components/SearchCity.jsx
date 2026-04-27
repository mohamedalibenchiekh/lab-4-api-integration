import { useState, useEffect } from 'react';
import { searchCities } from '../api/weatherApi';
import useDebounce from '../hooks/useDebounce';

function SearchCity({ onCitySelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const controller = new AbortController();

    const fetchCities = async () => {
      setLoading(true);
      const cities = await searchCities(debouncedQuery);
      if (!controller.signal.aborted) {
        setResults(cities);
        setShowDropdown(cities.length > 0);
        setLoading(false);
      }
    };

    fetchCities();

    return () => controller.abort();
  }, [debouncedQuery]);

  const handleSelect = (city) => {
    onCitySelect(city);
    setQuery(city.name);
    setShowDropdown(false);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFocus = () => {
    if (results.length > 0) {
      setShowDropdown(true);
    }
  };

  const handleBlur = () => {
    // Delay hiding to allow click on dropdown items
    setTimeout(() => setShowDropdown(false), 200);
  };

  return (
    <div className="search-city">
      <div className="search-input-wrapper">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Search for a city..."
          className="city-search-input"
        />
        {loading && <span className="search-spinner">⏳</span>}
      </div>

      {showDropdown && (
        <div className="search-results-dropdown">
          {results.map((city) => (
            <div
              key={city.id}
              className="city-result-item"
              onClick={() => handleSelect(city)}
            >
              <span className="city-name">{city.name}</span>
              {city.admin1 && <span className="city-region">, {city.admin1}</span>}
              <span className="city-country">{city.country}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchCity;