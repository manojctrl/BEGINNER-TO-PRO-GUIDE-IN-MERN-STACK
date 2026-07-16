import React from 'react'
import { useNavigate } from 'react-router-dom'

const About = () => {
   const naviagte =  useNavigate()
  return (
    <div className='mt-10p'>
      <h2>About Page </h2> 
      <button onClick={()=>naviagte(-1)}>BACK TO HOME </button>
    </div>
  )
}

export default About
