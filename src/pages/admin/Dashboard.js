import { useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";

import "../../App.css";

function Dashboard() {
  const history = useHistory();
  const { search } = useLocation();
  const counter = new URLSearchParams(search).get("counter");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#eee",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          marginTop: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 20,
          padding: "50px 20px",
          background: "white",
          width: "50%",
          flexWrap: "wrap",
          minHeight: "60vh",
          gap: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            background: "#bebebe",
            padding: 10,
            borderRadius: 6,
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => history.push(`/admin/stock?counter=${counter}`)}
        >
          <FontAwesomeIcon icon={faCartArrowDown} size="1x" />
          <h3>จัดการสต็อก</h3>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            background: "#0099FF",
            padding: 10,
            borderRadius: 6,
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => history.push(`/merchant/checkout?counter=${counter}`)}
        >
          <FontAwesomeIcon icon={faShoppingBag} size="1x" />
          <h3>เข้าสู่ร้านค้า</h3>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
