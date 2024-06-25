import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { signuser } from "../api/allapi";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, seterror] = useState();

  const navigate = useNavigate();

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const hadlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { username, email, password } = formData;

      if (!username || !email || !password) {
        alert("please fill the form");
      } else {
        const result = await signuser(formData);
        console.log(result);

        if (result.status == 200) {
          navigate("/login");
        }
      }
    } catch (error) {
      console.log(error);
      seterror(error.response.data.message);
    }
  };

  const main = {
    height: "400px",
  };

  return (
    <div>
      <div className="d-flex justify-content-center mt-5">
        <div
          style={main}
          className="main w-50 bg-info mt-5 border-2 rounded-5 "
        >
          <h1 className="text-center fw-bold mt-5">SIGN UP</h1>
          <div className="d-flex justify-content-center">
            <form onSubmit={hadlesubmit} action="" className="w-50">
              <Form.Control
                name="username"
                value={formData.username}
                onChange={handlechange}
                type="text"
                placeholder="username"
              />
              <br />
              <Form.Control
                value={formData.email}
                name="email"
                onChange={handlechange}
                type="email"
                placeholder="email"
              />
              <br />
              <Form.Control
                value={formData.password}
                name="password"
                onChange={handlechange}
                type="password"
                placeholder="password"
              />
              <div>
                {error && <p className="kk text-center text-danger">{error}</p>}
              </div>

              <div className="text-center mt-2">
                <Button variant="success" type="submit" className="mm w-50 ">
                  signup
                </Button>
                <Link to={"/login"} variant="success" className="mm w-50 ms-2 ">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
