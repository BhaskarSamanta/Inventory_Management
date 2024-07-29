import React, { useState, useEffect } from "react";
import appwriteService from "@/appwrite/config";
import authService from "@/appwrite/auth";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";
import { useForm } from "react-hook-form";
import { Input, Button } from "../index";
import { Query } from "appwrite";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Calendar } from "../ui/calendar";

function AddOrder() {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [orderStatus, setOrderStatus] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (!user) {
          navigate("/Login");
        } else {
          setUser(user);
          fetchSuppliers(user);
        }
      } catch (error) {
        setError("Failed to fetch user");
        console.error(error);
      }
    };
    fetchUser();
  }, [navigate]);

  const fetchSuppliers = async (user) => {
    try {
      const query = Query.equal("User_ID", user.$id);
      const suppliers = await appwriteService.getSuppliers([query]);
      if (suppliers) {
        setSuppliers(suppliers.documents);
      } else {
        navigate('/AddSupplier');
      }
    } catch (error) {
      console.error("Failed to fetch suppliers:", error);
    }
  };

  const addNewOrder = async (data) => {
    console.log("Form data:", data);
    if (!data.Order_Total || !data.Supplier_ID || !data.ProductsName || !selectedDate) {
      setError("All fields are required.");
      return;
    }

    try {
      const Id = ID.unique();
      await appwriteService.addPurchaseOrder(Id,{
        Total_Amount: data.Order_Total,
        Order_Date: selectedDate.toDateString(), // Ensure the date is a string
        supplier_Id: data.Supplier_ID,
        User_ID: user.$id,
        Order_Statues: orderStatus,
        Product_Name: data.ProductsName,
      });
      navigate("/order");
    } catch (error) {
      console.error("Error adding order:", error);
      setError("Failed to add order");
    } finally {
      console.log(data.Order_Total);
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setValue("Order_Date", date.toDateString());
  };

  const handleSupplierSelect = (supplier) => {
    setSelectedSupplier(supplier.Supplier_Name);
    setValue("Supplier_ID", supplier.$id);
  };

  const handleStatusSelect = (status) => {
    setOrderStatus(status);
  };

  const orderStatuses = ["Order Placed", "Shipped", "Delivered"];

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
      <form onSubmit={handleSubmit(addNewOrder)} className="p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900 dark:text-white">
            Order Date
          </label>
          <Calendar className="relative" onDateSelect={handleDateSelect} />
          <Input
            type="text"
            placeholder="Selected Date"
            value={selectedDate ? selectedDate.toDateString() : ""}
            readOnly
            className="mb-4 p-3 text-white bg-gray-700 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            {...register("Order_Date", { required: true })}
          />
        </div>

        <Input
          type="text"
          placeholder="Product Name"
          className="mb-4 p-3 text-white bg-gray-700 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          {...register("ProductsName", { required: true })}
        />

        <Input
          type="text"
          placeholder="Order Total"
          className="mb-4 p-3 text-white bg-gray-700 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          {...register("Order_Total", { required: true })}
        />

        <DropdownMenu>
          <DropdownMenuTrigger className="w-full mb-4 p-3 text-gray-700 bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600">
            {orderStatus|| 'select order status'}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white dark:bg-gray-100 border border-gray-300 rounded-lg shadow-lg">
          {
            orderStatuses.map((status) => (
              <DropdownMenuItem 
                key={status} 
                onClick={() => handleStatusSelect(status)} 
                className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                {status}
              </DropdownMenuItem>
            ))
          }
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="w-full mb-4 p-3 text-gray-700 bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600">
            {selectedSupplier || "Select Supplier"}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white dark:bg-gray-100 border border-gray-300 rounded-lg shadow-lg">
            {suppliers.map((supplier) => (
              <DropdownMenuItem
                key={supplier.$id}
                onClick={() => handleSupplierSelect(supplier)}
                className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {supplier.Supplier_Name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg">
          Add Order
        </Button>
      </form>
      {error && <div className="text-red-500 mt-2 p-3">{error}</div>}
    </div>
  );
}

export default AddOrder;
