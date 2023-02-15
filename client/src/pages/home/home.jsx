import React, { useEffect } from "react";
import { axiosClient } from "../../utils/axiosClient";

const Home = () => {
  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchAllPosts = async () => {
    const response = await axiosClient.get("/posts/all");

    console.log("postResponse", response);
  };

  return <div>Home</div>;
};

export default Home;
