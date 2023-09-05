import React, { useState } from 'react';
import { LoginSpotifyButton } from './LoginSpotifyButton';
import './LoginPage.scss'

export function LoginPage() {

    return (
        <>
            <div className='LoginPage'>
                <div className='login-img-div'>
                    <img />
                </div>
                <div className='login-content'>

                    <LoginSpotifyButton />
                </div>
            </div>
        </>
    ) 
}