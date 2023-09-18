import React from "react"

import { Artist } from './Artist';

import './TopArtists.scss';

export const TopArtists = () => {

    return (
        <>
            <div className="top-artist-container">
                <h2>Top Artists</h2>
                <div className="artists-container">
                    <Artist />
                </div>
                <p>Scroll right to see more</p>
            </div>
        </>
    )
}