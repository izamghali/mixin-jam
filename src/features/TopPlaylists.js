import React from "react"
import { Playlist } from '../components/Playlist';

import './TopContainer.scss';

export const TopPlaylists = (props) => {

    const { featuredPlaylists, featuredPlaylistMessage } = props;

    return (
        <>
            <div className="top-container">
                <h2>{featuredPlaylistMessage}</h2>
                <div className="container">
                    <Playlist />
                    {/* {featuredPlaylists.map(featuredPlaylist => {
                            return <Playlist />
                                // playlistTitle={featuredPlaylist.name}
                                // playlistImg={featuredPlaylist.images[0].url}
                                // playlistDesc={featuredPlaylist.description}
                        })} */}
                </div>
                <p>Scroll right to see more</p>
            </div>
        </>
    )
}