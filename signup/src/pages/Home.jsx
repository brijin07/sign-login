import React from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="d-flex justify-content-evenly">
      <h1>welcome home </h1>
      {!localStorage.getItem("token") ? (
        <Link to={"/login"} className="mt-2">
          <Button>Login</Button>
        </Link>
      ) : (
        <div style={{ height: "10px" }} className="mt-2">
          <Button onClick={logout}>Logout</Button>
        </div>
      )}
    </div>
  );
};

export default Home;
