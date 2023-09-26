import React from "react"
import { Artist } from '../components/Artist';

import './TopContainer.scss';

export const TopArtists = (props) => {
    const { topArtists } = props;
    return (
        <>
            <div className="top-container">
                <h2>Top Artists</h2>
                <div className="container">
                    {topArtists.map(artist => {
                        return <Artist 
                            artistName={artist.name}
                            artistImg={artist.images[0].url}
                            artistGenre={artist.genres[0]}
                        />
                    })}
                </div>
                <p>Scroll right to see more</p>
            </div>
        </>
    )
}