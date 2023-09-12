import React, { useEffect, useState } from 'react';
import './LoginSpotifyButton.scss'
// import { useNavigate, Link, NavLink } from 'react-router-dom';

export function LoginSpotifyButton(props) {

    const {
        accessToken, setAccessToken,
        clientId
    } = props;

    // States
    const [ authCode, setAuthCode ] = useState('');
    const [ authState, setAuthState ] = useState('');

    const handleClick = async (event) => {
        event.preventDefault();
        // generating code verifier
        let generateRandomString = (length) => {
            let text = '';
            let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          
            for (let i = 0; i < length; i++) {
              text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        }

        // hashing code verifier using SHA256 algorithm
        let generateCodeChallenge = async (codeVerifier) => {
            function base64encode(string) {
              return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=+$/, '');
            }
          
            const encoder = new TextEncoder();
            const data = encoder.encode(codeVerifier);
            const digest = await window.crypto.subtle.digest('SHA-256', data);
          
            return base64encode(digest);
        }
        
        let codeVerifier = generateRandomString(128);

        const redirectUri = 'http://localhost:3000/home';

        let state = generateRandomString(16);
        let scope = 'user-read-private user-read-email';
        localStorage.setItem('code_verifier', codeVerifier);

        let args = new URLSearchParams({
            response_type: 'code',
            client_id: clientId,
            scope: scope,
            redirect_uri: redirectUri,
            state: state,
            code_challenge_method: 'S256',
            code_challenge: await generateCodeChallenge(codeVerifier)
        });

        window.location = `https://accounts.spotify.com/authorize?${args}`;
    }

    const getAccessToken = async (event) => {
        event.preventDefault();

        let authState = new URLSearchParams(window.location.search);
        let authCode = authState.get('code');
        setAuthCode(authCode);
        setAuthState(authState);

        // Request Access Token
        let bodyParams = new URLSearchParams({
            grant_type: 'authorization_code',
            code: authCode,
            redirect_uri: 'http://localhost:3000/home',
            client_id: clientId,
            code_verifier: localStorage.getItem('code_verifier')
        });

        let accessTokenParams = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }, 
            body: bodyParams
        }

        // POST request to store the access token
        try {
            let response = await (await fetch('https://accounts.spotify.com/api/token', accessTokenParams)).json();
            localStorage.setItem('access_token', response.access_token)
        }
        catch(error) {
            console.error('Error:', error);
        }
        // const refreshParam = new URLSearchParams(window.location.search);
        // let refreshToken = refreshParam.get('refresh_token');

        // console.log(refreshParam)
        console.log(localStorage)
    }

    const handleCheckProfile = async (event) => {
        event.preventDefault();

        let getProfile = async() => {
            let accessToken = localStorage.access_token;
          
            const response = await fetch('https://api.spotify.com/v1/me', {
              headers: {
                Authorization: 'Bearer ' + accessToken
              }
            });
          
            let data = await response.json();
            return data;
        }

        let currentProfile = await getProfile();
        console.log(currentProfile)
    
    }

    const handleRefreshAccessToken = async (event) => {
        event.preventDefault();

        // refresh access token
        const refreshAccessToken = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: {
                grant_type: 'refresh_token',
                refresh_token: authCode, // this is not authCode, it should be refresh_token returned after authorziation code exchange.
                client_id: clientId
            }
        })

        console.log(refreshAccessToken)
        console.log(localStorage)
    }

    const handleAuthorize = async(event) => {
        // Implicit grantFlow
        event.preventDefault();
        let generateRandomString = (length) => {
            let text = '';
            let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          
            for (let i = 0; i < length; i++) {
              text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        }

        // const searchParams = {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer ' + accessToken,
        //         'Access-Control-Allow-Origin': 'no-cors'
        //     }
        // }
        const searchParams = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + accessToken,
                // 'Access-Control-Allow-Origin': '*',
            },
        }

        var url = 'https://accounts.spotify.com/authorize';
        var redirectUri = 'http://localhost:3000/';
        var scope = 'user-read-private user-read-email';
        var state = generateRandomString(16);
        // localStorage.setItem(stateKey, state);

        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(clientId);
        url += '&scope=' + encodeURIComponent(scope);
        url += '&redirect_uri=' + encodeURIComponent(redirectUri);
        url += '&state=' + encodeURIComponent(state);
        // url += '&show_dialog=' + true;

        try {
            let getAuthorization = await (await fetch(url, searchParams)).json()
            console.log(getAuthorization)
            // const getArtistTracks = await (await fetch(`${url}/artists/${artistID}/top-tracks?market=US&limit=5`, searchParams)).json()
        } catch(error) {
            console.log("error: " + error)
        }
    }

    return (
        <>
            <form onClick={handleAuthorize} className='LoginSpotifyButton'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-spotify" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z"/>
                </svg>
                <input
                    type='submit'
                    value='Login using Spotify'
                    >
                </input>
            </form>
            {/* <form onClick={handleCheckProfile}>
                <input
                    type='submit'
                    value='Check profile'
                    >
                </input>
            </form>
            <form onClick={getAccessToken}>
                <input
                    type='submit'
                    value='Get Access Token'
                    >
                </input>
            </form>
            <form onClick={handleRefreshAccessToken}>
                <input
                    type='submit'
                    value='Refresh Access Token'
                    >
                </input>
            </form> */}
        </>
    )
}