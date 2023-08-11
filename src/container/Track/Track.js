import React, { useState, useEffect } from 'react';

import { TrackPresentational } from '../../presentational/Track/TrackPresentational';

export function Track() {

    const clientId = '89cc9f4988ea4c7985a164bf3392cd1d';
    const clientSecret = 'f1348b92b74240898b500661ba3339d5';

    const testArr = [1, 2, 3, 4]

    useEffect(() => {
        // API access token
    }, [])

    return (
        <>
        { testArr.map(arr => {
            return <TrackPresentational />
        }) }
        </>
    )
}