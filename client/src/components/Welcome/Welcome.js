import React, { useState, useEffect } from 'react'
import Heading from './Heading/Heading'
import Body from './Body/Body'
import Footer from "./Footer/Footer";
import {Redirect} from 'react-router-dom'
import './Welcome.css'
const Welcome = () => {
    const [valid, SetValid] = useState(false)
    const [disp,setDisp] = useState(false)
    useEffect(() => {
        fetch('https://localhost:5000',{ 
            method: 'GET', 
            mode: 'cors',
            credentials: 'include' 
        })
            .then(response => response.json())
            .then(data => {
                data.user === 'authenticated' ? SetValid(true) : setDisp(true)
            })
    }, [])
    return (
            <>
            { valid ? <Redirect push to={{pathname: "/home"}}/> : disp ?
                <>
                    <Heading />
                    <Body />
                    <Footer/>
                </> 
                :
                <h1>Loading...</h1>
            }
            </>
    )
}

export default Welcome 