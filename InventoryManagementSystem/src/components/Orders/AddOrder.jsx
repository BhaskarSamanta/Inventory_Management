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
  DropdownMenuItem
} from "../ui/dropdown-menu";
import { Calendar } from "../ui/calendar"; 

function AddOrder() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [orderStatus, setOrderStatus] = useState("Order Placed");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (!user) {
          navigate("/Login");
        } else {
          setUser(user);
        }
      } catch (error) {
        setError("Failed to fetch user", error);
      }
    };
    fetchUser();
  }, [navigate]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const suppliers = await appwriteService.getSuppliers(Query.equal("User_ID", [user?.$id]));
        if (suppliers) {
          setSuppliers(suppliers.documents);
        } else {
          navigate('/AddSupplier');
        }
      } catch (error) {
        console.error("Failed to fetch suppliers:", error);
      }
    };

    if (user) {
      fetchSuppliers();
    }
  }, [user, navigate]);

  const addNewOrder = async (data) => {
    try {
      await appwriteService.AddOrder(ID.unique(), {
        User_ID: user.$id,
        Order_Date: selectedDate, // Use selected date
        Total_Amount: data.Order_Total,
        Supplier_ID: data.Supplier_ID,
        Order_Status: orderStatus // Use selected order status
      });
      navigate("/orders");
    } catch (error) {
      console.error("Error adding order:", error);
      setError("Failed to add order");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
      <form onSubmit={handleSubmit(addNewOrder)} className="p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900 dark:text-white">
            Order Date
          </label>
          <Calendar
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>
        <Input
          type="text"
          placeholder="Order Total"
          className="mb-4 p-3 text-white bg-gray-700 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          {...register("Order_Total", { required: true })}
        />
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full mb-4 p-3 text-white bg-gray-700 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600">
            Select Order Status
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white dark:bg-gray-800 border border-gray-300 rounded-lg shadow-lg">
            <DropdownMenuItem onClick={() => setOrderStatus("Order Placed")} className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              Order Placed
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOrderStatus("Delivered")} className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              Delivered
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full mb-4 p-3 text-white bg-gray-700 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600">
            Select Supplier
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white dark:bg-gray-800 border border-gray-300 rounded-lg shadow-lg">
            {suppliers.map((supplier) => (
              <DropdownMenuItem key={supplier.$id} onClick={() => register("Supplier_ID", supplier.$id)} className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                {supplier.name}
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
