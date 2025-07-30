// TopGainer.jsx
import React from "react";

export default function TopGainer() {
  const topGainerData = [
    { symbol: "NVDA", price: "485.00", change: "+45.80", changePercent: "+10.42%" },
    { symbol: "AMD", price: "145.20", change: "+12.40", changePercent: "+9.34%" },
    { symbol: "TSLA", price: "250.00", change: "+21.50", changePercent: "+9.41%" },
    { symbol: "COIN", price: "160.00", change: "+13.20", changePercent: "+9.00%" },
    { symbol: "SQ", price: "129.40", change: "+10.80", changePercent: "+9.11%" }
  ];

  return (
    <div
      style={{
        backgroundColor: "#1a1a1a", // 改为深色背景 // 改为深色主题
        color: "white", // 改为白色文字
        padding: "10px", // 减少内边距从15px到10px
        borderRadius: "10px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h3 style={{ margin: "0 0 10px 0", fontSize: "16px", fontWeight: "bold" }}>
        TOP 5 GAIN
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
        {topGainerData.map((stock, index) => (
          <div
            key={index}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              marginBottom: index < topGainerData.length - 1 ? "6px" : "0",
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
              color: "#00ff88", 
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
