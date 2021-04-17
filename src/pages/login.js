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

    // firebase.auth().signOut()
    // console.log(firebase.auth().currentUser !== null);
    // firebase
    //   .auth()
    //   .signInAnonymously()
    //   .then(() => cookie.set("logined", "true"))
    //   .catch((err) => console.log(err));
    // firebase.firestore().collection("test").doc("iJd4VqFRxVMc2MiAXjiT").get().then(doc => alert(doc.data().status)).catch((err) => alert(err.code))
    // firebase.auth().signOut().then(()=> alert("Signed Out !"))
  }, []);

  return (
    <div className="container">
      <div className="loginBox">
        <h3 style={{ color: "red", fontSize: 22 }}>
          ไม่ได้รับอนุญาต หากเกิดข้อผิดพลาดติดต่อแอดมิน
        </h3>
        {/* <div className="loginForm">
          <input type="text" placeholder="ชื่อผู้ใช้" className="formBox" />
          <input type="text" placeholder="รหัผ่าน" className="formBox"/>
        </div> */}
      </div>
    </div>
  );
}

export default Login;
