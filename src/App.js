import './App.scss';
import React, { useState, useEffect } from 'react';
import { LoginPage } from './pages/LoginPage/LoginPage'
import { HomePage } from './pages//HomePage/HomePage';

import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';

function App() {

  // State
  const [ accessToken, setAccessToken ] = useState('')

  // API
  const CLIENT_ID = '89cc9f4988ea4c7985a164bf3392cd1d';
  const CLIENT_SECRET = 'f1348b92b74240898b500661ba3339d5';
  const url = 'https://api.spotify.com/v1' 
  const searchParams = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
    }
  }

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

  // Router
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' >
      <Route path='mixin-jam' element={ <LoginPage 
        clientId={CLIENT_ID} 
        accessToken={accessToken}/> }
      />
      <Route path='home' element={ <HomePage 
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        url={url} searchParams={searchParams}

        // albums={albums} setAlbums={setAlbums} 
        // tracks={tracks} setTracks={setTracks}
        // addedTracks={addedTracks} setAddedTracks={setAddedTracks}
        // artistTracks={artistTracks} setArtistTracks={setArtistTracks}
        /> }
      />
    </Route>
  ))

  return (
    <RouterProvider router={router} />
    // <div className="App">
    //   {/* <header className="App-header">
    //     <h1>Mixin' Jam</h1>
    //   </header> */}

    //   {/* <LoginPage clientId={CLIENT_ID} accessToken={accessToken} /> */}

    //   <HomePage />
    // </div>
  );
}

// App.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000/");
//   res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// })

export default App;