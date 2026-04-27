import PokemonList from './components/PokemonList';
import UserSearch from './components/UserSearch';
import AddPostForm from './components/AddPostForm';
import WeatherApp from './components/WeatherApp';
import GitHubUserLookup from './components/GitHubUserLookup';
import SlowAPIComponent from './components/SlowAPIComponent';
import './App.css';

function App() {
  return (
    <div className="App">
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