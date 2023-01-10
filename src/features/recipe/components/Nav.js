import React from 'react'
import {AiFillTwitterCircle, AiFillInstagram, AiFillFacebook} from 'react-icons/ai'
import { Link } from 'react-router-dom'


export default function Nav(props) {
  const logo = props.logo
  return (
    <nav>
        <div className='nav-left'>
          <a href='/'>
            <img className='nav-logo'  src={logo} alt='Logo'/>
          </a>
        </div>
        <div className='nav-center'>

        </div>
        <div className='nav-right'>
            <AiFillTwitterCircle className='nav-icon'  color='#b01e68'/>
            <AiFillFacebook className='nav-icon'  color='#b01e68'/>
            <AiFillInstagram className='nav-icon'  color='#b01e68'/>
        </div>
    </nav>
  )
}
