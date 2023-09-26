import React from 'react';

import { TopArtists } from '../../features/TopArtists';
import { TopPlaylists } from '../../features/TopPlaylists';

export const TopPage = () => {

    return (
        <>
            <div>
                <TopArtists />
                <TopPlaylists />
            </div>
        </>
    )
}