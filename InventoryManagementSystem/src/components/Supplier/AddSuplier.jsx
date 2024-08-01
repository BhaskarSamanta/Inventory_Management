
import React, { useState, useEffect } from 'react';
import appwriteService from '../../appwrite/config';
import authService from '../../appwrite/auth';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Input, Button } from '../index';
import { ID } from 'appwrite';

function AddSupplier({onSupplierAdded}) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null); 
    const [error, setError] = useState(null);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

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
                setError('Failed to fetch user');
            }
        };
        fetchUser();
    }, [navigate]);

    const addNewData = async (data) => {
        try {
            const Supplier_ID = ID.unique(); // Generate unique Supplier_ID
            await appwriteService.addSupplier(
                Supplier_ID,
                {
                    Supplier_ID, // Pass Supplier_ID to addSupplier method
                    Supplier_Name: data.Supplier_Name,
                    Address: data.Address,
                    Contact: data.Contact,
                    User_ID: user.$id
                }
            );
            alert('Supplier added successfully!');
            reset();
            onSupplierAdded();
        } catch (error) {
            setError('Failed to add supplier');
        }
    }

    return (
        <div className="max-w-lg mx-auto mt-12 p-8 bg-gray-100 rounded-xl shadow-md border border-gray-700">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Add New Supplier</h2>
            {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
            <form onSubmit={handleSubmit(addNewData)} className="space-y-6">
                <div className="relative">
                    <Input
                        placeholder="Supplier Name"
                        className={`block w-full px-4 py-3 text-gray-800 bg-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 ${errors.Supplier_Name ? 'focus:ring-red-500' : 'focus:ring-blue-500'} focus:border-transparent transition duration-300`}
                        {...register("Supplier_Name", { required: true })}
                    />
                    {errors.Supplier_Name && (
                        <div className="absolute -bottom-6 text-xs text-red-500">Supplier name is required.</div>
                    )}
                </div>
                <div className="relative">
                    <Input
                        placeholder="Supplier Address"
                        className={`block w-full px-4 py-3 text-gray-800 bg-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 ${errors.Address ? 'focus:ring-red-500' : 'focus:ring-blue-500'} focus:border-transparent transition duration-300`}
                        {...register("Address", { required: true })}
                    />
                    {errors.Address && (
                        <div className="absolute -bottom-6 text-xs text-red-500">Supplier address is required.</div>
                    )}
                </div>
                <div className="relative">
                    <Input
                        placeholder="Supplier Contact"
                        className={`block w-full px-4 py-3 text-gray-800 bg-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 ${errors.Contact ? 'focus:ring-red-500' : 'focus:ring-blue-500'} focus:border-transparent transition duration-300`}
                        {...register("Contact", { required: true })}
                    />
                    {errors.Contact && (
                        <div className="absolute -bottom-6 text-xs text-red-500">Supplier contact is required.</div>
                    )}
                </div>
                <Button
                    type="submit"
                    className="w-full py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                >
                    Submit
                </Button>
                {/* <Button 
                    onClick={() => navigate('/suppliers')}
                    className= "w-full py-3 text-lg font-semibold text-white bg-red-600 hover:bg-red-800 rounded-lg shadow-lg hover:shadow-xl transition duration-300" 
                >
                    Cancel
                </Button> */}
            </form>
        </div>
    );
}

export default AddSupplier;
