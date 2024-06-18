import React, {useState} from 'react'
import authService from '../../appwrite/auth'
import {Link, useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import authSlice from '../../store/authSlice'
import { useForm } from 'react-hook-form'
import Logo from '../Logo'
import { Input } from '../ui/input'
import {Button} from '../ui/button'

export default function Signup() {

  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const {register, handleSubmit,} = useForm();
  const[error, setError] = useState("");

  const create = async (data) => {
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const newUserData = await authService.getCurrentUser()
        if(newUserData){
          dispatch(authSlice.actions.login(newUserData))
          navigate('/');
          Console.log("User signed Up")
        }

      }
    } catch (error) {
      setError(error.message)
    }
  }


  return (
    <>
      <form onSubmit={handleSubmit(create)}>
            <Input
              type='text'
              placeholder='Name'
              {...register('name', { required: true })}
            />
            <Input
              type='email'
              placeholder='Email'
              {...register('email', { required: true })}
            />
            <Input
              type='password'
              placeholder='Password'
              {...register('password', { required: true })}
            />
            <Button type='submit'>Signup</Button>
      </form>
    </>
  )
}