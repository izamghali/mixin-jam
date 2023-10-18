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

    const [ toggleState, setToggleState ] = useState(true);

    const darkModeOn = () => {
        if (toggleState) {
            gsap.to('.toggle-button', { x: '100%', duration: 0.4, })

            // update dark mode color change
            gsap.to(".Body", { backgroundColor: darkRegularBlack, })
            gsap.to(".NavBar", { backgroundColor: darkPlum, })

        } else {
            gsap.to('.toggle-button', { x: '-100%', duration: 0.4, })

            // update light mode color change
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