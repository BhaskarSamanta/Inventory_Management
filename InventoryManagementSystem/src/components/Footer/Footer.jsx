import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between">
          {/* Company Info */}
          <div className="w-full sm:w-1/3 mb-4">
            <h2 className="text-xl font-semibold mb-4">Inventory Management System</h2>
            <p className="text-gray-400">
              Streamline your inventory process with ease. Manage your stocks, suppliers, and orders efficiently with our system.
            </p>
          </div>
          {/* Quick Links */}
          <div className="w-full sm:w-1/3 mb-4">
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <ul className="text-gray-400">
              <li className="mb-2 hover:text-white"><a href="/">Home</a></li>
              <li className="mb-2 hover:text-white"><a href="/about">About Us</a></li>
              <li className="mb-2 hover:text-white"><a href="/services">Services</a></li>
              <li className="mb-2 hover:text-white"><a href="/contact">Contact Us</a></li>
            </ul>
          </div>
          {/* Contact Info */}
          <div className="w-full sm:w-1/3 mb-4">
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-400">1234 Inventory Lane</p>
            <p className="text-gray-400">City, State, 56789</p>
            <p className="text-gray-400">Email: info@inventorysystem.com</p>
            <p className="text-gray-400">Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="flex justify-center mt-8 space-x-6">
          {/* Social Media Icons */}
          <a href="https://www.facebook.com" className="text-gray-400 hover:text-white"><FaFacebook size={24} /></a>
          <a href="https://www.twitter.com" className="text-gray-400 hover:text-white"><FaTwitter size={24} /></a>
          <a href="https://www.linkedin.com" className="text-gray-400 hover:text-white"><FaLinkedin size={24} /></a>
          <a href="https://www.github.com" className="text-gray-400 hover:text-white"><FaGithub size={24} /></a>
        </div>
        <p className="text-center text-gray-500 mt-8">
          &copy; 2024 Inventory Management System. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
