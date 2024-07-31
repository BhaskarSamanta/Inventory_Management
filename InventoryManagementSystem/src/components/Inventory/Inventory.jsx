import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Query } from "appwrite";
import appwriteService from "../../appwrite/config";
import authService from "../../appwrite/auth";
import { Button } from "../index.js";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddItems, EditProduct } from "../index.js";
export default function Inventory() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState({});
  const [categories, setCategories] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddDialogOpen, setisAddDialogOpen] = useState(false); // State to control dialog visibility
  const [isEditDialogOpen, setisEditDialogOpen] = useState(false); // State to control dialog visibility
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null); // State to track the selected product

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Appwrite service :: getCurrentUser :: error", error);
        navigate("/login");
      }
    };

    fetchCurrentUser();
  }, [navigate]);

  const fetchData = async (userId) => {
    setIsLoading(true);
    try {
      const query = Query.equal("User_ID", userId);

      // Fetch products, suppliers, and categories concurrently
      const [productsResponse, suppliersResponse, categoriesResponse] =
        await Promise.all([
          appwriteService.getProducts([query]),
          appwriteService.getSuppliers([query]),
          appwriteService.getCatagories([query]),
        ]);

      // Log responses for debugging
      console.log("Products Response:", productsResponse);
      console.log("Suppliers Response:", suppliersResponse);
      console.log("Categories Response:", categoriesResponse);

      // Process products
      const productsData = productsResponse.documents;

      // Log product supplier and category IDs
      productsData.forEach((product) => {
        console.log(
          `Product ID: ${product.$id}, Supplier ID: ${product.Supplier_ID}, Category ID: ${product.Category_ID}`
        );
      });

      // Process suppliers
      const suppliersData = suppliersResponse.documents.reduce(
        (acc, supplier) => {
          acc[supplier.$id] = supplier.Supplier_Name;
          return acc;
        },
        {}
      );
      console.log("Mapped Suppliers:", suppliersData);

      // Process categories
      const categoriesData = categoriesResponse.documents.reduce(
        (acc, category) => {
          acc[category.$id] = category.Category_Name;
          return acc;
        },
        {}
      );
      console.log("Mapped Categories:", categoriesData);

      // Update states
      setProducts(productsData);
      setSuppliers(suppliersData);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData(user.$id);
    }
  }, [user]);

  const handleDelete = async (productId) => {
    try {
      await appwriteService.deleteProduct(productId);
      setProducts(products.filter((product) => product.$id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Failed to delete product.");
    }
  };

  const handleProductAdded = () => {
    setisAddDialogOpen(false);
    fetchData(user.$id);
  };

  const handleProductEditted = () => {
    setisEditDialogOpen(false);
    fetchData(user.$id);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg relative z-0">
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-700">
        Inventory
      </h2>

      {/* Add product button */}

      <Dialog
        className=" mb-4"
        open={isAddDialogOpen}
        onOpenChange={setisAddDialogOpen}
      >
        <DialogTrigger asChild>
          <Button onClick={() => setisAddDialogOpen(true)}>
            Add New Product
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              <AddItems onProductAdded={handleProductAdded} />
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
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-center">
          No products available.{" "}
          <Button
            className="text-blue-500"
            onClick={() => navigate("/Items/add")}
          >
            Add a product
          </Button>
        </p>
      ) : (
        <div className="overflow-x-auto relative z-0">
          <Table className="w-full bg-white shadow-md rounded-lg">
            <TableHeader className="bg-gray-100 border-b">
              <TableRow className="border-gray-200">
                <TableHead className="pl-8 py-2 text-left">
                  Product Name
                </TableHead>
                <TableHead className="px-4 py-2 text-left">Price</TableHead>
                <TableHead className="px-4 py-2 text-left">
                  Stock Quantity
                </TableHead>
                <TableHead className="px-4 py-2 text-left">Supplier</TableHead>
                <TableHead className="px-4 py-2 text-left">Category</TableHead>
                <TableHead className="px-4 py-2 text-left">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow
                  key={product.$id}
                  className="transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg hover:z-50 relative"
                >
                  <TableCell className="pl-8 py-2 border-t ">
                    {product.Product_Name}
                  </TableCell>
                  <TableCell className="px-4 py-2 border-t">
                    ₹ {product.Price}
                  </TableCell>
                  <TableCell className="px-4 py-2 border-t">
                    {product.Stock_Qty}
                  </TableCell>
                  <TableCell className="px-4 py-2 border-t">
                    {suppliers[product.Supplier_ID] || "Unknown Supplier"}
                  </TableCell>
                  <TableCell className="px-4 py-2 border-t">
                    {categories[product.Category_ID] || "Unknown Category"}
                  </TableCell>
                  <TableCell className="px-4 py-2 border-t">
                    <Dialog
                      className="mb-4"
                      open={isEditDialogOpen}
                      onOpenChange={setisEditDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button onClick={() => { 
                            setSelectedProduct(product);
                            setisEditDialogOpen(true);
                          }}
                        >
                          Edit Product
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{`Edit ${
                            selectedProduct?.Product_Name || ""
                          }`}</DialogTitle>
                          <DialogDescription>
                            <EditProduct
                              Product_ID={selectedProduct?.$id}
                              OnProductUpdated={handleProductEditted}
                            />
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>

                    <Button
                      className="bg-red-700 ml-2 mt-2 text-white p-2 rounded-md hover:bg-red-900"
                      onClick={() => handleDelete(product.$id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
