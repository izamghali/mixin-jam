import './App.scss';
import { SearchBar } from './container/SearchBar/SearchBar';
import { SearchResultPresentational } from './presentational/SearchResult/SearchResultPresentational';
import { Playlist } from './presentational/Playlist/Playlist';
import { Track } from './container/Track/Track';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Mixin' Jam</h1>
      </header>

      <div className='Body'> 
        <SearchBar/>
        <div className='MixinJam'>
          <SearchResultPresentational>
          </SearchResultPresentational>
          <Playlist>
          </Playlist>
        </div>
        
      </div>
      <Track/>
    </div>
  );
}

export default App;
