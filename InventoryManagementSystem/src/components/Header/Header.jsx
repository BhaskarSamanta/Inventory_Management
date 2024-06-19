import React from 'react'
import { Container,Logo, LogoutBtn } from '../index.js'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Button } from '../index.js'
export default function Header() {
  const authStatus = useSelector((state) => state.auth.status)  
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      path: '/',
      active: true
    },
    {
      name: 'Login',
      path: '/login',
      active: !authStatus
    },
    {
      name: 'Signup',
      path: '/signup',
      active: !authStatus
    },
    {
      name: 'Dashboard',
      path: '/dashboard',
      active: authStatus
    },
    {
      name: 'Items',
      path: '/items',
      active: authStatus
    },
    {
      name: 'Suppliers',
      path: '/suppliers',
      active: authStatus
    },   
  ]

  return (
    <header className='py-4 shadow-lg bg-gradient-to-r from-gray-800 via-gray-900 to-black'>
      <Container>
        <nav className='flex items-center'>
          <div className='mr-8'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>
          <ul className='flex ml-auto space-x-6'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <Button
                    onClick={() => navigate(item.path)}
                    className='inline-block px-4 py-2 text-white transition duration-200 ease-in-out transform hover:scale-105 hover:bg-blue-700 rounded-full'
                  >
                    {item.name}
                  </Button>
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
  )
}
