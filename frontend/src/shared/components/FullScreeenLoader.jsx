import React from "react";
import { PuffLoader } from "react-spinners";

export default function FullScreenLoader({ show, title }) {
  if (!show) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <PuffLoader size={80} />
        <p style={{ marginTop: "15px", fontSize: "18px", color: "#333" }}>
          {title || "Loading..."}
        </p>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    backdropFilter: "blur(5px)",
    backgroundColor: "rgba(0,0,0,0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  modal: {
    background: "white",
    padding: "30px 50px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 0 30px rgba(0,0,0,0.2)",
  },
};
