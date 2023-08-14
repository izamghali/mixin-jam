import React, { useState } from 'react';
import './Playlist.scss';

export function Playlist() {

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
                        type='text'
                        value={playlistTitle}
                        onChange={handleChange}
                        >
                    </input>
                </form>
                <h3>This is playlist</h3>
            </div>
        </>
    )
}