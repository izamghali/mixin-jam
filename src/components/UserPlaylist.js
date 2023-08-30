import React, { useState } from 'react';

export function UserPlaylist() {

    const [ inputText, setInputText ] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (inputText.length > 0) {
            alert(inputText)

            // POST request to fetch 

        }

    }

    const hanldeChange = ({target}) => {
        setInputText(target.value)
    }

    return (
        <>
            <div>
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