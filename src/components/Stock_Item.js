import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../App.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import firebase from "../firebase";

import Alert from "../components/Alert";

const Items = ({
  item_barcode,
  item_name,
  item_price,
  stock_amount,
  removeItem,
}) => {
  const [item, setItem] = useState({
    barcode: item_barcode,
    name: item_name,
    price: item_price,
    stock_amount: stock_amount,
  });
  const [isEdit, setIsEdit] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    let edit;

    item.name !== item_name ||
    item.price !== item_price ||
    item.stock_amount !== stock_amount
      ? (edit = true)
      : (edit = false);

    setIsEdit(edit);
  }, [item.name, item.barcode, item.price, item.stock_amount]);

  const editItem = async () => {
    await firebase
      .firestore()
      .collection("stock")
      .doc(item.barcode)
      .update(item)
      .then(() => setIsEdit(false))
      .catch((err) => console.log(err));
    window.location.reload(false);
  };

  const remove = () => {
    removeItem(item.name);
    firebase.firestore().collection("stock").doc(item.barcode).delete();
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

          <h3 className="items-input">{item.barcode}</h3>

          <label>ชื่อ :</label>
          <input
            type="text"
            placeholder="น้ำดื่มตรา ภว."
            className="items-input"
            value={item.name}
            onChange={(e) =>
              setItem((prev) => ({ ...prev, name: e.target.value }))
            }
          />

          <label>ราคา :</label>
          <input
            type="number"
            placeholder="5"
            className="items-input"
            style={{ width: "5vw" }}
            value={item.price}
            onChange={(e) =>
              setItem((prev) => ({
                ...prev,
                price: parseInt(e.target.value),
              }))
            }
          />
          <label>บาท</label>

          <label>จำนวนในสต็อก :</label>

          <input
            type="number"
            value={item.stock_amount}
            className="items-input"
            style={{ width: "5vw" }}
            onChange={(e) =>
              setItem((prev) => ({
                ...prev,
                stock_amount: parseInt(e.target.value),
              }))
            }
          />
          <label>ชิ้น</label>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={remove}
          >
            <FontAwesomeIcon icon={faTrash} />
          </div>
          {isEdit && (
            <button
              onClick={editItem}
              style={{
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
      </div>
    </>
  );
};

export default Items;
