import React, { useState } from 'react';
import './Playlist.scss';

export function Playlist(props) {

    let dummyText = 'New Playlist'

    const [ playlistTitle, setPlaylistTitle ] = useState('')

    const handleChange = ({target}) => {
        setPlaylistTitle(target.value)
    }

    return (
        <>
            <div className='Playlist'>
                <form>
                    <input 
                        className='playlist-title'
                        type='text'
                        placeholder='Your New Playlist'
                        value={playlistTitle}
                        onChange={handleChange}
                        >
                    </input>
                </form>
                <div>
                    { props.children }
                </div>
                <button 
                        className='playlist-submit'
                        type='submit'
                        value=''
                        >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                    </svg>Save to Spotify
                </button>
            </div>
        </>
    )
}