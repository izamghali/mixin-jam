import React from 'react';
import './SearchBarPresentational.scss';

export function SearchBarPresentational(props) {
    return (
        <form className="SearchBar" onSubmit={props.handleSubmit}>
            <input 
                type="text" 
                className="search-bar-input-tags" 
                id='searchBarInput' 
                placeholder='What song are you looking for?'
                onChange={props.handleChange}
                value={props.inputText}
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