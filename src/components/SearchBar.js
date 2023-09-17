import React, { useState } from 'react';
import './SearchBar.scss'

export function SearchBar(props) {

    const {
        url, setSearchResultLayout, getProfile,
        setTracks, setAlbums, generateRandomString, CLIENT_ID, CLIENT_SECRET, redirect_uri, refreshAccessToken
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
    let searchParams = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (searchInput.length > 0) {

            let artistID = '';
            let artistAlbums = [];
            let artistTracks = [];
            let tracks = [];
            getProfile();
            
            // GET request artist ID
            try {
                var response = await (await fetch(`${url}/search?q=${searchInput}&type=artist`, searchParams)).json()
                console.log(response)
                artistID = response.artists.items[0].id
                console.log(`Artist ID for ${searchInput}: ${artistID}`);
            } catch(error) {
                console.log(error)
            }
            
            // GET request artist album using artist ID
            const getArtistAlbums = await (await fetch(`${url}/artists/${artistID}/albums?include_groups=album&market=US&limit=5`, searchParams)).json()
            artistAlbums = getArtistAlbums.items;
            console.log("artist's albums: ")
            console.log(getArtistAlbums)
            setAlbums(artistAlbums)
            
            // GET request artist tracks using artist ID
            const getArtistTracks = await (await fetch(`${url}/artists/${artistID}/top-tracks?market=US&limit=5`, searchParams)).json()
            artistTracks = getArtistTracks.tracks;
            console.log("artist's tracks: ")
            console.log(getArtistTracks)
            
            // GET request tracks
            const getTrackID = await ( await fetch(url + '/search?q=' + searchInput + '&type=track&market=US&limit=10&include_external=audio&offset=5', searchParams)).json();
            tracks = getTrackID.tracks.items;
            console.log(`artist's tracks:`)
            console.log(getTrackID)
            setTracks(tracks)
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