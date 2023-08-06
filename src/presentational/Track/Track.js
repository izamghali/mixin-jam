import React from 'react';
import './Track.scss'

const dummySong = 'Can you hear the music';
const dummyArtist = 'Ludwig Garonsson';

export function Track() {
    return (
        <>
            <div>
                <h3>{dummySong}</h3>
                <span>{dummyArtist}</span>
            </div>
        </>
    )
}