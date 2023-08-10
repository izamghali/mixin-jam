import React from 'react';
import './CardPresentational.scss'

export function CardPresentational() {

    const dummySong = 'Can you hear the music';
    const dummyArtist = 'Ludwig Garonsson';

    return (
        <>
            <div className='Card'>
                <div className='card-img-div'>
                    <img src="https://images.unsplash.com/photo-1689019587412-00999d1d08bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80" alt="a person doing some skating trick" />
                </div>
                <div className='card-content'>
                    <h3>{dummySong}</h3>
                    <p>{dummyArtist}</p>
                </div>
            </div>
        </>
    )
}