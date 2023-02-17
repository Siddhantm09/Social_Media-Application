import React, { useState } from "react";
import { Link } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import "../signup/signup.scss";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = async (e) => {
    e.preventDefault();
    try {
      const signUpResult = await axiosClient.post("/auth/signup", {
        name,
        email,
        password,
      });
      console.log("signUp", signUpResult);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup">
      <div className="signup-box">
        <h2 className="heading">Signup</h2>
        <form onSubmit={handleChange}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="name"
            id="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
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
            Have an account? <Link to="/login">Login</Link>
          </label>
        </form>
      </div>
    </div>
  );
};

export default Signup;
