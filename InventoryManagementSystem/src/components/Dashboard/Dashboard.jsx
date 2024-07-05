import React, { useEffect, useState } from "react";
import BarChart from './BarChart';
import appwriteService from "../../appwrite/config.js";
import authService from "../../appwrite/auth.js";
import { Query } from "appwrite";
import { useNavigate } from "react-router";

function DashBoard() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [userID, setUserID] = useState("");
    const [chartHeight, setChartHeight] = useState(400); // Set an initial height

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const user = await authService.getCurrentUser();
                if (!user) {
                    navigate("/Login");
                }
                setUserID(user.$id);
                const response = await appwriteService.getProducts([Query.equal('User_ID', user.$id)]);
                setProducts(response.documents);
                setIsLoading(false);
            } catch (error) {
                console.error('error fetching products:', error);
                setIsLoading(false);
            }
        }
        fetchProducts();
    }, [userID, navigate]);

    // Adjust height dynamically if needed
    useEffect(() => {
        const handleResize = () => {
            // Example: Adjust height based on window inner height
            setChartHeight(window.innerHeight * 0.5); // Adjust as per your layout needs
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="flex flex-col bg-gray-100 rounded-sm shadow-2xl pb-4">
            <h1 className="text-center text-2xl font-bold leading-tight pb-4 text-slate">Product Stock Dashboard</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                products.length === 0 ? (
                    <div className="text-center text-lg font-semibold text-red-500">
                        No products in inventory. Please add stock to display the dashboard.
                    </div>
                ) : (
                    <div style={{ height: chartHeight }}>
                        <BarChart data={products} height={chartHeight} />
                    </div>
                )
            )}
        </div>
    );
};

export default DashBoard;
