import React from 'react';

import { TopArtists } from '../../features/TopArtists';
import { TopPlaylists } from '../../features/TopPlaylists';

export const TopPage = (props) => {
    const { topArtists } = props;
    return (
        <>
            <div className='TopPage'>
                <TopArtists 
                    topArtists={topArtists.items}
                />
                <TopPlaylists />
            </div>
        </>
    )
}