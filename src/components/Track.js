import React from 'react';
import './Track.scss'

export function Track(props) {

    const handleClick = () => {
        const clickedTrack = {
            trackTitle: props.trackName,
            artistName: props.artistName,
        }
        props.setAddedTracks(prevTracks => [clickedTrack, ...prevTracks])
        console.log(props.addedTracks)
    }

    return (
        <>
        <div className='Track'>
            <div className='track-img-div'>
                <img src={props.imgSrc} alt="a person doing some skating trick" />
            </div>
            <div className='track-content'>
                <h3>{props.trackName}</h3>
                <a href={props.trackUrl}>
                    <p>{props.artistName}</p>
                </a>
                <button 
                    onClick={handleClick}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                    </svg>
                    Add to Playlist
                </button>
            </div>
        </div>
        </>
    )
}