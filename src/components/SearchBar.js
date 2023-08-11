import React, { useState } from 'react';
import './SearchBar.scss'

export function SearchBar() {

    const [ searchInput, setSearchInput ] = useState('')

    const handleChange = ({target}) => {
        setSearchInput(target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(searchInput)
    }

    async function search() {
        console.log('Searching for' + searchInput)
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