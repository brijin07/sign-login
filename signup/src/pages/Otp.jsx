import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { sentotp } from "../api/allapi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const [err, seterror] = useState("");

  const navigate = useNavigate();

  const email = useSelector((state) => state.email.email);

  const hadlesubmit = async (e) => {
    try {
      e.preventDefault();
      console.log({ email, otp });
      const result = await sentotp(email, otp);
      console.log(result);
      if (result.status == 200) {
        alert("login successfully");
        localStorage.setItem("token", result.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      seterror(error.response.data.message);
      setTimeout(() => {
        seterror("");
      }, 1000);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div
        className=" bg-info w-50 d-flex justify-content-center align-items-center rounded-5"
        style={{ height: "300px" }}
      >
        <form action="" className="w-50" onSubmit={hadlesubmit}>
          <Form.Control
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="otp"
          />
          {err && <p className="text-danger text-center">{err}</p>}
          <div className="w-100 d-flex justify-content-center mt-2">
            <Button variant="success" type="submit" className="mm w-auto ">
              validate
            </Button>
            <Link className="ms-2" to={"/login"}>
              login again
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Otp;
