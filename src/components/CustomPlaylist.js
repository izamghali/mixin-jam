import React, { useState } from 'react';
import './CustomPlaylist.scss';

import { CompactTrack } from './CompactTrack';

export function CustomPlaylist(props) {

    const {
        addedTracks, setAddedTracks, 
        addedTrackIDs, user_id, searchParams
    } = props;

    const [ playlistTitle, setPlaylistTitle ] = useState('')

    const handleChange = ({target}) => {
        setPlaylistTitle(target.value)
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
                name: "Mixin Jam Playlist Test",
                description: "playlist description bla bla bla bla...",
                collaborative: false,
                public: true
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

    let clicked = 0;
    const handlePrivateCheckBox = (event) => {
        clicked += 1;

        // the value of checkbox needs to be boolean
        if (clicked % 2 === 0) {
            console.log("off") 
        } else {
            console.log("on")
        }
    }

    return (
        <>
            <div className='Custom-Playlist'>
                <form className='playlist-title-form'>
                    <input 
                        type='text'
                        placeholder='Your New Playlist'
                        value={playlistTitle}
                        onChange={handleChange}
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
                    <textarea></textarea>
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
                <button
                    onClick={getUserPlayslist}
                >
                    Check User Playlist
                </button>
            </div>
        </>
    )
}