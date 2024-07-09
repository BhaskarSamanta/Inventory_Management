import React, { useState, useEffect } from "react";
import appwriteService from "@/appwrite/config";
import authService from "@/appwrite/auth";
import { useNavigate } from "react-router";
import { Query } from "appwrite";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../ui/table.jsx";
import { Button } from "../ui/button.jsx";
import { Skeleton } from "@/components/ui/skeleton.jsx";

export default function SalesReport() {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

    const fetchUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (!currentUser) {
          navigate("/Login");
        } else {
          setUser(currentUser);
          fetchOrderDetails(user.$id);
        }
      } catch (error) {
        setError("Error fetching user information. Please try again.");
        console.error("Appwrite service :: fetchUser :: error", error);
      }finally{
        setIsLoading(false);
      }
    };


  const fetchOrderDetails = async (user_id) => {
    const query = Query.equal("User_ID", user_id)
    try {
      const response = await appwriteService.getSalesReport([query]);
      setOrderDetails(response.documents);
      fetchProducts(response.documents.map((doc) => doc.Product_ID));
    } catch (error) {
      setError("Failed to fetch order details."); // Set a generic error message
      console.error("Appwrite service :: fetchOrderDetails :: error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProducts = async (productIds) => {
    try {
      const response = await appwriteService.getProducts(productIds);
      setProducts(response.documents);
    } catch (error) {
      setError("Failed to fetch products.");
      console.error("Appwrite service :: fetchProducts :: error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getProductById = (productId) => {
    const product = products.find((p) => p.$id === productId);
    return product ? product.Product_Name : "Unknown Product";
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Order Details
      </h1>
      <Button
        className="absolute top-6 right-6 bg-transparent text-blue-700 p-2 rounded-md hover:bg-green-500 hover:text-white"
        onClick={() =>
          navigate("/salesReport/add")
        }
      >
        Add New OrderDetails
      </Button>
      {isLoading ? (
        <div className="space-y-4 mt-5">
          {[1, 2, 3, 4, 5].map((index) => (
            <Skeleton key={index} className="w-full h-[50px] rounded-full bg-gray-300" />
          ))}
        </div>
      ) : error ? (
        <p className="text-red-500 mb-4">{error}</p>
      ) : orderDetails.length === 0 ? (
        <p className="text-gray-500">No order details found.</p>
      ) : (
        <Table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="py-2 px-4">Product Name</TableHead>
              <TableHead className="py-2 px-4">Quantity</TableHead>
              <TableHead className="py-2 px-4">Unit Price</TableHead>
              <TableHead className="py-2 px-4">Total Price</TableHead>
              <TableHead className="py-2 px-4">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderDetails.map((orderDetail) => (
              <TableRow key={orderDetail.$id} className="hover:bg-gray-100">
                <TableCell className="py-2 px-4">
                  {getProductById(orderDetail.Product_ID)}
                </TableCell>
                <TableCell className="py-2 px-4">
                  {orderDetail.Quantity}
                </TableCell>
                <TableCell className="py-2 px-4">
                  {orderDetail.Unit_Price}
                </TableCell>
                <TableCell className="py-2 px-4">
                  {orderDetail.Total_Price}
                </TableCell>
                <TableCell className="py-2 px-4">
                  {new Date(orderDetail.Order_Date).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <div className="mt-6">
        <Button
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </Button>
        <Button
          className="ml-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
          onClick={() => navigate("/salesReport/add")}
        >
          Add New Order
        </Button>
      </div>
    </div>
  );
}


