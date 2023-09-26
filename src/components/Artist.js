import React from 'react';
import './Artist.scss'

export const Artist = (props) => {
    const { artistName, artistImg, artistGenre } = props;
    return (
        <>
            <div className='Artist'>
                <div className='artist-profile'>
                    <div className='artist-img-container'>
                        <img src={artistImg} />
                    </div>
                    <h3>{artistName}</h3>
                </div>
                <span>{artistGenre}</span>
            </div>

            {/* <div className='Artist'>
                <div className='artist-profile'>
                    <div className='artist-img-container'>
                        <img src="https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80" />
                    </div>
                    <h3>Artist Name</h3>
                </div>
                <span>Artist Genre</span>
            </div>
            <div className='Artist'>
                <div className='artist-profile'>
                    <div className='artist-img-container'>
                        <img src="https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80" />
                    </div>
                    <h3>Artist Name</h3>
                </div>
                <span>Artist Genre</span>
            </div>
            <div className='Artist'>
                <div className='artist-profile'>
                    <div className='artist-img-container'>
                        <img src="https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80" />
                    </div>
                    <h3>Artist Name</h3>
                </div>
                <span>Artist Genre</span>
            </div> */}
            
        </>
    )
}