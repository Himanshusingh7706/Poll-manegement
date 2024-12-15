import React, { useState, useRef, useEffect } from 'react';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import {  useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';
import navbarData from '../utils/navbarData.json';
import { ADMIN_ID, HR_ID } from '../utils/constantData';
import NavbarLinks from './NavbarLinks'; 
const Navbar = () => {
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);
  const [showNavbarMenu, setShowNavbarMenu] = useState(false);
  const dropdownRef = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLogoutDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const accessGroupMap = {
    [ADMIN_ID]: "admin",
    [HR_ID]: "admin",
  };
  const userAccessGroup = accessGroupMap[user?.roleId] || "public";
  const accessibleLinks = navbarData.filter((item) => 
    item.accessGroup === userAccessGroup || item.accessGroup === "public"
  );

  if (!isAuthenticated || !user) return null;

  return (
    <nav className="bg-gradient-to-r from-sky-400 to-blue-400 text-white fixed w-full top-0 z-20 sm:px-4">
      <div className="flex items-center justify-between sm:py-4 py-3 px-3">
        <FaBars
          onClick={() => setShowNavbarMenu((prev) => !prev)}
          className="text-xl md:hidden block cursor-pointer"
        />

        {/* Use the NavbarLinks component here */}
        <NavbarLinks accessibleLinks={accessibleLinks} showNavbarMenu={showNavbarMenu} />

        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setShowLogoutDropdown((prev) => !prev)}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <FaUserCircle className="text-3xl" />
          </div>
          {showLogoutDropdown && (
            <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg text-gray-800 z-10 w-40 sm:w-64 sm:p-4 p-2">
              <div className="sm:px-4 sm:py-3 px-1 border-b border-gray-200 bg-gradient-to-r from-gray-100 to-gray-200 rounded-t-lg">
                <h1 className="font-semibold text-sm text-gray-700 truncate p-1">
                  {user.firstName || 'No Name'}
                </h1>
                <p className="text-xs text-gray-500 truncate">
                  {user.email || 'No Email'}
                </p>
              </div>
              <div className="sm:mt-3 mt-2 flex justify-center">
                <button
                  onClick={() => {
                    setShowLogoutDropdown(false);
                    onLogoutClick();
                  }}
                  className="w-full sm:px-4 sm:py-2 px-1 py-[6px] sm:text-lg text-sm text-white bg-gradient-to-r from-blue-800 to-blue-600 hover:from-blue-600 hover:to-blue-400 transition duration-300 ease-in-out rounded-lg shadow-md"
                >
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
