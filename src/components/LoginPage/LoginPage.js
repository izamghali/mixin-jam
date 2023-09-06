import React, { useState } from 'react';
import { LoginSpotifyButton } from './LoginSpotifyButton';
import { DarkLightModeButton } from '../DarkLightModeButton';
import './LoginPage.scss'

export function LoginPage(props) {
    const { clientId } = props;

    return (
        <>
            <div className='LoginPage'>
                <div className='login-img-div'>
                    <div className='login-slogan'>
                        <h2>Mix your jam and save it to your Spotify playlists!</h2>
                    </div>
                    <img src='https://images.unsplash.com/photo-1615554851544-e6249b92a492?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80' />
                </div>
                <div className='login-content'>
                    <div className='login-body'>
                        <div className='login-content-header'>
                            <h1>Mixin' Jam</h1>
                            <DarkLightModeButton className="login-dark-light-button"/>
                        </div>
                        <p>Mixin' Jam is a React web app where you can search songs, artists, and albums, from Spotify.</p>
                    </div>
                    <div className='login-spotify-button'>
                        <LoginSpotifyButton clientId={clientId} />
                    </div>
                </div>
            </div>
        </>
    ) 
}