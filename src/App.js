import logo from './logo.svg';
import './App.scss';
import { SearchBar } from './presentational/SearchBar/SearchBar';
import { SearchResults } from './presentational/SearchResults/SearchResults';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Mixin' Jam</h1>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <SearchBar />
      <SearchResults />
    </div>
  );
}

export default App;
