import React from 'react';
import { Container, Logo, LogoutBtn } from '../index.js';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  // const navigate = useNavigate();
  const location = useLocation(); // Get current location

  const navItems = [
    {
      name: 'Home',
      path: '/',
      active: !authStatus,
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
    <header className='py-4 shadow-2xl w-full bg-gray-200'>
      <Container>
        <nav className='flex items-center justify-between w-full'>
          <Link to='/'>
            <Logo width='70px' className='hover:opacity-90 transition-opacity duration-200' />
          </Link>
          <ul className='flex space-x-4'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className='relative  hover:opacity-70'>
                  <Link
                    to={item.path}
                    className={` text-blue-700 transition duration-200 ease-in-out ${
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
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

