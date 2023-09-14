import React from 'react';

// Components
import { Playlist } from './Playlist';
import { SearchResult } from './SearchResult';

export function MixinJam(props) {
    const {
        url, searchParams,

        searchResultLayout, 
        albums, tracks,
        addedTracks, setAddedTracks,
        addedTrackIDs
    } = props;


    return (
        <>
            <div style={searchResultLayout} className="MixinJam">

                <SearchResult  
                    url={url} searchParams={searchParams}

                    albums={albums} tracks={tracks}
                    addedTracks={addedTracks} setAddedTracks={setAddedTracks}
                    addedTrackIDs={addedTrackIDs}
                />

                <Playlist 
                    addedTracks={addedTracks} // addedTracks are a list of tracks added to playlist
                    setAddedTracks={setAddedTracks}
                    addedTrackIDs={addedTrackIDs}
                />

            </div>
        </>
    )
}