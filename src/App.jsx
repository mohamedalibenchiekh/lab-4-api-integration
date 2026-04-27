import PokemonList from './components/PokemonList';
import UserSearch from './components/UserSearch';
import AddPostForm from './components/AddPostForm';
import WeatherApp from './components/WeatherApp';
import './App.css';

function App() {
  return (
    <div className="App">
      <WeatherApp />
      <PokemonList />
      <UserSearch />
      <AddPostForm />
    </div>
  );
}

export default App;