import React from "react"
import { Playlist } from '../components/Playlist';

import './TopContainer.scss';

export const TopPlaylists = () => {

    return (
        <>
            <div className="top-container">
                <h2>Featured Playlists</h2>
                <div className="container">
                    <Playlist />
                </div>
                <p>Scroll right to see more</p>
            </div>
        </>
    )
}