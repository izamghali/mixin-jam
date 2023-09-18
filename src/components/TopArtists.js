import React from "react"

import { Artist } from './Artist';

import './TopArtists.scss';

export const TopArtists = () => {

    return (
        <>
            <div>
                <h2>Top Artists</h2>
                <div className="top-artists-container">
                    <Artist />

                </div>
            </div>
        </>
    )
}