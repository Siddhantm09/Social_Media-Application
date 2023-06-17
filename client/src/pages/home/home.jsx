//
import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router";
import "./home.scss";

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
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
