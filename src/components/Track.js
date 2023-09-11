import React from 'react';
import './Track.scss'

export function Track(props) {
    const {
        addedTrackIDs, addedTracks, setAddedTracks,
        trackID, trackTitle, artistName, trackUrl, imgSrc
    } = props;

    const addTrackToPlaylist = () => {

        const trackToAdd = {
            trackTitle: trackTitle,
            artistName: artistName,
            trackID: trackID,
        }

        if (addedTracks.length > 0 && addedTrackIDs.includes(trackToAdd.trackID)) {
            return // should tell that the track is already in the playlist
        } else {
            setAddedTracks(prevTracks => [trackToAdd, ...prevTracks])
        }
    }

    return (
        <>
            <div className='Track' onClick={addTrackToPlaylist}>
                <div className='track-img-div'>
                    <img src={imgSrc} alt="" />
                </div>
                <div className='track-content'>
                    <h3>{trackTitle}</h3>
                    <a href={trackUrl} target='_blank' rel='noreferrer'>
                        <p>{artistName}</p>
                    </a>
                </div>
            </div>
        </>
    )
}