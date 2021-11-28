import React, { useState, useEffect } from "react";
import "../../App.css";

import firebase from "../../firebase";

import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const [submit, setSubmit] = useState(false);

  const history = useHistory();
  const cookies = new Cookies();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        history.replace("/admin/dashboard");
      }
    });
  }, []);

  const Login = async (e) => {
    e.preventDefault();

    if (!submit && email.length > 0 && password.length > 0) {
      setSubmit(true);
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          async () => (
            await cookies.set("admin", "true"),
            history.replace("/admin/dashboard")
          )
        )
        .catch(
          (err) => (
            console.log(err.code),
            err.code === "auth/user-not-found" && setErrMsg("ไม่พบผู้ใช้นี้"),
            err.code === "auth/wrong-password" && setErrMsg("รหัสผ่านผิด")
          )
        );
      setSubmit(false);
    }
  };
  return (
    <div className="container" id="form">
      <form
        onSubmit={Login}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          width: "30%",
          boxShadow: "0px 0px 2px 0.5px rgba(0,0,0,0.5)",
          borderRadius: 20,
          padding: 20,
        }}
      >
        <h2>ล็อคอิน</h2>

        <h3
          style={{
            display: errMsg.length > 0 ? "block" : "none",
            color: "red",
          }}
        >
          {errMsg}
        </h3>

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <h4>อีเมล</h4>
          <input
            className="loginBox"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <h4>รหัสผ่าน</h4>
          <input
            className="loginBox"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          style={{
            cursor:
              !submit && email.length > 0 && password.length > 0
                ? "pointer"
                : "not-allowed",
            border: "none",
            background:
              !submit && email.length > 0 && password.length > 0
                ? "#0099FF"
                : "lightGrey",
            outline: "none",
            padding: "16px 50px",
            borderRadius: 50,
            color: "white",
          }}
        >
          เข้าสู่ระบบ
        </button>
      </form>
    </div>
  );
}

export default Admin;
