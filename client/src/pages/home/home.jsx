import React, { useEffect } from "react";
import { axiosClient } from "../../utils/axiosClient";
import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router";

const Home = () => {
  // useEffect(() => {
  //   fetchAllPosts();
  // }, []);
  // const fetchAllPosts = async () => {
  //   const response = await axiosClient.get("/posts/all");
  //   console.log("postResponse", response);
  // };

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Home;
