// Trending.jsx
import React from "react";

export default function Trending() {
  const trendingData = [
    { symbol: "BTC-USD", price: "43,567", change: "+1,234", changePercent: "+2.92%", trend: "crypto" },
    { symbol: "QQQ", price: "387.45", change: "+8.23", changePercent: "+2.17%", trend: "etf" },
    { symbol: "AI", price: "234.67", change: "+12.45", changePercent: "+5.60%", trend: "ai" },
    { symbol: "COIN", price: "167.89", change: "+7.34", changePercent: "+4.57%", trend: "crypto" },
    { symbol: "ARKK", price: "45.23", change: "+1.89", changePercent: "+4.36%", trend: "innovation" }
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
        TOP 5 TRENDING
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
        {trendingData.map((stock, index) => (
          <div
            key={index}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              marginBottom: index < trendingData.length - 1 ? "6px" : "0",
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
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <span style={{ display: "flex", alignItems: "center" }}>
                {stock.symbol}
                <span style={{
                  fontSize: "10px",
                  backgroundColor: "#404040",
                  color: "#888888",
                  padding: "2px 6px",
                  borderRadius: "10px",
                  marginLeft: "6px",
                  textTransform: "uppercase"
                }}>
                  {stock.trend}
                </span>
              </span>
              <span>{stock.price}</span>
            </div>
            <div style={{ 
              color: stock.change.startsWith('+') ? "#00ff88" : stock.change.startsWith('-') ? "#ff4444" : "#888888", 
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
