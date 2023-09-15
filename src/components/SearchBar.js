import React, { useState } from 'react';
import './SearchBar.scss'

export function SearchBar(props) {

    const {
        url, setSearchResultLayout,
        setTracks, setAlbums, generateRandomString, CLIENT_ID, CLIENT_SECRET
    } = props

    const [ searchInput, setSearchInput ] = useState('')
    const handleChange = ({target}) => {
        setSearchInput(target.value)
    }

    // var searchParams = new URLSearchParams({
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'x-www-form-urlencoded',
    //         'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    //     }
    // })
    var searchParams = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        }
    }

    const requestAccessToken = async () => {
        let CLIENT_ID = localStorage.getItem('client_id')
        var redirect_uri = 'http://localhost:3000/home';

        var state = generateRandomString(16);
        localStorage.setItem('state_key', state);
        var scope = 'user-read-private user-read-email';

        var url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(CLIENT_ID);
        url += '&scope=' + encodeURIComponent(scope);
        url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
        url += '&state=' + encodeURIComponent(state);

        window.location = url;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (searchInput.length > 0) {

            // GET request artist ID
            try {
                var response = await (await fetch(`${url}/search?q=${searchInput}&type=artist`, searchParams)).json()
                // const artistID = response.artists.items[0].id
                if (response) {
                    console.log(response)
                } else if (response.error.message === 'The access token expired') {
                    // if token expired, clear the localStorage & request the new access token by requesting authorization again.
                    localStorage.clear()
                    localStorage.setItem("client_id", CLIENT_ID)
                    localStorage.setItem("client_secret", CLIENT_SECRET)
                    requestAccessToken();
                    var response = await (await fetch(`${url}/search?q=${searchInput}&type=artist`, searchParams)).json()
                }
            } catch(error) {
                console.log(error)
            }
            
            // GET request artist album using artist ID
            // const getArtistAlbums = await (await fetch(`${url}/artists/${artistID}/albums?include_groups=album&market=US&limit=5`, searchParams)).json()
            // const artistAlbums = getArtistAlbums.items;
            // setAlbums(artistAlbums)
            // console.log(getArtistAlbums)
            
            // GET request artist tracks using artist ID
            // const getArtistTracks = await (await fetch(`${url}/artists/${artistID}/top-tracks?market=US&limit=5`, searchParams)).json()
            // const artistTracks = getArtistTracks.tracks;
            
            // GET request tracks
            // const getTrackID = await ( await fetch(url + '/search?q=' + searchInput + '&type=track&market=US&limit=10&include_external=audio&offset=5', searchParams)).json();
            // const tracks = getTrackID.tracks.items;
            // console.log(getTrackID)
            // setTracks(tracks)
        }
    }
    
    const flexWhenClicked = () => {
        const beFlex = { display: "flex" }
        if (searchInput.length > 0) {
            setSearchResultLayout(beFlex)
        }
    }

    return (
        <>
            <form className="SearchBar" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    className="search-bar-input-tags" 
                    id='searchBarInput' 
                    placeholder="What do you wanna listen to?"
                    onChange={handleChange}
                    value={searchInput}
                />
                <input 
                    type="submit" 
                    className="search-bar-input-tags" 
                    id='searchBarSubmit' 
                    value="Search" 
                    onClick={flexWhenClicked}
                >
                </input>
            </form>
        </>
    )
}