import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaBoxOpen, FaRocket, FaSalesforce } from "react-icons/fa";
import authService from "../../appwrite/auth";

export default function Sidebar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authService.getCurrentUser();
        if (response) {
          setUser(response);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Appwrite service :: fetchUser :: error", error);
      }
    };

    fetchUser();
  },);  

  const sidebarItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaTachometerAlt />,
    },
    { 
      name: "Items", 
      path: "/Items", 
      icon: <FaBoxOpen /> 
    },
    { 
      name: "Orders", 
      path: "/order", 
      icon: <FaRocket /> 
    },
    { 
      name: "SalesReport", 
      path: "/salesReport", 
      icon: <FaSalesforce /> 
    },
  ];

  // If no user is logged in, return null to hide the sidebar
  return user ? (
    <div className="fixed top-36 left-0 h-full group w-16 m-auto justify-center z-50">
      {/* Hover Area */}
      <div className="absolute top-0 left-0 h-full w-4 group-hover:w-16 transition-width duration-300 ease-in-out"></div>

      {/* Sidebar */}
      <div className=" flex-auto top-0 left-0 h-1/2 w-14 transform -translate-x-64 group-hover:translate-x-0 transition-transform duration-300 align-middle bg-blue-500 text-white shadow-lg flex flex-col items-center py-4 rounded-r-3xl">
        {sidebarItems.map((item) => (
          <div className=" flex-auto justify-center align-middle">
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className=" justify-center mt-6 p-2 hover:bg-blue-700 rounded-full align-middle bg-transparent"
              title={item.name}
            >
              {item.icon}
            </button>
          </div>
        ))}
      </div>
    </div>
  ) : null;
}
