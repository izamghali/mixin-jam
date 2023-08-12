import './App.scss';
import React, { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { SearchResult } from './components/SearchResult';
import { Playlist } from './components/Playlist';
import { Track } from './components/Track';
import { Album } from './components/Album';

function App() {

  const [ accessToken, setAccessToken ] = useState('')
  const [ albums, setAlbums ] = useState([])

  const CLIENT_ID = '89cc9f4988ea4c7985a164bf3392cd1d';
  const CLIENT_SECRET = 'f1348b92b74240898b500661ba3339d5';

  useEffect(() => {
    // API Access Token
    const tokenUrl = 'https://accounts.spotify.com/api/token'
    const authParameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch(tokenUrl, authParameters)
        .then(response => response.json())
        .then(data => setAccessToken(data.access_token))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mixin' Jam</h1>
      </header>

      <div className='Body'> 
        <SearchBar setAlbums={setAlbums} accessToken={accessToken}/>
        <div className='MixinJam'>
          <SearchResult SearchResult='SearchResult'>
            {albums.map(album => {
              return <Album albumNames={album.name} albumImgSrc={album.images[0].url}/>
            })}
          </SearchResult>
          <Playlist>
          </Playlist>
        </div>
        
      </div>
    </div>
  );
}

export default App;