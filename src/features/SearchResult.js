import React from 'react';
import './SearchResult.scss'

// Components
import { Album } from '../components/Album';
import { Track } from '../components/Track';
import { Playlist } from '../components/Playlist';
import { Artist } from '../components/Artist';

export function SearchResult(props) {
    const {
        url, searchParams,

        artist, setArtist,
        albums, tracks,
        addedTracks, setAddedTracks,
        addedTrackIDs, 
        searchBarIsClicked,
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
                <div className='result-artist-album-container'>
                    <h2>Artist</h2>
                    <div className='containers'>
                        <Artist 
                            artistName = {artist.name}
                            artistGenre = {artist.genre}        
                            artistImg = {artist.images[0].url}
                            artistURL = {artist.external_urls.spotify}
                            searchBarIsClicked = {searchBarIsClicked}
                        />
                    </div>
                    <h2>Albums</h2>
                    <div className='containers' id='albumContainer'>
                        {albums.map(album => {
                            return <Album 
                                        url={url} searchParams={searchParams}
                                        albumTitle={album.name}  albumID={album.id} albumImgSrc={album.images[0].url} 
                                    />
                        })}
                    </div>
                </div>

                <div className='result-track-container'>
                    <h2>Tracks</h2>
                    <div className='track-container'>
                        {/* <Track /> */}
                        {tracks.map(track => {
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
                        })}
                    </div>
                </div>

            </div>
        </>
    )
}