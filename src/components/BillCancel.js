import React, { useState } from "react";
import firebase from "../firebase";

const BillCancel = ({ show, close, bill }) => {
  const [barcode, setBarcode] = useState("");

  const GetBill = () => {
    firebase
      .firestore()
      .collection("history")
      .doc(barcode)
      .get()
      .then((doc) => {
        if (doc.data().status === "normal") {
          bill({
            item: [...doc.data().items],
            bill: barcode,
            counter: doc.data().counter,
          });
          close();
        } else {
          alert("ไม่พบบิลนี้");
        }
      })
      .catch((err) => alert("ไม่พบบิลนี้"));
  };
  return (
    <>
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
            minHeight: "300px",
            gap: 20,
            padding: 10,
          }}
        >
          <div
            style={{
              width: "25vw",
              minHeight: "30vh",
              background: "white",
              borderRadius: 10,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <h1>กรอกหมายเลขบิล</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                GetBill();
              }}
            >
              <input
                style={{
                  borderRadius: 10,
                  outline: "none",
                  border: "1px solid black",
                  padding: 10,
                }}
                type="number"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
              />
            </form>

            <button
              style={{
                cursor: "pointer",
                outline: "none",
                background: "red",
                border: "none",
                borderRadius: 20,
                padding: "10px 40px",
                color: "white",
              }}
              onClick={() => close()}
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default BillCancel;
