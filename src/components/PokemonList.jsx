import { useState, useEffect } from 'react';
import axios from 'axios';

function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then(res => {
        setPokemon(res.data.results);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="pokemon-list">
      <h2>Pokemon List (First 20) - Using Axios</h2>
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