import { useState } from "react";
const Custom = ({ open, close, setItem }) => {
  const [value, setValue] = useState("");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.25)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "white",
          width: "20%",
          minHeight: 100,
          padding: 20,
          borderRadius: 10,
          gap: 20,
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (/\+/g.test(value)) {
              const exactValue = value.split("+");
              exactValue.shift();
              const price = exactValue
                .map((value) => parseInt(value))
                .reduce((total, price) => price + total, 0);
              setItem(Math.abs(price));
            } else {
              setItem(Math.abs(parseInt(value)));
            }
          }}
        >
          <input
            placeholder="ใส่จำนวนเงิน"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            style={{
              padding: 10,
              background: "white",
              outline: "none",
              border: "1px solid #0099FF",
              borderRadius: 20,
            }}
          />
        </form>

        <button
          style={{
            cursor: "pointer",
            outline: "none",
            background: "red",
            border: "none",
            borderRadius: 20,
            padding: "10px 40px",
            color: "white",
          }}
          onClick={() => close()}
        >
          ยกเลิก
        </button>
      </div>
    </div>
  );
};
export default Custom;
