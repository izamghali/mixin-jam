import React from 'react';
import './TrackPresentational.scss'

export function TrackPresentational() {

    const dummySong = 'Can you hear the music';
    const dummyArtist = 'Ludwig Garonsson';

    return (
        <>
            <div className='Track'>
                <div className='track-img-div'>
                    <img src="https://images.unsplash.com/photo-1689019587412-00999d1d08bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80" alt="a person doing some skating trick" />
                </div>
                <div className='track-content'>
                    <h3>{dummySong}</h3>
                    <p>{dummyArtist}</p>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                        </svg>
                        Add to Playlist
                    </button>
                </div>
            </div>
        </>
    )
}