// StockChartModal.jsx
import React, { useState } from "react";

export default function StockChartModal({ isOpen, onClose, stockSymbol }) {
  const [timeframe, setTimeframe] = useState("daily");

  if (!isOpen) return null;

  // 模拟K线数据
  const generateCandlestickData = (days) => {
    const data = [];
    let basePrice = 100 + Math.random() * 200;
    
    for (let i = 0; i < days; i++) {
      const open = basePrice + (Math.random() - 0.5) * 10;
      const close = open + (Math.random() - 0.5) * 15;
      const high = Math.max(open, close) + Math.random() * 8;
      const low = Math.min(open, close) - Math.random() * 8;
      
      data.push({
        date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000),
        open: parseFloat(open.toFixed(2)),
        high: parseFloat(high.toFixed(2)),
        low: parseFloat(low.toFixed(2)),
        close: parseFloat(close.toFixed(2)),
        volume: Math.floor(Math.random() * 10000000)
      });
      
      basePrice = close;
    }
    return data;
  };

  const getDaysForTimeframe = () => {
    switch(timeframe) {
      case "daily": return 30;
      case "weekly": return 52;
      case "monthly": return 24;
      default: return 30;
    }
  };

  const candlestickData = generateCandlestickData(getDaysForTimeframe());

  // 简化的K线图渲染
  const renderCandlesticks = () => {
    const maxPrice = Math.max(...candlestickData.map(d => d.high));
    const minPrice = Math.min(...candlestickData.map(d => d.low));
    const priceRange = maxPrice - minPrice;
    const chartHeight = 320;
    const chartWidth = 850;
    const candleWidth = Math.max(2, (chartWidth / candlestickData.length) - 1);

    return (
      <svg width={chartWidth} height={chartHeight} style={{ backgroundColor: "#0d1117", borderRadius: "4px" }}>
        {/* 背景网格 */}
        <defs>
          <pattern id="grid" width="50" height="40" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 40" fill="none" stroke="#21262d" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* 水平价格线 */}
        {[0, 0.2, 0.4, 0.6, 0.8, 1].map((ratio, i) => {
          const y = chartHeight * ratio;
          const price = (maxPrice - ratio * priceRange).toFixed(2);
          return (
            <g key={`price-line-${i}`}>
              <line
                x1={0}
                y1={y}
                x2={chartWidth}
                y2={y}
                stroke="#30363d"
                strokeWidth={0.5}
                strokeDasharray="2,2"
              />
              <text
                x={chartWidth - 5}
                y={y - 2}
                fill="#7d8590"
                fontSize="10"
                textAnchor="end"
              >
                ${price}
              </text>
            </g>
          );
        })}
        
        {/* K线 */}
        {candlestickData.map((candle, index) => {
          const x = (index * chartWidth) / candlestickData.length + candleWidth / 2;
          const isGreen = candle.close >= candle.open;
          
          const highY = chartHeight - ((candle.high - minPrice) / priceRange) * chartHeight;
          const lowY = chartHeight - ((candle.low - minPrice) / priceRange) * chartHeight;
          const openY = chartHeight - ((candle.open - minPrice) / priceRange) * chartHeight;
          const closeY = chartHeight - ((candle.close - minPrice) / priceRange) * chartHeight;
          
          const bodyHeight = Math.abs(closeY - openY);
          const shadowColor = isGreen ? "#00d4aa" : "#f85149";
          const bodyColor = isGreen ? "#238636" : "#da3633";
          
          return (
            <g key={index}>
              {/* 上下影线 */}
              <line
                x1={x}
                y1={highY}
                x2={x}
                y2={Math.min(openY, closeY)}
                stroke={shadowColor}
                strokeWidth={1}
              />
              <line
                x1={x}
                y1={Math.max(openY, closeY)}
                x2={x}
                y2={lowY}
                stroke={shadowColor}
                strokeWidth={1}
              />
              {/* K线实体 */}
              <rect
                x={x - candleWidth / 2}
                y={Math.min(openY, closeY)}
                width={candleWidth}
                height={Math.max(bodyHeight, 1)}
                fill={bodyColor}
                stroke={shadowColor}
                strokeWidth={0.5}
                opacity={0.9}
              />
            </g>
          );
        })}
        
        {/* 当前价格线 */}
        {(() => {
          const currentPrice = candlestickData[candlestickData.length - 1]?.close;
          const currentY = chartHeight - ((currentPrice - minPrice) / priceRange) * chartHeight;
          return (
            <g>
              <line
                x1={0}
                y1={currentY}
                x2={chartWidth}
                y2={currentY}
                stroke="#f79000"
                strokeWidth={1.5}
                strokeDasharray="4,4"
              />
              <text
                x={chartWidth - 5}
                y={currentY - 5}
                fill="#f79000"
                fontSize="11"
                fontWeight="bold"
                textAnchor="end"
              >
                ${currentPrice}
              </text>
            </g>
          );
        })()}
      </svg>
    );
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#1a1a1a",
          borderRadius: "12px",
          padding: "24px",
          maxWidth: "900px",
          width: "90%",
          maxHeight: "80%",
          border: "1px solid #333333",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ color: "white", margin: 0, fontSize: "24px", fontWeight: "bold" }}>
            {stockSymbol} - Stock Analysis
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#666666",
              fontSize: "24px",
              cursor: "pointer",
              padding: "4px 8px",
              borderRadius: "4px",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#333333";
              e.target.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#666666";
            }}
          >
            ✕
          </button>
        </div>

        {/* 时间周期选择和操作按钮 */}
        <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            {["daily", "weekly", "monthly"].map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                style={{
                  backgroundColor: timeframe === period ? "#00ff41" : "#333333",
                  color: timeframe === period ? "#000000" : "white",
                  border: "none",
                  padding: "8px 16px",
                  marginRight: "8px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  transition: "all 0.2s",
                }}
              >
                {period}
              </button>
            ))}
          </div>
          
          {/* 买入卖出按钮 */}
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => {
                console.log(`Buy ${stockSymbol}`);
                // 这里可以添加买入逻辑
              }}
              style={{
                background: "#238636",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "8px 16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "14px",
                fontWeight: "bold",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#2ea043";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#238636";
              }}
              title={`Buy ${stockSymbol}`}
            >
              <span style={{ fontSize: "16px" }}>+</span>
              BUY
            </button>
            
            <button
              onClick={() => {
                console.log(`Sell ${stockSymbol}`);
                // 这里可以添加卖出逻辑
              }}
              style={{
                background: "#da3633",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "8px 16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "14px",
                fontWeight: "bold",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#f85149";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#da3633";
              }}
              title={`Sell ${stockSymbol}`}
            >
              <span style={{ fontSize: "16px" }}>−</span>
              SELL
            </button>
          </div>
        </div>

        {/* K线图区域 */}
        <div
          style={{
            backgroundColor: "#0d1117",
            borderRadius: "8px",
            padding: "16px",
            border: "1px solid #333333",
            marginBottom: "16px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "12px" }}>
            <span style={{ color: "#00ff41", fontSize: "14px", fontWeight: "bold" }}>
              {stockSymbol} - {timeframe.toUpperCase()} Candlestick Chart
            </span>
          </div>
          
          {/* K线图 */}
          <div style={{ display: "flex", justifyContent: "center", overflowX: "auto" }}>
            {renderCandlesticks()}
          </div>
        </div>

        {/* 股票信息面板 */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "120px", backgroundColor: "#21262d", padding: "12px", borderRadius: "6px", border: "1px solid #30363d" }}>
            <div style={{ color: "#7d8590", fontSize: "12px", marginBottom: "4px" }}>Current Price</div>
            <div style={{ color: "#f0f6fc", fontSize: "18px", fontWeight: "bold" }}>
              ${candlestickData[candlestickData.length - 1]?.close}
            </div>
          </div>
          
          <div style={{ flex: 1, minWidth: "120px", backgroundColor: "#21262d", padding: "12px", borderRadius: "6px", border: "1px solid #30363d" }}>
            <div style={{ color: "#7d8590", fontSize: "12px", marginBottom: "4px" }}>Change %</div>
            <div style={{ 
              color: candlestickData[candlestickData.length - 1]?.close >= candlestickData[0]?.open ? "#238636" : "#da3633", 
              fontSize: "18px", 
              fontWeight: "bold" 
            }}>
              {((candlestickData[candlestickData.length - 1]?.close - candlestickData[0]?.open) / candlestickData[0]?.open * 100).toFixed(2)}%
            </div>
          </div>
          
          <div style={{ flex: 1, minWidth: "120px", backgroundColor: "#21262d", padding: "12px", borderRadius: "6px", border: "1px solid #30363d" }}>
            <div style={{ color: "#7d8590", fontSize: "12px", marginBottom: "4px" }}>High</div>
            <div style={{ color: "#f0f6fc", fontSize: "18px", fontWeight: "bold" }}>
              ${Math.max(...candlestickData.map(d => d.high)).toFixed(2)}
            </div>
          </div>
          
          <div style={{ flex: 1, minWidth: "120px", backgroundColor: "#21262d", padding: "12px", borderRadius: "6px", border: "1px solid #30363d" }}>
            <div style={{ color: "#7d8590", fontSize: "12px", marginBottom: "4px" }}>Low</div>
            <div style={{ color: "#f0f6fc", fontSize: "18px", fontWeight: "bold" }}>
              ${Math.min(...candlestickData.map(d => d.low)).toFixed(2)}
            </div>
          </div>
          
          <div style={{ flex: 1, minWidth: "120px", backgroundColor: "#21262d", padding: "12px", borderRadius: "6px", border: "1px solid #30363d" }}>
            <div style={{ color: "#7d8590", fontSize: "12px", marginBottom: "4px" }}>Volume</div>
            <div style={{ color: "#f0f6fc", fontSize: "18px", fontWeight: "bold" }}>
              {(candlestickData[candlestickData.length - 1]?.volume / 1000000).toFixed(1)}M
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
