import React, { useState } from 'react';
import './DarkLightModeButton.scss'
import gsap from 'gsap';

export function DarkLightModeButton() {

    const [ toggleState, setToggleState ] = useState(true);

    const handleClick = () => {
        if (toggleState) {
            gsap.to('.toggle-button', { x: '100%', duration: 0.4, })
        } else {
            gsap.to('.toggle-button', { x: '-100%', duration: 0.4, })
        }
        setToggleState(!toggleState)
    }

    return (
        <>
            <div className='DarkLightModeButton' onClick={handleClick}>
                <div className='toggle-button'></div>
            </div>
        </>
    )
}