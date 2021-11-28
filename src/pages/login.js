import React, { useEffect } from "react";
import "../App.css";
import firebase from "../firebase";
import { useHistory } from "react-router-dom";

import Cookie from "universal-cookie";
function Login() {
  const history = useHistory();
  const cookie = new Cookie();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        history.replace("merchant/checkout");
      }
    });
  }, []);

  return (
    <div className="container">
      <div className="loginBox">
        <h3 style={{ color: "red", fontSize: 22 }}>
          ไม่ได้รับอนุญาต หากเกิดข้อผิดพลาดติดต่อแอดมิน
        </h3>
      </div>
    </div>
  );
}

export default Login;
