import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.scss'

// Components
import { SearchBar } from '../../components/SearchBar';
import { MixinJam } from '../../components/MixinJam';

export function HomePage(props) {
    const { 
        url, searchParams,
        accessToken
    } = props;

    const navigate = useNavigate() // not sure if it works
    if (accessToken === '') { // we'll be back here in a minute
        navigate('/mixin-jam')
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
                    url={url} searchParams={searchParams} setSearchResultLayout={setSearchResultLayout}

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