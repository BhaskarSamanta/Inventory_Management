import React, { useState, useEffect } from "react";
import appwriteService from "@/appwrite/config";
import authService from "@/appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input, Button } from "../index.js";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu.jsx";
import { ID, Query } from "appwrite";

function AddSalesReport() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [error, setError] = useState(null);

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await authService.getCurrentUser();
        if (!userResponse) {
          navigate("/login");
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
        const query = Query.equal("User_ID", user?.$id); // Check if user exists before accessing $id
        const productsResponse = await appwriteService.getProducts([query]);
        setProducts(productsResponse.documents);
      } catch (error) {
        setError("Failed to fetch products.");
      }
    };

    if (user) {
      fetchProducts();
    }
  }, [navigate, user]);

  // Watch for changes in selectedProduct and update form value
  useEffect(() => {
    if (selectedProduct) {
      setValue("Product_ID", selectedProduct);
      const product = products.find((p) => p.$id === selectedProduct);
      if (product) {
        setUnitPrice(product.Unit_Price);
      }
    }
  }, [selectedProduct, products, setValue]);

  // Calculate total price when quantity or unit price changes
  useEffect(() => {
    const calculateTotalPrice = () => {
      const parsedQuantity = parseFloat(quantity);
      const parsedUnitPrice = parseFloat(unitPrice);
      if (!isNaN(parsedQuantity) && !isNaN(parsedUnitPrice)) {
        setTotalPrice((parsedQuantity * parsedUnitPrice).toFixed(2));
      }
    };

    calculateTotalPrice();
  }, [quantity, unitPrice]);

  // Handle form submission
  const handleSalesReport = async (formData) => {
    if (!user) {
      setError("User not authenticated.");
      return;
    }
    const SalesID = ID.unique();
    try {
      const orderDetail = {
        SalesID,
        Quantity: formData.Quantity.toString(),
        Unit_Price: formData.Unit_Price.toString(),
        Total_Price: formData.Total_Price.toString(),
        Product_ID: formData.Product_ID.toString(),
        Date: new Date().toDateString(),
        User_ID: user.$id,
        CustomarName: formData.CustomarName,
        CustomarAddress: formData.CustomarAddress,
      };

      await appwriteService.addSalesReport(SalesID, orderDetail);
      navigate("/salesReport"); // Redirect to orders page after submission
    } catch (error) {
      setError("Failed to add order detail.");
      console.error("Error adding order detail:", error);
    }
  };

  // Handle product selection from dropdown
  const handleProductSelect = (productId) => {
    setSelectedProduct(productId);
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-8 bg-gray-100 rounded-xl shadow-2xl border-gray-300">
      <h2 className="text-3xl font-bold text-center text-gray-600 mb-8">
        Add Sales Report
      </h2>
      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
      <form onSubmit={handleSubmit(handleSalesReport)} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">Quantity</label>
          <Input
            type="number"
            placeholder="Enter Quantity"
            className="w-full p-3 bg-gray-50 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            {...register("Quantity", { required: true, min: 1 })}
          />
          {errors.Quantity && (
            <span className="block mt-1 text-xs text-red-500">
              Quantity is required and should be at least 1.
            </span>
          )}
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Unit Price</label>
          <Input
            type="number"
            placeholder="Enter Unit Price"
            step="0.01"
            className="w-full p-3 bg-gray-50 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            {...register("Unit_Price", { required: true, min: 0 })}
          />
          {errors.Unit_Price && (
            <span className="block mt-1 text-xs text-red-500">
              Unit price is required and should be at least 0.
            </span>
          )}
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Total Price</label>
          <Input
            type="number"
            placeholder="Enter Total Price"
            className="w-full p-3 bg-gray-50 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            {...register("Total_Price", { required: true })}
          />
          {errors.Total_Price && (
            <span className="block mt-1 text-xs text-red-500">
              Total price is required.
            </span>
          )}
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Customer Name</label>
          <Input
            type="text"
            placeholder="Enter customer name"
            className="w-full p-3 bg-gray-50 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            {...register("CustomerName", { required: true })}
          />
          {errors.CustomerName && (
            <span className="block mt-1 text-xs text-red-500">
              Customer name is required.
            </span>
          )}
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Customer Address</label>
          <Input
            type="text"
            placeholder="Enter customer address"
            className="w-full text-gray-600 p-3 bg-gray-50 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            {...register("CustomerAddress", { required: true })}
          />
          {errors.CustomerAddress && (
            <span className="block mt-1 text-xs text-red-500">
              Customer address is required.
            </span>
          )}
        </div>
        <div className="relative flex items-center w-full">
          <label className="block text-gray-800 mb-2">Product</label>
          <DropdownMenu className="border-gray-600">
            <DropdownMenuTrigger asChild>
              <Button className=" border border-gray-600 p-3 bg-gray-100 text-gray-600 rounded-md text-left focus:ring-2 focus:ring-blue-500 focus:outline-none hover:bg-gray-300 ml-3">
                {selectedProduct
                  ? products.find((p) => p.$id === selectedProduct)
                      ?.Product_Name
                  : "Select a Product"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white shadow-lg border-gray-700 rounded-md p-1 mt-1">
              {products.map((product) => (
                <DropdownMenuItem
                  key={product.$id}
                  onClick={() => handleProductSelect(product.$id)}
                  className="cursor-pointer p-2 hover:bg-gray-300 border-gray-600 rounded-md"
                >
                  {product.Product_Name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="border-gray-600" />
            </DropdownMenuContent>
          </DropdownMenu>
          <Input
            type="hidden"
            className="block w-full px-4 py-3 text-white bg-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 ${errors.Address ? 'focus:ring-red-500' : 'focus:ring-blue-500'} focus:border-transparent transition duration-300"
            {...register("Product_ID", { required: true })}
          />
          {errors.Product_ID && (
            <span className="absolute -bottom-6 text-xs text-red-500">
              Product is required.
            </span>
          )}
        </div>

          <div className="flex justify-between">
          <Button
          type="submit"
          className="w-full py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
        >
          Submit
        </Button>
        <Button
          onClick={() => navigate("/salesReport")}
          className="w-full py-3 text-lg font-semibold text-white bg-red-600 hover:bg-red-800 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ml-2"
        >
          Cancel
        </Button>
          </div>
        
      </form>
    </div>
  );
}

export default AddSalesReport;
