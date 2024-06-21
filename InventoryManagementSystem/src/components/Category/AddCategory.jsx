import React, { useState, useEffect } from 'react';
import authService from '@/appwrite/auth';
import appwriteService from '@/appwrite/config';
import { useNavigate } from 'react-router-dom';
import { ID } from 'appwrite';
import { useForm } from 'react-hook-form';
import { Input, Form, Button } from '../index';

export default function AddCategorie() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (!user) {
          navigate('/Login');
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
    try {
      await appwriteService.addCatagory({
        Category_ID: ID.unique(),
        Category_Name: data.Category_Name,
        User_ID: user.$id,
      });
      alert('Category added successfully!');
    } catch (error) {
      setError('Failed to add category');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-900 rounded-xl shadow-md border border-gray-700">
      <h2 className="text-3xl font-semibold text-center text-white mb-6">Add New Category</h2>
      <Form onSubmit={handleSubmit(addNewCategory)} className="space-y-6">
        {errors.Category_Name && (
          <div className="text-red-500 text-sm mb-4">
            Category name is required.
          </div>
        )}
        <div className="relative">
          <Input
            type="text"
            placeholder="Category Name"
            className="block w-full px-4 py-3 text-white bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
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
      </Form>
    </div>
  );
}