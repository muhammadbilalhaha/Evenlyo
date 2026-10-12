import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import {
  openLoginScreen,
  openBlogPage,
  closeBlogPage,
  setCurrentPage,
  openPricingPage,   // NEW
  closePricingPage,  // NEW
} from '../../features/ui/uiSlice';
import { Globe, User, ChevronDown, Menu, X } from 'lucide-react';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { currentPage } = useAppSelector((state) => state.ui);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLoginClick = () => {
    dispatch(openLoginScreen());
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (page) => {
    // Always close other pages first
    dispatch(closeBlogPage());
    dispatch(closePricingPage());

    if (page === 'categories') {
      document.getElementById('categories')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      dispatch(setCurrentPage('categories'));
    } else if (page === 'features') {
      document.getElementById('features')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      dispatch(setCurrentPage('features'));
    } else if (page === 'blog') {
      dispatch(openBlogPage());
    } else if (page === 'pricing') {
      dispatch(openPricingPage());   // NEW
    } else {
      dispatch(setCurrentPage(page));
    }

    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'categories', label: 'Categories' },
    { id: 'blog', label: 'Blog' },
    { id: 'pricing', label: 'Pricing' },
  ];

  return (
    <>
      {/* ===================== HEADER ===================== */}
      <header className="sticky flex items-center justify-center w-full h-20 top-0 z-50 bg-white border-b border-gray-100">
        <div className="w-full px-6 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <img
            src="./mainLogo.svg"
            className="h-8 cursor-pointer"
            alt="Main Logo"
            onClick={() => handleNavClick('home')}
          />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-600">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <a
                  key={item.id}
                  href="#"
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                  className={`relative pb-1 transition ${
                    isActive
                      ? 'text-brand-pink border-b-2 border-brand-pink'
                      : 'text-gray-600 hover:text-brand-pink'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2.5 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 hover:border-pink-500 hover:text-pink-600 transition-colors bg-white">
              <Globe className="w-4 h-4 text-slate-700" />
              <select
                className="bg-transparent text-sm font-medium text-gray-800 outline-none cursor-pointer"
                defaultValue="English"
              >
                <option value="English">English</option>
                <option value="Dutch">Dutch</option>
                <option value="German">German</option>
              </select>
            </div>

            <button
              onClick={handleLoginClick}
              className="bg-gradient-to-r from-[#d81b70] via-[#ea1d82] to-[#ff2a5d] hover:opacity-95 text-white px-6 py-3.5 rounded-lg text-sm font-semibold flex items-center gap-2.5 transition shadow-md shadow-pink-500/20"
            >
              <User className="w-4 h-4 text-white" />
              <span>Sign in / Register</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </header>

      {/* ===================== MOBILE DRAWER ===================== */}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={closeMobileMenu}
      />

      <aside
        className={`fixed top-0 right-0 h-full w-[85%] max-w-[340px] bg-white z-[70] lg:hidden flex flex-col shadow-2xl transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 h-20 bg-gradient-to-l from-pink-100 via-pink-50 to-white">
          <img src="./mainLogo.svg" className="h-7" alt="Evenlyo" />
          <button onClick={closeMobileMenu} className="text-gray-700 hover:text-brand-pink transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-6 py-8 flex flex-col gap-7">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            const hasDropdown = item.id === 'features' || item.id === 'categories';

            return (
              <a
                key={item.id}
                href="#"
                onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                className={`flex items-center justify-between text-base font-medium transition ${
                  isActive ? 'text-brand-pink' : 'text-gray-800 hover:text-brand-pink'
                }`}
              >
                <span className="flex items-center gap-4">
                  <span className="w-2 h-2 rounded-full bg-brand-pink"></span>
                  {item.label}
                </span>
                {hasDropdown && <ChevronDown className="w-4 h-4 text-gray-500" />}
              </a>
            );
          })}
        </nav>

        <div className="px-6 pb-8 flex flex-col gap-4">
          <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-3 py-2.5">
            <Globe className="w-5 h-5 text-gray-700 shrink-0" />
            <select
              className="flex-1 bg-transparent text-sm font-medium text-gray-800 outline-none cursor-pointer"
              defaultValue="English"
            >
              <option value="English">English</option>
              <option value="Dutch">Dutch</option>
              <option value="German">German</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          <button
            onClick={handleLoginClick}
            className="w-full bg-gradient-to-r from-[#d81b70] via-[#ea1d82] to-[#ff2a5d] hover:opacity-95 text-white py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2.5 transition shadow-md shadow-pink-500/25"
          >
            <User className="w-4 h-4" />
            Sign in / Register
          </button>
        </div>
      </aside>
    </>
  );
};

export default Navbar;