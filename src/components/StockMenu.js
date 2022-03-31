import React from "react";
import { useHistory } from "react-router-dom";
function StockMenu({ front, stock }) {
  const history = useHistory();
  return (
    <div
      style={{
        marginTop: 50,
        height: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 100,
      }}
    >
      <div
        onClick={() => history.replace("front")}
        style={{
          cursor: "pointer",
          borderBottom: front ? "4px solid #0099FF" : "0px solid #0099FF",
          transition: "border-bottom 100ms",
        }}
      >
        <h3
          style={{
            fontSize: "1.25em",
            color: "black",
          }}
        >
          สินค้าหน้าร้าน
        </h3>
      </div>
      <div
        onClick={() => history.replace("stock")}
        style={{
          cursor: "pointer",
          borderBottom: stock ? "4px solid #0099FF" : "0px solid #0099FF",
          transition: "border-bottom 100ms",
        }}
      >
        <h3
          style={{
            fontSize: "1.25em",
            color: "black",
          }}
        >
          สินค้าในสต็อก
        </h3>
      </div>
    </div>
  );
}

export default StockMenu;
