import React from "react"
import { Playlist } from './Playlist';

import './TopContainer.scss';

export const TopPlaylists = () => {

    return (
        <>
            <div className="top-container">
                <h2>Top Playlist</h2>
                <div className="container">
                    <Playlist />
                </div>
                <p>Scroll right to see more</p>
            </div>
        </>
    )
}