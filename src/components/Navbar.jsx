import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const NavItem = ({ to, children, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      isActive
        ? "text-indigo-600 font-semibold"
        : "text-gray-700 hover:text-indigo-600"
    }
  >
    {children}
  </NavLink>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <img
            src="https://assets.zyrosite.com/cdn-cgi/image/format%3Dauto%2Cw%3D542%2Cfit%3Dcrop%2Cq%3D95/AE0P5b19y7HPN0eO/logo-wrong-25-png-final-AMq1X67JrzT4pbjo.png"
            alt="logo"
            className="h-10"
          />
          <div>
            <div className="font-bold">WRONGTURNCLUB</div>
            <div className="text-xs text-gray-600">Explore Real India</div>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/about">About</NavItem>
          <NavItem to="/packages">Packages</NavItem>
          <NavItem to="/gallery">Gallery</NavItem>
          <NavItem to="/contact">Contact</NavItem>
          <NavItem to="/booking">Book</NavItem>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none"
        >
          {open ? (
            /* Close Icon */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-gray-700"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path strokeWidth="2" strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            /* Hamburger Icon */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-inner border-t">
          <div className="flex flex-col gap-4 p-4 text-gray-700">
            <NavItem to="/" onClick={closeMenu}>Home</NavItem>
            <NavItem to="/about" onClick={closeMenu}>About</NavItem>
            <NavItem to="/packages" onClick={closeMenu}>Packages</NavItem>
            <NavItem to="/gallery" onClick={closeMenu}>Gallery</NavItem>
            <NavItem to="/contact" onClick={closeMenu}>Contact</NavItem>
            <NavItem to="/booking" onClick={closeMenu}>Book</NavItem>
          </div>
        </div>
      )}
    </nav>
  );
}
