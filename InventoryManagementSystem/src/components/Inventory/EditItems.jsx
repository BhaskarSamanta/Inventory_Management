import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import authService from "../../appwrite/auth";
import { Button } from "../index";
import { Query } from "appwrite";
import { Skeleton } from "../ui/skeleton";


export default function EditProduct({Product_ID,OnProductUpdated}) {
  let id  = Product_ID; // Get the product ID from URL
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();
  const [error, setError] = useState("");
  const [product, setProduct] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  // Fetch user on component mount
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Appwrite service :: getCurrentUser :: error", error);
        navigate("/login");
      }
    };

    fetchCurrentUser();
  }, [navigate]);

  // Fetch product, suppliers, and categories data
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) return; // Do nothing if user is not yet set

        const productData = await appwriteService.getProduct(id);
        if (!productData) {
          throw new Error("Product not found.");
        }
        setProduct(productData);
        setValue("Product_Name", productData.Product_Name);
        setValue("Price", productData.Price);
        setValue("Description", productData.Description);
        setValue("Stock_Qty", productData.Stock_Qty);
        setSelectedSupplier(productData.Supplier_ID);
        setSelectedCategory(productData.Category_ID);

        const query = Query.equal("User_ID", user.$id);

        const supplierData = await appwriteService.getSuppliers([query]);
        setSuppliers(supplierData.documents);

        const categoryData = await appwriteService.getCatagories([query]);
        setCategories(categoryData.documents);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
        setError("Failed to fetch product details.");
      }
    };

    fetchData();
  }, [id, setValue, user]);

  const onSubmit = async (data) => {
    console.log("Form data:", data); // Check if form data is correctly received
    try {
      // Perform form data processing (e.g., validation, API calls)
      await appwriteService.updateProduct(id, {
        Product_ID: id,
        Product_Name: data.Product_Name,
        Price: data.Price,
        Description: data.Description,
        Stock_Qty: data.Stock_Qty,
        Supplier_ID: selectedSupplier,
        Category_ID: selectedCategory,
      });

      // Display success message or navigate to another page
      alert("Product updated successfully!");
      reset(); // Example navigation after successful submission
      OnProductUpdated();
    } catch (error) {
      // Handle errors (e.g., display error message)
      setError("Failed to update product.");
      console.error("Error updating product:", error);
    }
  };

  const handleSupplierSelect = (supplierId) => {
    setSelectedSupplier(supplierId);
    setValue("Supplier_ID", supplierId);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setValue("Category_ID", categoryId);
  };
    return !product?
      <div className="space-y-4 mt-5">
          Loading...
        </div>:
      <div className="p-6 bg-gray-100 text-gray-700 rounded-lg shadow-2xl max-w-md mx-auto">
        <h2 className="text-2xl mb-4 font-bold text-center">Edit Product</h2>
        {error && <p className="text-red-400 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-400 font-semibold">Product Name</label>
            <input
              type="text"
              className="border border-gray-600 bg-gray-100 text-gray-600 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder={`${product?.Product_Name || ""}`}
              defaultValue={`${product?.Product_Name || ""}`}
              {...register("Product_Name", {
                required: "Product Name is required",
              })}
            />
            {errors.Product_Name && (
              <p className="text-red-500">{errors.Product_Name.message}</p>
            )}
          </div>
  
          <div className="flex flex-col">
            <label className="text-gray-400 font-semibold">Price</label>
            <input
              type="number"
              step="0.01"
              className="border border-gray-600 bg-gray-100 text-gray-600 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder={`${product?.Price || ""}`}
              defaultValue={`${product?.Price || ""}`}
              {...register("Price", { required: "Price is required" })}
            />
            {errors.Price && (
              <p className="text-red-500">{errors.Price.message}</p>
            )}
          </div>
  
          <div className="flex flex-col">
            <label className="text-gray-400 font-semibold">Description</label>
            <input
              type="text"
              className="border border-gray-600 bg-gray-100 text-gray-600 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder={`${product?.Description || ""}`}
              defaultValue={`${product?.Description || ""}`}
              {...register("Description")}
            />
          </div>
  
          <div className="flex flex-col">
            <label className="text-gray-400 font-semibold">Stock Quantity</label>
            <input
              type="number"
              className="border border-gray-600 bg-gray-100 text-gray-600 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder={`${product?.Stock_Qty || ""}`}
              defaultValue={`${product?.Stock_Qty || ""}`}
              {...register("Stock_Qty", {
                required: "Stock Quantity is required",
              })}
            />
            {errors.Stock_Qty && (
              <p className="text-red-500">{errors.Stock_Qty.message}</p>
            )}
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-gray-400 font-semibold">Select Supplier</label>
            <select
              className="border border-gray-600 bg-gray-100 text-gray-600 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={selectedSupplier || ""}
              onChange={(e) => handleSupplierSelect(e.target.value)}
            >
              <option value="">Select Supplier</option>
              {suppliers.map((supplier) => (
                <option key={supplier.Supplier_ID} value={supplier.Supplier_ID}>
                  {supplier.Supplier_Name}
                </option>
              ))}
            </select>
          </div>
  
          <div className="flex flex-col">
            <label className="text-gray-400 font-semibold">Select Category</label>
            <select
              className="border border-gray-600 bg-gray-100 font-semibold text-gray-600 rounded-md w-full p-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
              value={selectedCategory || ""}
              onChange={(e) => handleCategorySelect(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.Category_ID} value={category.Category_ID}>
                  {category.Category_Name}
                </option>
              ))}
            </select>
          </div>
          </div>
  
          <div className="flex justify-center mt-4">
            <Button
              type="submit"
              className="w-1/2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-2 rounded-md hover:bg-blue-600 transition"
            >
              Update Product
            </Button>
          </div>
        </form>
      </div>
}