import React from 'react';
import './SearchResult.scss'

// Components
import { Album } from '../components/Album';
import { Track } from '../components/Track';

export function SearchResult(props) {
    const {
        url, searchParams,

        albums, tracks,
        addedTracks, setAddedTracks,
        addedTrackIDs
    } = props;

    const columnGap = {}
    const addGap = () => {
        if (albums.length > 0) {
            columnGap.gap = "1.2rem";
        } else {
            columnGap.gap = "0rem";
        }
    }
    addGap()

    return (
        <>

            <div style={columnGap} className="SearchResult">
                
                {/* Mock Data */}
                <div className='result-album-artist-container'>
                    <Album />
                    {/* {albums.map(album => {
                        return <Album 
                                    url={url} searchParams={searchParams}
                                    albumNames={album.name}  albumID={album.id} albumImgSrc={album.images[0].url} 
                                />
                    })} */}
                </div>

                <div className='result-track-container'>
                    {/* <Track /> */}
                    {/* {tracks.map(track => {
                        return <Track 
                                    addedTrackIDs={addedTrackIDs}
                                    addedTracks={addedTracks} 
                                    setAddedTracks={setAddedTracks} 
                                    
                                    trackID={track.id}
                                    trackTitle={track.name} 
                                    artistName={track.artists[0].name} 
                                    trackUrl={track.external_urls.spotify} 
                                    imgSrc={track.album.images[0].url} 
                                />
                    })} */}
                </div>

            </div>
        </>
    )
}