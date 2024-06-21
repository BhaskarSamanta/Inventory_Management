import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaBoxOpen, FaUsers } from 'react-icons/fa'; 

export default function Sidebar() {
  const navigate = useNavigate();

  const sidebarItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <FaTachometerAlt />,
    },
    {
      name: 'Items',
      path: '/items',
      icon: <FaBoxOpen />,
    },
    {
      name: 'Suppliers',
      path: '/suppliers',
      icon: <FaUsers />,
    }
  ];

  return (
    <div className='fixed left-0 top-0 h-full bg-gray-800 text-white shadow-lg w-16 flex flex-col items-center py-4'>
      {sidebarItems.map((item) => (
        <button
          key={item.name}
          onClick={() => navigate(item.path)}
          className='mb-4 p-2 hover:bg-gray-700 rounded-full bg-transparent'
          title={item.name}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
}
