import { useState, useEffect } from "react";
import firebase from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";

const QRScanStatus = ({ open }) => {
  const [show, setShow] = useState(false);
  const url = new URL(window.location.href);
  const counter = url.searchParams.get("counter");

  useEffect(() => {
    setShow(open);
  }, [open]);

  useEffect(() => {
    const reset = () => {
      firebase
        .firestore()
        .collection("counter")
        .doc(counter)
        .set({ qrBill: "" }, { merge: true });
    };
    reset();
  }, [show]);
  return (
    <div
      style={{
        position: "fixed",
        backgroundColor: "rgba(0,0,0,0.5)",
        minWidth: "100vw",
        minHeight: "100vh",
        display: show ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: 50,
          width: "500px",
          height: "300px",
          gap: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesomeIcon
            icon={faQrcode}
            size="2x"
            style={{ alignSelf: "center", cursor: "pointer" }}
          />

          <h1>รอลูกค้าแสกนผ่านแอพ</h1>
        </div>
        <button
          style={{
            cursor: "pointer",
            border: "none",
            outline: "none",
            backgroundColor: "#0099FF",
            padding: "10px 50px",
            borderRadius: 20,
            fontSize: 18,
            color: "white",
          }}
          onClick={() => setShow(false)}
        >
          ปิด
        </button>
      </div>
    </div>
  );
};
export default QRScanStatus;
