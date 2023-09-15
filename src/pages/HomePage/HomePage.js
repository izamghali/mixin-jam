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
                let access_token = window.location.hash.split('#access_token=')[1].split('&')[0]
                localStorage.setItem('access_token', access_token);
            } 

            
            // if (access_token === null || access_token === undefined) {
            //     requestAccessToken()
            // }
            

            // requestRefreshToken();
        }
    }, )

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
        try {
            const endpoint = await fetch('https://api.spotify.com/v1/me');
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
                    setSearchResultLayout={setSearchResultLayout} CLIENT_ID={CLIENT_ID} CLIENT_SECRET={CLIENT_SECRET}

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
                        onClick={printAccessToken}
                        value='print access token'
                        type='button'
                    />
                </form>

            </div>
        </>
    )
}