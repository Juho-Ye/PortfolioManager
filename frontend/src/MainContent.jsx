// MainContent.jsx
import React, { useState } from "react";
import TreemapView from "./TreemapView";
import HoldingsView from "./HoldingsView";

export default function MainContent({ onStockSelect }) {
  const [activeTab, setActiveTab] = useState("holdings");

  return (
    <div
      style={{
        backgroundColor: "#2d2d2d", // 改为深色主题
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "10px", // 减少内边距从20px到10px
      }}
    >
      {/* Tab buttons */}
      <div
        style={{
          display: "flex",
          marginBottom: "10px", // 减少下边距从20px到10px
          height: "40px", // 减少按钮高度从50px到40px
        }}
      >
        <button
          onClick={() => setActiveTab("treemap")}
          style={{
            flex: 1,
            padding: "8px 24px", // 减少垂直内边距
            backgroundColor: activeTab === "treemap" ? "#404040" : "#2d2d2d",
            color: activeTab === "treemap" ? "white" : "#cccccc",
            border: "2px solid #404040",
            borderRadius: "8px 0 0 8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Treemap
        </button>
        <button
          onClick={() => setActiveTab("holdings")}
          style={{
            flex: 1,
            padding: "8px 24px", // 减少垂直内边距
            backgroundColor: activeTab === "holdings" ? "#404040" : "#2d2d2d",
            color: activeTab === "holdings" ? "white" : "#cccccc",
            border: "2px solid #404040",
            borderRadius: "0 8px 8px 0",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Holdings
        </button>
      </div>

      {/* Content area - 占据剩余高度 */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {activeTab === "treemap" ? (
          <TreemapView onStockSelect={onStockSelect} />
        ) : (
          <HoldingsView onStockSelect={onStockSelect} />
        )}
      </div>

      {/* 用户余额 - 位于右下角 */}
      <div
        style={{
          marginTop: "auto",
          textAlign: "right",
          padding: "10px 0",
          borderTop: "1px solid #666666", // 改为深色边框
          fontSize: "16px",
          fontWeight: "bold",
          color: "white", // 改为白色文字
        }}
      >
        Balance: $50,000.00
      </div>
    </div>
  );
}