import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import firebase from "../firebase";

function AddItem({ removeItem }) {
  const [item, setItem] = useState({
    barcode: "",
    name: "",
    price: "",
    stock_amount: "",
  });
  const addToDb = async () => {
    const same_check = await firebase
      .firestore()
      .collection("stock")
      .doc(item.barcode)
      .get();

    if (!same_check.exists) {
      await firebase
        .firestore()
        .collection("stock")
        .doc(item.barcode)
        .set({
          ...item,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });

      await firebase
        .firestore()
        .collection("stock")
        .doc("count")
        .update({ amount: firebase.firestore.FieldValue.increment(1) });
      setMsg("เพิ่มสินค้าสำเร็จ");
      window.location.reload(false);
    } else {
      setMsg("เพิ่มสินค้าไม่สำเร็จ");
    }

    setTimeout(() => {
      setMsg("");
    }, 1000);
  };

  return (
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

        <input
          type="text"
          placeholder="123456789"
          className="items-input"
          value={item.barcode}
          onChange={(e) =>
            setItem((prev) => ({ ...prev, barcode: e.target.value }))
          }
        />

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
            setItem((prev) => ({ ...prev, price: e.target.value }))
          }
        />
        <label>บาท</label>

        <label>จำนวนในสต็อก :</label>

        <input
          type="number"
          value={item.amount}
          className="items-input"
          style={{ width: "5vw" }}
          onChange={(e) =>
            setItem((prev) => ({ ...prev, amount: e.target.value }))
          }
        />
        <label>ชิ้น</label>

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
      </div>
    </div>
  );
}

export default AddItem;
