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
  const [ tracks, setTracks ] = useState([])

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

  let testArr = [1, 2, 3]

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mixin' Jam</h1>
      </header>

      <div className='Body'> 
        <div className="SearchBar">
          <SearchBar setAlbums={setAlbums} setTracks={setTracks} accessToken={accessToken}/>
        </div>
        <div className="MixinJam">
          <SearchResult SearchResult='SearchResult' className="SearchResult">
            <div className='SearchResult-Album-div'>
              {albums.map(album => {
                return <Album albumNames={album.name} albumImgSrc={album.images[0].url}/>
              })}
            </div>
            <div className='SearchResult-Track-div'>
              {tracks.map(track => {
                return <Track artistName={track.artists[0].name} artistUrl={track.artists[0].external_urls.spotify} trackName={track.name} trackImgSrc={track.album.images[0].url} trackUrl={track.external_urls.spotify} />
              })}
            </div>
          </SearchResult>
          <Playlist Playlist="Playlist" >
          </Playlist>
        </div>
        
      </div>
    </div>
  );
}

export default App;