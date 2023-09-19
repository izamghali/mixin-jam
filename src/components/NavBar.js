import React from "react";
import './NavBar.scss';
import { SearchBar } from "./SearchBar";
import { DarkLightModeButton } from './DarkLightModeButton';


export const NavBar = (props) => {

    const { 
        url, generateRandomString, 
        setSearchResultLayout, CLIENT_ID, CLIENT_SECRET,
        redirect_uri, refreshAccessToken,

        setTracks, setAlbums, getProfile
    } = props;

    return (
        <>
            <div className="NavBar">
                <h1>Mixin' Jam</h1>
                <SearchBar 
                    url={url} generateRandomString={generateRandomString}
                    setSearchResultLayout={setSearchResultLayout} 
                    CLIENT_ID={CLIENT_ID} CLIENT_SECRET={CLIENT_SECRET} 
                    redirect_uri={redirect_uri} refreshAccessToken={refreshAccessToken}

                    setTracks={setTracks}
                    setAlbums={setAlbums} getProfile={getProfile}
                />
                <div className="navbar-right">
                    <DarkLightModeButton />
                    <button className="navbar-logout-button">Log Out</button>
                </div>
            </div>
        </>
    )
}