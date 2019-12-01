import React from 'react';
import '../css/Header.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'
import Profile from './Profile';
import App from './App'

function isSignedIn(props){

    if (props.isSignedIn) return (
        <button className='header-signin' onClick={props.onClick}>Welcome, {props.name}</button>
    )
    else return (
        <button className='header-signin' onClick={props.onClick}>Sign In</button>
    )
}

function Header(props){
    
    console.log(props)
    return(
        <div className="header-container">
            <Link to="/"><img className='header-logo' src="/badge-wordmark.svg"></img></Link>
            {isSignedIn(props)}
        </div>
    )
}

export default Header