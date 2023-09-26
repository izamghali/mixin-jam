import React, {useState} from 'react';
import './Album.scss'

export function Album(props) {

    const {
        url, searchParams, 
        albumNames, albumID, albumImgSrc
    } = props;

    const handleClick = async (event) => {
        event.preventDefault();

        // GET request album tracks using album ID
        const getAlbumTracks = await (await fetch(`${url}/albums/${albumID}/tracks`, searchParams)).json()
    
    }

    let testText1 = "Album Test";
    let testText2 = "Album Title that is so long sooo. Let's test this one";
    let testText3 = "Let's see how they handle this. Well well well. Well well well. Well well well. Well well well. Well well well.";

    // testText1 = testText1.length;
    // testText2 = testText2.length;
    // testText3 = testText3.length;
    const addDot = (text) => {
        text = `${text.slice(0, 30)}...`;
    }
    
    if (testText2.length > 50 && testText3.length > 50) {
        addDot(testText2);
        testText2 = `${testText2.slice(0, 30)}...`
        testText3 = `${testText3.slice(0, 30)}...`
    }

    const [ prevX, setPrevX ] = useState();
    const [ prevY, setPrevY ] = useState();
    
    const handleMouseMove = (event) => {
        setPrevX(event.clientX);
        setPrevY(event.clientY);
        let albumTitle = event.target.innerText;
        let albumAriaDesc = event.target.ariaDescription;
        if (prevX === event.clientX && prevY === event.clientY) {
            setTimeout(() => {
                if (albumTitle) {
                    console.log(event)
                    console.log(albumTitle);
                } else {
                    console.log(event)
                    console.log(albumAriaDesc);
                }
                
            },2000)
        } else {
            return;
        }

    }

    return (
        <>
        {/* Mock Data */}
            <div className='ShadowAlbum' onMouseMove={handleMouseMove}>
                <div className='Album' onClick={handleClick}>
                    <div className='album-img-div'>
                        {/* mock album img */}
                        {/* <img src={albumImgSrc} alt="" /> aria-description={albumNames} */}
                        <img src='https://images.unsplash.com/photo-1509114397022-ed747cca3f65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80' alt="" aria-description={testText1}/> 
                    </div>
                    {/* mock album name */}
                    {/* <h3 className='album-title'>{albumNames}</h3> */}
                    <h3 className='album-title'>{testText1}</h3>
                </div>
            </div>
            <div className='ShadowAlbum' >
                <div className='Album' onClick={handleClick}>
                    <div className='album-img-div'>
                        {/* mock album img */}
                        {/* <img src={albumImgSrc} alt="" />  */}
                        <img src='https://images.unsplash.com/photo-1509114397022-ed747cca3f65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80' alt="" /> 
                    </div>
                    {/* mock album name */}
                    {/* <h3 className='album-title'>{albumNames}</h3> */}
                    <h3 className='album-title'>{testText2}</h3>
                </div>
            </div>
            <div className='ShadowAlbum' >
                <div className='Album' onClick={handleClick}>
                    <div className='album-img-div'>
                        {/* mock album img */}
                        {/* <img src={albumImgSrc} alt="" />  */}
                        <img src='https://images.unsplash.com/photo-1509114397022-ed747cca3f65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80' alt="" /> 
                    </div>
                    {/* mock album name */}
                    {/* <h3 className='album-title'>{albumNames}</h3> */}
                    <h3 className='album-title'>{testText3}</h3>
                </div>
            </div>
        </>
    )
}