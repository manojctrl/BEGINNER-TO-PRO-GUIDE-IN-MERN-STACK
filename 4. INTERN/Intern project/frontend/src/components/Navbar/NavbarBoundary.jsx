import React from 'react'
import Navbar from './Navbar'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'

const NavbarBoundary = () => {
  return (
    <ErrorBoundary>
        <Navbar></Navbar>
    </ErrorBoundary>
  )
}

export default NavbarBoundary
