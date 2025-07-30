// App.jsx
import React, { useState } from "react";
import LeftSidebar from "./LeftSidebar";
import RightContent from "./RightContent";
import StockDetail from "./StockDetail";
import StockChartModal from "./StockChartModal";

export default function App() {
  const [selectedStock, setSelectedStock] = useState(null);
  const [chartModalStock, setChartModalStock] = useState(null);

  const handleStockSelect = (symbol) => {
    setChartModalStock(symbol);
  };

  return (
    <div
      className="app-container"
      style={{
        display: "grid",
        gridTemplateColumns: "25% 75%", // 简化为两列
        gridTemplateRows: "1fr", // 只需要一行
        height: "100vh",
        width: "100vw",
        backgroundColor: "#1a1a1a", // 从浅灰改为深黑色
        fontFamily: "Arial, sans-serif",
        gap: "5px", // 减少间距从10px到5px
        padding: "5px", // 减少内边距从10px到5px
        boxSizing: "border-box",
      }}
    >
      {/* 左侧：LeftSidebar */}
      <div style={{ gridColumn: "1", gridRow: "1" }}>
        <LeftSidebar onStockSelect={handleStockSelect} />
      </div>

      {/* 右侧：RightContent */}
      <div style={{ gridColumn: "2", gridRow: "1" }}>
        <RightContent onStockSelect={handleStockSelect} />
      </div>

      {/* K线图模态框 */}
      <StockChartModal
        isOpen={chartModalStock !== null}
        stockSymbol={chartModalStock}
        onClose={() => setChartModalStock(null)}
      />

      {/* 股票详情弹窗 */}
      {selectedStock && (
        <StockDetail
          symbol={selectedStock}
          onClose={() => setSelectedStock(null)}
        />
      )}
    </div>
  );
}