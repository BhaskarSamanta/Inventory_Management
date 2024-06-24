import React, { useState, useEffect } from "react";
import appwriteService from "../../appwrite/config.js";
import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth.js";
import { Button } from "../index.js";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../ui/table.jsx";
import { Query } from "appwrite";

function Supliers() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [supliers, setSupliers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        fetchSupliers(currentUser.$id);
      } else {
        navigate("/Login");
      }
    } catch (error) {
      setError(error)
      throw ("Appwrite serive :: fetchUser :: error", error);
    }
  };

  const fetchSupliers = async (userID) => {
    try {
      const supliers = await appwriteService.getSuppliers(
        Query.equal("User_ID", [userID])
      );
      setSupliers(supliers);
      setIsLoading(false);
    } catch (error) {
      throw ("Appwrite serive :: fetchSupliers :: error", error);
    }
  };

  const deleteSuplier = async (supplierID) => {
    try {
      await appwriteService.deleteSupplier(supplierID);
      fetchSupliers();
    } catch (error) {
      throw ("Appwrite serive :: deleteSupplier :: error", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return supliers ? (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">Suppliers</h2>
      <Button
        className="absolute top-6 right-6 bg-transparent text-blue-700 p-2 rounded-md hover: bg-green-500 hover:text-white"
        onClick={() =>
          navigate(
            "/suppliers/add"
          )
        }
      >
        Add New Supplier
      </Button>
      {isLoading && <div className="text-center">Loading suppliers...</div>}

      {/* {error && <div className="text-red-500 text-center mb-4">error</div>} */}
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
          {supliers.map((supplier) => (
            <TableRow key={supplier.$id} className="border-b hover:bg-gray-100">
              <TableCell className="p-4">{supplier.Supplier_Name}</TableCell>
              <TableCell className="p-4">{supplier.Address}</TableCell>
              <TableCell className="p-4">{supplier.Contact}</TableCell>
              <TableCell className="p-4 text-center">
                <Button
                  onClick={() => navigate(`/EditSupplier/${supplier.$id}`)}
                  className="text-blue-500 hover:text-blue-700 transition duration-200"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => deleteSuplier(supplier.$id)}
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
  ): (<h1><Button onClick={() => navigate('/suppliers/add')}>Add Suppliers</Button></h1>)
}

export default Supliers;
