import React, { useState } from "react";
import Barcode from "react-barcode";
function BarcodeGen() {
  const [item, setItem] = useState([
    { name: "สมุดปกแข็ง(เล่ม)" },
    { name: "สมุดปกแข็ง(แพค)" },
    { name: "สมุดปกอ่อน(เล่ม)" },
    { name: "สมุดปกอ่อน(แพค)" },
    { name: "สมุดรายงาน" },
    { name: "แฟ้มรายงาน" },
    { name: "ถุงเท้า (ข้อสั้น)" },
    { name: "ถุงเท้า (ข้อยาว)" },
    { name: "กระเป๋านักเรียน (ถือ)" },
    { name: "กระเป๋านักเรียน (เป้)" },
    { name: "กระเป๋าสะพาย (ผ้า)" },
    { name: "เสื้อพละ" },
    { name: "กางเกงพละ" },
    { name: "ถุงเท้าลูกเสือ" },
    { name: "ผ้าพันคอลูกเสือ" },
    { name: "วอคเกิลลส./นร." },
    { name: "หมวกลูกเสือ" },
    { name: "อินธนู" },
    { name: "เข็มลูกเสือหน้าหมวก" },
    { name: "เข็มลูกเสือติดเสื้อ" },
    { name: "ป้ายชื่อ ร.ร" },
    { name: "เงื่อนลูกเสือ" },
    { name: "หน้ากากอนามัย" },
    { name: "กระดาษอนามัย (เล็ก)" },
    { name: "กระดาษอนามัย (ใหญ่)" },
    { name: "โบว์" },
  ]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap",
        height: "100vh",
      }}
    >
      {item.map(({ name }, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Barcode value={`1000000000${index}`} />
          <h3>{name}</h3>
        </div>
      ))}
    </div>
  );
}

export default BarcodeGen;
