import React, { useRef } from "react";
import { Button, Card, Form } from "react-bootstrap";
import "./signup.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

const SignUp = (props) => {
  const inputEmail = useRef();
  const inputPass = useRef();
  const inputConfirmPass = useRef();

  const apiKey = process.env.REACT_APP_API_KEY;
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
  const submitHandler = async (e) => {
    e.preventDefault();
    let userLog = {
      email: inputEmail.current.value,
      password: inputPass.current.value,
    };
    try {
      if (
        inputPass.current.value === inputConfirmPass.current.value &&
        inputPass.current.value !== "" &&
        inputEmail.current.value.indexOf("@")
      ) {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userLog),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("User id creation is successfull");
        } else {
          console.log("Error creating user ID");
        }
        inputEmail.current.value = "";
        inputPass.current.value = "";
        inputConfirmPass.current.value = "";
      }
    } catch (error) {
      toast.error("Invalid Credential entetered");
      props.showModal(false);
    }
    props.showModal(false);
  };
  return (
    <div>
      <Card className="p-4 Signup-bg">
        <h2 className="mb-4 text-center Signup-title">Sign up</h2>
        <Form className="Signup-form" onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="text-left">Email address</Form.Label>
            <Form.Control
              ref={inputEmail}
              type="email"
              placeholder="Enter email"
              className="form-control-custom Signup-inputbg"
            />
          </Form.Group>
          <Form.Group className="mb-1" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              ref={inputPass}
              type="password"
              placeholder="Password"
              className="form-control-custom Signup-inputbg"
            />
          </Form.Group>
          <Form.Group className="mb-1" controlId="formBasicPassword">
            <Form.Label> Confirm Password</Form.Label>
            <Form.Control
              ref={inputConfirmPass}
              type="password"
              placeholder=" Confirm Password"
              className="form-control-custom Signup-inputbg"
            />
          </Form.Group>
          <Button
            className="w-100 Signup-font-weight"
            variant="primary"
            type="submit"
          >
            Sign Up
          </Button>
        </Form>
        <span
          className="Signup-haveaccount Signup-font-weight"
          onClick={() => props.signup()}
        >
          Have an Account / Log in
        </span>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
