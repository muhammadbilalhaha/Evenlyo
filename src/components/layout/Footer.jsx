import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className=" mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img src="./mainLogo.svg" className='h-8' alt="Main Logo" />
            </div>
            <h4 className="font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-brand-pink">About</a></li>
              <li><a href="#" className="hover:text-brand-pink">Why Vendor join us</a></li>
              <li><a href="#" className="hover:text-brand-pink">Why Customer join us</a></li>
              <li><a href="#" className="hover:text-brand-pink">Features</a></li>
              <li><a href="#" className="hover:text-brand-pink">Map Points</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 mt-10 md:mt-0">Discover</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-brand-pink">Blogs</a></li>
              <li><a href="#" className="hover:text-brand-pink">Categories</a></li>
              <li><a href="#" className="hover:text-brand-pink">Pricing Discover</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Support Resources</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-brand-pink">Login</a></li>
              <li><a href="#" className="hover:text-brand-pink">Contact Support</a></li>
              <li><a href="#" className="hover:text-brand-pink">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-brand-pink">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-pink">Language Options</a></li>
            </ul>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-4">
              Easily book suppliers, venues, and services for any type of event.
            </p>
            <button className="w-full bg-brand-pink hover:bg-pink-600 text-white px-4 py-2.5 rounded-full text-sm font-semibold mb-3 transition">
              Find Your Suppliers
            </button>
            <button className="w-full border border-brand-pink text-brand-pink hover:bg-pink-50 px-4 py-2.5 rounded-full text-sm font-semibold mb-6 transition">
              Become a Vendor
            </button>
            
            <div className="flex gap-3">
              <a href="#" className="text-gray-400 hover:text-brand-pink"><FaLinkedinIn className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-brand-pink"><FaFacebookF className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-brand-pink"><FaYoutube className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-brand-pink"><FaInstagram className="w-5 h-5" /></a>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-gray-400 border-t border-gray-100 pt-8">
          © Powered By softwarefluxsolution.com
        </div>
      </div>
    </footer>
  );
};

export default Footer;