import React, { useState, useEffect } from 'react';
import './HomePage.scss'

// Components
import { SearchBar } from '../../components/SearchBar';
import { SearchResult } from '../../components/SearchResult';
import { Playlist } from '../../components/Playlist';
import { Track } from '../../components/Track';
import { CompactTrack } from '../../components/CompactTrack';
import { Album } from '../../components/Album';

export function HomePage(props) {

    const { 
        accessToken, setAccessToken,
        url, searchParams,

        albums, setAlbums,
        tracks,setTracks,
        addedTracks, setAddedTracks,
        searchResultLayout, setSearchResultLayout,
        artistTracks, setArtistTracks,

    } = props;

    const addedTrackIDs = addedTracks.map(track => { return track.trackID });

    return (
        <>
            <div className='Body'> 

                <div className="SearchBar">
                    <SearchBar
                        url={url}
                        searchParams={searchParams}
                        setSearchResultLayout={setSearchResultLayout}
                        setTracks={setTracks}
                        setAlbums={setAlbums}
                        setArtistTracks={setArtistTracks}
                        accessToken={accessToken}
                        albums={albums}
                    />
                </div>

                <div style={searchResultLayout} className="MixinJam">

                    <SearchResult albums={albums} className="SearchResult" SearchResult='SearchResult'>
                        <div className='SearchResult-Album-div'>
                            {albums.map(album => {
                                return <Album 
                                        url={url}
                                        albums={albums}
                                        searchParams={searchParams}
                                        albumNames={album.name} 
                                        albumID={album.id}
                                        albumImgSrc={album.images[0].url }/>
                            })}
                        </div>

                        <div className='SearchResult-Track-div'>
                            {tracks.map(track => {
                                return <Track 
                                        addedTrackIDs={addedTrackIDs}
                                        addedTracks={addedTracks} 
                                        trackID={track.id}
                                        setAddedTracks={setAddedTracks} 
                                        trackTitle={track.name} 
                                        artistName={track.artists[0].name} 
                                        trackUrl={track.external_urls.spotify} 
                                        imgSrc={track.album.images[0].url} 
                                        />
                            })}
                        </div>

                    </SearchResult>

                    <Playlist
                        // className & Playlist props are set to Playlist so we can style Playlist component in App.scss & Playlist.scss
                        > 
                            {addedTracks.map(track => {
                            return <CompactTrack
                                        addedTrackIDs={addedTrackIDs}
                                        tracks={tracks}
                                        setAddedTracks={setAddedTracks}
                                        addedTracks={addedTracks}
                                        trackTitle={track.trackTitle}
                                        artistName={track.artistName} 
                                        trackID={track.trackID}
                                    />
                            })}
                    </Playlist>

                </div>

            </div>
        </>
    )
}