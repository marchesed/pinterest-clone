import React from 'react'
import {Link} from 'react-router-dom'
import '../css/Button.css'

const Button = ({link,copy}) =>{
    return (<Link to={link} className="button">{copy}</Link>)
}

export default Button