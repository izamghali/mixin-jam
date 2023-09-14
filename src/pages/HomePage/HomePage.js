import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.scss'

// Components
import { SearchBar } from '../../components/SearchBar';
import { MixinJam } from '../../components/MixinJam';

export function HomePage(props) {
    const { 
        url, setAccessToken, accessToken
    } = props;

    const navigate = useNavigate();

    useEffect(()=> {
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        var error = urlParams.get("error")
        if (error === 'access_denied') {
            navigate('/mixin-jam')
        } else {
            var accessToken = window.location.hash.split('&')[0].split('#access_token=')[1]
            // console.log(window.location)
            // console.log(window.location.hash.split('&'))
            setAccessToken(JSON.stringify(accessToken))
        }
        
    })

    const searchParams = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    }

    const [ albums, setAlbums ] = useState([])
    // const [ artistTracks, setArtistTracks ] = useState([])
    const [ tracks, setTracks ] = useState([])
    const [ addedTracks, setAddedTracks ] = useState([]);


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

            </div>
        </>
    )
}