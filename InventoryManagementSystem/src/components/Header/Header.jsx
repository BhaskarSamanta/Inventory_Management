// import React from 'react'
// import { Container,Logo, LogoutBtn } from '../index.js'
// import { Link } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router'
// import { Button } from '../index.js'
// export default function Header() {
//   const authStatus = useSelector((state) => state.auth.status)  
//   const navigate = useNavigate()

//   const navItems = [
//     {
//       name: 'Home',
//       path: '/',
//       active: true
//     },
//     {
//       name: 'Login',
//       path: '/login',
//       active: !authStatus
//     },
//     {
//       name: 'Signup',
//       path: '/signup',
//       active: !authStatus
//     },
//     {
//       name: 'Dashboard',
//       path: '/dashboard',
//       active: authStatus
//     },
//     {
//       name: 'Items',
//       path: '/Items',
//       active: authStatus
//     },
//     {
//       name: 'Suppliers',
//       path: '/suppliers',
//       active: authStatus
//     },   
//     {
//       name: 'Categories',
//       path: '/catagory',
//       active: authStatus
//     }
//   ]

//   return (
//     <header className='py-4 shadow-lg bg-gradient-to-r from-gray-800 via-gray-900 to-black'>
//       <Container>
//         <nav className='flex items-center'>
//           <div className='mr-8'>
//             <Link to='/'>
//               <Logo width='70px' />
//             </Link>
//           </div>
//           <ul className='flex ml-auto space-x-6'>
//             {navItems.map((item) =>
//               item.active ? (
//                 <li key={item.name}>
//                   <Button
//                     onClick={() => navigate(item.path)}
//                     className='inline-block bg-inherit px-4 py-2 text-white transition duration-200 ease-in-out transform hover:scale-105 hover:bg-blue-700 rounded-full'
//                   >
//                     {item.name}
//                   </Button>
//                 </li>
//               ) : null
//             )}
//             {authStatus && (
//               <li>
//                 <LogoutBtn />
//               </li>
//             )}
//           </ul>
//         </nav>
//       </Container>
//     </header>
//   )
// }
import React from 'react';
import { Container, Logo, LogoutBtn } from '../index.js';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

export default function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation(); // Get current location

  const navItems = [
    {
      name: 'Home',
      path: '/',
      active: true,
    },
    {
      name: 'Login',
      path: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      path: '/signup',
      active: !authStatus,
    },
    {
      name: 'Dashboard',
      path: '/dashboard',
      active: authStatus,
    },
    {
      name: 'Items',
      path: '/items',
      active: authStatus,
    },
    {
      name: 'Suppliers',
      path: '/suppliers',
      active: authStatus,
    },
    {
      name: 'Categories',
      path: '/catagory',
      active: authStatus,
    },
  ];

  return (
    <header className='py-4 shadow-lg'>
      <Container>
        <nav className='flex items-center justify-between'>
          <Link to='/'>
            <Logo width='70px' className='hover:opacity-90 transition-opacity duration-200' />
          </Link>
          <ul className='flex space-x-4'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className='relative'>
                  <Link
                    to={item.path}
                    className={`text-white transition duration-200 ease-in-out ${
                      location.pathname === item.path
                        ? 'border-b-2 border-blue-500'
                        : 'border-b-2 border-transparent'
                    } hover:border-blue-300`}
                  >
                    {item.name}
                  </Link>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn className='text-white hover:text-gray-300 transition-colors duration-200' />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

