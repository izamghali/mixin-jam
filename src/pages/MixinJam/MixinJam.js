import React from 'react';

// Components
import { NavBar } from '../../components/NavBar';
import { CustomPlaylist } from '../../components/CustomPlaylist';
import { SearchResult } from '../../features/SearchResult';

export function MixinJam(props) {
    const {
        url, searchParams,

        searchResultLayout, setSearchResultLayout,

        generateRandomString, CLIENT_ID, CLIENT_SECRET,
        redirect_uri, refreshAccessToken, getProfile,
        access_token,

        albums, tracks,
        setTracks, setAlbums,
        addedTracks, setAddedTracks,
        addedTrackIDs
    } = props;


    return (
        <>
            <div style={searchResultLayout} className="Body">

                <h3>This is Mixin Jam Result</h3>

                {/* <SearchResult
                    url={url} searchParams={searchParams}

                    albums={albums} tracks={tracks}
                    addedTracks={addedTracks} setAddedTracks={setAddedTracks}
                    addedTrackIDs={addedTrackIDs}
                /> */}

                {/* <CustomPlaylist 
                    addedTracks={addedTracks} // addedTracks are a list of tracks added to playlist
                    setAddedTracks={setAddedTracks}
                    addedTrackIDs={addedTrackIDs}
                /> */}

            </div>
        </>
    )
}