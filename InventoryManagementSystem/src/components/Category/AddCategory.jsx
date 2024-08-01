import React, { useState, useEffect } from 'react';
import authService from '@/appwrite/auth';
import appwriteService from '@/appwrite/config';
import { useNavigate } from 'react-router-dom';
import { ID } from 'appwrite';
import { useForm } from 'react-hook-form';
import { Input, Button } from '../index';

export default function AddCategory({onCategoryAdded}) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await authService.getCurrentUser();
                if (!user) {
                    navigate('/login');
                } else {
                    setUser(user);
                }
            } catch (error) {
                setError('Failed to fetch user.');
            }
        };

        fetchUser();
    }, [navigate]);

    const addNewCategory = async (data) => {
      const Category_ID = ID.unique(); 
        try {
            await appwriteService.addCatagory(
              Category_ID,
              {
                Category_ID,
                Category_Name: data.Category_Name,
                User_ID: user.$id,
            });
            alert('Category added successfully!');
            reset();
            onCategoryAdded();
        } catch (error) {
            setError(`Failed to add category: ${error.message}`);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-xl shadow-md border border-gray-700">
            <h2 className="text-3xl font-semibold text-center text-gray-600 mb-6">Add New Category</h2>
            <form onSubmit={handleSubmit(addNewCategory)} className="space-y-6">
                {errors.Category_Name && (
                    <div className="text-red-500 text-sm mb-4">
                        Category name is required.
                    </div>
                )}
                <div className="relative">
                    <Input
                        type="text"
                        placeholder="Category Name"
                        className="block w-full px-4 py-3 text-gray-800 bg-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                        {...register('Category_Name', { required: true })}
                    />
                    {errors.Category_Name && (
                        <div className="absolute -bottom-6 text-xs text-red-500">
                            Category name is required.
                        </div>
                    )}
                </div>
                <Button
                    type="submit"
                    className="w-full py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                    
                >
                    Add New Category
                </Button>
                {/* <Button 
                    onClick={() => navigate('/catagory')}
                    className=" w-full bg-red-600 hover:bg-red-800 font-semibold text-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 text-lg "
                >
                    Cancel
                </Button> */}
            </form>
        </div>
    );
}
