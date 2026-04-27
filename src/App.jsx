import PokemonList from './components/PokemonList';
import UserSearch from './components/UserSearch';
import AddPostForm from './components/AddPostForm';
import WeatherApp from './components/WeatherApp';
import GitHubUserLookup from './components/GitHubUserLookup';
import SlowAPIComponent from './components/SlowAPIComponent';
import BookSearch from './components/BookSearch';
import CommitHistory from './components/CommitHistory';
import PaginatedPosts from './components/PaginatedPosts';
import CancelableDataFetcher from './components/CancelableDataFetcher';
import AdvancedSearch from './components/AdvancedSearch';
import CachedPokemon from './components/CachedPokemon';
import CachedWeatherApp from './components/CachedWeatherApp';
import TTLCacheDemo from './components/TTLCacheDemo';
import './App.css';

function App() {
  return (
    <div className="App">
      <TTLCacheDemo />
      <CachedWeatherApp />
      <CachedPokemon />
      <AdvancedSearch />
      <CancelableDataFetcher />
      <PaginatedPosts />
      <CommitHistory />
      <BookSearch />
      <SlowAPIComponent />
      <WeatherApp />
      <GitHubUserLookup />
      <PokemonList />
      <UserSearch />
      <AddPostForm />
    </div>
  );
}

export default App;