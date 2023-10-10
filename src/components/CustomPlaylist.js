import React, { useState } from 'react';
import './CustomPlaylist.scss';

import { CompactTrack } from './CompactTrack';

export function CustomPlaylist(props) {

    const {
        addedTracks, setAddedTracks, 
        addedTrackIDs, user_id, searchParams
    } = props;

    const [ playlistTitle, setPlaylistTitle ] = useState('')
    const [ playlistDesc, setPlaylistDesc ] = useState('')
    const [ playlistType, setPlaylistType ] = useState(true)

    let clicked = 0;
    const handlePrivateCheckBox = () => {
        clicked += 1;

        // the value of checkbox needs to be boolean
        if (clicked % 2 === 0) {
            setPlaylistType(true) 
        } else {
            setPlaylistType(false)
        }
    }

    const exportToSpotify = async () => {

        const searchParams = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            },
            method: 'POST',
        }
        
        let newPlaylistID = "";
        // create new playlist
        try {
            searchParams.body = JSON.stringify({
                name: playlistTitle,
                description: playlistDesc,
                collaborative: false,
                public: playlistType
            })
            const response = await (await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, searchParams)).json();
            newPlaylistID = response.id;
        } catch(error) {
            console.log(error)
        }

        // add tracks to the playlist
        try {
            searchParams.body = JSON.stringify ({
                uris: addedTracks.map(track => { return `spotify:track:${track.trackID}` }),
                position: 0,
            })
            const response = await (await fetch(`https://api.spotify.com/v1/playlists/${newPlaylistID}/tracks`, searchParams)).json();
            console.log(response)
        } catch(error) {
            console.log(error)
        }
    }

    const getUserPlayslist = async () => {
        try {
            const response = await (await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, searchParams)).json();
            console.log(response)
        } catch(error) {
            console.log(error)
        }
        console.log(addedTracks)
    }

    return (
        <>
            <div className='Custom-Playlist'>
                <form className='playlist-title-form'>
                    <input 
                        type='text'
                        placeholder='Your New Playlist'
                        value={playlistTitle}
                        onChange={({target}) => {setPlaylistTitle(target.value)}}
                        >
                    </input>
                </form>
                <div className='playlist-added-tracks'>
                    {addedTracks.map(track => {
                        return <CompactTrack
                                    addedTrackIDs={addedTrackIDs}
                                    setAddedTracks={setAddedTracks}
                                    trackTitle={track.trackTitle}
                                    artistName={track.artistName} 
                                    trackID={track.trackID}
                                />
                    })}
                </div>
                <form className='playlist-desc-form'>
                    <label for="">Tell us what the playlist is about</label>
                    <textarea
                        onChange={({target}) => {setPlaylistDesc(target.value)}}
                    ></textarea>
                    <div className='playlist-type'>
                        <input type='checkbox' id='playlistType' onClick={handlePrivateCheckBox} />
                        <label for="playlistType">Private Playlist</label>
                    </div>
                </form>
                <button className='playlist-submit'
                        type='submit'
                        value=''
                        onClick={exportToSpotify}
                        >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                    </svg>Save to Spotify
                </button>
                {/* <button
                    onClick={getUserPlayslist}
                >
                    Check User Playlist
                </button> */}
            </div>
        </>
    )
}