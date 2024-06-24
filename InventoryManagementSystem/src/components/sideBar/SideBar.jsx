// import React , { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaTachometerAlt, FaBoxOpen, FaUsers } from 'react-icons/fa'; 
// import authService from '../../appwrite/auth';

// export default function Sidebar() {

//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(()=>{
//     const fetchUser = async () => {
//       try {
//         const response = await authService.getCurrentUser();
//         if (response) {
//           setUser(response);
//         } else {
//           setUser(null);
//         }
//       } catch (error) {
//         console.error("Appwrite serive :: fetchUser :: error",error);
//       }
//     }

//     fetchUser();

//   },[navigate])

//   const sidebarItems = [
//     {
//       name: 'Dashboard',
//       path: '/dashboard',
//       icon: <FaTachometerAlt />,
//     },
//     {
//       name: 'Items',
//       path: '/items',
//       icon: <FaBoxOpen />,
//     },
//     {
//       name: 'Suppliers',
//       path: '/suppliers',
//       icon: <FaUsers />,
//     }
//   ];

//   return user? (
//     <div className='fixed left-0 top-0 h-full bg-gray-800 text-white shadow-lg w-16 flex flex-col items-center py-4'>
//       {sidebarItems.map((item) => (
//         <button
//           key={item.name}
//           onClick={() => navigate(item.path)}
//           className='mb-4 p-2 hover:bg-gray-700 rounded-full bg-transparent'
//           title={item.name}
//         >
//           {item.icon}
//         </button>
//       ))}
//     </div>
//   ) : null
// }

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaBoxOpen, FaUsers } from 'react-icons/fa';
import authService from '../../appwrite/auth';

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

        fetchUser(); // Fetch user data on component mount

        // Optionally, you can add a dependency to re-fetch user data if needed
        // Example: fetchUser(); // Remove this line if not needed

    }, []);

    const sidebarItems = [
        { name: 'Dashboard', path: '/dashboard', icon: <FaTachometerAlt /> },
        { name: 'Items', path: '/items', icon: <FaBoxOpen /> },
        { name: 'Suppliers', path: '/suppliers', icon: <FaUsers /> }
    ];

    // If no user is logged in, return null to hide the sidebar
    if (!user) {
        return null;
    }

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
