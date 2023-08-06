import logo from './logo.svg';
import './App.scss';
import { SearchBar } from './presentational/SearchBar/SearchBar';
import { SearchResults } from './presentational/SearchResults/SearchResults';
import { Track } from './presentational/Track/Track';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Mixin' Jam</h1>
      </header>

      <div className='Body'> 
        <SearchBar />
      </div>
        <SearchResults>
        </SearchResults>
      <Track />
    </div>
  );
}

export default App;
