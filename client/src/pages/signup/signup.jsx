import React from "react";
import { Link } from "react-router-dom";
import "../signup/signup.scss";

const signup = () => {
  return (
    <div className="signup">
      <div className="signup-box">
        <h2 className="heading">Signup</h2>
        <form>
          <label htmlFor="name">Name</label>
          <input type="text" className="email" id="email"></input>
          <label htmlFor="email">Email</label>
          <input type="email" className="email" id="email"></input>
          <label htmlFor="password">Password</label>
          <input type="password" className="password" id="password"></input>
          <input type="submit" className="submit"></input>
          <label className="link">
            Have an account? <Link to="/login">Login</Link>
          </label>
        </form>
      </div>
    </div>
  );
};

export default signup;
