import React, { useState } from 'react';
import '../LoginPage/LoginSpotifyButton.scss'
// import { useNavigate } from 'react-router-dom';

export function LoginSpotifyButton(props) {

    const [ currentProfile, setCurrentProfile ] = useState('');
    const { clientId } = props;

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

        const redirectUri = 'http://localhost:3000';

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

    const handleCheckProfile = async (event) => {
        event.preventDefault();

        // request access token
        const urlParams = new URLSearchParams(window.location.search);
        let code = urlParams.get('code');

        let codeVerifier = localStorage.getItem('code_verifier');

        let body = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'http://localhost:3000',
        client_id: clientId,
        code_verifier: codeVerifier
        });

        // POST request to store the access token
        let response = async () => {
            await fetch('https://accounts.spotify.com/api/token', {
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
            })
            .catch(error => {
                console.error('Error:', error);
            });

        }

        let getProfile = async() => {
            let accessToken = localStorage.access_token;
          
            const response = await fetch('https://api.spotify.com/v1/me', {
              headers: {
                Authorization: 'Bearer ' + accessToken
              }
            });
          
            const data = await response.json();
            return data;
        }

        let currentProfile = await getProfile();
        console.log(currentProfile)
    
    }

    return (
        <>
            <form onClick={handleClick} className='LoginSpotifyButton'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-spotify" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z"/>
                </svg>
                <input
                    type='submit'
                    value='Login using Spotify'
                    >
                </input>
            </form>
            <form onClick={handleCheckProfile}>
                <input
                    type='submit'
                    value='Check profile'
                    >
                </input>
            </form>
        </>
    )
}