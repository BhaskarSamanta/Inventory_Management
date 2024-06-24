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

export default function Categorys() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [categories, setCatagories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        fetchCatagories(currentUser.$id);
      } else {
        navigate("/Login");
      }
    } catch (error) {
      setError("Error fetching user information. Please try again.");
      console.error("Appwrite service :: fetchUser :: error", error);
    }
  };

  const fetchCatagories = async (user_id) => {
    try {
      const query = Query.equal("User_ID", user_id)
      const response = await appwriteService.getCatagories([query]);
      setCatagories(response.documents);
      setIsLoading(false);
    } catch (error) {
      console.error("Appwrite serive :: fetchCatagories :: error", error);
      setIsLoading(false);
    }
  };

  const handleDelete = async (catagoryId) => {
    try {
      await appwriteService.deleteCatagory(catagoryId);
      setCatagories(
        categories.filter((catagory) => catagory.$id !== catagoryId)
      );
    } catch (error) {
      console.error("Error deleting catagory:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="p-6 bg-gray-800 text-gray-200 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">Categories</h2>
            <Button
                className="absolute top-6 right-6 bg-transparent text-blue-700 p-2 rounded-md hover:bg-green-500 hover:text-white"
                onClick={() => navigate("/catagory/add")}
            >
                Add New Category
            </Button>

            {isLoading ? (
                <p>Loading...</p>
            ) : categories.length === 0 ? (
                <p className="text-center">
                    No categories available.{" "}
                    <Button
                        className="text-blue-500 bg-transparent"
                        onClick={() => navigate("/catagory/add")}
                    >
                        Add a category
                    </Button>
                </p>
            ) : (
                <Table className="min-w-full bg-gray-700 bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-md shadow-md">
                    <TableHeader>
                        <TableRow className="text-left">
                            <TableHead className="p-4 border-b border-gray-600">
                                Category Name
                            </TableHead>
                            <TableHead className="p-4 border-b border-gray-600">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.$id} className="hover:bg-gray-600">
                                <TableCell className="p-4 border-b border-gray-600">
                                    {category.Category_Name}
                                </TableCell>
                                <TableCell className="p-4 border-b border-gray-600">
                                    <Button
                                        className="bg-red-700 text-white p-2 rounded-md transition-transform duration-200 transform hover:scale-110"
                                        onClick={() => handleDelete(category.$id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
  );
}
