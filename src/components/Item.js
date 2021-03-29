import React from "react";

function Item({ order, name, amount, price, del, id }) {
  return (
    <div style={styles}>
      <h3>{order}</h3>
      <h3>{name}</h3>
      <h3>{amount} ชิ้น </h3>
      <h3>{price} บาท</h3>
      <span
        style={{
          border: "none",
          outline: "none",
          background: "none",
          cursor: "pointer",
        }}
        onClick={() => del(id)}
      >
        X
      </span>
    </div>
  );
}

export default Item;

const styles = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  backgroundColor: "white",
  boxShadow: "0px 0px 2px 2px rgba(0,0,0,0.25)",
  borderRadius: "20px",
  width: "70%",
  height: "100px",
};
