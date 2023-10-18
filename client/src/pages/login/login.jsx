import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../login/login.scss";
import { axiosClient } from "../../utils/axiosClient";
import { setItem, KEY_ACCESS_TOKEN } from "../../utils/localStorage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axiosClient.post("/auth/login", {
        email,
        password,
      });
      console.log(result.result.accessToken, "Login");
      setItem(KEY_ACCESS_TOKEN, result.result.accessToken);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login">
      <div className="login-box">
        <h2 className="heading">Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="email"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <input type="submit" className="submit"></input>
          <label className="link">
            Don't have an account? <Link to="/signup">Register</Link>
          </label>
        </form>
      </div>
    </div>
  );
};

export default Login;
