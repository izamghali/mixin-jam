import React, { useState } from 'react';
import './HomePage.scss'

// Components
import { SearchBar } from '../../components/SearchBar';
import { MixinJam } from '../../components/MixinJam';

export function HomePage(props) {

    const [ albums, setAlbums ] = useState([])
    const [ artistTracks, setArtistTracks ] = useState([])
    const [ tracks, setTracks ] = useState([])
    const [ addedTracks, setAddedTracks ] = useState([]);

    const { 
        accessToken, setAccessToken,
        url, searchParams,
    } = props;

    // addedTrackIDs are IDs used to identify or filter tracks to be added or to be removed.
    const addedTrackIDs = addedTracks.map(track => { return track.trackID });

    // Style
    const [ searchResultLayout, setSearchResultLayout ] = useState({});
    
    return (
        <>
            <div className='Body'> 

                <SearchBar 
                    url={url} searchParams={searchParams}

                    setTracks={setTracks}
                    setAlbums={setAlbums}
                    setArtistTracks={setArtistTracks}

                    setSearchResultLayout={setSearchResultLayout}
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