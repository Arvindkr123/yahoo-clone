import React, { useEffect, useRef } from "react";
import { Route, Routes } from "react-router";
import Home from "./componnets/Home/Home";
import Auth from "./componnets/Auth/Auth";
import { useDispatch } from "react-redux";
import { addMail } from "./Store/mail-slice";

const App = () => {
  const isInitialRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isInitialRef.current) {
      isInitialRef.current = false;
      const url = process.env.REACT_APP_URL;
      fetch(url)
        .then((response) => {
          if (!response) {
            throw new Error("Network issue");
          }
          return response.json();
        })
        .then((mailData) => {
          if (mailData) {
            Object.keys(mailData).forEach((mailId) => {
              let temp = {
                mailId,
                ...mailData[mailId],
              };
              if (
                temp.sender === localStorage.getItem("email") ||
                temp.reciver === localStorage.getItem("email")
              ) {
                dispatch(addMail(temp));
              }
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
      return;
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default App;
