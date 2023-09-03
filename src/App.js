import './App.scss';
import React, { useState, useEffect } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { SearchBar } from './components/SearchBar';
import { SearchResult } from './components/SearchResult';
import { Playlist } from './components/Playlist';
import { Track } from './components/Track';
import { CompactTrack } from './components/CompactTrack';
import { Album } from './components/Album';
import { UserPlaylist } from './components/UserPlaylist';

function App() {

  const [ accessToken, setAccessToken ] = useState('')
  const [ albums, setAlbums ] = useState([])
  const [ artistTracks, setArtistTracks ] = useState([])
  const [ tracks, setTracks ] = useState([])
  const [ addedTracks, setAddedTracks ] = useState([]);

  const addedTrackIDs = addedTracks.map(track => { return track.trackID });
  const url = 'https://api.spotify.com/v1' 
  const searchParams = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
    }
  }

  // style
  const [ searchResultLayout, setSearchResultLayout ] = useState({});

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

        <div className="SearchBar">
          <SearchBar
            url={url}
            searchParams={searchParams}
            setSearchResultLayout={setSearchResultLayout}
            setTracks={setTracks}
            setAlbums={setAlbums}
            setArtistTracks={setArtistTracks}
            accessToken={accessToken}
            albums={albums}
          />
        </div>

        <div style={searchResultLayout} className="MixinJam">

          <SearchResult albums={albums} className="SearchResult" SearchResult='SearchResult'>
            <div className='SearchResult-Album-div'>
              {albums.map(album => {
                return <Album 
                        url={url}
                        albums={albums}
                        searchParams={searchParams}
                        albumNames={album.name} 
                        albumID={album.id}
                        albumImgSrc={album.images[0].url }/>
              })}
            </div>

            <div className='SearchResult-Track-div'>
              {tracks.map(track => {
                return <Track 
                          addedTrackIDs={addedTrackIDs}
                          addedTracks={addedTracks} 
                          trackID={track.id}
                          setAddedTracks={setAddedTracks} 
                          trackTitle={track.name} 
                          artistName={track.artists[0].name} 
                          trackUrl={track.external_urls.spotify} 
                          imgSrc={track.album.images[0].url} 
                        />
              })}
            </div>

          </SearchResult>

          <Playlist
            // className & Playlist props are set to Playlist so we can style Playlist component in App.scss & Playlist.scss
            > 
            {addedTracks.map(track => {
              return <CompactTrack
                        addedTrackIDs={addedTrackIDs}
                        tracks={tracks}
                        setAddedTracks={setAddedTracks}
                        addedTracks={addedTracks}
                        trackTitle={track.trackTitle}
                        artistName={track.artistName} 
                        trackID={track.trackID}
                      />
            })}
          </Playlist>

        </div>

        <div>
            <UserPlaylist
              searchParams = {searchParams}
              CLIENT_ID={CLIENT_ID}
            />
        </div>
        
      </div>
    </div>
  );
}

export default App;