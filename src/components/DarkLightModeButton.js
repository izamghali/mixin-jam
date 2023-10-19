import React, { useState } from 'react';
import './DarkLightModeButton.scss'
import gsap from 'gsap';

export function DarkLightModeButton() {

    // dark mode color palette
    const darkRegularBlack = '#1D0F0F';
    const darkPlum = '#453C41';
    const darkGrey = '#7B7C81';
    const darkLightSlate = '#D4DBE2';
    const darkEggplant = '#7B586B';

    // light mode color palette
    const lightKhaki = '#c2b2a5';
    const lightEmerald = '#a3c1b4';
    const lightGrass = '#7a8b65';
    const lightDarkGrass = '#424f35';
    const lightBlack = '#25312f';
    const lightWhite = '#f5f5f5';

    const textList = ['h1, h2, h3, p, span, span:not(svg)']
    const borderList = ['.navbar-logout-button, .CompactTrack, .Custom-Playlist, .Album, .Track, .Playlist, .Artist, .DarkLightModeButton']
    const bgListDarkLightSlate = ['.navbar-logout-button ']
    const bgListDarkRegularBlack = ['.Album, .Body']

    const [ toggleState, setToggleState ] = useState(true);

    const darkModeOn = () => {
        if (toggleState) {
            gsap.to('.toggle-button', { x: '100%', duration: 0.4, })

            // update dark mode color change
            gsap.to(textList, { color: darkLightSlate, })
            gsap.to(".search-bar-glass span svg", { fill: lightBlack, })
            gsap.to(".NavBar", { backgroundColor: darkPlum, })
            gsap.to(".navbar-logout-button", { color: lightBlack })
            gsap.to(bgListDarkLightSlate, { backgroundColor: darkLightSlate })
            gsap.to(borderList, { border: `1.5px solid ${darkLightSlate}` })
            gsap.to(".toggle-button", { backgroundColor: darkLightSlate })
            gsap.to(bgListDarkRegularBlack, { backgroundColor: darkRegularBlack })
            gsap.to(".compact-track-inner-div button svg", { fill: darkLightSlate })
            gsap.to(".track-plus-btn svg", { fill: darkLightSlate })
            gsap.to(".track-plus-btn svg", { fill: darkLightSlate })
            gsap.to(".playlist-title-form input", { borderBottom: `0.7px solid ${darkLightSlate}` })
            gsap.to(".playlist-submit", { backgroundColor: darkEggplant, color: darkLightSlate })
            gsap.to(".playlist-submit svg", { fill: darkLightSlate })
            
            
            
        } else {
            gsap.to('.toggle-button', { x: '-100%', duration: 0.4, })
            
            // update light mode color change
            gsap.to(textList, { color: lightBlack, })
            gsap.to(".search-bar-glass span svg", { fill: lightBlack, })
            gsap.to(".NavBar", { backgroundColor: lightKhaki, })
            gsap.to(".navbar-logout-button", { color: darkLightSlate })
            gsap.to(bgListDarkLightSlate, { backgroundColor: lightBlack })
            gsap.to(borderList, { border: `1.5px solid ${lightDarkGrass}` })
            gsap.to(".toggle-button", { backgroundColor: lightDarkGrass })
            gsap.to(bgListDarkRegularBlack, { backgroundColor: lightWhite })
            gsap.to(".compact-track-inner-div button svg", { fill: lightBlack })
            gsap.to(".track-plus-btn svg", { fill: lightBlack })
            gsap.to(".playlist-title-form input", { borderBottom: `0.7px solid ${lightBlack}` })
            gsap.to(".playlist-submit", { backgroundColor: lightEmerald, color: lightBlack })
            gsap.to(".playlist-submit svg", { fill: lightBlack })
            
        }
        setToggleState(!toggleState)
    }

    return (
        <>
            <div className='DarkLightModeButton' onClick={darkModeOn}>
                <div className='toggle-button'></div>
            </div>
        </>
    )
}