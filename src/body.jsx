import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./navbar";
import Footer from "./footer";
import axios from "axios";
import { base_url } from "./utils/constants";
import { addUser } from "./utils/userSlice";
const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    console.log(userData);
    if (userData) return;
    try {
      const res = await axios.get(base_url + "profile/view", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addUser(res.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen" data-theme="dark">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
