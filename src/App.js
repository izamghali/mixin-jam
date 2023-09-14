import './App.scss';
import React, { useState, useEffect } from 'react';
import { LoginPage } from './pages/LoginPage/LoginPage'
import { HomePage } from './pages//HomePage/HomePage';

import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';

function App() {

  // State
  let [ accessToken, setAccessToken ] = useState('')

  // API
  const CLIENT_ID = '89cc9f4988ea4c7985a164bf3392cd1d';
  const CLIENT_SECRET = 'f1348b92b74240898b500661ba3339d5';
  localStorage.setItem("client_id", CLIENT_ID)
  localStorage.setItem("client_secret", CLIENT_SECRET)
  
  const url = 'https://api.spotify.com/v1' 

  // Router
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' >
      <Route path='mixin-jam' element={ <LoginPage 
        CLIENT_ID={CLIENT_ID} CLIENT_SECRET={CLIENT_SECRET} /> }
      />
      <Route path='home' element={ <HomePage 
        CLIENT_ID={CLIENT_ID} CLIENT_SECRET={CLIENT_SECRET}
        accessToken={accessToken} setAccessToken={setAccessToken}
        url={url} /> }
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

export default App;