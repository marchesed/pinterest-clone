import React from 'react';
import '../css/Header.css';
import { Link } from 'react-router-dom'

function isSignedIn(props){

    if (props.isSignedIn) return (
        <button className='header-signin' onClick={props.onClick}>Welcome, {props.name}</button>
    )
    else return (
        <button className='header-signin' onClick={props.onClick}>Sign In with Github</button>
    )
}

function Header(props){
    
    console.log(props)
    return(
        <div className="header-container">
            <Link to="/"><img alt="" className='header-logo' src="/badge-wordmark.svg"></img></Link>
            {isSignedIn(props)}
        </div>
    )
}

export default Header