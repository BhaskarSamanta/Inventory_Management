import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import authService from '../../appwrite/auth'
import { Button } from '..'
import { useNavigate } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'
function LogoutBtn() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
            navigate('/')

        })
    }
  return (
    <Button onClick={logoutHandler} className=' bg-transparent text-red-600 hover:text-red-800 duration-200 rounded-xl hover:bg-transparent shadow-none'><FiLogOut className='text-2xl' /></Button>
  )
}

export default LogoutBtn