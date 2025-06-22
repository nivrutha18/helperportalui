import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "./assets/helping-hands-bg.png";

function HomePage() {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "48px",
          fontWeight: "bold",
          color: "#333",
          marginBottom: "40px",
        }}
      >
        Home
      </h1>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <Link
          to="/register"
          style={{
            backgroundColor: "#e67e22",
            color: "white",
            padding: "15px 25px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Register as Maid or Cook
        </Link>
        <Link
          to="/helpers"
          style={{
            backgroundColor: "#e67e22",
            color: "white",
            padding: "15px 25px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          View Available Helpers
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
