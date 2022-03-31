import React, { useContext, useEffect } from "react";
import { Context } from "../../App";
import { useHistory } from "react-router-dom";

function Print() {
  const { GlobalItem } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    window.print();
    const url = new URL(window.location.href);
    const counter = url.searchParams.get("counter");
    setTimeout(() => {
      history.replace(`/merchant/checkout?counter=${counter}`);
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
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          background: "white",
          gap: 10,
        }}
      >
        {/* <img style={{ width: 60 }} src="/img/pkw_logo.jpeg" /> */}
        <h4 style={{ alignSelf: "center", fontWeight: "lighter" }}>
          มินิมาร์ท โรงเรียนภูเก็ตวิทยาลัย
        </h4>

        {GlobalItem.type === "qr" && (
          <h4 style={{ alignSelf: "center", fontWeight: "bold" }}>
            แสกนจ่ายผ่านแอพ ได้เพย์
          </h4>
        )}

        <h4 style={{ fontWeight: "lighter" }}>
          {`${new Date().getUTCDate()} ${months[new Date().getUTCMonth()]} ${
            new Date().getFullYear() + 543
          } `}{" "}
          {`${
            new Date().getHours() <= 9
              ? `0${new Date().getHours()}`
              : new Date().getHours()
          } :${
            new Date().getMinutes() <= 9
              ? `0${new Date().getMinutes()}`
              : new Date().getMinutes()
          } น. `}
        </h4>

        <div
          style={{
            margin: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "400px",
            flexDirection: "column",
          }}
        >
          <h4>หมายเลขบิล</h4>

          <h3>{GlobalItem.billNumber}</h3>
        </div>

        <div
          style={{
            margin: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "400px",
            flexDirection: "column",
          }}
        >
          <h4>
            บิลเครื่องที่{" "}
            {GlobalItem.counter === "1"
              ? 1
              : GlobalItem.counter === "2"
              ? 2
              : "admin"}
          </h4>
        </div>

        <h4 style={{ fontWeight: "lighter" }}>
          ===============================
        </h4>
        {GlobalItem.item.map(({ name, amount, price }) => (
          <div
            key={name}
            style={{
              margin: 0,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div style={{ width: "50%", overflow: "hidden" }}>
              <h4 style={{ fontWeight: "lighter" }}>{name}</h4>
            </div>
            <h4 style={{ fontWeight: "lighter" }}>
              x {amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
            </h4>
            <h4 style={{ fontWeight: "lighter" }}>
              {price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} บาท
            </h4>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "flex-end",
          marginTop: 20,
        }}
      >
        <h4 style={{ fontWeight: "lighter" }}>
          สุทธิ{" "}
          {GlobalItem.price
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
          บาท
        </h4>
        {GlobalItem.type !== "qr" && (
          <>
            <h4 style={{ fontWeight: "lighter" }}>
              รับเงินมา{" "}
              {GlobalItem.total
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
              บาท
            </h4>
            <h4 style={{ fontWeight: "lighter" }}>
              เงินทอน{" "}
              {GlobalItem.change
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
              บาท
            </h4>
          </>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          marginTop: 20,
        }}
      >
        <h4 style={{ fontWeight: "lighter" }}>ขอบคุณที่มาอุดหนุน</h4>
        {/* <h6>โหลดแอพได้เพย์ได้ที่ Play Store และ App Store ได้แล้ววันนี้</h6>
        <QRCode value="https://daipayapp.com" size={100} /> */}
      </div>
    </>
  );
}

export default Print;
