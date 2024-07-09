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
import { Skeleton } from "@/components/ui/skeleton";

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
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-700">
        Suppliers
      </h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className=" mb-3">
        <Button
          className=" rounded-md hover:bg-green-800 transition"
          onClick={() => navigate("/suppliers/add")}
        >
          Add New Supplier
        </Button>
      </div>

      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="space-y-4 mt-5">
            <Skeleton className="w-full h-[50px] rounded-full bg-gray-300" />
            <Skeleton className="w-full h-[50px] rounded-full bg-gray-300" />
            <Skeleton className="w-full h-[50px] rounded-full bg-gray-300" />
            <Skeleton className="w-full h-[50px] rounded-full bg-gray-300" />
            <Skeleton className="w-full h-[50px] rounded-full bg-gray-300" />
          </div>
        ) : (
          <Table className="table-auto w-full bg-white shadow-md rounded-lg">
            <TableHeader className="bg-gray-100 border-b">
              <TableRow>
                <TableHead className="pl-10 text-left">Supplier Name</TableHead>
                <TableHead className="p-4 text-left">Address</TableHead>
                <TableHead className="p-4 text-left">Contact</TableHead>
                <TableHead className="p-4 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers.map((supplier) => (
                <TableRow
                  key={supplier.$id}
                  className="transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg hover:z-50 relative"
                >
                  <TableCell className="pl-10">
                    {supplier.Supplier_Name}
                  </TableCell>
                  <TableCell className="p-4">{supplier.Address}</TableCell>
                  <TableCell className="p-4">{supplier.Contact}</TableCell>
                  <TableCell className="p-4 text-center">
                    <div className="flex justify-center">
                      <Button
                        onClick={() =>
                          navigate(`/suppliers/edit/${supplier.$id}`)
                        }
                        className=" hover:text-blue-700 transition duration-200 mr-2"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => deleteSupplier(supplier.$id)}
                        className="text-red-100 hover:text-red-100 transition duration-300 bg-red-600 p-2 rounded-md"
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
    </div>
  );
}

export default Suppliers;
