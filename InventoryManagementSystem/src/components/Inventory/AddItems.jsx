import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import appwriteService from '../../appwrite/config';
import authService from '../../appwrite/auth';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '../ui/dropdown-menu.jsx';
import { Button, Input } from '../index';
import { ID, Query } from 'appwrite';
import { useNavigate } from 'react-router-dom';

export default function AddItems() {
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        } else {
          navigate("/Login");
        }
      } catch (error) {
        setError("Error fetching user information. Please try again.");
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const query = Query.equal("User_ID", user.$id); // Assuming user.$id is valid
          
          const suppliersData = await appwriteService.getSuppliers([query]);
          setSuppliers(suppliersData.documents);

          const categoriesData = await appwriteService.getCatagories([query]);
          setCategories(categoriesData.documents);
        } catch (error) {
          setError("Error fetching suppliers or categories. Please try again.");
          console.error("Error fetching suppliers or categories:", error);
        }
      }
    };

    fetchData();
  }, [user]);

  const onSubmit = async (data) => {
    const Product_ID = ID.unique(); // Ensure to declare Product_ID properly
    try {
      await appwriteService.addProduct(
        Product_ID,
        {
        Product_Name: data.Product_Name,
        Product_ID,
        User_ID: user.$id, // Ensure user is not null when accessing $id
        Price: parseFloat(data.Price).toString(), // Convert Price to a float if needed
        Description: data.Description,
        Stock_Qty: parseInt(data.Stock_Qty).toString(), // Convert Stock_Qty to an integer if needed
        Supplier_ID: selectedSupplier,
        Category_ID: selectedCategory
      });

      alert('Product added successfully!');
      reset(); // Reset form after successful submission
      navigate('/Items');
    } catch (error) {
      setError('Failed to add product.');
      console.error("Error adding product:", error);
    }
  };

  const handleSupplierSelect = (supplierId) => {
    setSelectedSupplier(supplierId);
    setValue('Supplier_ID', supplierId);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setValue('Category_ID', categoryId);
  };

  return (
    <div className="p-6 bg-gray-800 text-gray-200 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add New Product</h2>
      {error && <p className="text-red-400 text-center mb-4">{error}</p>}
      {!user ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-white mb-1">Product Name</label>
            <input
              className="border border-gray-600 bg-gray-900 text-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Product Name"
              {...register('Product_Name', { required: 'Product Name is required' })}
            />
            {errors.Product_Name && <p className="text-red-500 mt-1">{errors.Product_Name.message}</p>}
          </div>
          
          <div className="flex flex-col">
            <label className="text-white mb-1">Price</label>
            <input
              type="number"
              step="0.01"
              className="border border-gray-600 bg-gray-900 text-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Price"
              {...register('Price', { required: 'Price is required' })}
            />
            {errors.Price && <p className="text-red-500 mt-1">{errors.Price.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="text-white mb-1">Description</label>
            <input
              className="border border-gray-600 bg-gray-900 text-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Description"
              {...register('Description')}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-white mb-1">Stock Quantity</label>
            <input
              type="number"
              className="border border-gray-600 bg-gray-900 text-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Stock Quantity"
              {...register('Stock_Qty', { required: 'Stock Quantity is required' })}
            />
            {errors.Stock_Qty && <p className="text-red-500 mt-1">{errors.Stock_Qty.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="text-white mb-1">Select Supplier</label>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full border border-gray-600 bg-gray-900 text-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
                {selectedSupplier ? suppliers.find(s => s.$id === selectedSupplier)?.Supplier_Name : "Select Supplier"}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-800 text-gray-300 shadow-lg rounded-md p-2 mt-2 w-full">
                <DropdownMenuLabel className="text-gray-400 font-semibold">Select Supplier</DropdownMenuLabel>
                <DropdownMenuSeparator className="border-gray-600" />
                {suppliers.map((supplier) => (
                  <DropdownMenuItem
                    key={supplier.$id}
                    className="p-2 hover:bg-gray-700 cursor-pointer"
                    onSelect={() => handleSupplierSelect(supplier.$id)}
                  >
                    {supplier.Supplier_Name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex flex-col">
            <label className="text-white mb-1">Select Category</label>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full border border-gray-600 bg-gray-900 text-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
                {selectedCategory ? categories.find(c => c.$id === selectedCategory)?.Category_Name : "Select Category"}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-800 text-gray-300 shadow-lg rounded-md p-2 mt-2 w-full">
                <DropdownMenuLabel className="text-gray-400 font-semibold">Select Category</DropdownMenuLabel>
                <DropdownMenuSeparator className="border-gray-600" />
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category.$id}
                    className="p-2 hover:bg-gray-700 cursor-pointer"
                    onSelect={() => handleCategorySelect(category.$id)}
                  >
                    {category.Category_Name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
            >
              Add Product
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
