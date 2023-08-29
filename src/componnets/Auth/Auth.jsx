import React, { useState } from "react";
import "./Auth.css";
import welocomeVideo from "./loginbg.mp4";
import Login from "./login/Login";
import SignUp from "./signup/SignUp";

const Auth = () => {
  const [login, setLogin] = useState(true);
  const [showSendingModal, setShowSendingModal] = useState(false);
  const loginHandler = () => {
    setLogin(true);
  };
  const signHandler = () => {
    setLogin(false);
  };
  return (
    <>
      <div className="video-background">
        <video autoPlay muted loop>
          <source src={welocomeVideo} type="video/mp4" />
        </video>
        <div
          className="d-flex justify-content-center align-items-center flex-column"
          style={{ height: "100vh" }}
        >
          <div className="auth-Toggle">
            <span
              className={login ? "auth-login active" : "auth-login"}
              onClick={loginHandler}
            >
              Login
            </span>
            <span
              className={!login ? "auth-signup active" : "auth-signup"}
              onClick={signHandler}
            >
              Signup
            </span>
          </div>
          {!login && (
            <SignUp
              signup={loginHandler}
              showModal={setShowSendingModal}
            ></SignUp>
          )}
          {login && (
            <Login login={signHandler} showModal={setShowSendingModal}></Login>
          )}

          {showSendingModal && (
            <div className="Auth-load-modal">
              <div class="Auth-loader"></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Auth;
