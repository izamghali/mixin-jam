import React from 'react';
import './LoginSpotifyButton.scss'
// import { useNavigate, Link, NavLink } from 'react-router-dom';

export function LoginSpotifyButton(props) {

    const { clientId, setAccessToken, accessToken } = props;

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

        var client_id = clientId;
        var redirect_uri = 'http://localhost:3000/home';

        var state = generateRandomString(16);

        localStorage.setItem('stateKey', state);
        var scope = 'user-read-private user-read-email';

        var url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(client_id);
        url += '&scope=' + encodeURIComponent(scope);
        url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
        url += '&state=' + encodeURIComponent(state);
        url += '&show_dialog=true';

        try {
            window.location = url;
        } catch(error) {
            console.log(error)
        }

        // const urlParams = new URLSearchParams(window.location.search);
        // let accessToken = urlParams.get('access_token');
        setAccessToken(accessToken);
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
        </>
    )
}