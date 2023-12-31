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

    let trackTitleTest = 'Track Title';
    let artistNameTest = 'Artist Name';

    return (
        <>
            <div className='Track' onClick={addTrackToPlaylist}>
                <div className='track-left'>
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
                <div className='track-plus-btn'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                    </svg>
                </div>
            </div>
        </>
            // Mock Data
            // <div className='Track' onClick={addTrackToPlaylist}>
            //     <div className='track-left'>
            //         <div className='track-img-div'>
            //             {/* <img src={imgSrc} alt="" /> */}
            //             <img src='https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' alt="" />
            //         </div>
            //         <div className='track-content'>
            //             {/* <h3>{trackTitle}</h3> */}
            //             <h3>{trackTitleTest}</h3>
            //             <a href={trackUrl} target='_blank' rel='noreferrer'>
            //                 <p>{artistNameTest}</p>
            //             </a>
            //         </div>
            //     </div>
            //     <div className='track-plus-btn'>
            //         <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
            //             <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
            //         </svg>
            //     </div>
            // </div>
    )
}