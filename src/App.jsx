import PokemonList from './components/PokemonList';
import UserSearch from './components/UserSearch';
import AddPostForm from './components/AddPostForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <PokemonList />
      <UserSearch />
      <AddPostForm />
    </div>
  );
}

export default App;