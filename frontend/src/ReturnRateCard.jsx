// ReturnRateCard.jsx
import React from "react";

export default function ReturnRateCard() {
  return (
    <div
      style={{
        backgroundColor: "#2d2d2d", // 改为深色主题
        padding: "15px", // 减少内边距从20px到15px
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* 标题和数据在右上角 */}
      <div style={{ 
        position: "absolute", 
        top: "15px", 
        right: "15px", // 调整定位以匹配新的内边距 
        textAlign: "right",
        zIndex: 2 
      }}>
        <h3 style={{ margin: "0 0 5px 0", color: "white", fontSize: "16px" }}>
          Return Rate
        </h3>
        <div style={{ fontSize: "24px", fontWeight: "bold", color: "green", marginBottom: "0" }}>
          +50%
        </div>
      </div>
      
      {/* 扩大的图表区域 */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#1a1a1a", // 改为深色背景
          borderRadius: "8px",
          position: "relative",
          overflow: "hidden",
          marginTop: "0",
        }}
      >
        {/* 更复杂的折线图 */}
        <svg width="100%" height="100%" style={{ position: "absolute" }}>
          <defs>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{stopColor:"green", stopOpacity:0.3}} />
              <stop offset="100%" style={{stopColor:"green", stopOpacity:0.1}} />
            </linearGradient>
          </defs>
          <path
            d="M 10,90 Q 30,85 50,70 T 90,40 T 130,25 T 170,15 T 210,10"
            fill="none"
            stroke="green"
            strokeWidth="3"
          />
          <path
            d="M 10,90 Q 30,85 50,70 T 90,40 T 130,25 T 170,15 T 210,10 L 210,100 L 10,100 Z"
            fill="url(#gradient2)"
          />
        </svg>
      </div>
    </div>
  );
}