import React from 'react';
import './CompactTrack.scss';

export function CompactTrack(props) {

    const compactStyle = {
        backgroundColor: 'transparent',
    }

    const removeTrack = () => {
        props.setAddedTracks(prevTracks => {
            if (props.addedTrackIDs.includes(props.trackID)) {
                return prevTracks.filter(track => track.trackID !== props.trackID)
            }
        })
    }

    return (
        <>
            <div className='CompactTrack' onClick={removeTrack}>
                <div className='compact-track-inner-div'>
                    <div className='compact-content'>
                        <h3>{props.trackTitle}</h3>
                        <p>{props.artistName}</p>
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