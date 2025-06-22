import React from "react";

export function Button({ children, variant = "primary", className = "", ...props }) {
  let baseClasses = "px-4 py-2 rounded font-semibold transition ";

  let variantClasses = "";
  if (variant === "destructive") {
    variantClasses = "bg-red-600 text-white hover:bg-red-700";
  } else if (variant === "default" || variant === "primary") {
    variantClasses = "bg-blue-600 text-white hover:bg-blue-700";
  }

  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  );
}
