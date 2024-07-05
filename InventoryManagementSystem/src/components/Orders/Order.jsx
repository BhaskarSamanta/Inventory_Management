import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import authService from "../../appwrite/auth";
import { Query } from "appwrite";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../ui/table.jsx";
import { Button } from "../ui/button";

function Order() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [suppliers, setSuppliers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the current user
  const fetchUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        fetchPurchaseOrder(currentUser.$id);
      } else {
        navigate("/Login");
      }
    } catch (error) {
      setError("Error fetching user information. Please try again.");
      console.error("Appwrite service :: fetchUser :: error", error);
    }
  };

  // Fetch orders and suppliers
  const fetchPurchaseOrder = async (userID) => {
    try {
      const query = Query.equal("User_ID", userID);
      const ordersRes = await appwriteService.getPurchaseOrders([query]);
      console.log("Orders Response:", ordersRes); // Log the response

      if (!ordersRes || !ordersRes.documents) {
        throw new Error("Invalid response structure from API");
      }

      setOrders(ordersRes.documents);
      fetchSuppliers(ordersRes.documents);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setError("Failed to fetch orders. Please try again.");
      setIsLoading(false);
    }
  };

  const fetchSuppliers = async (orders) => {
    try {
      const supplierIds = [...new Set(orders.map(order => order.supplier_Id))];
      const suppliersMap = {};

      for (const supplierId of supplierIds) {
        const query = Query.equal("$id", supplierId);
        const suppliersRes = await appwriteService.getSuppliers([query]);

        if (suppliersRes.documents && suppliersRes.documents.length > 0) {
          suppliersMap[supplierId] = suppliersRes.documents[0];
        }
      }

      setSuppliers(suppliersMap);
      setError(null); // Reset error state on success
    } catch (error) {
      console.error("Failed to fetch suppliers:", error);
      setError("Error fetching suppliers. Please try again.");
      setIsLoading(false);
    }
  };

  // Delete order function
  const handleDelete = async (id) => {
    try {
      await appwriteService.deletePurchaseOrder(id);
      setOrders(orders.filter((order) => order.$id !== id));
    } catch (error) {
      console.error("Failed to delete order:", error);
      setError("Failed to delete order. Please try again.");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []); // Added empty dependency array to ensure this runs once

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-700">Orders</h2>
      <Button
        className="add-order-btn"
        onClick={() => navigate("/order/add")}
      >
        Add New Order
      </Button>
      {isLoading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <Table className="table-auto w-full bg-white shadow-md rounded-lg">
          <TableHeader className="bg-gray-100 border-b">
            <TableRow className="border-gray-200">
              <TableHead className="px-4 py-2 text-left">Product</TableHead>
              <TableHead className="px-4 py-2 text-left">Order Date</TableHead>
              <TableHead className="px-4 py-2 text-left">Total Amount</TableHead>
              <TableHead className="px-4 py-2 text-left">Order Status</TableHead>
              <TableHead className="px-4 py-2 text-left">Supplier Name</TableHead>
              <TableHead className="px-4 py-2 text-left">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.$id} className="hover:bg-gray-300">
                <TableCell className="px-4 py-2">{order.Product_Name}</TableCell>
                <TableCell className="px-4 py-2">{order.Order_Date}</TableCell>
                <TableCell className="px-4 py-2">₹ {order.Total_Amount}</TableCell>
                <TableCell className="px-4 py-2">{order.Order_Statues}</TableCell>
                <TableCell className="px-4 py-2">
                  {suppliers[order.supplier_Id]?.Supplier_Name || "Unknown"}
                </TableCell>
                <TableCell className="px-4 py-2">
                  <Button
                    className="delete-btn"
                    onClick={() => handleDelete(order.$id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default Order;
