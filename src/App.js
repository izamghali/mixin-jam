import './App.scss';
import React, { useState, useEffect } from 'react';
import { LoginPage } from './pages/LoginPage/LoginPage'
import { HomePage } from './pages/HomePage/HomePage';

import { useNavigate, createBrowserRouter, RouterProvider, Route, Routes, createRoutesFromElements, createHashRouter, HashRouter, BrowserRouter } from 'react-router-dom';

function App() {

  const [ accessToken, setAccessToken ] = useState('')
  const [ refreshToken, setRefreshToken ] = useState('')
  const [ user_id, set_user_id ] = useState('')

  // CLIENTSETUP
  const CLIENT_ID = '89cc9f4988ea4c7985a164bf3392cd1d';
  const CLIENT_SECRET = 'f1348b92b74240898b500661ba3339d5';

//   var redirect_uri = 'http://localhost:3000/#/'; // local
  var redirect_uri = 'https://izamghali.github.io/mixin-jam/#/'; //remote
  
  // var redirect_uri = 'https://izamghali.github.io/mixin-jam/#/dashboard'; //remote
  // var redirect_uri = 'http://localhost:3000/#/mixin-jam/dashboard';
  // var redirect_uri = 'http://localhost:3000/#/mixin-jam/';
  // var redirect_uri = 'http://localhost:3000/dashboard';
  // var redirect_uri = 'http://localhost:3000/mixin-jam/home';

  function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('code_verifier') === null) {
        navigate('/mixin-jam') // check if code_verifier is stored, if not navigate to login page
    }
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var error = urlParams.get("error")
    if (error === 'access_denied') {
        navigate('/mixin-jam')
        localStorage.clear()
        localStorage.setItem("client_id", CLIENT_ID)
        localStorage.setItem("client_secret", CLIENT_SECRET)
    } else {
        // search object is not undefined & access token in the localStorage is not exist
        if (window.location.search.length > 0 && localStorage.getItem('refresh_token') === null) {
            // get access token using PKCE method
            // get code from the url
            console.log("we're trying to get access token & refresh token")
            let code = urlParams.get('code');
            
            // get code verifier from localStorage
            let codeVerifier = localStorage.getItem('code_verifier');

            let body = new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirect_uri,
                client_id: CLIENT_ID,
                code_verifier: codeVerifier
            });

            // requesting access token
            let response = fetch('https://accounts.spotify.com/api/token', {
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
                    localStorage.setItem('access_token', data.access_token);
                    console.log("we got the access token")
                    
                    localStorage.setItem('refresh_token', data.refresh_token);
                    console.log("and we got the refresh token!!!")
                    window.location.reload();
                })
                .catch(error => {
                    console.error('Error:', error);
                });

            window.history.pushState("", "", redirect_uri) // clear url bar
        }
    }

    
  }, [])

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
        let userID = data.id;
        set_user_id(userID);
        
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
  return (
    <>
      <Routes>
        <Route path='/mixin-jam' element={
          <LoginPage
            CLIENT_ID={CLIENT_ID} redirect_uri={redirect_uri}
            generateRandomString={generateRandomString}
          />
        }/>
        <Route path='/' element={
          <HomePage 
            CLIENT_ID={CLIENT_ID} CLIENT_SECRET={CLIENT_SECRET} 
            generateRandomString={generateRandomString} getProfile={getProfile}
            access_token={access_token}
            refreshToken={refreshToken} setRefreshToken={setRefreshToken}
            user_id={user_id}
          />
        }/>
      </Routes>
    </>
  )
  
  // <Route path='/mixin-jam' element={ <LoginPage 
  //   CLIENT_ID={CLIENT_ID} redirect_uri={redirect_uri}
  //   generateRandomString={generateRandomString}
  //   /> }
  // />
  // <Route path='/mixin-jam/home' element={ <HomePage 
  //   CLIENT_ID={CLIENT_ID} CLIENT_SECRET={CLIENT_SECRET} 
  //   generateRandomString={generateRandomString} getProfile={getProfile}
  //   access_token={access_token}
  //   refreshToken={refreshToken} setRefreshToken={setRefreshToken}
  //   /> }
  // />

  
      // const router = createHashRouter(createRoutesFromElements(
      //   <Route path='/mixin-jam'>
      //     <Route path='/mixin-jam' element={ <LoginPage 
      //       CLIENT_ID={CLIENT_ID} redirect_uri={redirect_uri}
      //       generateRandomString={generateRandomString}
      //       /> }
      //     />
      //     <Route path='/mixin-jam/home' element={ <HomePage 
      //       CLIENT_ID={CLIENT_ID} CLIENT_SECRET={CLIENT_SECRET} 
      //       generateRandomString={generateRandomString} getProfile={getProfile}
      //       access_token={access_token}
      //       refreshToken={refreshToken} setRefreshToken={setRefreshToken}
      //       /> }
      //       />
      //   </Route>
      // ))
  // const router = createBrowserRouter(createRoutesFromElements(
  //   <Route >
  //     <Route path='/mixin-jam' element={ <LoginPage 
  //       CLIENT_ID={CLIENT_ID} redirect_uri={redirect_uri}
  //       generateRandomString={generateRandomString}
  //       /> }
  //     />
  //     <Route path='/mixin-jam/home' element={ <HomePage 
  //       CLIENT_ID={CLIENT_ID} CLIENT_SECRET={CLIENT_SECRET} 
  //       generateRandomString={generateRandomString} getProfile={getProfile}
  //       access_token={access_token}
  //       refreshToken={refreshToken} setRefreshToken={setRefreshToken}
  //       /> }
  //       />
  //   </Route>
  // ))

  // return ( <RouterProvider router={router} /> );
}

export default App;