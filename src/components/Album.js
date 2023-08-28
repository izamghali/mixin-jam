import React from 'react';
import './Album.scss'

export function Album(props) {

    const { url, searchParams, albums, albumNames, albumImgSrc, albumID } = props;

    const handleClick = async (event) => {
        event.preventDefault();

        // GET request album tracks using album ID
        const getAlbumTracks = await (await fetch(`${url}/albums/${albumID}/tracks`, searchParams)).json()
        console.log(getAlbumTracks)
    
    }

    return (
        <>
        <div className='ShadowAlbum'>
            <div className='Album' onClick={handleClick}>
                <div className='album-img-div'>
                    <img src={albumImgSrc} alt="" />
                </div>
                <h3 className='album-title'>{albumNames}</h3>
            </div>
        </div>
        </>
    )
}