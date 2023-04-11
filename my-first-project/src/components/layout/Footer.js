import React from 'react'
import Logo from './Logo'

function Footer(props) {
  return (
    <div className='layout_footer'>
      {props.name}
    </div>
  )
}

export default Footer