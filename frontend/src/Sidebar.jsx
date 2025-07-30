// Sidebar.jsx
import React, { useState } from "react";

export default function Sidebar({ onStockSelect }) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await fetch(`/api/search?q=${search}`);
    setResults(await res.json());
  };

  return (
    <div
      className="sidebar"
      style={{
        width: "260px",
        backgroundColor: "#2d2d2d", // 统一深色主题
        color: "#fff",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        borderRadius: "8px",
      }}
    >
      <div style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        WealthMaker
      </div>
      <div style={{ marginBottom: "20px" }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="TSLA"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ddd",
            boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            marginTop: "10px",
            width: "100%",
            padding: "10px",
            backgroundColor: "#fff",
            color: "#ff4d4d",
            border: "1px solid #ddd",
            borderRadius: "6px",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            fontWeight: "bold",
          }}
        >
          🔍 Search
        </button>
      </div>
      {results.length > 0 && (
        <ul style={{ listStyle: "none", padding: "0" }}>
          {results.map(stock => (
            <li
              key={stock.symbol}
              onClick={() => onStockSelect(stock.symbol)}
              style={{
                padding: "10px",
                backgroundColor: "#fff",
                color: "#ff4d4d",
                marginBottom: "10px",
                borderRadius: "6px",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                fontWeight: "bold",
              }}
            >
              {stock.symbol} {stock.price}
            </li>
          ))}
        </ul>
      )}
      <div style={{ marginTop: "20px" }}>
        <h3 style={{ color: "#fff", marginBottom: "10px" }}>Top Gainer</h3>
        <div style={{ backgroundColor: "#fff", color: "#ff4d4d", padding: "10px", borderRadius: "6px", marginBottom: "10px" }}>GOLD 3372.80 +1780 (100%)</div>
        <h3 style={{ color: "#fff", marginBottom: "10px" }}>Top Losser</h3>
        <div style={{ backgroundColor: "#fff", color: "#ff4d4d", padding: "10px", borderRadius: "6px", marginBottom: "10px" }}>DOW20 4428.00 -15 (-0.4%)</div>
        <h3 style={{ color: "#fff", marginBottom: "10px" }}>Trending</h3>
        <div style={{ backgroundColor: "#fff", color: "#ff4d4d", padding: "10px", borderRadius: "6px", marginBottom: "10px" }}>JPM 6850.00 +0.00 (0%)</div>
      </div>
    </div>
  );
}