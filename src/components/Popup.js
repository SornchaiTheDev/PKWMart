import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarcode } from "@fortawesome/free-solid-svg-icons";
import BarcodeScanner from "react-barcode-reader";
import firebase from "../firebase";
function Scan({ add, close, setItem, item, err, setExist }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(add);
  }, [add]);

  return (
    <>
      <BarcodeScanner onScan={(data) => setItem(data)} />
      <div
        style={{
          position: "fixed",
          display: show ? "flex" : "none",
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
          <h1>{err === null ? "Scan Barcode" : "ไม่พบสินค้านี้"}</h1>
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
            onClick={() => (close(), setExist(null))}
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </>
  );
}

const AddAmount = ({ item, close, add, from }) => {
  const [amount, setAmount] = useState("");
  const [err, setErr] = useState(false);

  const addItemAmount = async () => {
    const old_data = await firebase
      .firestore()
      .collection("stock")
      .doc(item)
      .get();

    if (from === "front") {
      if (old_data.data().stock_amount < amount || amount <= 0) {
        setErr(true);
      } else {
        const add_amount = parseInt(amount);
        await firebase
          .firestore()
          .collection("stock")
          .doc(item)
          .update({
            front_amount: old_data.data().front_amount + add_amount,
            stock_amount: old_data.data().stock_amount - add_amount,
          })
          .then(() => window.location.reload());
      }
    } else {
      if (amount <= 0) {
        setErr(true);
      } else {
        const add_amount = parseInt(amount);
        await firebase
          .firestore()
          .collection("stock")
          .doc(item)
          .update({
            stock_amount: old_data.data().stock_amount + add_amount,
          })
          .then(() => window.location.reload());
      }
    }
  };
  return (
    <div
      style={{
        position: "fixed",
        display: add ? "flex" : "none",
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
          minHeight: "40vh",
          background: "white",
          borderRadius: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <h1>ใส่จำนวนสินค้า</h1>
        <p style={{ color: "red", display: err ? "block" : "none" }}>
          เช็คจำนวนของอีกครั้ง
        </p>
        <input
          type="number"
          value={amount}
          autoFocus
          style={{
            borderBottom: "4px solid #0099FF",
            width: "20%",
            outline: "none",
            border: "2px solid black",
            borderRadius: "16px",
            background: "none",
            fontSize: 28,
          }}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          style={{
            background: "green",
            outline: "none",
            border: "none",
            borderRadius: 20,
            padding: "10px 40px",
            color: "white",
            fontSize: 16,
            cursor: "pointer",
          }}
          onClick={addItemAmount}
        >
          เพิ่ม
        </button>
      </div>
    </div>
  );
};

const Popup = ({ add, close, stock }) => {
  const [item, setItem] = useState("");
  const [exist, setExist] = useState(null);

  useEffect(() => {
    const item_check = async () => {
      const items = await firebase
        .firestore()
        .collection("stock")
        .doc(item)
        .get();
      if (!items.exists) {
        setExist(false);
        setItem("");
      } else {
        setExist(true);
      }
    };
    item !== "" && item_check();
  }, [item, exist]);

  return (
    <>
      {item && exist ? (
        <AddAmount
          item={item}
          close={close}
          add={add}
          from={stock ? "stock" : "front"}
        />
      ) : (
        <Scan
          add={add}
          close={close}
          setItem={(barId) => setItem(barId)}
          err={exist}
          setExist={(bool) => setExist(bool)}
        />
      )}
    </>
  );
};

export default Popup;
