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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { AddCategory } from "../index.js";
export default function Categorys() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [categories, setCatagories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddCategory, setIsAddCategory] = useState(false);

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

  const handleAddCategory = () => {
    setIsAddCategory(false);
    fetchCatagories(user.$id);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-700">
        Categories
      </h2>
      <Dialog
            className=" mb-4"
            open={isAddCategory}
            onOpenChange={setIsAddCategory}
          >
            <DialogTrigger asChild>
              <Button onClick={() => setIsAddCategory(true)}>
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  <AddCategory onCategoryAdded={handleAddCategory} />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

      {isLoading ? (
        <div className="space-y-4 mt-5">
          <Skeleton className="w-full h-[50px] rounded-full bg-gray-300" />
          <Skeleton className="w-full h-[50px] rounded-full bg-gray-300" />
          <Skeleton className="w-full h-[50px] rounded-full bg-gray-300" />
          <Skeleton className="w-full h-[50px] rounded-full bg-gray-300" />
          <Skeleton className="w-full h-[50px] rounded-full bg-gray-300" />
        </div>
      ) : categories.length === 0 ? (
        <p className="text-center">
          No categories available.{" "}
          <Dialog
            className=" mb-4"
            open={isAddCategory}
            onOpenChange={setIsAddCategory}
          >
            <DialogTrigger asChild>
              <Button onClick={() => setIsAddCategory(true)}>
                Add Category
              </Button>
            </DialogTrigger> 
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  <AddCategory onProductAdded={handleAddCategory} />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </p>
      ) : (
        <Table className="min-w-full bg-gray-700 bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg shadow-md pt-4">
          <TableHeader className="bg-gray-100 border-b">
            <TableRow>
              <TableHead className="pl-10 text-left">Category Name</TableHead>
              <TableHead className="p-4 text-left">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow
                key={category.$id}
                className="transition duration-200 bg-slate-100 ease-in-out transform hover:scale-x-105 hover:shadow-lg hover:z-50 relative"
              >
                <TableCell className="pl-20">
                  {category.Category_Name}
                </TableCell>
                <TableCell className="p-4">
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
