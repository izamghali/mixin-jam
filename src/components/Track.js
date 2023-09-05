import React, { useState } from 'react';
import './Track.scss'

export function Track(props) {

    const addTrackToPlaylist = () => {

        const trackToAdd = {
            trackTitle: props.trackTitle,
            artistName: props.artistName,
            trackID: props.trackID,
        }

        if (props.addedTracks.length > 0 && props.addedTrackIDs.includes(trackToAdd.trackID)) {
            return // should tell that the track is already in the playlist
        } else {
            props.setAddedTracks(prevTracks => [trackToAdd, ...prevTracks])
        }
    }

    return (
        <>
        <div className='Track' onClick={addTrackToPlaylist}>
            <div className='track-img-div'>
                <img src={props.imgSrc} alt="a person doing some skating trick" />
            </div>
            <div className='track-content'>
                <h3>{props.trackTitle}</h3>
                <a href={props.trackUrl} target='_blank'>
                    <p>{props.artistName}</p>
                </a>
            </div>
        </div>
        </>
    )
}