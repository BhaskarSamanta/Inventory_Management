import React, { useState, useEffect } from "react";
import appwriteService from "../../appwrite/config.js";
import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth.js";
import { Query } from "appwrite";
import { Button } from "../index.js";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../ui/table.jsx";

function Suppliers() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        fetchSuppliers(currentUser.$id);
      } else {
        navigate("/Login");
      }
    } catch (error) {
      setError("Error fetching user information. Please try again.");
      console.error("Appwrite service :: fetchUser :: error", error);
    }
  };

  const fetchSuppliers = async (userID) => {
    try {
      const query = Query.equal("User_ID", userID); // Create a single query object
      const suppliers = await appwriteService.getSuppliers([query]); // Pass query inside an array
      setSuppliers(suppliers.documents);
      setIsLoading(false);
      setError(null); // Reset error state on success
    } catch (error) {
      setError("Error fetching suppliers. Please try again.");
      console.error("Appwrite service :: fetchSuppliers :: error", error);
      setIsLoading(false);
    }
  };
  

  const deleteSupplier = async (supplierID) => {
    try {
      await appwriteService.deleteSupplier(supplierID);
      fetchSuppliers(user.$id); // Refetch suppliers after successful deletion
      setError(null); // Reset error state on success
    } catch (error) {
      setError("Error deleting supplier. Please try again.");
      console.error("Appwrite service :: deleteSupplier :: error", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="container mx-auto my-8 px-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Suppliers</h2>

      {/* Display loading message if suppliers are being fetched */}
      {isLoading && <div className="text-center">Loading suppliers...</div>}

      {/* Display error message if there is any */}
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {/* <div class=" bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-gray-800 text-white text-center rounded-lg p-2 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-opacity transition-transform duration-300 pointer-events-none"> */}
   
      <div className="flex justify-between items-center mb-4">
        <Button
          className=" bg-blue-500 text-white p-2 rounded-md hover:bg-green-600 transition"
          onClick={() => navigate("/suppliers/add")}
        >
          Add New Supplier
        </Button>
      </div>
  {/* </div> */}

      <div className="overflow-x-auto">
        <Table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <TableHeader className="bg-gray-800 text-white">
            <TableRow>
              <TableHead className="p-4 text-left">Supplier Name</TableHead>
              <TableHead className="p-4 text-left">Address</TableHead>
              <TableHead className="p-4 text-left">Contact</TableHead>
              <TableHead className="p-4 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow key={supplier.$id} className="border-b hover:bg-gray-100">
                <TableCell className="p-4">{supplier.Supplier_Name}</TableCell>
                <TableCell className="p-4">{supplier.Address}</TableCell>
                <TableCell className="p-4">{supplier.Contact}</TableCell>
                <TableCell className="p-4 text-center">
                  <Button
                    onClick={() => navigate(`/suppliers/edit/${supplier.$id}`)}
                    className="text-blue-500 hover:text-blue-700 transition duration-200 mr-2"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteSupplier(supplier.$id)}
                    className="text-red-500 hover:text-red-700 transition duration-200"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Suppliers;
