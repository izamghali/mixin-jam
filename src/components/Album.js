import React from 'react';
import './Album.scss'

export function Album(props) {

    const { url, searchParams, albums, albumNames, albumImgSrc, albumID } = props;

    const handleClick = async ({target}) => {

        // GET request album tracks using album ID
        const getAlbumTracks = await (await fetch(url + '/albums/' + albumID + 'tracks', searchParams)).json()
        console.log(getAlbumTracks)
    
    }

    return (
        <>
        <div className='Album' onClick={handleClick}>
            <div className='album-img-div'>
                <img src={albumImgSrc} alt="" />
            </div>
            <h3>{albumNames}</h3>
            {/* <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                </svg>
                View Album
            </button> */}
        </div>
        </>
    )
}