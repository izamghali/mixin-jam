import './App.scss';
import { SearchBar } from './container/SearchBar/SearchBar';
import { SearchResults, SearchResultsPresentational } from './presentational/SearchResults/SearchResultsPresentational';
import { Track } from './presentational/Track/Track';
import { Playlist } from './presentational/Playlist/Playlist';
import { Card } from './container/Card/Card';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Mixin' Jam</h1>
      </header>

      <div className='Body'> 
        <SearchBar/>
        <div className='MixinJam'>
          <SearchResultsPresentational>
          </SearchResultsPresentational>
          <Playlist>
          </Playlist>
        </div>
        
      </div>
      <Card/>
    </div>
  );
}

export default App;
