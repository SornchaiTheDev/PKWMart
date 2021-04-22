import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../../App";
function End() {
  const { GlobalItem } = useContext(Context);
  const { profit, total } = GlobalItem[0];
  const history = useHistory();

  console.log(GlobalItem);

  useEffect(() => {
    window.print();
    history.replace("/merchant/checkout");
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h3>สรุปยอดการขายวันนี้</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
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
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <h1>เงินทั้งหมด</h1>
          <h1>เงินทอน </h1>
          <h1>เงินสุทธิ </h1>
          <h1 style={{ color: profit > 0 ? "#08c318" : "red" }}>
            {profit > 0 ? "เงินเกิน" : "เงินขาด"}
          </h1>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <h1>
            {" "}
            {total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} บาท
          </h1>
          <h1> -5,000 บาท</h1>
          <h1>
            {" "}
            {parseInt(total - 5000)
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
            บาท
          </h1>
          <h1 style={{ color: profit > 0 ? "#08c318" : "red" }}>
            {profit.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
            <span style={{ color: "black" }}>บาท</span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default End;
