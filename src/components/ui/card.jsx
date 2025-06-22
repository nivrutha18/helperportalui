import React from "react";

export function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl shadow-lg p-4 bg-white border ${className}`}
      style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={`p-2 ${className}`}>{children}</div>;
}
