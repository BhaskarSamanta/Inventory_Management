import React, {useEffect, useState} from "react";
import BarChart from './BarChart';
import appwriteService from "../../appwrite/config.js";
import authService from "../../appwrite/auth.js";
import { Query } from "appwrite";

function DashBoard() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();
    const [userID,setuserID] = useState("");


     useEffect(() => {
        const fetchproducts = async () => {
            try {
                const user = await authService.getCurrentUser();
                if(!user){
                   history.push("/Login");
                }
                setuserID(user.$id);
                const response = await appwriteService.getProducts(Query.equal( userID , [user.$id]));
                setProducts(response.documents);
                setIsLoading(false);
            } catch (error) {
                console.error('error fetching products:', error);
                setIsLoading(false);
            }
        }
        fetchproducts();
     },[])

  return (
    <div>
        <h1 className="text-center text-2xl font-bold leading-tight pb-4 text-gray-400">Product Stock Dashboard</h1>
        {isLoading? 
        (<p>Loading...</p>): 
        (<BarChart products={products} />)
        }
    </div>
  );
};

export default DashBoard