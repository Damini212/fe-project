import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="navbar">
      <h1>Welcome to my blog!</h1>
      <Link to="/">
        <button className="home-btn">Home Page</button>
      </Link>
    </div>
  );
};
