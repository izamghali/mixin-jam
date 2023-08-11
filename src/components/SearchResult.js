import React from 'react';
import './SearchResult.scss'

export function SearchResult(props) {
    return (
        <>
        <div className={props.SearchResult} >
            { props.children }
        </div>
        </>
    )
}