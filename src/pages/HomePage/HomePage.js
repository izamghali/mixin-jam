import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.scss'

// Components
import { SearchBar } from '../../components/SearchBar';
import { MixinJam } from '../../components/MixinJam';

export function HomePage(props) {
    const { 
        url, searchParams, setAccessToken
    } = props;

    const [ albums, setAlbums ] = useState([])
    // const [ artistTracks, setArtistTracks ] = useState([])
    const [ tracks, setTracks ] = useState([])
    const [ addedTracks, setAddedTracks ] = useState([]);


    // addedTrackIDs are IDs used to identify or filter tracks to be added or to be removed.
    const addedTrackIDs = addedTracks.map(track => { return track.trackID });

    // Style
    const [ searchResultLayout, setSearchResultLayout ] = useState({});

    // useEffect(()=> {
    //     if (accessToken !== '' || accessToken !== null) {
    //         console.log(`The access token is: ${accessToken}`)
    //     } else {
    //         navigate('/mixin-jam')
    //     }
    // })

    // const saveAccessToken = () => {
    //     const urlParams = new URLSearchParams(window.location.search);
    //     let accessToken = urlParams.get('access_token');
    //     setAccessToken(accessToken);
    // }

    // const checkAccessToken = () => {
    //     console.log(accessToken);
    // }
    
    useEffect(() => {
        let accessToken = handleRedirect();
        console.log(accessToken);
    })

    const handleRedirect = () => {
        let accessToken = getAccessToken();
        return accessToken;
    }

    const getAccessToken = () => {
        let accessToken = null;
        const queryString = window.location.search;
        if (queryString.length > 0) {
            const urlParams = new URLSearchParams(queryString);
            accessToken = urlParams.get('access_token');
        }
        return accessToken;
    }
    
    return (
        <>
            <div className='Body'> 

                <SearchBar 
                    url={url} searchParams={searchParams}
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