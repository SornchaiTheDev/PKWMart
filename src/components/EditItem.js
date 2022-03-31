import React, { useState, useEffect } from "react";

import axios from "axios";

function EditItem({ properties }) {
  const [item, setItem] = useState(properties);

  useEffect(() => {
    setItem(properties);
  }, [properties]);

  const editItem = async () => {
    axios.post(`http://${process.env.REACT_APP_HOSTNAME}/stock/update`, item);
    window.location.reload(false);
  };

  return (
    <div
      style={{
        padding: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 20,
      }}
    >
      <label>บาร์โค้ด :</label>

      <input
        type="text"
        placeholder="123456789"
        style={{ textAlign: "center", fontSize: "2rem" }}
        className="items-input"
        value={item.barcode}
        disabled
      />

      <label>ชื่อสินค้า</label>
      <input
        type="text"
        placeholder="น้ำดื่มตรา ภว."
        className="items-input"
        style={{ border: "1px solid", borderRadius: 10, padding: 6 }}
        value={item.name}
        onChange={(e) => setItem((prev) => ({ ...prev, name: e.target.value }))}
      />
      <label>ราคา (บาท)</label>

      <input
        type="number"
        placeholder="5"
        className="items-input"
        style={{
          border: "1px solid",
          borderRadius: 10,
          padding: 6,
          textAlign: "center",
        }}
        value={item.price}
        onChange={(e) =>
          setItem((prev) => ({ ...prev, price: e.target.value }))
        }
      />

      {/* <label>จำนวนในสต็อก (ชิ้น)</label>

      <input
        type="number"
        value={item.amount}
        className="items-input"
        style={{
          border: "1px solid",
          borderRadius: 10,
          padding: 6,
          textAlign: "center",
        }}
        onChange={(e) =>
          setItem((prev) => ({ ...prev, amount: e.target.value }))
        }
      /> */}

      <button
        onClick={editItem}
        style={{
          width: "70%",
          background: "orange",
          color: "white",
          outline: "none",
          border: "none",
          padding: 10,
          borderRadius: 10,
          cursor: "pointer",
        }}
      >
        แก้ไขสินค้า
      </button>
    </div>
  );
}
export default EditItem;
