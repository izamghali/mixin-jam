import React, { useState, useEffect } from 'react';
import './HomePage.scss'

// Components
import { SearchBar } from '../../components/SearchBar';
import { SearchResult } from '../../components/SearchResult';
import { Playlist } from '../../components/Playlist';
import { Track } from '../../components/Track';
import { Album } from '../../components/Album';

export function HomePage(props) {

    const [ albums, setAlbums ] = useState([])
    const [ artistTracks, setArtistTracks ] = useState([])
    const [ tracks, setTracks ] = useState([])
    const [ addedTracks, setAddedTracks ] = useState([]);

    const { 
        accessToken, setAccessToken,
        url, searchParams,

        // albums, setAlbums,
        // tracks,setTracks,
        // addedTracks, setAddedTracks,
        // artistTracks, setArtistTracks,

    } = props;

    // addedTrackIDs are IDs used to identify or filter tracks to be added or to be removed.
    const addedTrackIDs = addedTracks.map(track => { return track.trackID });

    // Style
    const [ searchResultLayout, setSearchResultLayout ] = useState({});
    
    return (
        <>
            <div className='Body'> 

                <SearchBar 
                    url={url} searchParams={searchParams}

                    setTracks={setTracks}
                    setAlbums={setAlbums}
                    setArtistTracks={setArtistTracks}

                    setSearchResultLayout={setSearchResultLayout}
                />

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
                        addedTracks={addedTracks} // addedTracks are a list of tracks added to playlist
                        setAddedTracks={setAddedTracks}
                        addedTrackIDs={addedTrackIDs}
                    />
                </div>

            </div>
        </>
    )
}