import React, { useState, useRef, useEffect } from "react";
import { RxAvatar } from "react-icons/rx";
import { MdMenu } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { MdLightMode } from "react-icons/md";
import ProfileMenu from "./ProfileMenu";
import axios from "axios";

const navItems = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Saved Jobs", link: "/saved-jobs" },
  { id: 3, name: "Browse Jobs", link: "/browse-jobs" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(7);
  const [profileVisible, setProfileVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const profileRef = useRef(null);

  // Check login status on component mount and when localStorage changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('access_token');
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();

    // Listen for storage changes
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Handle click outside to close profile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileVisible(false);
      }
    };

    if (profileVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [profileVisible]);

  // Close profile menu when mobile menu opens
  useEffect(() => {
    if (isMenuOpen) {
      setProfileVisible(false);
    }
  }, [isMenuOpen]);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/users/logout/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always remove tokens and update state regardless of API call success
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setIsLoggedIn(false);
      setProfileVisible(false);
      // Force a re-render by triggering storage event
      window.dispatchEvent(new Event('storage'));
    }
  }

  return (
    <header className="flex items-center mt-2 justify-between px-6 py-3 md:py-4 shadow max-w-6xl rounded-full mx-auto w-full bg-white relative">
      {/* Logo */}
      <a href="/" className="flex items-center gap-2 text-primary font-bold text-sm">
        <img src="/logo.svg" alt="logo" className="w-6 h-6" />
        Internhub
      </a>

      {/* Navigation Menu */}
      <nav
        className={`max-md:fixed max-md:top-0 max-md:left-0 max-md:h-full max-md:z-50 max-md:bg-white/60 max-md:backdrop-blur transition-all duration-300
        flex items-center max-md:flex-col md:flex-row gap-8 text-gray-900 text-sm font-medium
        ${isMenuOpen ? "max-md:w-full px-4 py-12" : "max-md:w-0 max-md:overflow-hidden"}
        `}
      >
        {navItems.map((item) => (
          <a key={item.id} href={item.link} className="hover:text-indigo-600">
            {item.name}
          </a>
        ))}

        {/* Close button for mobile */}
        <button
          className="md:hidden absolute top-4 right-4 text-gray-700"
          onClick={() => setIsMenuOpen(false)}
        >
          <IoClose size={24} />
        </button>
      </nav>

      {/* Right-side buttons */}
      <div className="flex items-center space-x-4">
        {/* Theme toggle */}
        <button className="size-8 flex items-center justify-center hover:bg-gray-100 transition border border-gray-300 rounded-md">
          <MdLightMode size={15} className="text-gray-600" />
        </button>

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="hidden md:flex bg-red-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-red-700 transition"
          >
            Logout
          </button>
        ) : (
          <a
            href="/login"
            className="hidden md:flex bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition"
          >
            Sign In
          </a>
        )}
    
        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-600" onClick={() => setIsMenuOpen(true)}>
          <MdMenu size={24} />
        </button>

        {/* Avatar with Notification Badge and Profile Menu */}
        {isLoggedIn && (
          <div className="relative hidden md:block" ref={profileRef}>
            <button 
              onClick={() => setProfileVisible((v) => !v)}
              className="relative focus:outline-none"
            >
              <RxAvatar size={28} className="text-gray-700 cursor-pointer hover:text-gray-900 transition-colors" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[10px] bg-red-600 text-white rounded-full px-1.5 py-0.5 leading-none">
                  {notificationCount > 9 ? "9+" : notificationCount}
                </span>
              )}
            </button>
            
            {/* Profile Menu Dropdown */}
            {profileVisible && (
              <div className="absolute right-0 top-full mt-2 z-50">
                <ProfileMenu />
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;