import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const links = [
  { id: 1, path: "/", label: "Home" },
  { id: 2, path: "/about", label: "About" },
  { id: 3, path: "/contact", label: "Contact" },
  { id: 4, path: "/testonomials", label: "Testimonials" },
  { id: 5, path: "/login", label: "Login" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-30 border-b border-slate-800/70 bg-slate-950/95 shadow-lg shadow-slate-950/20 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400 to-sky-600 text-base font-black text-slate-950 shadow-lg shadow-cyan-500/30">
            R
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-white">RouteWave</h1>
            <p className="text-xs text-slate-400">Modern React UI</p>
          </div>
        </div>

        <ul className="flex flex-wrap items-center gap-2">
          {links.map((link) => (
            <li key={link.id}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30"
                      : "bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
