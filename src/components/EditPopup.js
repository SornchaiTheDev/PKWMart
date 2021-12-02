import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarcode } from "@fortawesome/free-solid-svg-icons";
import BarcodeScanner from "react-barcode-reader";
import EditItem from "./EditItem";
import firebase from "../firebase";
function EditPopup({ setEdit, close, show }) {
  const [item, setItem] = useState({
    barcode: "",
    name: "",
    price: "",
    stock_amount: "",
  });
  const getItem = async (barcode) => {
    const doc = await firebase
      .firestore()
      .collection("stock")
      .doc(barcode)
      .get();

    const { name, price, stock_amount } = doc.data();
    setItem((prev) => ({ ...prev, barcode, name, price, stock_amount }));
  };

  return (
    <>
      <BarcodeScanner onScan={(data) => getItem(data)} />
      <div
        style={{
          position: "fixed",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "100vw",
          minHeight: "100vh",
          background: "rgba(0,0,0,0.25)",
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
          {item.barcode === "" ? (
            <>
              <FontAwesomeIcon icon={faBarcode} size="4x" />
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
            </>
          ) : (
            <EditItem
              name={item.name}
              barcode={item.barcode}
              price={item.price}
              amount={item.stock_amount}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default EditPopup;
