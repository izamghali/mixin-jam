import React, { useState } from 'react';
import './UserPlaylist.scss'

export function UserPlaylist(props) {

    const { searchParams, clientID } = props;

    const [ inputText, setInputText ] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();
        // if (inputText.length > 0) {

            // GET request to fetch user's playlists
            // const getUserPlaylist = await (await fetch(`https://api.spotify.com/v1/users/${inputText}/playlists`, searchParams)).json()
            // console.log(getUserPlaylist)
            
            // GET request to fetch user
            // const getUser = await (await fetch(`https://api.spotify.com/v1/users/${inputText}`, searchParams)).json()
        // }

        // generating code verifier
        
        function generateRandomString(length) {
            let text = '';
            let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          
            for (let i = 0; i < length; i++) {
              text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        }

        // hashing code verifier using SHA256 algorithm
        async function generateCodeChallenge(codeVerifier) {
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

        const clientId = clientID;
        const redirectUri = 'http://localhost:8080';
        let codeVerifier = generateRandomString(128);

        generateCodeChallenge(codeVerifier).then(codeChallenge => {
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
            code_challenge: codeChallenge
        });

        window.location = 'https://accounts.spotify.com/authorize?' + args;
        });

    }

    const hanldeChange = ({target}) => {
        setInputText(target.value)
    }

    return (
        <>
            <div className='UserPlaylist'>
                <h2>User Playlist test</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='type your Spotify ID'
                        value={inputText}
                        onChange={hanldeChange}
                    ></input>
                    <input
                        type='submit'
                        value='Check Playlist'
                    ></input>
                </form>

            </div>
        </>
    )
}