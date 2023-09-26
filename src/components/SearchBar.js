import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.scss'

export function SearchBar(props) {

    const {
        url, setSearchResultLayout, getProfile, access_token,
        setTracks, setAlbums, generateRandomString, CLIENT_ID, CLIENT_SECRET, redirect_uri, refreshAccessToken,
        searchBarIsClicked, setSearchBarIsClicked
    } = props

    const [ searchInput, setSearchInput ] = useState('')
    const handleChange = ({target}) => {
        setSearchInput(target.value)
    }

    const navigate = useNavigate();

    let searchParams = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'https://api.spotify.com/v1';

        if (searchInput.length > 0) {

            let artistID = '';
            let artistAlbums = [];
            let artistTracks = [];
            let tracks = [];
            getProfile();
            
            // GET request artist ID
            try {
                console.log(`checking access token: ${localStorage.getItem('access_token')}`)
                console.log('requesting artist ID ...')
                var response = await (await fetch(`${url}/search?q=${searchInput}&type=artist`, searchParams)).json()
                
                if (response) {
                    console.log(response)
                } else {
                    console.log(response.status)
                }
                artistID = response.artists.items[0].id
                console.log(`Artist ID for ${searchInput}: ${artistID}`);
            } catch(error) {
                console.log(error)
            }
            
            // // GET request artist album using artist ID
            const getArtistAlbums = await (await fetch(`${url}/artists/${artistID}/albums?include_groups=album&market=US&limit=5`, searchParams)).json()
            artistAlbums = getArtistAlbums.items;
            console.log("artist's albums: ")
            console.log(getArtistAlbums)
            setAlbums(artistAlbums)
            
            // // GET request artist tracks using artist ID
            // const getArtistTracks = await (await fetch(`${url}/artists/${artistID}/top-tracks?market=US&limit=5`, searchParams)).json()
            // artistTracks = getArtistTracks.tracks;
            // console.log("artist's tracks: ")
            // console.log(getArtistTracks)
            
            // // GET request tracks
            // const getTrackID = await ( await fetch(url + '/search?q=' + searchInput + '&type=track&market=US&limit=10&include_external=audio&offset=5', searchParams)).json();
            // tracks = getTrackID.tracks.items;
            // console.log(`artist's tracks:`)
            // console.log(getTrackID)
            // setTracks(tracks)
        }

        setSearchBarIsClicked(true)
    }
    
    const flexWhenClicked = () => {
        const beFlex = { display: "flex" }
        if (searchInput.length > 0) {
            setSearchResultLayout(beFlex)
        }
    }

    return (
        <>
            <div className='SearchBar'>
                <form className="search-bar-form" onSubmit={handleSubmit}>   
                    <input 
                        type="text" 
                        className="search-bar-input-tags" 
                        id='searchBarInput' 
                        placeholder="What do you wanna listen to?"
                        onChange={handleChange}
                        value={searchInput}
                    />
                </form>
                <div className='search-bar-glass'>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </span>
                </div>
            </div>
        </>
    )
}