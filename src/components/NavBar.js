import React, { useState } from "react";
import './NavBar.scss';
import { SearchBar } from "./SearchBar";
import { DarkLightModeButton } from './DarkLightModeButton';
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

import { NavLink } from "react-router-dom";

export const NavBar = (props) => {

    const { 
        url, generateRandomString, 
        setSearchResultLayout, CLIENT_ID, CLIENT_SECRET,
        redirect_uri, refreshAccessToken, access_token,

        setTracks, setAlbums, setArtist, getProfile,
        searchBarIsClicked, setSearchBarIsClicked
    } = props;

    const navigate = useNavigate();

    let menuBtnState = true;
    const transformStripes = () => {

        const btnTL = gsap.timeline();
        
        if (menuBtnState) {
            btnTL.to('#stripe1', { ease: "expo.out", duration: 0.01, rotate: 45 })
            .to('#stripe2', { ease: "expo.out", duration: 0.01, rotate: -45 }, "<")
            .to('#stripe3', { ease: "expo.out", duration: 0.01, opacity: 0 }, "<")
            .to('#stripe1', { ease: "expo.out", duration: 0.01, position: 'sticky', y: 10 }, "<")
        } else {
            btnTL.to('#stripe1', { ease: "expo.out", duration: 0.01, rotate: 0 })
            .to('#stripe2', { ease: "expo.out", duration: 0.01, rotate: 0 }, "<")
            .to('#stripe3', { ease: "expo.out", duration: 0.01, opacity: 1 }, "<")
            .to('#stripe1', { ease: "expo.out", duration: 0.01, position: 'sticky', y: 0 }, "<")
        }
        menuBtnState = !menuBtnState;
    }

    const handleMenuButtonClick = () => {
        
        transformStripes();
    }

    const handleLogOut = () => {
        localStorage.clear();
        window.history.pushState("", "", redirect_uri) // clear url bar
        navigate('/mixin-jam');
    }

    return (
        <>
            <div className="NavBar">

                <div className="navbar-left">
                    <h1>Mixin' Jam</h1>
                    <p onClick={() => {setSearchBarIsClicked(false)}}>For You</p>
                </div>

                <SearchBar
                    generateRandomString={generateRandomString}
                    setSearchResultLayout={setSearchResultLayout} 
                    CLIENT_ID={CLIENT_ID} CLIENT_SECRET={CLIENT_SECRET} 
                    redirect_uri={redirect_uri} refreshAccessToken={refreshAccessToken}
                    access_token={access_token}

                    setTracks={setTracks} setArtist={setArtist}
                    setAlbums={setAlbums} getProfile={getProfile}

                    searchBarIsClicked={searchBarIsClicked} setSearchBarIsClicked={setSearchBarIsClicked}
                />
                <div className="navbar-right">
                    <DarkLightModeButton />
                    <button className="navbar-logout-button" onClick={handleLogOut}>Log Out</button>
                </div>
                <div className="menu-button" onClick={handleMenuButtonClick}>
                    <div className="button-stripes" id="stripe1"></div>
                    <div className="button-stripes" id="stripe2"></div>
                    <div className="button-stripes" id="stripe3"></div>
                </div>
            </div>
        </>
    )
}