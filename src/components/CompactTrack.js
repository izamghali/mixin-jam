import React from 'react';
import './CompactTrack.scss';

export function CompactTrack(props) {
    const { 
        addedTrackIDs,
        setAddedTracks,
        trackTitle, 
        artistName,
        trackID
    } = props;

    const removeTrack = () => {
        setAddedTracks(prevTracks => {
            if (addedTrackIDs.includes(trackID)) {
                const trackToRemove = prevTracks.filter(track => track.trackID !== trackID)
                return trackToRemove;
            }
        })
    }

    return (
        <>
            <div className='CompactTrack' onClick={removeTrack}>
                <div className='compact-track-inner-div'>
                    <div className='compact-content'>
                        <h3>{trackTitle}</h3>
                        <p>{artistName}</p>
                    </div>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}