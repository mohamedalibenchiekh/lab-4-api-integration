import { useState, useEffect } from 'react';

function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch Pokemon');
        }
        return res.json();
      })
      .then(data => {
        setPokemon(data.results);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // Empty dependency array - runs once on mount

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="pokemon-list">
      <h2>Pokemon List (First 20)</h2>
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