import React, { useState, useEffect } from 'react';

import { TrackPresentational } from '../../presentational/Track/TrackPresentational';

export function Track() {

    const [ accessToken, setAccessToken ] = useState('')

    const CLIENT_ID = '89cc9f4988ea4c7985a164bf3392cd1d';
    const CLIENT_SECRET = 'f1348b92b74240898b500661ba3339d5';

    const testArr = [1, 2, 3, 4]

    useEffect(() => {
        // API Access Token
        const tokenUrl = 'https://accounts.spotify.com/api/token'
        const authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        }
        fetch(tokenUrl, authParameters)
            .then(response => response.json())
            .then(data => setAccessToken(data.access_token))
    }, [])

    console.log(accessToken)


    return (
        <>
        { testArr.map(arr => {
            return <TrackPresentational />
        }) }
        </>
    )
}