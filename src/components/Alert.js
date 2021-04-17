import React, { useState, useEffect } from "react";

function Alert({ isShow , msg }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(isShow);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, [isShow]);
  return (
    <div
      style={{
        position: "fixed",
        right: 20,
        top: 20,
        width: "300px",
        height: "70px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "black",
        boxShadow: "0px 0px 2px 0.5px rgba(0,0,0,0.5)",
        borderRadius: 20,
        background: "white",
        opacity: show ? 1 : 0,
        transition: "opacity 0.5s",
      }}
    >
      <h3>{msg}</h3>
    </div>
  );
}

export default Alert;
