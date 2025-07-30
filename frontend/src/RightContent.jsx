// RightContent.jsx
import React, { useState } from "react";
import TreemapView from "./TreemapView";
import HoldingsView from "./HoldingsView";

export default function RightContent({ onStockSelect }) {
  const [activeTab, setActiveTab] = useState("holdings");

  const indexData = [
    { name: "S&P 500", value: "5,111.11", change: "+1112.22", changePercent: "+2.52%" },
    { name: "DW 30", value: "22,222.22", change: "+220.22", changePercent: "+1.2%" },
    { name: "NASDAQ", value: "2773.33", change: "-33.33", changePercent: "-1.18%" },
  ];

  return (
    <div
      style={{
        backgroundColor: "#2d2d2d",
        borderRadius: "10px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #404040",
        overflow: "hidden"
      }}
    >
      {/* 第一部分：指数信息 - 占据约7.5%高度 */}
      <div
        style={{
          height: "7.5%", // 从15%减少到7.5%
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#2d2d2d",
          padding: "4px 15px", // 减少垂直内边距
          borderBottom: "1px solid #404040",
        }}
      >
        {indexData.map((index, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", color: "white" }}>
            <div style={{ fontSize: "12px", fontWeight: "bold" }}>
              {index.name}
            </div>
            <div style={{ fontSize: "14px", fontWeight: "bold" }}>
              {index.value}
            </div>
            <div style={{ 
              fontSize: "10px", 
              color: index.change.startsWith("+") ? "green" : "red",
              fontWeight: "bold"
            }}>
              {index.change} ({index.changePercent})
            </div>
          </div>
        ))}
      </div>

      {/* 第二部分：NetWorth 和 ReturnRate 卡片 - 占据约25%高度 */}
      <div
        style={{
          height: "25%",
          display: "flex",
          gap: "10px",
          padding: "10px",
          borderBottom: "1px solid #404040",
        }}
      >
        {/* NetWorth Card */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#2d2d2d",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "hidden", // 确保内容不超出卡片边界
          }}
        >
          <div style={{ 
            position: "absolute", 
            top: "8px", 
            left: "8px",
            right: "8px",
            textAlign: "left",
            zIndex: 10, // 提高z-index确保文字在图表之上
            backgroundColor: "rgba(45, 45, 45, 0.9)", // 添加半透明背景
            padding: "6px 12px",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}>
            <span style={{ color: "white", fontSize: "14px", fontWeight: "bold" }}>
              Net Worth
            </span>
            <span style={{ fontSize: "18px", fontWeight: "bold", color: "white" }}>
              $73,624.05
            </span>
            <span style={{ color: "green", fontWeight: "bold", fontSize: "12px" }}>
              +32,624.05 (80%)
            </span>
          </div>
          
          <div style={{ 
            flex: 1, 
            backgroundColor: "#1a1a1a", 
            borderRadius: "8px", 
            position: "relative", 
            overflow: "hidden", 
            margin: "8px", // 添加一些边距
            width: "calc(100% - 16px)",
            height: "calc(100% - 16px)"
          }}>
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", top: 0, left: 0 }}>
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{stopColor:"green", stopOpacity:0.3}} />
                  <stop offset="100%" style={{stopColor:"green", stopOpacity:0.1}} />
                </linearGradient>
              </defs>
              <path
                d="M 10,85 Q 20,75 30,65 Q 40,55 50,50 Q 60,45 70,40 Q 80,35 90,30"
                fill="none"
                stroke="green"
                strokeWidth="2"
              />
              <path
                d="M 10,85 Q 20,75 30,65 Q 40,55 50,50 Q 60,45 70,40 Q 80,35 90,30 L 90,95 L 10,95 Z"
                fill="url(#gradient1)"
              />
            </svg>
          </div>
        </div>

        {/* ReturnRate Card */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#2d2d2d",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "hidden", // 确保内容不超出卡片边界
          }}
        >
          <div style={{ 
            position: "absolute", 
            top: "8px", 
            left: "8px",
            right: "8px",
            textAlign: "left",
            zIndex: 10, // 提高z-index确保文字在图表之上
            backgroundColor: "rgba(45, 45, 45, 0.9)", // 添加半透明背景
            padding: "6px 12px",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}>
            <span style={{ color: "white", fontSize: "14px", fontWeight: "bold" }}>
              Return Rate
            </span>
            <span style={{ fontSize: "18px", fontWeight: "bold", color: "green" }}>
              +50%
            </span>
          </div>
          
          <div style={{ 
            flex: 1, 
            backgroundColor: "#1a1a1a", 
            borderRadius: "8px", 
            position: "relative", 
            overflow: "hidden", 
            margin: "8px", // 添加一些边距
            width: "calc(100% - 16px)",
            height: "calc(100% - 16px)"
          }}>
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", top: 0, left: 0 }}>
              <defs>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{stopColor:"green", stopOpacity:0.3}} />
                  <stop offset="100%" style={{stopColor:"green", stopOpacity:0.1}} />
                </linearGradient>
              </defs>
              <path
                d="M 10,90 Q 20,80 30,70 Q 40,60 50,55 Q 60,50 70,45 Q 80,40 90,35"
                fill="none"
                stroke="green"
                strokeWidth="2"
              />
              <path
                d="M 10,90 Q 20,80 30,70 Q 40,60 50,55 Q 60,50 70,45 Q 80,40 90,35 L 90,95 L 10,95 Z"
                fill="url(#gradient2)"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 第三部分：主要内容区域 - 占据约62.5%高度 */}
      <div
        style={{
          height: "62.5%", // 从55%增加到62.5%以补偿指数区域的减少
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          borderBottom: "1px solid #404040",
        }}
      >
        {/* Tab buttons */}
        <div
          style={{
            display: "flex",
            marginBottom: "10px",
            height: "35px",
          }}
        >
          <button
            onClick={() => setActiveTab("treemap")}
            style={{
              flex: 1,
              padding: "6px 20px",
              backgroundColor: activeTab === "treemap" ? "#404040" : "#2d2d2d",
              color: activeTab === "treemap" ? "white" : "#cccccc",
              border: "2px solid #404040",
              borderRadius: "8px 0 0 8px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            Treemap
          </button>
          <button
            onClick={() => setActiveTab("holdings")}
            style={{
              flex: 1,
              padding: "6px 20px",
              backgroundColor: activeTab === "holdings" ? "#404040" : "#2d2d2d",
              color: activeTab === "holdings" ? "white" : "#cccccc",
              border: "2px solid #404040",
              borderRadius: "0 8px 8px 0",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            Holdings
          </button>
        </div>

        {/* Content area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {activeTab === "treemap" ? (
            <TreemapView onStockSelect={onStockSelect} />
          ) : (
            <HoldingsView onStockSelect={onStockSelect} />
          )}
        </div>
      </div>

      {/* 第四部分：用户余额 - 占据约5%高度 */}
      <div
        style={{
          height: "5%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 15px",
          fontSize: "14px",
          fontWeight: "bold",
          color: "white",
        }}
      >
        Balance: $50,000.00
      </div>
    </div>
  );
}
