import useFetch from '../hooks/useFetch';

function CachedPokemon() {
  const { data, loading, error } = useFetch(
    'https://pokeapi.co/api/v2/pokemon?limit=10'
  );

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="cached-pokemon">
      <h3>Cached Pokemon (Using useFetch Hook)</h3>
      <ul>
        {data?.results?.map((p, index) => (
          <li key={p.name}>
            {index + 1}. {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CachedPokemon;