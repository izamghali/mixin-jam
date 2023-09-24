import React, { useState } from "react";
import './NavBar.scss';
import { SearchBar } from "./SearchBar";
import { DarkLightModeButton } from './DarkLightModeButton';
import gsap from "gsap";

export const NavBar = (props) => {

    const { 
        url, generateRandomString, 
        setSearchResultLayout, CLIENT_ID, CLIENT_SECRET,
        redirect_uri, refreshAccessToken,

        setTracks, setAlbums, getProfile
    } = props;

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
                <div className="menu-button" onClick={handleMenuButtonClick}>
                    <div className="button-stripes" id="stripe1"></div>
                    <div className="button-stripes" id="stripe2"></div>
                    <div className="button-stripes" id="stripe3"></div>
                </div>
            </div>
        </>
    )
}