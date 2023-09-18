import React from "react"
import { Artist } from './Artist';

import './TopContainer.scss';

export const TopArtists = () => {

    return (
        <>
            <div className="top-container">
                <h2>Top Artists</h2>
                <div className="container">
                    <Artist />
                </div>
                <p>Scroll right to see more</p>
            </div>
        </>
    )
}