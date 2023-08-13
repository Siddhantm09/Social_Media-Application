import { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router";
import "./home.scss";
import { useDispatch } from "react-redux";
import { getMyInfo } from "../../redux/slices/appConfigSlice";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyInfo());
  }, []);

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
