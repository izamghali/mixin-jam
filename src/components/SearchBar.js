import React, { useState } from 'react';
import './SearchBar.scss'

export function SearchBar(props) {

    const {
        url, searchParams, setSearchResultLayout, accessToken,
        setTracks, setAlbums
    } = props

    const [ searchInput, setSearchInput ] = useState('')
    const handleChange = ({target}) => {
        setSearchInput(target.value)
        console.log(searchInput)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (searchInput.length > 0) {
            // GET request artist ID
            const getArtistID = await (await fetch(`${url}/search?q=${searchInput}&type=artist`, searchParams)).json()
            // const artistID = getArtistID.artists.items[0].id
            console.log(getArtistID)
            
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