import React from 'react';
import { NavLink } from 'react-router-dom';

const NavbarLinks = ({ accessibleLinks, showNavbarMenu }) => {
  return (
    <ul className={` sm:py-2 sm:px-3  sm:flex sm:justify-center sm:items-center transition-transform duration-300 ease-in-out ${showNavbarMenu ? 'sm:hidden fixed top-12 left-0 h-full px-3 py-4 bg-gradient-to-r from-sky-400 to-blue-400 w-[70vw]' : 'hidden sm:flex md:space-x-6 md:bg-transparent'}`}>
      {accessibleLinks.map((item, index) => (
        <li key={index}>
          <NavLink
            to={item.path}
            className={({ isActive }) => (isActive ? 'text-white' : 'text-black')}
          >
            {item.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavbarLinks;
