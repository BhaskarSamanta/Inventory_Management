import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you use React Router for navigation

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-green-400">
      <div className="max-w-3xl mx-auto text-center text-white px-6">
        <h1 className="text-4xl font-bold mb-4">Effortlessly Manage Your Inventory</h1>
        <p className="text-lg mb-8">Streamline operations with our intuitive app.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Example snippet placeholders */}
          <div className="bg-white rounded-lg p-4 shadow-md">
            {/* Placeholder for snippet content */}
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            {/* Placeholder for snippet content */}
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            {/* Placeholder for snippet content */}
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Link to="/login" className="bg-white text-blue-500 hover:bg-blue-400 hover:text-white py-2 px-6 rounded-lg text-lg font-semibold transition duration-300">
            Login
          </Link>
          <Link to="/signup" className="bg-white text-green-500 hover:bg-green-400 hover:text-white py-2 px-6 rounded-lg text-lg font-semibold transition duration-300">
            Sign Up
          </Link>
        </div>

        <p className="mt-8 text-sm opacity-75">Experience the future of inventory management.</p>
      </div>
    </div>
  );
}

export default HomePage;
