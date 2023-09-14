import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.scss'

// Components
import { SearchBar } from '../../components/SearchBar';
import { MixinJam } from '../../components/MixinJam';

export function HomePage(props) {
    const { 
        CLIENT_ID, CLIENT_SECRET,
        url, setAccessToken, accessToken
    } = props;

    var redirect_uri = 'http://localhost:3000';

    const [ albums, setAlbums ] = useState([])
    // const [ artistTracks, setArtistTracks ] = useState([])
    const [ tracks, setTracks ] = useState([])
    const [ addedTracks, setAddedTracks ] = useState([]);

    const navigate = useNavigate();

    // var redirect_uri = 'http://localhost:3000/home';
    // const client_id = '89cc9f4988ea4c7985a164bf3392cd1d';
    // const client_secret = 'f1348b92b74240898b500661ba3339d5';
    // const TOKEN = 'https://accounts.spotify.com/token';

    const requestAccessToken = async () => {
        // REQUEST ACCESS TOKEN
        let body = new URLSearchParams({
            grant_type: 'authorization_code',
            code: localStorage.getItem('code'),
            redirect_uri: redirect_uri,
            client_id: localStorage.getItem('client_id'),
            code_verifier: localStorage.getItem('code_verifier'),
        })
        // body.append('Access-Control-Allow-Origin', redirect_uri);
        // body.append('cors', 'no-cors');

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
            localStorage.setItem('access_token', data.access_token);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const requestRefreshToken = async () => {

        let body = new URLSearchParams({
            grant_type: 'refresh_token',
            client_id: CLIENT_ID
        })

        // REQUEST REFRESH TOKEN
        fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        })

            // const refreshTokenResponse = () => {
            //     fetch('https://accounts.spotify.com/api/token', {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/x-www-form-urlencoded'
            //         },
            //         body: new URLSearchParams({
            //             grant_type: 'refresh_token',
            //             refresh_token: refreshToken,
            //             client_id: CLIENT_ID
            //         })
            //     })
                
            //     .then(response => {
            //         if (!response.ok) {
            //             throw new Error('HTTP status ' + response.status);
            //         }
            //         return response.json();
            //     })
            //     .then(data => {
            //         localStorage.setItem('refresh_token', data.refresh_token);
            //     })
            //     .catch(error => {
            //         console.error('Error:', error);
            //     });
            // } 
            
    }

    useEffect(() => {

        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        var error = urlParams.get("error")
        if (error === 'access_denied') {
            navigate('/mixin-jam')
            localStorage.clear()
            localStorage.setItem("client_id", CLIENT_ID)
            localStorage.setItem("client_secret", CLIENT_SECRET)
        } else {
            // var accessToken = window.location.hash.split('&')[0].split('#access_token=')[1]
            // // console.log(window.location)
            // // console.log(window.location.hash.split('&'))
            // setAccessToken(JSON.stringify(accessToken))
            // localStorage.setItem('access_token', JSON.stringify(accessToken))
            
            // parsing the code
            if (queryString.length > 0) {
                const urlParams = new URLSearchParams(queryString);
                let code = urlParams.get('code');
                localStorage.setItem('code', code);
            } 

            requestAccessToken();
            // requestRefreshToken();
        }
    })

    

    const searchParams = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    }

    const getProfile = async () => {
        let accessToken = localStorage.getItem('access_token');
      
        const response = await fetch('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: 'Bearer ' + accessToken
          }
        });
      
        const data = await response.json();
        console.log(data)
    }

    // const checkCode = () => {
    //     console.log(code);
    // }

    // const fetchAccessToken = () => {
    //     let body = "grant_type=authorization_code";

    //     body += `&code=${code}`;
    //     body += `&redirect_uri${encodeURI(redirect_uri)}`
    //     body += `&client_id=${encodeURIComponent(client_id)}`;
    //     body += `&client_secret=${encodeURIComponent(client_secret)}`;

    //     // call authorizationAPI
    //     let xhr = new XMLHttpRequest();
    //     xhr.open('POST', TOKEN, true);
    //     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    //     xhr.setRequestHeader('Authorization', `Basic ${btoa(`${client_id}:${client_secret}`)}`)
    //     xhr.send(body)
    //     xhr.onload = handleAuthorizationResponse;
    // }

    // const handleAuthorizationResponse = () => {
    //     if (this.status === 200) {
    //         var data = JSON.parse(this.responseText)
    //         console.log(data)
    //         var data = JSON.parse(this.responseText)
    //         if (data.access_token != undefined) {
    //             let access_token = data.access_token;
    //             localStorage.setItem('access_token', access_token);
    //         }
    //         if (data.refresh_token != undefined) {
    //             let refresh_token = data.refresh_token;
    //             localStorage.setItem('refresh_token', refresh_token);
    //         }
    //         onPageLoad();
    //     } else {
    //         console.log(this.responseText)
    //     }
    // }


    // addedTrackIDs are IDs used to identify or filter tracks to be added or to be removed.
    const addedTrackIDs = addedTracks.map(track => { return track.trackID });

    // Style
    const [ searchResultLayout, setSearchResultLayout ] = useState({});
    
    return (
        <>
            <div className='Body'> 

                <SearchBar 
                    url={url} searchParams={searchParams} accessToken={accessToken}
                    setSearchResultLayout={setSearchResultLayout} 

                    setTracks={setTracks}
                    setAlbums={setAlbums}
                />

                <MixinJam 
                    url={url} searchParams={searchParams}

                    searchResultLayout={searchResultLayout}
                    albums={albums} tracks={tracks}
                    addedTracks={addedTracks} setAddedTracks={setAddedTracks}
                    addedTrackIDs={addedTrackIDs}
                />

                <form>
                    <input 
                        onClick={getProfile}
                        value='get profile'
                        type='button'
                    />
                </form>

            </div>
        </>
    )
}