import React from 'react'
import NavBar from './NavBar'
import Logo from './Logo'
import Avatar from './Avatar'

function Header() {
  return (
      <div className='layout-header'>
         
          <Logo titulo="SharkCoders Curso React Pro" />
          <NavBar />
          <Avatar />
        </div>
  )
}

export default Header