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
import { generatePDF } from "../../utils/pdfGenerator.js";

export default function SalesReport() {
  const navigate = useNavigate();
  const [SalesReport, setSalesReport] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (!currentUser) {
          navigate("/Login");
        } else {
          setUser(currentUser);
        }
      } catch (error) {
        setError("Error fetching user information. Please try again.");
        console.error("Appwrite service :: fetchUser :: error", error);
      }
    };

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchsalesReport(user.$id);
    }
  }, [user]);

  const fetchsalesReport = async (user_id) => {
    const query = Query.equal("User_ID", user_id);
    try {
      const response = await appwriteService.getSalesReports([query]);
      setSalesReport(response.documents);
      fetchProducts(response.documents.map((doc) => doc.Product_ID));
    } catch (error) {
      setError("Failed to fetch order details.");
      console.error("Appwrite service :: fetchSalesReport :: error", error);
      setIsLoading(false);
    }
  };

  const fetchProducts = async (productIds) => {
    try {
      const query = Query.equal("Product_ID", productIds);
      const response = await appwriteService.getProducts([query]);
      setProducts(response.documents);
      setIsLoading(false);
    } catch (error) {
      setError("Failed to fetch products.");
      console.error("Appwrite service :: fetchProducts :: error", error);
      setIsLoading(false);
    }
  };

  const getProductById = (productId) => {
    const product = products.find((p) => p.$id === productId);
    return product ? product.Product_Name : "Unknown Product";
  };

  const handleDownload = (salesReport) => {
    const productName = getProductById(salesReport.Product_ID);
    generatePDF(salesReport, productName,salesReport.CustomarAddress, salesReport.CustomarName );
  };

  const handleDelete = (id)=>{
    appwriteService.deleteSalesReport(id);
    fetchsalesReport(user.$id);
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mt-8 mb-4 text-gray-700">Sales Report</h1>
      <Button
        className="rounded-md hover:bg-green-800 transition mb-4"
        onClick={() => navigate("/salesReport/add")}
      >
        Add new Sales Report
      </Button>
      {isLoading ? (
        <div className="space-y-4 mt-5">
            <Skeleton className="w-full h-[50px] rounded-full bg-gray-300" />
            <Skeleton className="w-full h-[50px] rounded-full bg-gray-300" />
            <Skeleton className="w-full h-[50px] rounded-full bg-gray-300" />
            <Skeleton className="w-full h-[50px] rounded-full bg-gray-300" />
            <Skeleton className="w-full h-[50px] rounded-full bg-gray-300" />
          </div>
      
      ) : SalesReport.length === 0 ? (
        <p className="text-gray-500">No sales Report found. <Button className="rounded-md hover:bg-green-800 transition" onClick={() => navigate("/salesReport/add")}>Add new</Button></p>
      ) : (
        <Table className="table-auto w-full bg-white shadow-md rounded-lg">
          <TableHeader className="bg-gray-100 border-b">
            <TableRow>
              <TableHead className="pl-10 text-center">Product Name</TableHead>
              <TableHead className="p-4 text-left">Quantity</TableHead>
              <TableHead className="p-4 text-left">Unit Price</TableHead>
              <TableHead className="p-4 text-left">Total Price</TableHead>
              <TableHead className="p-4 text-center">Date</TableHead>
              <TableHead className="p-4 text-center">Customer Name</TableHead>
              <TableHead className="p-4 text-center">Customer Address</TableHead>
              <TableHead className="p-4 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SalesReport.map((salesReport) => (
              <TableRow key={salesReport.$id} className="transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg hover:z-50 relative">
                <TableCell className="pl-10 text-center">{getProductById(salesReport.Product_ID)}</TableCell>
                <TableCell className=" px-4">{salesReport.Quantity}</TableCell>
                <TableCell className=" px-4">₹ {salesReport.Unit_Price}</TableCell>
                <TableCell className=" px-4">₹ {salesReport.Total_Price}</TableCell>
                <TableCell className=" text-center">{new Date(salesReport.Date).toLocaleDateString()}</TableCell>
                <TableCell className=" px-4 text-center"> {salesReport.CustomarName}</TableCell>
                <TableCell className=" px-4 text-center"> {salesReport.CustomarAddress}</TableCell>
                <TableCell className="p-4 text-center">
                  <div className="flex flex-col">
                  <Button
                    className="w-28 mb-1"
                    onClick={() => handleDownload(salesReport)}
                  >
                    Download PDF
                  </Button>
                  <Button
                    className="bg-red-600 text-white w-28 rounded-md hover:bg-red-700"
                    onClick={() => handleDelete(salesReport.$id)}
                  >
                    Delete
                  </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
