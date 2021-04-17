import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../App.css";
import {
  faTrash,
  faArrowLeft,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import firebase from "../firebase";

import Alert from "../components/Alert";

const Items = ({
  item_barcode,
  item_name,
  item_price,
  front_amount,
  stock_amount,
  removeItem,
  front,
  addItem,
  doc,
  success,
}) => {
  const [barcode, setBarcode] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setBarcode(item_barcode);
    setName(item_name);
    setPrice(item_price);
    const item_amount = front ? front_amount : stock_amount;
    setAmount(item_amount);
  }, [front]);

  useEffect(() => {
    let edit;
    const item_amount = front ? front_amount : stock_amount;

    if (barcode !== item_barcode) edit = true;
    if (name !== item_name) edit = true;
    if (price !== item_price) edit = true;
    if (amount !== item_amount) edit = true;

    if (
      barcode === item_barcode &&
      name === item_name &&
      price === item_price &&
      amount === item_amount
    )
      edit = false;
    !addItem && setIsEdit(edit);
  }, [name, barcode, price, amount]);

  const addToDb = async () => {
    const same_check = await firebase
      .firestore()
      .collection("stock")
      .doc(barcode)
      .get();

    if (!same_check.exists) {
      await firebase
        .firestore()
        .collection("stock")
        .doc(barcode)
        .set({
          name: name,
          price: parseInt(price),
          front_amount: 0,
          stock_amount: parseInt(amount),
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(
          () => (
            success(),
            firebase
              .firestore()
              .collection("stock")
              .doc("count")
              .update({ amount: firebase.firestore.FieldValue.increment(1) }),
            setMsg("เพิ่มสินค้าสำเร็จ"),
            setTimeout(() => {
              removeItem();
            }, 1000)
          )
        );
    } else {
      setMsg("เพิ่มสินค้าไม่สำเร็จ");
    }

    setTimeout(() => {
      setMsg("");
    }, 1000);
  };

  const editItem = async () => {
    if (front) {
      await firebase
        .firestore()
        .collection("stock")
        .doc(doc)
        .update({
          barcode: barcode,
          name: name,
          price: parseInt(price),
          front_amount: parseInt(amount),
        })
        .then(() => setIsEdit(false));
    } else {
      await firebase
        .firestore()
        .collection("stock")
        .doc(doc)
        .update({
          barcode: barcode,
          name: name,
          price: parseInt(price),
          stock_amount: parseInt(amount),
        })
        .then(() => setIsEdit(false))
        .catch((err) => console.log(err));
    }
  };

  const remove = () => {
    removeItem(name);
    firebase.firestore().collection("stock").doc(doc).delete();
  };
  return (
    <>
      <Alert isShow={msg !== ""} msg={msg} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
          boxShadow: "0px 0px 6px 0.5px rgba(0,0,0,0.25)",
          minWidth: "70%",
          padding: 10,
          minHeight: "50px",
          borderRadius: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <label>บาร์โค้ด :</label>
          {addItem ? (
            <input
              type="text"
              placeholder="123456789"
              className="items-input"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
            />
          ) : (
            <h3
              className="items-input"
              // style={{ width: "2vw", color: amount > 5 ? "black" : "red" }}
            >
              {barcode}
            </h3>
          )}

          <label>ชื่อ :</label>
          <input
            type="text"
            placeholder="น้ำดื่มตรา ภว."
            className="items-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {!front && (
            <>
              <label>ราคา :</label>
              <input
                type="number"
                placeholder="5"
                className="items-input"
                style={{ width: "5vw" }}
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value))}
              />
              <label>บาท</label>
            </>
          )}

          <>
            <label>{front ? "จำนวนในหน้าร้าน : " : "จำนวนในสต็อก :"}</label>
            {!front ? (
              <>
                <input
                  type="number"
                  value={amount}
                  className="items-input"
                  style={{ width: "5vw" }}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <label>ชิ้น</label>
              </>
            ) : (
              <h3
                className="items-input"
                style={{ width: "2vw", color: amount > 5 ? "black" : "red" }}
              >
                {amount > 0 ? amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") : "หมด"}
              </h3>
            )}
          </>

          {addItem ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 20,
              }}
            >
              <FontAwesomeIcon
                icon={faTrash}
                style={{ cursor: "pointer" }}
                onClick={() => removeItem()}
              />
              <button
                onClick={addToDb}
                style={{
                  background: "green",
                  color: "white",
                  outline: "none",
                  border: "none",
                  padding: 10,
                  borderRadius: 10,
                  cursor: "pointer",
                }}
              >
                เพิ่มเข้าสต็อก
              </button>
            </div>
          ) : (
            <div
              style={{
                display: !front ? "flex" : "none",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={remove}
            >
              <FontAwesomeIcon icon={faTrash} />
            </div>
          )}
        </div>
        {isEdit && (
          <button
            onClick={editItem}
            style={{
              marginTop: 20,
              width: "100px",
              background: "orange ",
              color: "white",
              outline: "none",
              border: "none",
              padding: 10,
              borderRadius: 10,
              cursor: "pointer",
              alignSelf: "flex-end",
            }}
          >
            แก้ไขสินค้า
          </button>
        )}
      </div>
    </>
  );
};

export default Items;
