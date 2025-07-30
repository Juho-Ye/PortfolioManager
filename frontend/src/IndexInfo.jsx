// IndexInfo.jsx
import React from "react";

export default function IndexInfo() {
  const indexData = [
    { name: "S&P 500", value: "5,111.11", change: "+1112.22", changePercent: "+2.52%" },
    { name: "DW 30", value: "22,222.22", change: "+220.22", changePercent: "+1.2%" },
    { name: "NASDAQ", value: "2773.33", change: "-33.33", changePercent: "-1.18%" },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#2d2d2d", // 改为深色主题
        padding: "8px 15px", // 减少内边距
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        width: "100%",
        height: "60px",
      }}
    >
      {indexData.map((index, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", color: "white" }}>
          <div style={{ fontSize: "14px", fontWeight: "bold" }}>
            {index.name}
          </div>
          <div style={{ fontSize: "16px", fontWeight: "bold" }}>
            {index.value}
          </div>
          <div style={{ 
            fontSize: "12px", 
            color: index.change.startsWith("+") ? "green" : "red",
            fontWeight: "bold"
          }}>
            {index.change} ({index.changePercent})
          </div>
        </div>
      ))}
    </div>
  );
}
