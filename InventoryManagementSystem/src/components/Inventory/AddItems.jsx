import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import appwriteService from "../../appwrite/config";
import authService from "../../appwrite/auth";
import { ID, Query } from "appwrite";
import { useNavigate } from "react-router-dom";
import { Button } from "../index";

export default function AddItems() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");
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
          const query = Query.equal("User_ID", user.$id);

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
      await appwriteService.addProduct(Product_ID, {
        Product_Name: data.Product_Name,
        Product_ID,
        User_ID: user.$id, // Ensure user is not null when accessing $id
        Price: parseFloat(data.Price).toString(), // Convert Price to a float if needed
        Description: data.Description,
        Stock_Qty: parseInt(data.Stock_Qty).toString(), // Convert Stock_Qty to an integer if needed
        Supplier_ID: selectedSupplier,
        Category_ID: selectedCategory,
      });

      alert("Product added successfully!");
      reset(); // Reset form after successful submission
      navigate("/Items");
    } catch (error) {
      setError("Failed to add product.");
      console.error("Error adding product:", error);
    }
  };

  const handleSupplierSelect = (e) => {
    const supplierId = e.target.value;
    setSelectedSupplier(supplierId);
    setValue("Supplier_ID", supplierId);
  };

  const handleCategorySelect = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    setValue("Category_ID", categoryId);
  };

  return (
    <div className="p-6 border-gray-800 bg-gray-100 text-gray-800 shadow-xl rounded-lg w-1/2 mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Add New Product
      </h2>
      {error && <p className="text-red-400 text-center mb-4">{error}</p>}
      {!user ? (
        <p className="text-center text-gray-700">Loading...</p>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 shadow-3xl"
        >
          <div className="flex flex-col">
            <label className="text-gray-800 font-bold mb-1">Product Name</label>
            <input
              className="border border-gray-600 bg-gray-100 text-gray-600 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Product Name"
              {...register("Product_Name", {
                required: "Product Name is required",
              })}
            />
            {errors.Product_Name && (
              <p className="text-red-500 mt-1">{errors.Product_Name.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-800 font-bold mb-1">Price</label>
            <input
              type="number"
              Ptww
              step="0.01"
              className="border border-gray-600 bg-gray-100 text-gray-600 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Price"
              {...register("Price", { required: "Price is required" })}
            />
            {errors.Price && (
              <p className="text-red-500 mt-1">{errors.Price.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-800 font-bold mb-1">Description</label>
            <input
              type="text"
              className="border border-gray-600 bg-gray-100 text-gray-600 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Description"
              {...register("Description")}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-800 font-bold mb-1">
              Stock Quantity
            </label>
            <input
              type="number"
              className="border border-gray-600 bg-gray-100 text-gray-600 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 block px-4 py-2 focus:border-blue-300"
              placeholder="Stock Quantity"
              {...register("Stock_Qty", {
                required: "Stock Quantity is required",
              })}
            />
            {errors.Stock_Qty && (
              <p className="text-red-500 mt-1">{errors.Stock_Qty.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-gray-800 font-bold mb-1">
                Select Supplier
              </label>
              <select
                className="border border-gray-600 bg-gray-100 font-semibold text-gray-600 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
                value={selectedSupplier}
                onChange={handleSupplierSelect}
              >
                <option value="">Select Supplier</option>
                {suppliers.map((supplier) => (
                  <option
                    key={supplier.Supplier_ID}
                    value={supplier.Supplier_ID}
                  >
                    {supplier.Supplier_Name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-800 font-bold mb-1">
                Select Category
              </label>
              <select
                className="border border-gray-600 bg-gray-100 font-semibold text-gray-600 rounded-md w-full p-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
                value={selectedCategory}
                onChange={handleCategorySelect}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.$id} value={category.$id}>
                    {category.Category_Name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <div className="flex gap-4 pr-6">
              <Button
                type="submit"
                className=" bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-2 rounded-md transition w-36"
              >
                Add Product
              </Button>
            </div>

            <Button
              onClick={() => navigate("/Items")}
              className=" bg-red-800 text-white p-2 rounded-md hover:bg-red-600 transition w-36"
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}