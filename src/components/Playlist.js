import React, { useState } from 'react';
import './Playlist.scss';

export function Playlist(props) {

    const [ playlistTitle, setPlaylistTitle ] = useState('')

    const handleChange = ({target}) => {
        setPlaylistTitle(target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("your playlist is saved!")
    }

    return (
        <>
            <div className='Playlist'>
                <form className='playlist-title-form'>
                    <input 
                        className='playlist-title'
                        type='text'
                        placeholder='Your New Playlist'
                        value={playlistTitle}
                        onChange={handleChange}
                        >
                    </input>
                </form>
                <div className='playlist-added-tracks'>
                    { props.children }
                </div>
                <form className='playlist-desc-form'>
                    <label for="">Tell us what the playlist is about</label>
                    <textarea></textarea>
                </form>
                <button className='playlist-submit'
                        type='submit'
                        value=''
                        onClick={handleSubmit}
                        >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                    </svg>Save to Spotify
                </button>
            </div>
        </>
    )
}