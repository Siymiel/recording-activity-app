import React from "react";

const Button = ({ label, symbol, color, isActive, onClick }) => {
  return (
    <div>
      <button
        style={{
          backgroundColor: color,
          borderRadius: "50%",
          padding: "20px",
          margin: "0 10px",
          outline: isActive ? "0.75em solid blue" : "none",
        }}
        onClick={onClick}
      >
        {symbol}
      </button>
      <p>{label}</p>
    </div>
  );
};

export default Button;
