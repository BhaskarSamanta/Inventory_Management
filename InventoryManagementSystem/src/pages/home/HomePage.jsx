import React from "react";
import { Link } from "react-router-dom"; // Assuming you use React Router for navigation
import { Button } from "../../components";
const HomePage = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-800 to-purple-800">
    {/*outer div*/}
      <div className="w-full h-hull text-center mt-10">
        
        {/*heading component*/}
        <h1 className="text-3xl font-extrabold font-mono text-Blue-600 mb-8 justify-start">
          Welcome to InventoryPro
        </h1>

        {/*first row*/}
        <div className="flex justify-between w-full">
        <div className=" flex-wrap flex h-1/2 w-2/3 ml-10 hover:scale-105 ease-in-out transition-transform bg-gradient-to-br from-purple-500 to-blue-600 border-b-2 shadow-sm border-blue-950 rounded-3xl">
          <p className="text-purple-300 ml-6 mr-2 mt-4 mb-4 text-left text-xl">
            <strong className="font-mono text-white text-3xl ">InventoryPro</strong> is a web application that helps you
            manage your inventory effortlessly. With our user-friendly interface, you can easily add, update, and manage your inventory.
          </p>
          <div className="w-full flex justify-end mr-8">
            <Link to="/dashboard">
              <Button className=" rounded-2xl bg-transparent shadow-none mb-2 text-white hover:bg-transparent hover:text-purple-300">Get Started<p className="text-purple-100 text-2xl pb-1">→</p></Button>
            </Link>
          </div>
        </div>
        <div className="flex hover:scale-105 ease-in-out transition-transform transitionduration-300 mr-10 mb-10 justify-end ">
          <img src="../../../public/assets/inventory.png" alt="Logo" className="w-1/2" />
        </div>
        </div>

        {/*second row*/}
        <div className="flex justify-between w-full mt-10 mb-20">
        <div className="flex hover:scale-150 ease-in-out justify-center scale-125 transition-transform transitionduration-300">
          <img width="500" height="500" src="../../../public/assets/signupSS.png" alt="Logo" className="w-1/2 rounded-xl"/>
        </div>
        <div className=" flex-wrap flex h-2/3 ml-10 scale-105 hover:scale-110 ease-in-out transition-transform bg-transparent rounded-3xl mr-10">
          <p className="text-purple-300 ml-6 mr-2 mt-4 mb-4 text-left text-xl">
            <strong className="font-mono text-pink-600 text-3xl ">Dont have an account?</strong> Create an account and start managing your inventory. 
          </p>
          <div className="w-full flex justify-end mr-8">
            <Link to="/signup">
              <Button className=" rounded-2xl shadow-none mb-2 text-white hover:bg-blue-700 hover:scale-105 hover:text-purple-300 text-lg pb-3 h-12">Sign Up<p className="text-purple-100 text-2xl pb-1 ml-1">→</p></Button>
            </Link>
          </div>
        </div>
        </div>

        {/*third row*/}
        <div className="flex justify-between w-full mt-10 mb-20">
        <div className=" flex-wrap flex h-2/3 ml-10 scale-105 hover:scale-110 ease-in-out transition-transform bg-transparent rounded-3xl mr-10">
          <p className="text-purple-300 ml-6 mr-2 mt-4 mb-4 text-left text-xl">
            <strong className="font-mono text-pink-600 text-3xl ">Dont have an account?</strong> Create an account and start managing your inventory. 
          </p>
          <div className="w-full flex justify-end mr-8">
            <Link to="/signup">
              <Button className=" rounded-2xl shadow-none mb-2 text-white hover:bg-blue-700 hover:scale-105 hover:text-purple-300 text-lg pb-3 h-12">Sign Up<p className="text-purple-100 text-2xl pb-1 ml-1">→</p></Button>
            </Link>
          </div>
        </div>
        <div className="flex hover:scale-150 ease-in-out justify-center scale-125 transition-transform transitionduration-300">
          <img width="500" height="500" src="../../../public/assets/signupSS.png" alt="Logo" className="w-1/2 rounded-xl"/>
        </div>
        </div>


      </div>
    </div>
  );
};

export default HomePage;
