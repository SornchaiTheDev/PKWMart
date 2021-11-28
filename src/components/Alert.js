const Alert = ({ show, onClick, change, msg }) => {
  return (
    <div
      style={{
        position: "fixed",
        backgroundColor: "rgba(0,0,0,0.5)",
        minWidth: "100vw",
        minHeight: "100vh",
        display: show ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: 50,
          width: "500px",
          height: "300px",
          gap: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 style={{}}>เงินทอน</h1>
          <h1 className="MediumText">
            <span style={{ color: "#0099FF" }}>{change}</span> บาท
          </h1>
        </div>
        <button
          style={{
            cursor: "pointer",
            border: "none",
            outline: "none",
            backgroundColor: "#0099FF",
            padding: "10px 100px",
            borderRadius: 20,
            fontSize: 28,
            color: "white",
          }}
          onClick={() => onClick()}
        >
          ปิด
        </button>
      </div>
    </div>
  );
};

export default Alert;
