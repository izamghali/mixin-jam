import './App.scss';
import React, { useState, useEffect } from 'react';
import { LoginPage } from './pages/LoginPage/LoginPage'
import { HomePage } from './pages/HomePage/HomePage';
import { MixinJam } from './pages/MixinJam/MixinJam';

import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';

function App() {

  const [ accessToken, setAccessToken ] = useState('')
  const [ refreshToken, setRefreshToken ] = useState('')

  // CLIENTSETUP
  const CLIENT_ID = '89cc9f4988ea4c7985a164bf3392cd1d';
  const CLIENT_SECRET = 'f1348b92b74240898b500661ba3339d5';

  var redirect_uri = 'http://localhost:3000/mixin-jam/home';

  function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  // Router
  const router = createBrowserRouter(createRoutesFromElements(
    <Route >
      <Route path='/mixin-jam' element={ <LoginPage 
        CLIENT_ID={CLIENT_ID} redirect_uri={redirect_uri}
        generateRandomString={generateRandomString}
        /> }
      />
      <Route path='/mixin-jam/home' element={ <HomePage 
        CLIENT_ID={CLIENT_ID} CLIENT_SECRET={CLIENT_SECRET} 
        generateRandomString={generateRandomString} 
        accessToken={accessToken} setAccessToken={setAccessToken}
        refreshToken={refreshToken} setRefreshToken={setRefreshToken}
        /> }
        />
      <Route path='/mixin-jam/search-result' element={ <MixinJam 
        CLIENT_ID={CLIENT_ID} CLIENT_SECRET={CLIENT_SECRET} 
        generateRandomString={generateRandomString} 
        accessToken={accessToken} setAccessToken={setAccessToken}
        refreshToken={refreshToken} setRefreshToken={setRefreshToken}
      
      /> } />
    </Route>
  ))

  return ( <RouterProvider router={router} /> );
}

export default App;