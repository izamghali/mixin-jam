import './App.scss';
import React, { useState, useEffect } from 'react';
import { LoginPage } from './pages/LoginPage/LoginPage'
import { HomePage } from './pages/HomePage/HomePage';
import { MixinJam } from './pages/MixinJam/MixinJam';

import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements, createHashRouter } from 'react-router-dom';

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

  let access_token = localStorage.getItem('access_token')
  let refresh_token = localStorage.getItem('refresh_token')

  const refreshAccessToken = async () => {
    console.log("we're refreshing the access token")
    console.log("loading...")

    const body = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: localStorage.getItem('refresh_token'),
        client_id: CLIENT_ID
    })

    const response = fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP status ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            localStorage.removeItem('access_token');
            localStorage.setItem('access_token', data.access_token);
            alert("WE GOT THE NEW ACCESS TOKEN")
            
            localStorage.removeItem('refresh_token');
            localStorage.setItem('refresh_token', data.refresh_token);
            alert("AND WE GOT THE NEW REFRESH TOKEN!!!")
        })
        .catch(error => {
            console.error('Error:', error);
        });
  }

  const getProfile = async () => {
    try {
        console.log(`we're requesting GET profile`)
        const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: 'Bearer ' + access_token
            }
        });
        let data = await response.json()
        
    } catch(error) {
        console.log(error)
        if (error.message === 'The access token expired') {
            alert('the access token has expired. Starting to refresh the new one!')
            refreshAccessToken();
        } 
        alert('New access token acquired!')
    }
  }

  // Router
  const router = createHashRouter(createRoutesFromElements(
    <Route >
      <Route path='/mixin-jam' element={ <LoginPage 
        CLIENT_ID={CLIENT_ID} redirect_uri={redirect_uri}
        generateRandomString={generateRandomString}
        /> }
      />
      <Route path='/mixin-jam/home' element={ <HomePage 
        CLIENT_ID={CLIENT_ID} CLIENT_SECRET={CLIENT_SECRET} 
        generateRandomString={generateRandomString} getProfile={getProfile}
        access_token={access_token}
        refreshToken={refreshToken} setRefreshToken={setRefreshToken}
        /> }
        />
    </Route>
  ))

  return ( <RouterProvider router={router} /> );
}

export default App;