import React, { useState } from 'react';
import './MixinJam.scss'

// Components
import { CustomPlaylist } from '../../components/CustomPlaylist';
import { SearchResult } from '../../features/SearchResult';

export function MixinJam(props) {
    const {
        url, searchParams,

        generateRandomString, CLIENT_ID, CLIENT_SECRET,
        redirect_uri, refreshAccessToken, getProfile,
        access_token,

        albums, tracks,
        setTracks, setAlbums,
        addedTracks, setAddedTracks,
        addedTrackIDs
    } = props;

    // Style
    const [ searchResultLayout, setSearchResultLayout ] = useState({});


    return (
        <>
            <div style={searchResultLayout} className="MixinJam">

                <SearchResult
                    url={url} searchParams={searchParams}

                    albums={albums} tracks={tracks}
                    addedTracks={addedTracks} setAddedTracks={setAddedTracks}
                    addedTrackIDs={addedTrackIDs}
                />

                <CustomPlaylist 
                    addedTracks={addedTracks} // addedTracks are a list of tracks added to playlist
                    setAddedTracks={setAddedTracks}
                    addedTrackIDs={addedTrackIDs}
                />

            </div>
        </>
    )
}