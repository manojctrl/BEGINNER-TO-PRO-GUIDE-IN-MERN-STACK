import React from "react";
import { NavLink, useLocation, useNavigate, useNavigation } from "react-router-dom";

const links = [
  { id: 1, path: "/", label: "Home" },
  { id: 2, path: "/about", label: "About" },
  { id: 3, path: "/contact", label: "Contact" },
  { id: 4, path: "/testonomials", label: "Testimonials" },
  { id: 5, path: "/login", label: "Login" },
];

const Navbar = () => {
  const obj = useLocation();

  const navigate =useNavigate();
  
  console.log(navigate)
  console.log(obj);
  return (
    <nav className="bg-white shadow-sm px-6 py-4">
      <ul className="flex gap-4">
        {links.map((link, i) => (
          <li key={i}>
            <NavLink
              to={link.path}
              className={`${obj.pathname ==  link.path  ? "bg-red-100" : "bg-green-300"}`}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
