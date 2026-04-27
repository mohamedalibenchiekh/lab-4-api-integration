import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cacheRef = useRef({});
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=20';

  useEffect(() => {
    // Check cache first
    if (cacheRef.current[url]) {
      console.log('Loading from cache...');
      setPokemon(cacheRef.current[url]);
      setLoading(false);
      return; // Don't fetch
    }

    console.log('Fetching from API...');
    axios.get(url)
      .then(res => {
        const pokemonData = res.data.results;
        cacheRef.current[url] = pokemonData; // Store in cache
        setPokemon(pokemonData);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="pokemon-list">
      <h2>Pokemon List (Cached)</h2>
      <ul>
        {pokemon.map((p, index) => (
          <li key={p.name}>
            {index + 1}. {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonList;