import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom'; // Updated import
import appwriteService from '../../appwrite/config';
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,DropdownMenuSeparator, } from '../ui/dropdown-menu';
import { Button, Input } from '../index';
import { Form, FormItem, FormLabel, FormControl, FormMessage, } from '../ui/form';

export default function EditProduct() {
  const { id } = useParams(); // Get the product ID from URL
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const [product, setProduct] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await appwriteService.getProduct(id);
        setProduct(productData);
        setValue('Product_Name', productData.Product_Name);
        setValue('Price', productData.Price);
        setValue('Description', productData.Description);
        setValue('Stock_Qty', productData.Stock_Qty);
        setSelectedSupplier(productData.Supplier_ID);
        setSelectedCategory(productData.Category_ID);

        const supplierData = await appwriteService.getSuppliers();
        setSuppliers(supplierData.documents);

        const categoryData = await appwriteService.getCategories();
        setCategories(categoryData.documents);
      } catch (error) {
        setError('Failed to fetch product details.');
      }
    };

    fetchData();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await appwriteService.updateProduct(id, {
        Product_Name: data.Product_Name,
        Price: data.Price,
        Description: data.Description,
        Stock_Qty: data.Stock_Qty,
        Supplier_ID: selectedSupplier,
        Category_ID: selectedCategory,
      });

      alert('Product updated successfully!');
      navigate('/products'); // Navigate to the product list
    } catch (error) {
      setError('Failed to update product.');
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
      <h2 className="text-2xl font-semibold mb-4 text-center">Edit Product</h2>
      {error && <p className="text-red-400 text-center mb-4">{error}</p>}
      <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormItem>
          <FormLabel>Product Name</FormLabel>
          <FormControl>
            <Input
              className="border border-gray-600 bg-gray-900 text-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder={`${product?.Product_Name}`}
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
              placeholder={`${product?.Price}`}
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
              placeholder={`${product?.Description}`}
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
              placeholder={`${product?.Stock_Qty}`}
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
          <Button type="submit" className=" w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">
            Update Product
          </Button>
        </div>
      </Form>
    </div>
  );
}
