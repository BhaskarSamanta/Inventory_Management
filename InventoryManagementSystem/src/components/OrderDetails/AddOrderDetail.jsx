import React, { useState, useEffect } from 'react';
import appwriteService from '@/appwrite/config';
import authService from '@/appwrite/auth';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Input, Button } from '../index.js';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu.jsx';
import { ID, Query } from 'appwrite';
function AddOrderDetail() {
  const { handleSubmit, register, formState: { errors }, setValue } = useForm();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [error, setError] = useState(null);

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await authService.getCurrentUser();
        if (!userResponse) {
          navigate('/login');
        } else {
          setUser(userResponse);
        }
      } catch (error) {
        setError("Failed to fetch user.");
      }
    };

    fetchUser();
  }, [navigate]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsResponse = await appwriteService.getProducts(Query.equal("User_ID", [user.$id]));
        setProducts(productsResponse.documents);
      } catch (error) {
        setError("Failed to fetch products.");
      }
    };

    fetchProducts();
  }, []);

  // Calculate total price when quantity or unit price changes
  useEffect(() => {
    const calculateTotalPrice = () => {
      setTotalPrice((parseFloat(quantity) * parseFloat(unitPrice)).toFixed(2));
    };

    calculateTotalPrice();
  }, [quantity, unitPrice]);

  // Handle form submission
  const handleAddOrderDetail = async (data) => {
    if (!user) {
      setError("User not authenticated.");
      return;
    }

    try {
      const orderDetail = {
        Quantity: parseInt(quantity, 10),
        Unit_Price: parseFloat(unitPrice),
        Total_Price: parseFloat(totalPrice),
        Product_ID: selectedProduct,
        User_ID: user.$id,
      };

      await appwriteService.addPurchaseOrderdetails( ID.unique(), orderDetail);
      navigate('/orders'); // Redirect to orders page after submission
    } catch (error) {
      setError("Failed to add order detail.");
    }
  };

  const handleProductSelect = (productId) => {
    setSelectedProduct(productId);
    const product = products.find((product) => product.$id === productId);
    setUnitPrice(product?.Unit_Price || '');
    setValue('Product_ID', productId);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Add Purchase Order Detail</h1>
      {errors && <p className="text-red-500 mb-4">{errors.message}</p>}
      <form onSubmit={handleSubmit(handleAddOrderDetail)} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
        <div>
          <label className="block text-gray-700 mb-2">Product</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md text-left focus:ring-2 focus:ring-blue-500 focus:outline-none">
                {selectedProduct ? products.find(p => p.$id === selectedProduct)?.Product_Name : 'Select a Product'}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white shadow-lg rounded-md p-1 mt-1">
              {products.map((product) => (
                <DropdownMenuItem 
                  key={product.$id} 
                  onClick={() => handleProductSelect(product.$id)} 
                  className="cursor-pointer p-2 hover:bg-gray-100 rounded-md"
                >
                  {product.Product_Name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled className="cursor-not-allowed opacity-50 p-2">More Products Coming Soon</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <input type="hidden" {...register('Product_ID', { required: true })} value={selectedProduct} />
          {errors.Product_ID && <span className="text-red-500">Product is required.</span>}
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Quantity</label>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
              setValue('Quantity', e.target.value);
            }}
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            {...register('Quantity', { required: true, min: 1 })}
          />
          {errors.Quantity && <span className="text-red-500">Quantity is required and should be at least 1.</span>}
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Unit Price</label>
          <Input
            type="number"
            step="0.01"
            value={unitPrice}
            onChange={(e) => {
              setUnitPrice(e.target.value);
              setValue('Unit_Price', e.target.value);
            }}
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            {...register('Unit_Price', { required: true, min: 0 })}
          />
          {errors.Unit_Price && <span className="text-red-500">Unit price is required and should be at least 0.</span>}
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Total Price</label>
          <Input
            type="number"
            step="0.01"
            value={totalPrice}
            onChange={(e) => setTotalPrice(e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
            readOnly
            {...register('Total_Price', { required: true })}
          />
          {errors.Total_Price && <span className="text-red-500">Total price is required.</span>}
        </div>
        <Button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition ease-in-out duration-150">Add Order Detail</Button>
      </form>
    </div>
  );
}

export default AddOrderDetail;
