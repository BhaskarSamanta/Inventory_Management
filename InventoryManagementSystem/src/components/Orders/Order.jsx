import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import authService from "@/appwrite/auth";
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
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (!currentUser) {
          navigate(
            "/login"
          );
        } else {
          setUser(currentUser);
        }
      } catch (error) {
        setError("Failed to fetch user");
      }
    };
    fetchUser();
  }, [navigate]);

  // Fetch orders and suppliers
  useEffect(() => {
    const fetchOrdersAndSuppliers = async () => {
      try {
        if (user) {
          // Fetch orders
          const ordersResponse = await appwriteService.getPurchaseOrders(
            Query.equal("User_ID", [user?.$id])
          );
          const ordersData = ordersResponse.documents;

          // Extract unique supplier IDs
          const supplierIds = [
            ...new Set(ordersData.map((order) => order.supplier_Id)),
          ];

          // Fetch suppliers
          const suppliersData = {};
          await Promise.all(
            supplierIds.map(async (supplierId) => {
              const supplierResponse = await appwriteService.getSupplier(
                supplierId
              );
              suppliersData[supplierId] = supplierResponse;
            })
          );

          setOrders(ordersData);
          setSuppliers(suppliersData);
          setIsLoading(false);
        }
      } catch (error) {
        setError("Failed to fetch orders or suppliers");
        setIsLoading(false);
      }
    };

    fetchOrdersAndSuppliers();
  }, [user]);

  // Delete order function
  const handleDelete = async (id) => {
    try {
      await appwriteService.deleteOrder(id);
      setOrders(orders.filter((order) => order.$id !== id));
    } catch (error) {
      setError("Failed to delete order");
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mt-8 mb-4">Orders</h1>
      <Button
        className="absolute top-6 right-6 bg-transparent text-blue-700 p-2 rounded-md hover: bg-green-500 hover:text-white"
        onClick={() =>
          navigate(
            "/InventoryManagementSystem/src/pages/order/AddOrderPage.jsx"
          )
        }
      >
        Add New Product
      </Button>
      {isLoading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Supplier Name</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.$id}>
                <TableCell>{order.$id}</TableCell>
                <TableCell>{order.Order_Date}</TableCell>
                <TableCell>{order.Total_Amount}</TableCell>
                <TableCell>{order.Order_Status}</TableCell>
                <TableCell>
                  {suppliers[order.supplier_Id]?.Supplier_Name || "Unknown"}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDelete(order.$id)}
                    variant="danger"
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
