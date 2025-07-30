// LeftSidebar.jsx
import React, { useState } from "react";

export default function LeftSidebar({ onStockSelect }) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    // 模拟搜索结果
    const mockResults = [
      { symbol: "TSLA", price: "250.00", change: "+12.50", changePercent: "+5.26%" },
      { symbol: "AAPL", price: "180.00", change: "-2.30", changePercent: "-1.26%" },
      { symbol: "NVDA", price: "485.00", change: "+25.80", changePercent: "+5.62%" },
      { symbol: "AMD", price: "145.20", change: "-8.40", changePercent: "-5.47%" },
      { symbol: "MSFT", price: "420.15", change: "+3.75", changePercent: "+0.90%" },
    ];
    setResults(mockResults);
  };

  // 股票数据
  const topGainerData = {
    symbol: "GOLD",
    price: "3372.80",
    change: "+1780",
    changePercent: "+100%"
  };

  const topLosserData = {
    symbol: "DOW20",
    price: "4428.00",
    change: "-15",
    changePercent: "-0.4%"
  };

  const trendingData = {
    symbol: "JPM",
    price: "6850.00",
    change: "+0.00",
    changePercent: "0%"
  };

  return (
    <div
      style={{
        backgroundColor: "#2d2d2d",
        color: "white",
        borderRadius: "10px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #404040",
        overflow: "hidden"
      }}
    >
      {/* Search Bar - 占据1/4高度 */}
      <div
        style={{
          height: "25%",
          padding: "10px",
          borderBottom: "1px solid #404040",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3 style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: "bold", color: "white", display: "flex", alignItems: "center", gap: "8px" }}>
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 32 32" 
            fill="none" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            {/* 按照图片精确绘制元宝 */}
            {/* 外层主体轮廓 - 大的船形底座 */}
            <path d="M4 22c0-4 4-8 12-8s12 4 12 8c0 3-3 6-12 6s-12-3-12-6z"/>
            
            {/* 内层椭圆 - 中心的椭圆形突起 */}
            <ellipse cx="16" cy="18" rx="8" ry="4"/>
            
            {/* 左侧提手 - 外层 */}
            <path d="M4 22c-3-3-3-8 0-10 2-1.5 3-1.5 4-0.5"/>
            {/* 左侧提手 - 内层 */}
            <path d="M6 21c-2-2-2-6 0-7 1-0.5 1.5-0.5 2 0"/>
            
            {/* 右侧提手 - 外层 */}
            <path d="M28 22c3-3 3-8 0-10-2-1.5-3-1.5-4-0.5"/>
            {/* 右侧提手 - 内层 */}
            <path d="M26 21c2-2 2-6 0-7-1-0.5-1.5-0.5-2 0"/>
            
            {/* 底部装饰线 */}
            <path d="M8 26c2-1 6-1 8-1s6 0 8 1"/>
          </svg>
          WealthMaker
        </h3>
        
        <div style={{ display: "flex", gap: "5px", marginBottom: "5px" }}>
          <input
            type="text"
            placeholder="Search stocks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              padding: "6px",
              backgroundColor: "#1a1a1a",
              color: "white",
              border: "1px solid #606060",
              borderRadius: "5px",
              fontSize: "12px",
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: "6px 12px",
              backgroundColor: "#404040",
              color: "white",
              border: "1px solid #606060",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "12px",
            }}
          >
            🔍
          </button>
        </div>

        {results.length > 0 && (
          <div style={{ 
            flex: 1, 
            overflowY: "auto",
            fontSize: "10px"
          }}>
            {results.slice(0, 2).map((stock) => (
              <div
                key={stock.symbol}
                onClick={() => onStockSelect(stock.symbol)}
                style={{
                  backgroundColor: "#404040",
                  color: "white",
                  padding: "4px",
                  marginBottom: "3px",
                  borderRadius: "3px",
                  cursor: "pointer",
                  fontSize: "10px",
                  fontWeight: "bold",
                  border: "1px solid #606060",
                }}
              >
                <div>{stock.symbol} ${stock.price}</div>
                <div style={{ color: stock.change.startsWith("+") ? "green" : "red" }}>
                  {stock.change} ({stock.changePercent})
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Top Gain - 占据1/4高度 */}
      <div
        style={{
          height: "25%",
          padding: "10px",
          borderBottom: "1px solid #404040",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3 style={{ margin: "0 0 5px 0", fontSize: "14px", fontWeight: "bold" }}>
          TOP GAIN
        </h3>
        
        <div
          style={{
            backgroundColor: "#1a1a1a",
            color: "white",
            padding: "8px",
            borderRadius: "5px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ fontWeight: "bold", fontSize: "12px", marginBottom: "3px" }}>
            {topGainerData.symbol} {topGainerData.price}
          </div>
          <div style={{ color: "green", fontWeight: "bold", fontSize: "10px" }}>
            {topGainerData.change} ({topGainerData.changePercent})
          </div>
        </div>
      </div>

      {/* Top Loss - 占据1/4高度 */}
      <div
        style={{
          height: "25%",
          padding: "10px",
          borderBottom: "1px solid #404040",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3 style={{ margin: "0 0 5px 0", fontSize: "14px", fontWeight: "bold" }}>
          TOP LOSS
        </h3>
        
        <div
          style={{
            backgroundColor: "#1a1a1a",
            color: "white",
            padding: "8px",
            borderRadius: "5px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ fontWeight: "bold", fontSize: "12px", marginBottom: "3px" }}>
            {topLosserData.symbol} {topLosserData.price}
          </div>
          <div style={{ color: "red", fontWeight: "bold", fontSize: "10px" }}>
            {topLosserData.change} ({topLosserData.changePercent})
          </div>
        </div>
      </div>

      {/* Trending - 占据1/4高度 */}
      <div
        style={{
          height: "25%",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3 style={{ margin: "0 0 5px 0", fontSize: "14px", fontWeight: "bold" }}>
          TRENDING
        </h3>
        
        <div
          style={{
            backgroundColor: "#1a1a1a",
            color: "white",
            padding: "8px",
            borderRadius: "5px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ fontWeight: "bold", fontSize: "12px", marginBottom: "3px" }}>
            {trendingData.symbol} {trendingData.price}
          </div>
          <div style={{ color: "gray", fontWeight: "bold", fontSize: "10px" }}>
            {trendingData.change} ({trendingData.changePercent})
          </div>
        </div>
      </div>
    </div>
  );
}
