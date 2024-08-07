import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header, SideBar } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  return !isLoading ? (
    <div className=" flex flex-wrap flex-col content-between bg-gray-100">
      <div className="w-full flex flex-col">
        <Header/>
        <main>
        <SideBar/>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}
export default App;
