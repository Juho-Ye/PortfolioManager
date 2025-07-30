// TopLosser.jsx
import React from "react";

export default function TopLosser() {
  const topLosserData = [
    { symbol: "NFLX", price: "405.20", change: "-28.45", changePercent: "-6.56%" },
    { symbol: "PYPL", price: "67.89", change: "-4.12", changePercent: "-5.73%" },
    { symbol: "META", price: "342.18", change: "-18.67", changePercent: "-5.17%" },
    { symbol: "DIS", price: "89.34", change: "-4.23", changePercent: "-4.52%" },
    { symbol: "UBER", price: "68.45", change: "-2.89", changePercent: "-4.05%" }
  ];

  return (
    <div
      style={{
        backgroundColor: "#2d2d2d", // 改为深色主题
        color: "white", // 改为白色文字
        padding: "10px", // 减少内边距从15px到10px
        borderRadius: "10px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h3 style={{ margin: "0 0 10px 0", fontSize: "16px", fontWeight: "bold" }}>
        TOP 5 LOSS
      </h3>
      
      <div
        style={{
          backgroundColor: "#1a1a1a",
          color: "white",
          padding: "8px",
          borderRadius: "8px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {topLosserData.map((stock, index) => (
          <div
            key={index}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              marginBottom: index < topLosserData.length - 1 ? "6px" : "0",
              backgroundColor: "#2d2d2d",
              border: "1px solid #404040",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#404040";
              e.target.style.borderColor = "#555555";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#2d2d2d";
              e.target.style.borderColor = "#404040";
            }}
          >
            <div style={{ 
              fontWeight: "bold", 
              fontSize: "14px", 
              marginBottom: "4px",
              display: "flex",
              justifyContent: "space-between"
            }}>
              <span>{stock.symbol}</span>
              <span>{stock.price}</span>
            </div>
            <div style={{ 
              color: "#ff4444", 
              fontWeight: "bold", 
              fontSize: "12px",
              textAlign: "right"
            }}>
              {stock.change} ({stock.changePercent})
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
