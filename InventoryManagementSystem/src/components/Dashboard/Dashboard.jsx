import React, {useEffect, useState} from "react";
import BarChart from './BarChart';
import appwriteService from "../../appwrite/config.js";
import authService from "../../appwrite/auth.js";
import { Query } from "appwrite";
import { useNavigate } from "react-router";

function DashBoard() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [userID,setuserID] = useState("");


     useEffect(() => {
        const fetchproducts = async () => {
            try {
                const user = await authService.getCurrentUser();
                if(!user){
                   navigate("/Login");
                }
                setuserID(user.$id);
                const response = await appwriteService.getProducts(Query.equal( 'User_ID' , [user.$id]));
                setProducts(response.documents);
                setIsLoading(false);
            } catch (error) {
                console.error('error fetching products:', error);
                setIsLoading(false);
            }
        }
        fetchproducts();
     },[ userID, navigate])

  return (
    <div>
      <h1 className="text-center text-2xl font-bold leading-tight pb-4 text-gray-400">Product Stock Dashboard</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        products.length === 0 ? (
          <div className="text-center text-lg font-semibold text-red-500">
            No products in inventory. Please add stock to display the dashboard.
          </div>
        ) : (
          <BarChart data={products} />
        )
      )}
    </div>
  );
};

export default DashBoard