// SearchBar.jsx
import React, { useState, useEffect } from "react";

export default function SearchBar({ onStockSelect }) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  // 实时搜索效果
  useEffect(() => {
    if (search.trim()) {
      handleSearch();
    } else {
      setResults([]);
    }
  }, [search]);

  const handleSearch = async () => {
    if (!search.trim()) {
      setResults([]);
      return;
    }

    // 扩展的股票数据库
    const stockDatabase = [
      { symbol: "AAPL", name: "Apple Inc.", price: "180.00", change: "-2.30", changePercent: "-1.26%" },
      { symbol: "MSFT", name: "Microsoft Corp.", price: "420.15", change: "+3.75", changePercent: "+0.90%" },
      { symbol: "NVDA", name: "NVIDIA Corp.", price: "485.00", change: "+25.80", changePercent: "+5.62%" },
      { symbol: "TSLA", name: "Tesla Inc.", price: "250.00", change: "+12.50", changePercent: "+5.26%" },
      { symbol: "GOOGL", name: "Alphabet Inc.", price: "145.80", change: "-3.20", changePercent: "-2.15%" },
      { symbol: "META", name: "Meta Platforms", price: "520.30", change: "+8.90", changePercent: "+1.74%" },
      { symbol: "AMZN", name: "Amazon.com Inc.", price: "170.00", change: "+4.25", changePercent: "+2.56%" },
      { symbol: "AMD", name: "Advanced Micro Devices", price: "145.20", change: "-8.40", changePercent: "-5.47%" },
      { symbol: "NFLX", name: "Netflix Inc.", price: "600.00", change: "+15.30", changePercent: "+2.62%" },
      { symbol: "DIS", name: "Walt Disney Co.", price: "90.00", change: "-1.50", changePercent: "-1.64%" },
      { symbol: "CRM", name: "Salesforce Inc.", price: "400.00", change: "+7.60", changePercent: "+1.94%" },
      { symbol: "UBER", name: "Uber Technologies", price: "168.50", change: "-2.80", changePercent: "-1.63%" },
      { symbol: "BABA", name: "Alibaba Group", price: "172.80", change: "-5.20", changePercent: "-2.92%" },
      { symbol: "COIN", name: "Coinbase Global", price: "160.00", change: "+12.40", changePercent: "+8.40%" },
      { symbol: "PYPL", name: "PayPal Holdings", price: "107.50", change: "-3.20", changePercent: "-2.89%" },
      { symbol: "SQ", name: "Block Inc.", price: "129.40", change: "+6.80", changePercent: "+5.55%" },
    ];

    // 根据搜索关键词过滤股票
    const searchTerm = search.toUpperCase();
    const filteredResults = stockDatabase.filter(stock => 
      stock.symbol.includes(searchTerm) || 
      stock.name.toUpperCase().includes(searchTerm)
    );

    setResults(filteredResults.slice(0, 5)); // 最多显示5个结果
  };

  return (
    <div
      style={{
        backgroundColor: "#2d2d2d", // 从红色改为深黑色
        color: "white",
        padding: "10px", // 减少内边距从15px到10px
        borderRadius: "10px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #404040", // 添加深灰色边框
      }}
    >
      <h3 style={{ 
        margin: "0 0 10px 0", 
        fontSize: "18px", 
        fontWeight: "900", // 增强加粗效果，从"bold"改为"900"
        color: "white",
        letterSpacing: "1.5px" // 添加字间距
      }}>
        🏛️ WealthMaker
      </h3>
      
      <div style={{ marginBottom: "15px" }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="TSLA"
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #404040",
            backgroundColor: "#1a1a1a", // 深黑色背景
            color: "white", // 白色文字
            marginBottom: "8px",
            fontSize: "14px",
            boxSizing: "border-box",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            width: "100%",
            padding: "8px",
            backgroundColor: "#404040", // 从白色改为深灰色
            color: "white", // 从红色改为白色文字
            border: "1px solid #606060",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          🔍 Search
        </button>
      </div>

      {results.length > 0 && (
        <div style={{ 
          flex: 1, 
          overflowY: "auto",
          maxHeight: "200px" // 限制搜索结果的最大高度
        }}>
          {results.map((stock) => (
            <div
              key={stock.symbol}
              onClick={() => onStockSelect(stock.symbol)}
              style={{
                backgroundColor: "#404040", // 从白色改为深灰色
                color: "white", // 从红色改为白色
                padding: "8px",
                marginBottom: "6px",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "11px",
                fontWeight: "bold",
                transition: "transform 0.2s",
                border: "1px solid #606060",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
              }}
            >
              <div style={{ marginBottom: "2px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontWeight: "bold", fontSize: "12px" }}>{stock.symbol}</span>
                  <span style={{ fontSize: "10px", color: "#cccccc", marginLeft: "4px" }}>{stock.name}</span>
                </div>
                <span style={{ fontSize: "11px" }}>${stock.price}</span>
              </div>
              <div style={{ color: stock.change.startsWith("+") ? "#00ff41" : "#ff4444", fontSize: "10px" }}>
                {stock.change} ({stock.changePercent})
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
