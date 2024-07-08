import React, { useState } from 'react';
import authService from '../../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as authLogin } from '../../store/authSlice';
import { useForm } from 'react-hook-form';
import Logo from '../Logo';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const create = async (data) => {
    setLoading(true);
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        console.log("User signed up");
        setLoading(false);
        if (currentUser) {
          dispatch(authLogin(currentUser));
          navigate('/dashboard'); 
        }
      }
    } catch (error) {
      // Check if the error message indicates an existing email
      if (error.message.includes("email already exists")) {
        setError("Email already exists. Please try logging in or using a different email.");
      } else {
        setError(error.message);
      }
      setLoading(false); // Ensure to reset loading state on error
    }
  };

  return (
    <div className='w-full h-full flex flex-col items-center justify-center  bg-white rounded-md p-6'>
      <form onSubmit={handleSubmit(create)} className='bg-gray-200 p-8 hover:scale-105 transition duration-200 rounded-lg shadow-2xl w-1/3'>
        <div className='flex justify-center'><Logo /></div>
        <h2 className="text-center text-2xl font-bold leading-tight pb-4 text-gray-600">Sign up to create account</h2>
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>} {/* Show error message if there's any */}
        <Input
          type='text'
          placeholder='Name'
          className='mb-4 p-3 border-gray-800 text-gray-700 bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600'
          {...register('name', { required: true })}
        />
        <Input
          type='email'
          placeholder='Email'
          className='mb-4 p-3 text-gray-700 bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600'
          {...register('email', { required: true })}
        />
        <Input
          type='password'
          placeholder='Password'
          className='mb-6 p-3 text-gray-700 bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600'
          {...register('password', { required: true })}
        />
        <div className='flex justify-center'>
        <Button
          type='submit'
          className='w-1/3 py-3 text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors ease-in-out hover:scale-105 tranzition duration-500 focus:outline-none focus:ring-2 focus:ring-indigo-600'
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Signup'}
        </Button>
        </div>
      </form>
    </div>
  );
}
