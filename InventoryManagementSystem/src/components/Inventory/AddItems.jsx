import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import appwriteService from '../../appwrite/config';
import authService from '../../appwrite/auth';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '../ui/dropdown-menu.jsx';
import { Button, Input } from '../index';
import { Form, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { ID, Query } from 'appwrite';
import { useNavigate } from 'react-router';



export default function AddItems() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
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
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supplierData = await appwriteService.getSuppliers(Query.equal("User_ID",[user.$id]));
        setSuppliers(supplierData.documents);

        const categoryData = await appwriteService.getCatagories(Query.equal("User_ID", [user.$id]));
        setCategories(categoryData.documents);
      } catch (error) {
        setError('Failed to fetch suppliers or categories.');
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      await appwriteService.addProduct({
        Product_Name: data.Product_Name,
        Product_ID: ID.unique(),
        User_ID: user.$id,
        Price: data.Price,
        Description: data.Description,
        Stock_Qty: data.Stock_Qty,
        Supplier_ID: selectedSupplier,
        Category_ID: selectedCategory
      });

      alert('Product added successfully!');
    } catch (error) {
      setError('Failed to add product.');
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
      <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormItem>
          <FormLabel>Product Name</FormLabel>
          <FormControl>
            <Input
              className="border border-gray-600 bg-gray-900 text-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Product Name"
              {...register('Product_Name', { required: 'Product Name is required' })}
            />
          </FormControl>
          {errors.Product_Name && <FormMessage>{errors.Product_Name.message}</FormMessage>}
        </FormItem>
        
        <FormItem>
          <FormLabel>Price</FormLabel>
          <FormControl>
            <Input
              type="number"
              step="0.01"
              className="border border-gray-600 bg-gray-900 text-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Price"
              {...register('Price', { required: 'Price is required' })}
            />
          </FormControl>
          {errors.Price && <FormMessage>{errors.Price.message}</FormMessage>}
        </FormItem>

        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Input
              className="border border-gray-600 bg-gray-900 text-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Description"
              {...register('Description')}
            />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>Stock Quantity</FormLabel>
          <FormControl>
            <Input
              type="number"
              className="border border-gray-600 bg-gray-900 text-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Stock Quantity"
              {...register('Stock_Qty', { required: 'Stock Quantity is required' })}
            />
          </FormControl>
          {errors.Stock_Qty && <FormMessage>{errors.Stock_Qty.message}</FormMessage>}
        </FormItem>

        <FormItem>
          <FormLabel>Select Supplier</FormLabel>
          <FormControl>
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
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>Select Category</FormLabel>
          <FormControl>
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
          </FormControl>
        </FormItem>

        <div className="flex justify-center mt-4">
        <button type="submit" className=" w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">
          Add Product
        </button>
        </div>
      </Form>
    </div>
  );
}
