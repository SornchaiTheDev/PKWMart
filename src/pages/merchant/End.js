import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../../App";
function End() {
  const { GlobalItem } = useContext(Context);
  const { profit, total } = GlobalItem;
  const today = new Date();
  const last_open = new Date(GlobalItem.last_open.seconds * 1000);
  const history = useHistory();
  const isToday =
    today.getDate() +
      today.getMonth() -
      (last_open.getDate() + last_open.getMonth()) ===
    0;

  useEffect(() => {
    window.print();
    setTimeout(() => {
      history.replace(`/merchant/checkout?counter=${GlobalItem.counter}`);
    }, 1000);
  }, []);

  const months = [
    "ม.ค",
    "ก.พ",
    "มี.ค",
    "เม.ย",
    "พ.ค",
    "มิ.ย",
    "ก.ค",
    "ส.ค",
    "ก.ย",
    "ต.ค",
    "พ.ย",
    "ธ.ค",
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h3>สรุปยอดการขาย</h3>
      {!isToday ? (
        <h3>
          {`${last_open.getUTCDate()} ${months[last_open.getUTCMonth()]} ${
            last_open.getFullYear() + 543
          } `}
          {" - "}
          {`${today.getUTCDate()} ${months[today.getUTCMonth()]} ${
            today.getFullYear() + 543
          } `}
        </h3>
      ) : (
        <h3>
          {`${today.getUTCDate()} ${months[today.getUTCMonth()]} ${
            today.getFullYear() + 543
          } `}
        </h3>
      )}
      <h3>
        เคาท์เตอร์ที่{" "}
        {GlobalItem.counter === "counter01@pkw.ac.th"
          ? 1
          : GlobalItem.counter === "counter02@pkw.ac.th"
          ? 2
          : "admin"}
      </h3>
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
