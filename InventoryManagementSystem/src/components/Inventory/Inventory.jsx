import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { Query } from 'appwrite'; // Import the Query object from Appwrite SDK
import appwriteService from '../../appwrite/config';
import authService from '../../appwrite/auth';
import { Button } from '../index.js';

function Inventory() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch the current user
  const fetchCurrentUser = async () => {
    try {
      const user = await authService.getCurrentUser();
      if (user) {
        setUser(user);
        fetchProducts(user.$id); // Fetch products for the user
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Appwrite service :: getCurrentUser :: error', error);
      navigate('/login');
    }
  };

  // Fetch products for the current user
  const fetchProducts = async (userId) => {
    try {
      const response = await appwriteService.getProducts(Query.equal('User_ID', userId));
      setProducts(response.documents);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setIsLoading(false);
    }
  };

  // Handle product deletion
  const handleDelete = async (productId) => {
    try {
      await appwriteService.deleteProduct(productId);
      setProducts(products.filter(product => product.$id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Fetch user and products on component mount
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <div className="p-6 bg-gray-800 text-gray-200 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Inventory</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-center">No products available. <button className="text-blue-500" onClick={() => navigate('/add-product')}>Add a product</button></p>
      ) : (
        <table className="min-w-full bg-gray-700 rounded-md shadow-md">
          <thead>
            <tr className="text-left">
              <th className="p-4 border-b border-gray-600">Product Name</th>
              <th className="p-4 border-b border-gray-600">Price</th>
              <th className="p-4 border-b border-gray-600">Stock Quantity</th>
              <th className="p-4 border-b border-gray-600">Supplier</th>
              <th className="p-4 border-b border-gray-600">Category</th>
              <th className="p-4 border-b border-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.$id} className="hover:bg-gray-600">
                <td className="p-4 border-b border-gray-600">{product.Product_Name}</td>
                <td className="p-4 border-b border-gray-600">{product.Price}</td>
                <td className="p-4 border-b border-gray-600">{product.Stock_Qty}</td>
                <td className="p-4 border-b border-gray-600">{product.Supplier_Name}</td>
                <td className="p-4 border-b border-gray-600">{product.Category_Name}</td>
                <td className="p-4 border-b border-gray-600">
                  <button
                    className="bg-blue-500 text-white p-2 rounded-md mr-2"
                    onClick={() => navigate(`/Edit-Product/${product.$id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded-md"
                    onClick={() => handleDelete(product.$id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Inventory;
