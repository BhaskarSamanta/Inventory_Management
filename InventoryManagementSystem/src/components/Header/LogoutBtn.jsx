import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import authService from '../../appwrite/auth'
import { Button } from '..'
import { useNavigate } from 'react-router-dom'
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
    <Button variant="outline" onClick={logoutHandler}>Logout</Button>
  )
}

export default LogoutBtn