import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.scss'

// Components
import { TopArtists } from '../../features/TopArtists';
import { TopPlaylists } from '../../features/TopPlaylists';
import { TopPage } from './TopPage';
import { NavBar } from '../../components/NavBar';
import { MixinJam } from '../MixinJam/MixinJam';

export function HomePage(props) {
    const { 
        CLIENT_ID, CLIENT_SECRET, 
        generateRandomString, getProfile,
        refreshAccessToken, access_token, redirect_uri, user_id
    } = props;

    // var redirect_uri = 'https://izamghali.github.io/mixin-jam/home';

    // const [ artistTracks, setArtistTracks ] = useState([])
    const [ artist, setArtist ] = useState("");
    const [ albums, setAlbums ] = useState([])
    const [ tracks, setTracks ] = useState([])
    const [ addedTracks, setAddedTracks ] = useState([]);
    const [ topArtists, setTopArtists ] = useState([])
    const [ featuredPlaylists, setFeaturedPlaylists ] = useState([]);
    const [ searchBarIsClicked, setSearchBarIsClicked ] = useState(false);

    const navigate = useNavigate();

    const searchParams = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    }

    let topArtistCalled = 0;
    const getTopArtist = async () => {
        // let index = 1;
        // console.log(`we're getting top artist the ${index += 1} times!`)
        // console.log(`access token: ${localStorage.getItem('access_token')}`)
        // console.log('requesting top artists ...')
        setTimeout( async () => {
            if (topArtistCalled < 1 && localStorage.getItem('access_token')) {
                // console.log('access token exists! continue requesting...')
                topArtistCalled += 1;
                try {
                    let response = await fetch('https://api.spotify.com/v1/me/top/artists', {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('access_token')
                        }
                    });
        
                    let data = await response.json();
                    setTopArtists(data)
                    if (data.error.message === undefined)  {
                        // console.log(`error message doesn't exist!`)
                    } else if (data.error.message !== undefined || data.error.message === 'Invalid access token') {
                        // console.log("GET top artists request failed! We're reloading the page")
                        window.location.reload()
                    }
                } catch(error) {
                    if (error === "TypeError: Cannot read properties of undefined (reading 'message')") {
                        return;
                    }
                }
            } else {
                // console.log('stop requesting')
                return;
            }

        }, 2000)
    }

    let featurePlaylistCalled = 0;
    const getFeaturedPlaylist = async () => {
        // console.log("Requesting featured playlist ...")

        setTimeout( async () => {

            if (featurePlaylistCalled < 1 && localStorage.getItem('access_token')) {

                featurePlaylistCalled += 1;
                try {
                    let response = await fetch('https://api.spotify.com/v1/browse/featured-playlists?limit=5', {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('access_token')
                        }
                    });
                    
                    let data = await response.json();
                    // console.log(data)
                    setFeaturedPlaylists(data);
                    
                    if (data.error.message === undefined)  {
                        // console.log(`error message doesn't exist!`)
                    } else if (data.error.message !== undefined || data.error.message === 'Invalid access token') {
                        // console.log("GET top artists request failed! We're reloading the page")
                        console.log("access token doesn't exist")
                        console.log("reloading page...")
                        // window.location.reload()
                    }
                } catch(error) {
                    if (error === "TypeError: Cannot read properties of undefined (reading 'message')") {
                        return;
                    }
                }

            } else {
                return;
            }

        }, 2000);
    }

    // remove this soon
    const getTops = () => {
        getTopArtist();
        getFeaturedPlaylist();    
    }

    // getTopArtist();
    // getFeaturedPlaylist();

    // const getTopTracks = async () => {
        
    //     try {
    //         let response = await fetch('https://api.spotify.com/v1/me/top/tracks', {
    //             headers: {
    //                 Authorization: 'Bearer ' + accessToken
    //             }
    //         });
    //         let data = await response.json();
    //         console.log(data)
    //     } catch(error) {
    //         console.log(error)
    //     }
    
    // }

    // const getRecentlyPlayed = async () => {
    //     try {
    //         let response = await fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=3`, {
    //             headers: {
    //                 Authorization: 'Bearer ' + accessToken
    //             }
    //         })
    //         let data = await response.json();
    //         if (!data) {
    //             console.log(`data might not be present`)
    //         } else {
    //             console.log(data)
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // addedTrackIDs are IDs used to identify or filter tracks to be added or to be removed.
    const addedTrackIDs = addedTracks.map(track => { return track.trackID });
    
    return (
        <>
            <div className='Body' onLoad={getTopArtist}> 
                <NavBar 
                    generateRandomString={generateRandomString}
                    CLIENT_ID={CLIENT_ID} CLIENT_SECRET={CLIENT_SECRET} 
                    redirect_uri={redirect_uri} refreshAccessToken={refreshAccessToken} access_token={access_token}
    
                    setTracks={setTracks} setArtist={setArtist}
                    setAlbums={setAlbums} getProfile={getProfile}

                    searchBarIsClicked={searchBarIsClicked} setSearchBarIsClicked={setSearchBarIsClicked}
                />

                <div>
                    { searchBarIsClicked ? 
                        // if searchbar is submitted, it'll render MixinJam
                        <MixinJam 
                            tracks={tracks}
                            albums={albums} setAlbums={setAlbums}
                            artist={artist} 
                            addedTracks={addedTracks} setAddedTracks={setAddedTracks}
                            addedTrackIDs={addedTrackIDs}
                            searchBarIsClicked={searchBarIsClicked}
                            user_id={user_id}
                            searchParams={searchParams}
                        /> 
                        // otherwise it's gonna render TopPage
                        : <TopPage
                            topArtists={topArtists}
                            featuredPlaylists={featuredPlaylists}
                            searchBarIsClicked={searchBarIsClicked}
                        /> 
                    }
                </div>
            </div>

                {/* <div className='debug-API-buttons'>
                    <form>
                        <input 
                            onClick={getProfile}
                            value='get profile'
                            type='button'
                        />
                    </form>

                    <form>
                        <input 
                            onClick={refreshAccessToken}
                            value='refresh access token'
                            type='button'
                        />
                    </form>

                    <form>
                        <input 
                            onClick={getTopArtist}
                            value='get top artists'
                            type='button'
                        />
                    </form>

                    <form>
                        <input 
                            onClick={getTopTracks}
                            value='get top tracks'
                            type='button'
                        />
                    </form>

                    <form>
                        <input 
                            onClick={getRecentlyPlayed}
                            value='get recently played'
                            type='button'
                        />
                    </form>

                </div> */}
        </>
    )
}