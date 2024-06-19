import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import appwriteService from '../../appwrite/config';
import authService from '../../appwrite/auth';  
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '../ui/dropdown-menu.jsx';
import { Button, Input } from '../index'; 
import { ID } from 'appwrite';

export default function AddItems() {
  const { register, handleSubmit, setValue } = useForm();
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (!user) {
          history.push('/Login');
        } else {
          setUser(user);
        }
      } catch (error) {
        setError('Failed to fetch user.');
      }
    };

    fetchUser();
  }, []);

  // Fetch suppliers and categories on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const supplierData = await appwriteService.getSuppliers();
        setSuppliers(supplierData.documents);

        const categoryData = await appwriteService.getCategories();
        setCategories(categoryData.documents);
      } catch (error) {
        setError('Failed to fetch suppliers or categories.');
      }
    };

    fetchData();
  }, []);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      await appwriteService.addProduct({
        Product_Name: data.Product_Name,
        Product_ID: ID.unique(), // Assuming you want to create a unique ID
        User_ID: user.$id, // Assuming user has $id property
        Price: data.Price,
        Description: data.Description,
        Stock_Qty: data.Stock_Qty,
        Supplier_ID: selectedSupplier, // Use selected supplier
        Category_ID: selectedCategory // Use selected category
      });

      alert('Product added successfully!');
    } catch (error) {
      setError('Failed to add product.');
    }
  };

  // Handle supplier selection
  const handleSupplierSelect = (supplierId) => {
    setSelectedSupplier(supplierId);
    setValue('Supplier_ID', supplierId); // Update react-hook-form value
  };

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setValue('Category_ID', categoryId); // Update react-hook-form value
  };

  return (
    <div>
      <h2>Add New Product</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          Placeholder="Product ID"
          label="Product Name"
          {...register('Product_Name', { required: true })}
        />
        <Input
          label="Price"
          Placeholder="Price"
          type="number"
          step="0.01"
          {...register('Price', { required: true })}
        />
        <Input
          Placeholder="Description"
          label="Description"
          {...register('Description')}
        />
        <Input
          Placeholder="Stock Quantity"
          label="Stock Quantity"
          type="number"
          {...register('Stock_Qty', { required: true })}
        />
        <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="dropdown-trigger">
            Select Supplier
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select Supplier</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {suppliers.map((supplier) => (
              <DropdownMenuItem
                key={supplier.$id}
                onSelect={() => handleSupplierSelect(supplier.$id)}
              >
                {supplier.Supplier_Name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
          </div>
          <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="dropdown-trigger">
            Select Category
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categories.map((category) => (
              <DropdownMenuItem
                key={category.$id}
                onSelect={() => handleCategorySelect(category.$id)}
              >
                {category.Category_Name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
        <Button type="submit">Add Product</Button>
      </form>
    </div>
  );
}
