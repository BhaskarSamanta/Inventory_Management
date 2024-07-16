import React from 'react';
import { FaFacebook, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router';
function Footer() {

  const location= useLocation();

  if (location.pathname === '/') {

    return (
      <footer className= " bg-gradient-to-tr from-blue-950 to-purple-950 text-gray-200 py-8 mb-0 flex ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between">
            {/* Company Info */}
            <div className="w-full sm:w-1/3 mb-4">
              <h2 className="text-xl font-semibold mb-4">InventoryPro</h2>
              <p className="text-gray-200">
                Streamline your inventory process with ease. Manage your stocks, suppliers, and orders efficiently with our system.
              </p>
            </div>
            {/* Quick Links */}
            <div className="w-full sm:w-1/3 mb-4">
              <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
              <ul className="text-gray-200">
                <li className="mb-2 hover:text-blue-400"><a href="/">Home</a></li>
                <li className="mb-2 hover:text-blue-400"><a href="/Items">Items</a></li>
                <li className="mb-2 hover:text-blue-400"><a href="/dashboard">Dashboard</a></li>
                <li className="mb-2 hover:text-blue-400"><a href="/contact">Contact Us</a></li>
              </ul>
            </div>
            {/* Contact Info */}
            <div className="w-full sm:w-1/3 mb-4">
              <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
              <p className="text-gray-200">1234 Inventory Lane</p>
              <p className="text-gray-200">City, State, 56789</p>
              <p className="text-gray-200">Email: info@inventorysystem.com</p>
              <p className="text-gray-200">Phone: (123) 456-7890</p>
            </div>
          </div>
          <div className="flex justify-center mt-8 space-x-6">
            {/* Social Media Icons */}
            <a href="https://www.facebook.com/vaskar.samanta.1422/" className="text-gray-200 hover:text-blue-500"><FaFacebook size={24} /></a>
            <a href="https://x.com/Bhaskar32894413" className="text-gray-400 hover:text-blue-500"><FaTwitter size={24} /></a>
            <a href="https://www.linkedin.com/in/bhaskar-samanta-657291217/" className="text-gray-200 hover:text-blue-500"><FaLinkedin size={24} /></a>
            <a href="https://github.com/BhaskarSamanta" className="text-gray-400 hover:text-blue-500"><FaGithub size={24} /></a>
          </div>
          <p className="text-center text-gray-200 mt-8">
            &copy; 2024 Inventory Management System. All rights reserved.
          </p>
        </div>
      </footer>
    );
    
  } else {
    return (
      <footer className= " bg-gray-200 mt-2 text-gray-700 py-8 mb-0 flex ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between">
            {/* Company Info */}
            <div className="w-full sm:w-1/3 mb-4">
              <h2 className="text-xl font-semibold mb-4">InventoryPro</h2>
              <p className="text-gray-600">
                Streamline your inventory process with ease. Manage your stocks, suppliers, and orders efficiently with our system.
              </p>
            </div>
            {/* Quick Links */}
            <div className="w-full sm:w-1/3 mb-4">
              <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
              <ul className="text-gray-600">
                <li className="mb-2 hover:text-blue-400"><a href="/">Home</a></li>
                <li className="mb-2 hover:text-blue-400"><a href="/Items">Items</a></li>
                <li className="mb-2 hover:text-blue-400"><a href="/dashboard">Dashboard</a></li>
                <li className="mb-2 hover:text-blue-400"><a href="/contact">Contact Us</a></li>
              </ul>
            </div>
            {/* Contact Info */}
            <div className="w-full sm:w-1/3 mb-4">
              <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
              <p className="text-gray-600">1234 Inventory Lane</p>
              <p className="text-gray-600">City, State, 56789</p>
              <p className="text-gray-600">Email: info@inventorysystem.com</p>
              <p className="text-gray-600">Phone: (123) 456-7890</p>
            </div>
          </div>
          <div className="flex justify-center mt-8 space-x-6">
            {/* Social Media Icons */}
            <a href="https://www.facebook.com/vaskar.samanta.1422/" className="text-gray-400 hover:text-blue-500"><FaFacebook size={24} /></a>
            <a href="https://x.com/Bhaskar32894413" className="text-gray-400 hover:text-blue-400"><FaTwitter size={24} /></a>
            <a href="https://www.linkedin.com/in/bhaskar-samanta-657291217/" className="text-gray-400 hover:text-blue-500"><FaLinkedin size={24} /></a>
            <a href="https://github.com/BhaskarSamanta" className="text-gray-400 hover:text-blue-500"><FaGithub size={24} /></a>
          </div>
          <p className="text-center text-gray-600 mt-8">
            &copy; 2024 Inventory Management System. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }
}

export default Footer;
