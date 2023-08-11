import React, { useState, useEffect } from 'react';

import { CardPresentational } from '../../presentational/Card/CardPresentational';

export function Card() {

    const clientId = '89cc9f4988ea4c7985a164bf3392cd1d';
    const clientSecret = 'f1348b92b74240898b500661ba3339d5';

    useEffect(() => {
        // API access token
    }, [])

    return (
        <>
            <CardPresentational/>
        </>
    )
}