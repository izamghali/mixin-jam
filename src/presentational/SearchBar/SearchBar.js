import React from 'react';
import './SearchBar.scss';

export function SearchBar() {
    return (
        <form className="SearchBar">
            <input 
                type="text" 
                className="search-bar-input-tags" 
                id='searchBarInput' 
                placeholder='What song are you looking for?'
            />
            <input 
                type="submit" 
                className="search-bar-input-tags" 
                id='searchBarSubmit' 
                value="Search" 
            >
            </input>
        </form>
    )
}