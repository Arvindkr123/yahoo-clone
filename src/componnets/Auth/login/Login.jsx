import React, { useRef, useState } from "react";
import "./login.css";
import { Button, Card, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();
  const inputEmail = useRef();
  const inputPass = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const apiKey = process.env.REACT_APP_API_KEY;
  let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

  const Loginhandler = async (e) => {
    e.preventDefault();
    props.showModal(true);
    let userLog = {
      email: inputEmail.current.value,
      password: inputPass.current.value,
    };
    if (
      inputPass.current.value !== "" &&
      inputEmail.current.value.indexOf("@")
    ) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userLog),
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Login successful:", data);
          localStorage.setItem("idToken", data.idToken);
          localStorage.setItem("email", data.email);
          toast.success("Logged in successfully");
        } else {
          const errorData = await response.json();
          console.log("Failed to login:", errorData);
        }
      } catch (error) {
        console.log("Failed to login:", error);
      }
      inputEmail.current.value = "";
      inputPass.current.value = "";
    } else {
      toast.error("Invalid Credential entetered");
      props.showModal(false);
    }
    props.showModal(false);
    navigate("/home");
  };
  return (
    <div>
      <Card className="p-4 Login-bg">
        <h2 className="mb-4 text-center Login-title">Log in</h2>
        <Form className="Login-form" onSubmit={Loginhandler}>
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Label className="text-left"> Email address</Form.Label>
            <Form.Control
              ref={inputEmail}
              type="email"
              placeholder="Enter email"
              className="form-control-custom Login-inputbg"
            />
          </Form.Group>

          <Form.Group className="mb-1" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              ref={inputPass}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="form-control-custom Login-inputbg"
            />
          </Form.Group>
          <Form.Check
            className="Login-show-password"
            type="checkbox"
            label="Show Password"
            onChange={() => setShowPassword((prevShow) => !prevShow)}
          />
          <Button
            className="w-100 Login-font-weight"
            variant="primary"
            type="submit"
          >
            Log in
          </Button>
        </Form>
        <span
          className="Login-haveaccount Login-font-weight"
          onClick={() => {
            props.login();
          }}
        >
          {" "}
          Don't have an acccount / Sign up{" "}
        </span>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default Login;
