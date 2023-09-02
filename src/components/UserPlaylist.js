import React, { useState } from 'react';
import './UserPlaylist.scss'

export function UserPlaylist(props) {

    const { searchParams } = props;

    const [ inputText, setInputText ] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (inputText.length > 0) {

            // GET request to fetch user's playlists
            const getUserPlaylist = await (await fetch(`https://api.spotify.com/v1/users/${inputText}/playlists`, searchParams)).json()
            console.log(getUserPlaylist)
            
            // GET request to fetch user
            const getUser = await (await fetch(`https://api.spotify.com/v1/users/${inputText}`, searchParams)).json()
            console.log(getUser)
        }

    }

    const hanldeChange = ({target}) => {
        setInputText(target.value)
    }

    return (
        <>
            <div className='UserPlaylist'>
                <h2>User Playlist test</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='type your Spotify ID'
                        value={inputText}
                        onChange={hanldeChange}
                    ></input>
                    <input
                        type='submit'
                        value='Check Playlist'
                    ></input>
                </form>

            </div>
        </>
    )
}