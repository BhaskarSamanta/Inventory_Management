import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Query } from 'appwrite';
import appwriteService from '../../appwrite/config';
import authService from '../../appwrite/auth';
import { Button } from '../index.js';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../ui/table';

export default function Inventory() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState({});
  const [categories, setCategories] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Appwrite service :: getCurrentUser :: error', error);
        navigate('/login');
      }
    };

    fetchCurrentUser();
  }, [navigate]);

  useEffect(() => {
    const fetchData = async (userId) => {
      setIsLoading(true);
      try {
        const query = Query.equal('User_ID', userId);

        // Fetch products, suppliers, and categories concurrently
        const [productsResponse, suppliersResponse, categoriesResponse] = await Promise.all([
          appwriteService.getProducts([query]),
          appwriteService.getSuppliers([query]),
          appwriteService.getCatagories([query])
        ]);

        // Log responses for debugging
        console.log('Products Response:', productsResponse);
        console.log('Suppliers Response:', suppliersResponse);
        console.log('Categories Response:', categoriesResponse);

        // Process products
        const productsData = productsResponse.documents;

        // Log product supplier and category IDs
        productsData.forEach(product => {
          console.log(`Product ID: ${product.$id}, Supplier ID: ${product.Supplier_ID}, Category ID: ${product.Category_ID}`);
        });

        // Process suppliers
        const suppliersData = suppliersResponse.documents.reduce((acc, supplier) => {
          acc[supplier.$id] = supplier.Supplier_Name;
          return acc;
        }, {});
        console.log('Mapped Suppliers:', suppliersData);

        // Process categories
        const categoriesData = categoriesResponse.documents.reduce((acc, category) => {
          acc[category.$id] = category.Category_Name;
          return acc;
        }, {});
        console.log('Mapped Categories:', categoriesData);

        // Update states
        setProducts(productsData);
        setSuppliers(suppliersData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data.');
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchData(user.$id);
    }
  }, [user]);

  const handleDelete = async (productId) => {
    try {
      await appwriteService.deleteProduct(productId);
      setProducts(products.filter(product => product.$id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Failed to delete product.');
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-700">Inventory</h2>

      {/* Add product button */}
      <Button
        className=" "
        onClick={() => navigate('/Items/add')}
      >
        Add New Product
      </Button>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-center">
          No products available. <Button className="text-blue-500" onClick={() => navigate('/Items/add')}>Add a product</Button>
        </p>
      ) : (
        <Table className="table-auto w-full bg-white shadow-md rounded-lg">
          <TableHeader className=" bg-gray-100 border-b">
            <TableRow className="border-gray-200">
              <TableHead className="px-4 py-2 text-left">Product Name</TableHead>
              <TableHead className="px-4 py-2 text-left">Price</TableHead>
              <TableHead className="px-4 py-2 text-left">Stock Quantity</TableHead>
              <TableHead className="px-4 py-2 text-left">Supplier</TableHead>
              <TableHead className="px-4 py-2 text-left">Category</TableHead>
              <TableHead className="px-4 py-2 text-left">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map(product => (
              <TableRow key={product.$id} className="hover:bg-gray-300">
                <TableCell className="px-4 py-2">{product.Product_Name}</TableCell>
                <TableCell className="px-4 py-2">₹ {product.Price}</TableCell>
                <TableCell className="px-4 py-2">{product.Stock_Qty}</TableCell>
                <TableCell className="px-4 py-2">
                  {suppliers[product.Supplier_ID] || 'Unknown Supplier'}
                </TableCell>
                <TableCell className="px-4 py-2">
                  {categories[product.Category_ID] || 'Unknown Category'}
                </TableCell>
                <TableCell className="px-4 py-2">
                  <Button
                    className="rounded-md mr-2"
                    onClick={() => navigate(`/Items/edit/${product.$id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="bg-red-700 text-white p-2 rounded-md"
                    onClick={() => handleDelete(product.Product_ID)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
