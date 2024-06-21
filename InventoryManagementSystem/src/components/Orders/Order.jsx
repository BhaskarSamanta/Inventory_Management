import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import appwriteService from '../../appwrite/config'
import authService from '@/appwrite/auth'
import { Query } from 'appwrite'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../ui/form.jsx'

function Order() {

  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  // fetching the current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (!currentUser) {
          navigate('/Login');
        } else {
          setUser(currentUser);
        }
      } catch (error) {
        setError("Failed to fetch user", error);
      }
    };
    fetchUser();
  }, [navigate]);


  // fetching user for the logedin user
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user) {
          const orders = await appwriteService.getPurchaseOrders(Query.equal("User_ID", [user?.$id]));
          setOrders(orders.documents);
          setIsLoading(false);
        }
      } catch (error) {
        setError("Failed to fetch orders", error);
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user]); 

  const hadleDelete = async (id) => {
    try {
      await appwriteService.deleteOrder(id);
      setOrders(orders.filter((order) => order.$id !== id));
    } catch (error) {
      throw ("Appwrite serive :: deleteOrder :: error",error);
    }
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mt-8 mb-4">Orders</h1>
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
              <TableHead>Action</TableHead> {/* New table head for action buttons */}
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
                  <Button onClick={() => hadleDelete(order.$id)} variant="danger">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  )
}

export default Order