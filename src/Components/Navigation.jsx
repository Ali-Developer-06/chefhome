// components/layout/Header.jsx
'use client';
import { useState, useRef, useEffect } from 'react';
import { 
  GiChefToque, 
  GiShoppingCart, 
  GiHamburgerMenu 
} from 'react-icons/gi';
import { 
  MdRestaurantMenu, 
  MdTrackChanges, 
  MdRateReview,
  MdPerson,
  MdDashboard,
  MdLogin,
  MdPersonAdd,
  MdAdminPanelSettings
} from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import Link from 'next/link';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [user, setUser] = useState(null); // Will be replaced with actual auth
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white text-slate-700 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo Section */}
          <Link href='/' className="flex items-center space-x-2">
            <GiChefToque className="text-3xl text-slate-700" />
            <span className="text-2xl font-bold text-slate-700">Chef@Home</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            
            {/* Main Navigation Links */}
            <div className="flex items-center space-x-6">
              <Link href="/" className="flex items-center space-x-1 hover:text-amber-500 transition">
                <MdPerson className="text-xl" />
                <span>Home</span>
              </Link>
              
              <Link href="/chefs" className="flex items-center space-x-1 hover:text-amber-500 transition">
                <GiChefToque className="text-xl" />
                <span>Chefs</span>
              </Link>
              
              <Link href="/menu" className="flex items-center space-x-1 hover:text-amber-500 transition">
                <MdRestaurantMenu className="text-xl" />
                <span>Menu</span>
              </Link>
              
              <Link href="/order" className="flex items-center space-x-1 hover:text-amber-500 transition">
                <MdTrackChanges className="text-xl" />
                <span>Order</span>
              </Link>
              
              <Link href="/about" className="flex items-center space-x-1 hover:text-amber-500 transition">
                <MdRateReview className="text-xl" />
                <span>About Us</span>
              </Link>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4 border-l pl-6">
              {user ? (
                <>
                  {/* Role-based Dashboard */}
                  {user.role === 'chef' && (
                    <Link href="/chef/dashboard" className="flex items-center space-x-1 bg-amber-100 px-3 py-2 rounded-lg text-amber-700 hover:bg-amber-200 transition">
                      <MdDashboard className="text-xl" />
                      <span>Chef Dashboard</span>
                    </Link>
                  )}
                  
                  {user.role === 'admin' && (
                    <Link href="/admin/dashboard" className="flex items-center space-x-1 bg-green-100 px-3 py-2 rounded-lg text-green-700 hover:bg-green-200 transition">
                      <MdDashboard className="text-xl" />
                      <span>Admin Panel</span>
                    </Link>
                  )}

                  <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.name?.charAt(0)}
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  {/* User Icon with Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <button 
                      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                      className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-200 hover:text-slate-800 transition-colors"
                    >
                      <MdPerson className="text-xl" />
                    </button>

                    {/* Dropdown Menu */}
                    {isUserDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50">
                        {/* Login Option */}
                        <Link 
                          href="/auth/login"
                          className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <MdLogin className="text-slate-500 text-lg" />
                          <div>
                            <div className="font-medium">Login</div>
                            <div className="text-xs text-slate-500">Access your account</div>
                          </div>
                        </Link>

                        {/* Signup Option */}
                        <Link 
                          href="/auth/signup"
                          className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <MdPersonAdd className="text-slate-500 text-lg" />
                          <div>
                            <div className="font-medium">Sign Up</div>
                            <div className="text-xs text-slate-500">Create new account</div>
                          </div>
                        </Link>

                        {/* Divider */}
                        <div className="border-t border-slate-200 my-2"></div>

                        {/* Admin Panel Option */}
                        <Link 
                          href="/admin"
                          className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <MdAdminPanelSettings className="text-blue-500 text-lg" />
                          <div>
                            <div className="font-medium">Admin Panel</div>
                            <div className="text-xs text-slate-500">Manage platform</div>
                          </div>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <IoClose className="text-2xl" /> : <GiHamburgerMenu className="text-2xl" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="flex items-center space-x-2 text-slate-700 hover:text-amber-500 transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <MdPerson className="text-xl" />
                <span>Home</span>
              </Link>
              <Link 
                href="/chefs" 
                className="flex items-center space-x-2 text-slate-700 hover:text-amber-500 transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <GiChefToque className="text-xl" />
                <span>Chefs</span>
              </Link>
              <Link 
                href="/menu" 
                className="flex items-center space-x-2 text-slate-700 hover:text-amber-500 transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <MdRestaurantMenu className="text-xl" />
                <span>Menu</span>
              </Link>
              <Link 
                href="/order" 
                className="flex items-center space-x-2 text-slate-700 hover:text-amber-500 transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <MdTrackChanges className="text-xl" />
                <span>Order</span>
              </Link>
              <Link 
                href="/about" 
                className="flex items-center space-x-2 text-slate-700 hover:text-amber-500 transition py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <MdRateReview className="text-xl" />
                <span>About Us</span>
              </Link>
              
              {/* Mobile Auth Links */}
              <div className="pt-4 border-t space-y-3">
                <Link 
                  href="/auth/login" 
                  className="flex items-center gap-2 py-2 text-slate-700 hover:text-amber-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MdLogin className="text-xl" />
                  <span>Login</span>
                </Link>
                <Link 
                  href="/auth/signup" 
                  className="flex items-center gap-2 py-2 text-amber-500 font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MdPersonAdd className="text-xl" />
                  <span>Sign Up</span>
                </Link>
                <Link 
                  href="/admin/dashboard" 
                  className="flex items-center gap-2 py-2 text-blue-500 font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MdAdminPanelSettings className="text-xl" />
                  <span>Admin Panel</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;