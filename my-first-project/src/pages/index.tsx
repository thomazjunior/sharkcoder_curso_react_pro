import React, { useEffect } from 'react'

function index() {
  useEffect(() => {
    console.log("Componente renderizado pela primeira vez...")
  }, [])
  return (
    <div>index</div>
  )
}

export default index
