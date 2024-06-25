import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { login, sentotp } from "../api/allapi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setemail } from "../redux/emailSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, seterror] = useState();

  const dispatch=useDispatch()


  const navigate=useNavigate()

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const hadlelogin = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const { email, password } = formData;

      if (!email || !password) {
        alert("please fill the form");
      } else {
        const result = await login(formData);
        console.log(result);
        if(result.status==200){
        dispatch(setemail(email))
         navigate('/otp')
        }
      }
    } catch (error) {
      console.log(error);
      seterror(error.response.data.message);
    }
  };

  setTimeout(() => {
    seterror("");
  }, 4000);

  const main = {
    height: "400px",
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div
        style={main}
        className="w-50 bg-info mt-5 border border-dark rounded-5"
      >
        <h1 className="text-center mt-5">Login</h1>
        <br />
        <div className="w-100 d-flex justify-content-center">
          <form onSubmit={hadlelogin} className="w-50">
            <Form.Control
              onChange={handlechange}
              name="email"
              value={formData.email}
              type="email"
              placeholder="email"
            />
            <br />
            <Form.Control
              onChange={handlechange}
              name="password"
              value={formData.password}
              type="password"
              placeholder="password"
            />
            {error && <p className="kk text-center text-danger">{error}</p>}

            <div className="d-flex justify-content mt-4">
              <Button variant="success" type="submit" className="w-50">
                Login
              </Button>
              <Link to={'/sign'}   className="ms-3">
                signup
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
