import React from 'react';
import './Album.scss'

export function Album(props) {

    const {
        url, searchParams, 
        albumNames, albumID, albumImgSrc
    } = props;

    const handleClick = async (event) => {
        event.preventDefault();

        // GET request album tracks using album ID
        const getAlbumTracks = await (await fetch(`${url}/albums/${albumID}/tracks`, searchParams)).json()
    
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