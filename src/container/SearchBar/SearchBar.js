import React, { useState } from 'react';
import { SearchBarPresentational } from '../../presentational/SearchBar/SearchBarPresentational';

export function SearchBar() {

    const [ inputText, setInputText ] = useState(null)

    const handleChange = ({target}) => {
        setInputText(target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputText)
    }

    return (
        <>
            <SearchBarPresentational
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                inputText={inputText}
            />
        </>
    )
}