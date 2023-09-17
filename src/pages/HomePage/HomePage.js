import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.scss'

// Components
import { SearchBar } from '../../components/SearchBar';
import { MixinJam } from '../../components/MixinJam';

export function HomePage(props) {
    const { 
        CLIENT_ID, CLIENT_SECRET, 
        generateRandomString, 
    } = props;

    const url = 'https://api.spotify.com/v1';
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
            // search object is not undefined & access token in the localStorage is not exist
            if (window.location.search.length > 0 && localStorage.getItem('refresh_token') === null) {
                // get access token using PKCE method
                // get code from the url
                alert("we're trying to get access token & refresh token")
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
                        alert("we got the access token")
                        
                        localStorage.setItem('refresh_token', data.refresh_token);
                        alert("and we got the refresh token!!!")
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        }
        if (localStorage.getItem('access_token') !== null) {
            console.log("we're clearing the url bar")
            window.history.pushState("", "", redirect_uri) // clear url bar
        } 
    }, [])

    const getTopArtist = async () => {
        try {
            let response = await fetch('https://api.spotify.com/v1/me/top/artists', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('access_token')
                }
            });
            let data = await response.json();
            console.log(data)
        } catch(error) {
            console.log(error)
        }
    }
    getTopArtist();

    const searchParams = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    }

    // const getProfile = async () => {
      
    //     try {
    //         const response = await fetch('https://api.spotify.com/v1/me', {
    //           headers: {
    //             Authorization: 'Bearer ' + accessToken
    //           }
    //         });
          
    //         const data = await response.json();
    //         console.log(data)
    //     } catch(error) {
    //         console.log(error)
    //     }
    // }

    // const getTopTracks = async () => {
        
    //     try {
    //         let response = await fetch('https://api.spotify.com/v1/me/top/tracks', {
    //             headers: {
    //                 Authorization: 'Bearer ' + accessToken
    //             }
    //         });
    //         let data = await response.json();
    //         console.log(data)
    //     } catch(error) {
    //         console.log(error)
    //     }
    
    // }

    // const getRecentlyPlayed = async () => {
    //     try {
    //         let response = await fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=3`, {
    //             headers: {
    //                 Authorization: 'Bearer ' + accessToken
    //             }
    //         })
    //         let data = await response.json();
    //         if (!data) {
    //             console.log(`data might not be present`)
    //         } else {
    //             console.log(data)
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // addedTrackIDs are IDs used to identify or filter tracks to be added or to be removed.
    const addedTrackIDs = addedTracks.map(track => { return track.trackID });

    // Style
    const [ searchResultLayout, setSearchResultLayout ] = useState({});
    
    return (
        <>
            <div className='Body' > 

                <SearchBar 
                    url={url} generateRandomString={generateRandomString}
                    setSearchResultLayout={setSearchResultLayout} 
                    CLIENT_ID={CLIENT_ID} CLIENT_SECRET={CLIENT_SECRET} 
                    redirect_uri={redirect_uri} refreshAccessToken={refreshAccessToken}

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

                {/* <div className='debug-API-buttons'>
                    <form>
                        <input 
                            onClick={getProfile}
                            value='get profile'
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

                    <form>
                        <input 
                            onClick={getTopArtist}
                            value='get top artists'
                            type='button'
                        />
                    </form>

                    <form>
                        <input 
                            onClick={getTopTracks}
                            value='get top tracks'
                            type='button'
                        />
                    </form>

                    <form>
                        <input 
                            onClick={getRecentlyPlayed}
                            value='get recently played'
                            type='button'
                        />
                    </form>

                </div> */}

            </div>
        </>
    )
}