import React from 'react';
import './CompactTrack.scss';

export function CompactTrack(props) {

    const testClick = {
        backgroundColor: 'transparent',
    }

    const removeTrack = (event) => {
        
        const clickedTrack = {
            trackTitle: props.trackTitle,
            artistName: props.artistName,
            trackID: props.trackID
        }

        
        // return props.setAddedTracks(tracks => tracks.filter(track => track.trackID !== trackID))

        // const addedTracks = props.addedTracks;

        // const removeThought = (trackID) => {
        //     return setThoughts(thoughts => thoughts.filter(thought => thought.id !== thoughtIdToRemove));
        // }

        // props.setAddedTracks((prevTracks) => {
        //     if (prevTracks.includes(clickedTrack)) {
        //         return prevTracks.filter(t => t !== clickedTrack)
        //     } else {
        //         return [clickedTrack, ...prevTracks]
        //     }
        // })

        // console.log('=========================')
        // console.log('clicked track')
        // console.log(clickedTrack.trackTitle)
        // console.log(clickedTrack.trackID)
        // console.log('')
        
        // console.log('tracks on playlist')
        // console.log(addedTracks[0].trackTitle)
        // console.log(addedTracks[0].trackID)
        // console.log(`total added tracks: ${addedTracks.length}`)

    }

    return (
        <>
            <div style={testClick} className='CompactTrack' onClick={removeTrack}>
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
        </>
    )
}