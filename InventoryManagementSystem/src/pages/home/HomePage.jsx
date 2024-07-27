import React from "react";
import { Link } from "react-router-dom"; 
import { Button } from "../../components";

const HomePage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-blue-950 to-purple-950 overflow-x-hidden">
      {/* Outer div */}
      <div className="w-full h-full text-center mt-10">
        
        {/* Heading component */}
        <h1 className="text-4xl underline text-purple-700 font-bold font-hack mb-8">
          Welcome to InventoryPro
        </h1>

        {/* First row */}
        <div className="flex flex-col md:flex-row mt-20 justify-between w-full px-10 mb-10">
          <div className="flex flex-col h-full w-full md:w-1/2 p-6 ease-in-out transition-transform bg-gradient-to-br from-purple-900 hover:scale-105 to-blue-800 border-b-2 shadow-sm border-blue-950 rounded-3xl mb-20 md:mb-0">
            <p className="text-purple-300 text-left text-xl mb-4">
              <strong className="font-mono text-white text-3xl">InventoryPro</strong> is a web application that helps you
              manage your inventory effortlessly. With our user-friendly interface, you can easily add, update, and manage your inventory.
            <div className="w-full flex justify-end">
              <Link to="/dashboard">
                <Button className="rounded-2xl bg-transparent shadow-none hover:scale-105 text-white hover:bg-transparent hover:text-purple-300">Get Started<p className="text-purple-100 text-2xl pb-1">→</p></Button>
              </Link>
            </div>
            </p>
          </div>
          <div className="flex justify-center md:justify-end mb-20 w-2/3 h-full mr-56 scale-150 md:w-1/3">
            <img src="/assets/image.png" alt="Logo" className="w-3/4 md:w-1/2" />
          </div>
        </div>

        {/* Second row */}
        <div className="flex flex-col md:flex-row mt-20 justify-between w-full px-10 mb-10">
        <div className="flex justify-center mb-10 w-2/3 h-2/3 scale-150">
            <img src="/assets/signupSS.png" alt="Logo" className="w-3/4 md:w-1/2 rounded-xl"/>
          </div>
          <div className="flex flex-col hover:scale-105 h-full w-full md:w-2/3 p-6 ease-in-out transition-transform bg-transparent rounded-3xl">
            <p className="text-purple-300 text-left text-xl mb-4">
              <strong className="font-mono text-pink-600 text-3xl">Don't have an account?</strong> Create an account and start managing your inventory.
            </p>
            <div className="w-full flex justify-end">
              <Link to="/signup">
                <Button className="rounded-2xl shadow-none text-white hover:bg-blue-700 hover:scale-105 hover:text-purple-300 text-lg pb-3 h-12">Sign Up<p className="text-purple-100 text-2xl pb-1 ml-1">→</p></Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Third row */}
        <div className="flex mt-20 flex-col md:flex-row justify-between w-full px-10 mb-20">
          <div className="flex flex-col w-1/2 hover:scale-105 md:w-2/3 p-6 ease-in-out transition-transform bg-transparent rounded-3xl mb-4 md:mb-0">
            <p className="text-purple-300 text-left text-xl mb-4">
              <strong className="font-mono text-pink-600 text-3xl">List your products systematically</strong> and keep track of your inventory. Our app provides a user-friendly interface to manage your inventory.
            </p>
          </div>
          <div className="flex justify-center w-2/3 h-2/3 scale-150">
            <img src="/assets/inventoryPage.png" alt="Logo" className="w-3/4 md:w-1/2 rounded-xl"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
