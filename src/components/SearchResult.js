import React from 'react';
import './SearchResult.scss'

export function SearchResult(props) {

    const columnGap = {}

    const addGap = () => {
        if (props.albums.length > 0) {
            columnGap.gap = "1.2rem";
        } else {
            columnGap.gap = "0rem";
        }
    }
    addGap()

    return (
        <>
        <div style={columnGap} className={props.SearchResult}>
            { props.children }
        </div>
        </>
    )
}