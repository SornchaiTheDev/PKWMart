import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function Item({ order, name, amount, price, del, id, customer , barcode }) {
  return (
    <div style={styles}>
      <h3>{order}</h3>
      <h3>{name}</h3>
      <h3>{amount} ชิ้น </h3>
      <h3>{price} บาท</h3>
      {!customer && (
        <span
          style={{
            border: "none",
            outline: "none",
            background: "none",
            cursor: "pointer",
          }}
          onClick={() => del({id , barcode , amount})}
        >
          <FontAwesomeIcon icon={faTimes} />
        </span>
      )}
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
