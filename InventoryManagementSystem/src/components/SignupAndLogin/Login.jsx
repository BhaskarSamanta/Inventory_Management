import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as authLogin } from '../../store/authSlice';
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { useForm } from "react-hook-form";
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Logo } from '../';
import { ClipLoader } from 'react-spinners';
export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const [Loading, setLoading] = useState(false);
    const login = async (data) => {
        setLoading(true);
        setError("");
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin(userData));
                    navigate("/dashboard");
                }
            }
        } catch (error) {
            if (error.code === 401) {
                // Specific handling for unauthorized errors
                setError("Invalid email or password. Please try again.");
            } else {
                // General error handling
                setError("An error occurred during login. Please try again.");
            }
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <div className='flex flex-col items-center justify-center bg-gray-100 p-6 rounded-md'>
            <form onSubmit={handleSubmit(login)} className=' flex flex-col flex-wrap bg-gray-200 w-96 h-96 hover:scale-105 transition duration-200 border-gray-600 p-8 rounded-lg shadow-2xl'>
                <Logo className=" flex justify-center"/>
                <h2 className="text-center text-2xl font-bold leading-tight pb-4 text-gray-800">
                    Login to your account
                </h2>
                {error && (
                    <div className="mb-4 text-red-500 text-center">
                        {error}
                    </div>
                )}
                <Input
                    type="email"
                    placeholder="Email"
                    className='mb-4 p-3 text-gray-800 bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600'
                    {...register("email", { required: true })}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    className='mb-6 p-3 text-gray-800 bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600'
                    {...register("password", { required: true })}
                />
                <div className='flex justify-center'>
                <Button
                    type="submit"
                    className='w-1/3 flex py-3 text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 hover:scale-105 transition duration-75 rounded-lg ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600'
                >
                   {Loading?<ClipLoader color="white" loading={Loading} size={20}/>:"Login"}
                </Button>
                </div>
            </form>
        </div>
    );
}
