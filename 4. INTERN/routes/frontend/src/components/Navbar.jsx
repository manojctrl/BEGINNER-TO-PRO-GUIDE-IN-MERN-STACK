import React from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { id: 1, path: '/', label: 'Home' },
  { id: 2, path: '/about', label: 'About' },
  { id: 3, path: '/contact', label: 'Contact' },
  { id: 4, path: '/testonomials', label: 'Testimonials' },
  { id: 5, path: '/login', label: 'Login' },
]

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm px-6 py-4">
      <ul className="flex gap-4">
        {links.map((link) => (
          <li key={link.id}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
