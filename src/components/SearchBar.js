import React, { useState } from 'react';
import './SearchBar.scss'

export function SearchBar(props) {

    const [ searchInput, setSearchInput ] = useState('')

    const handleChange = ({target}) => {
        setSearchInput(target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const url = 'https://api.spotify.com/v1' 
        const searchParams = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + props.accessToken
            }
        }

        // GET request artist ID
        const getArtistID = await (await fetch(url + '/search?q=' + searchInput + '&type=artist', searchParams)).json()
        const artistID = getArtistID.artists.items[0].id
        const artistNAME = getArtistID.artists.items[0].name

        // GET request artist album using artist ID
        const getArtistAlbum = await (await fetch(url + '/artists/' + artistID + '/albums' + '?include_groups=album&market=ID&limit=10', searchParams)).json()
        const artistAlbumsNames = getArtistAlbum.items
        console.log(artistAlbumsNames)
    }

    return (
        <>
        <form className="SearchBar" onSubmit={handleSubmit}>
            <input 
                type="text" 
                className="search-bar-input-tags" 
                id='searchBarInput' 
                placeholder='What song are you looking for?'
                onChange={handleChange}
                value={searchInput}
            />
            <input 
                type="submit" 
                className="search-bar-input-tags" 
                id='searchBarSubmit' 
                value="Search" 
            >
            </input>
        </form>
        </>
    )
}