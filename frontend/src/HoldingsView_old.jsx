// HoldingsView.jsx
import React from "react";

export default function HoldingsView({ onStockSelect }) {
  const mockHoldings = [
    { symbol: "AAPL", amount: 150, value: 27000, profit: 5400, rate: 25.0 },
    { symbol: "MSFT", amount: 80, value: 33612, profit: 6200, rate: 22.6 },
    { symbol: "NVDA", amount: 45, value: 21825, profit: 8750, rate: 67.0 },
    { symbol: "GOOGL", amount: 60, value: 16800, profit: -2100, rate: -11.1 },
    { symbol: "TSLA", amount: 90, value: 22500, profit: -6750, rate: -23.1 },
    { symbol: "META", amount: 120, value: 18000, profit: -2700, rate: -13.0 },
    { symbol: "AMZN", amount: 75, value: 12750, profit: 1900, rate: 17.5 },
    { symbol: "AMD", amount: 200, value: 29040, profit: -5680, rate: -16.4 },
    { symbol: "NFLX", amount: 35, value: 21000, profit: 3150, rate: 17.6 },
    { symbol: "DIS", amount: 180, value: 16200, profit: -2430, rate: -13.0 },
    { symbol: "CRM", amount: 55, value: 22000, profit: 3500, rate: 18.9 },
    { symbol: "UBER", amount: 95, value: 16000, profit: -1800, rate: -10.1 },
    { symbol: "BABA", amount: 110, value: 19000, profit: -3200, rate: -14.4 },
    { symbol: "COIN", amount: 75, value: 12000, profit: 2800, rate: 30.4 },
    { symbol: "PYPL", amount: 130, value: 14000, profit: -2100, rate: -13.0 },
    { symbol: "SQ", amount: 85, value: 11000, profit: 1600, rate: 17.0 },
    { symbol: "SHOP", amount: 25, value: 15000, profit: 2200, rate: 17.2 },
    { symbol: "TWTR", amount: 200, value: 8000, profit: -1500, rate: -15.8 },
  ];

  // 按P/L ($)降序排序
  const sortedHoldings = [...mockHoldings].sort((a, b) => b.profit - a.profit);

  // 响应式高度调整 - 根据浏览器窗口高度动态调整
  useEffect(() => {
    const updateContainerHeight = () => {
      // 获取浏览器窗口的实际高度
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      
      // 计算Holdings容器应该占用的高度
      // 基础逻辑：窗口越高，Holdings容器越高；窗口越矮，Holdings容器越矮
      
      // 为其他组件预留的固定高度：
      // - IndexInfo: 约7.5% = 窗口高度 * 0.075
      // - Charts: 约25% = 窗口高度 * 0.25  
      // - Balance: 约5% = 窗口高度 * 0.05
      // - 各种padding和margin: 约50px
      
      const indexHeight = windowHeight * 0.075;
      const chartsHeight = windowHeight * 0.25;
      const balanceHeight = windowHeight * 0.05;
      const marginsAndPadding = 80; // 包括各种边距、标题等
      
      // Holdings可用的高度 = 总窗口高度 - 其他组件占用的高度
      const availableHeight = windowHeight - indexHeight - chartsHeight - balanceHeight - marginsAndPadding;
      
      // 设置最小和最大高度限制
      const minHeight = 150; // 最小高度，确保至少能看到几行
      const maxHeight = Math.max(windowHeight * 0.6, 300); // 最大不超过窗口高度的60%
      
      // 计算最终高度
      const calculatedHeight = Math.max(minHeight, Math.min(availableHeight, maxHeight));
      
      setContainerHeight(calculatedHeight);
      
      console.log(`�️ Window: ${windowWidth}x${windowHeight}`);
      console.log(`📊 Holdings height: ${calculatedHeight}px (available: ${availableHeight}px)`);
    };

    // 初始化和窗口大小变化时更新
    const handleResize = () => {
      // 使用多个延迟确保DOM完全更新
      setTimeout(updateContainerHeight, 10);
      setTimeout(updateContainerHeight, 100);
    };

    // 添加事件监听器
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, { passive: true });
    
    // 初始化
    setTimeout(updateContainerHeight, 100);
    setTimeout(updateContainerHeight, 300);
    
    // 定期检查确保高度正确（降低频率）
    const intervalCheck = setInterval(updateContainerHeight, 3000);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      clearInterval(intervalCheck);
    };
  }, []);

  return (
    <div 
      id="holdings-main-container"
      style={{ 
        height: "100%", 
        width: "100%",
        display: "flex", 
        flexDirection: "column",
        padding: "0px", // 与TreemapView保持一致，移除所有内边距
        boxSizing: "border-box"
      }}
    >
      <h3 style={{ 
        margin: "0 0 8px 0", // 稍微增加下边距
        color: "white", 
        fontSize: "16px",
        fontWeight: "600",
        paddingLeft: "8px", // 与TreemapView标题样式保持一致
        height: "24px", // 固定标题高度
        lineHeight: "24px"
      }}>
        Holdings Portfolio
      </h3>
      
      <div 
        className="holdings-scrollable"
        style={{ 
          height: "calc(100% - 32px)", // 与TreemapView保持一致的高度计算
          width: "100%",
          overflowY: "auto", 
          overflowX: "hidden", 
          backgroundColor: "#1a1a1a", 
          borderRadius: "8px", // 改为8px以匹配TreemapView
          border: "1px solid #666666", 
          marginTop: "8px", // 只保留上边距，与TreemapView保持一致
          // 增强的滚动条样式 - 确保在所有情况下都可见
          scrollbarWidth: "thin", // Firefox
          scrollbarColor: "#999999 #2d2d2d", // Firefox - 更亮的滑块颜色
        }}>
        <style>{`
          .holdings-scrollable::-webkit-scrollbar {
            width: 14px; // 进一步增加宽度
            background: #2d2d2d; // 给滚动条整体区域设置背景
          }
          .holdings-scrollable::-webkit-scrollbar-track {
            background: #2d2d2d;
            border-radius: 7px;
            border: 1px solid #404040; // 添加边框增强可见性
          }
          .holdings-scrollable::-webkit-scrollbar-thumb {
            background: #999999; // 更亮的颜色
            border-radius: 7px;
            border: 2px solid #2d2d2d; // 添加边框效果
            min-height: 30px; // 确保拖拽区域足够大
          }
          .holdings-scrollable::-webkit-scrollbar-thumb:hover {
            background: #bbbbbb; // 悬停时更亮
            border: 2px solid #404040;
          }
          .holdings-scrollable::-webkit-scrollbar-thumb:active {
            background: #dddddd; // 点击时最亮
          }
          .holdings-scrollable::-webkit-scrollbar-corner {
            background: #2d2d2d;
          }
        `}</style>
        <table style={{ 
          width: "100%", 
          borderCollapse: "collapse",
          backgroundColor: "#1a1a1a" // 确保表格背景一致
        }}>
          <thead>
            <tr style={{ backgroundColor: "#404040", position: "sticky", top: 0 }}>
              <th style={{ 
                textAlign: "left", 
                padding: "12px", 
                borderBottom: "2px solid #666666",
                color: "white",
                fontWeight: "bold"
              }}>
                Symbol
              </th>
              <th style={{ 
                textAlign: "right", 
                padding: "12px", 
                borderBottom: "2px solid #666666",
                color: "white",
                fontWeight: "bold"
              }}>
                Shares
              </th>
              <th style={{ 
                textAlign: "right", 
                padding: "12px", 
                borderBottom: "2px solid #666666",
                color: "white",
                fontWeight: "bold"
              }}>
                Market Value
              </th>
              <th style={{ 
                textAlign: "right", 
                padding: "12px", 
                borderBottom: "2px solid #666666",
                color: "white",
                fontWeight: "bold"
              }}>
                P/L ($)
              </th>
              <th style={{ 
                textAlign: "right", 
                padding: "12px", 
                borderBottom: "2px solid #666666",
                color: "white",
                fontWeight: "bold"
              }}>
                P/L (%)
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedHoldings.map((holding) => (
              <tr
                key={holding.symbol}
                onClick={() => onStockSelect(holding.symbol)}
                style={{
                  cursor: "pointer",
                  backgroundColor: "#1a1a1a",
                  transition: "background-color 0.2s",
                  height: "40px", // 固定行高，确保足够的内容高度
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#2d2d2d";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#1a1a1a";
                }}
              >
                <td style={{ 
                  padding: "10px 12px", // 增加padding确保足够的行高
                  borderBottom: "1px solid #666666",
                  fontWeight: "bold",
                  color: "white"
                }}>
                  {holding.symbol}
                </td>
                <td style={{ 
                  padding: "10px 12px", // 增加padding确保足够的行高
                  borderBottom: "1px solid #666666",
                  textAlign: "right",
                  color: "white"
                }}>
                  {holding.amount.toLocaleString()}
                </td>
                <td style={{ 
                  padding: "10px 12px", // 增加padding确保足够的行高
                  borderBottom: "1px solid #666666",
                  textAlign: "right",
                  color: "white"
                }}>
                  ${holding.value.toLocaleString()}
                </td>
                <td style={{
                  padding: "10px 12px", // 增加padding确保足够的行高
                  borderBottom: "1px solid #666666",
                  textAlign: "right",
                  color: holding.profit > 0 ? "#28a745" : "#dc3545",
                  fontWeight: "bold"
                }}>
                  {holding.profit > 0 ? "+" : ""}${holding.profit.toLocaleString()}
                </td>
                <td style={{
                  padding: "10px 12px", // 增加padding确保足够的行高
                  borderBottom: "1px solid #666666",
                  textAlign: "right",
                  color: holding.profit > 0 ? "#28a745" : "#dc3545",
                  fontWeight: "bold"
                }}>
                  {holding.rate > 0 ? "+" : ""}{holding.rate}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}