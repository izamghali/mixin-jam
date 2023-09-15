import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.scss'

// Components
import { SearchBar } from '../../components/SearchBar';
import { MixinJam } from '../../components/MixinJam';

export function HomePage(props) {
    const { 
        CLIENT_ID, CLIENT_SECRET,
        url, generateRandomString
    } = props;

    var redirect_uri = 'http://localhost:3000/home';

    const [ albums, setAlbums ] = useState([])
    // const [ artistTracks, setArtistTracks ] = useState([])
    const [ tracks, setTracks ] = useState([])
    const [ addedTracks, setAddedTracks ] = useState([]);

    const navigate = useNavigate();

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
            
            if (queryString.length < 1) {
                // get access token using implicit grant
                // let access_token = window.location.hash.split('#access_token=')[1].split('&')[0]
                // localStorage.setItem('access_token', access_token);
            } 

            if (window.location.search.length > 0 && localStorage.getItem('refresh_token') === null) {
                // get access token using PKCE method
                // get code
                alert("we're trying to get access token & refresh token")
                let code = urlParams.get('code');
    
                let codeVerifier = localStorage.getItem('code_verifier');
    
                let body = new URLSearchParams({
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: redirect_uri,
                    client_id: CLIENT_ID,
                    code_verifier: codeVerifier
                });
    
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
                        alert("we got the access token")
                        
                        localStorage.setItem('refresh_token', data.refresh_token);
                        alert("and we got the refresh token!!!")
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        }
    }, [])

    const searchParams = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer ' + accessToken
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

    const handleMe = async (event) => {
        event.preventDefault()

        let accessToken = localStorage.getItem('access_token');

        const body = new URLSearchParams({
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })

        try {
            const endpoint = await fetch('https://api.spotify.com/v1/me', body);
            console.log(endpoint)
        } catch(error) {
            console.log(error)
        }
    }

    const printAccessToken = async (event) => {
        event.preventDefault()
        console.log(localStorage.getItem('access_token'))
    }


    // addedTrackIDs are IDs used to identify or filter tracks to be added or to be removed.
    const addedTrackIDs = addedTracks.map(track => { return track.trackID });

    // Style
    const [ searchResultLayout, setSearchResultLayout ] = useState({});
    
    return (
        <>
            <div className='Body' > 

                <SearchBar 
                    url={url} searchParams={searchParams} generateRandomString={generateRandomString}
                    setSearchResultLayout={setSearchResultLayout} CLIENT_ID={CLIENT_ID} CLIENT_SECRET={CLIENT_SECRET} redirect_uri={redirect_uri}

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
                <form>
                    <input 
                        onClick={handleMe}
                        value='me endpoint'
                        type='button'
                    />
                </form>

                <form>
                    <input 
                        onClick={refreshAccessToken}
                        value='refresh access token'
                        type='button'
                    />
                </form>

            </div>
        </>
    )
}