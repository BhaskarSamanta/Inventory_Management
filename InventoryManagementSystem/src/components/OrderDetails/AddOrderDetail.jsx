import React, { useState, useEffect } from 'react'
import appwriteService from '@/appwrite/config'
import authService from '@/appwrite/auth'
import { useNavigate } from 'react-router-dom'
import { ID } from 'appwrite'
import { useForm } from 'react-hook-form'
import { Input, Form, Button } from '../index'

function AddOrderdetail() {

  const { handleSubmit, register, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  
  useEffect(()=>{
    const fetchUser = async () => {
      try {
        const userResponse = await authService.getCurrentUser()
        if (!userResponse) {
          navigate('/login')
        } else {
          setUser(userResponse)
        }
      } catch (error) {
        throw ("Appwrite serive :: fetchUser :: error",error);
      }
    }

    fetchUser()
  },[ navigate ])


  return (
    <div>AddOrderdetail</div>
  )
}

export default AddOrderdetail 