// TreemapView.jsx
import React, { useState, useEffect } from "react";

export default function TreemapView({ onStockSelect }) {
  const [containerSize, setContainerSize] = useState({ width: 800, height: 400 });
  const [forceUpdate, setForceUpdate] = useState(0); // 添加强制更新状态

  // 扩展股票数据，包含所有持仓
  const mockData = [
    { symbol: "AAPL", value: 75000, profit: 15000, changePercent: 25.0 },
    { symbol: "MSFT", value: 45000, profit: 8000, changePercent: 21.6 },
    { symbol: "NVDA", value: 35000, profit: 12000, changePercent: 52.2 },
    { symbol: "TSLA", value: 28000, profit: -8500, changePercent: -23.3 },
    { symbol: "GOOGL", value: 40000, profit: -5200, changePercent: -11.5 },
    { symbol: "META", value: 20000, profit: -3000, changePercent: -13.0 },
    { symbol: "AMZN", value: 32000, profit: 4200, changePercent: 15.1 },
    { symbol: "AMD", value: 15000, profit: -2800, changePercent: -15.7 },
    { symbol: "NFLX", value: 25000, profit: 3800, changePercent: 18.0 },
    { symbol: "DIS", value: 18000, profit: -2200, changePercent: -10.9 },
    { symbol: "CRM", value: 22000, profit: 3500, changePercent: 18.9 },
    { symbol: "UBER", value: 16000, profit: -1800, changePercent: -10.1 },
    { symbol: "BABA", value: 19000, profit: -3200, changePercent: -14.4 },
    { symbol: "COIN", value: 12000, profit: 2800, changePercent: 30.4 },
    { symbol: "PYPL", value: 14000, profit: -2100, changePercent: -13.0 },
    { symbol: "SQ", value: 11000, profit: 1600, changePercent: 17.0 },
  ];

  // 获取热力图颜色
  const getHeatmapColor = (changePercent) => {
    const intensity = Math.min(Math.abs(changePercent) / 50, 1);
    
    if (changePercent > 0) {
      // 绿色渐变 - 从浅绿到深绿
      const green = Math.floor(150 + intensity * 105);
      const red = Math.floor(100 - intensity * 60);
      const blue = Math.floor(100 - intensity * 60);
      return `rgb(${red}, ${green}, ${blue})`;
    } else {
      // 红色渐变 - 从浅红到深红
      const red = Math.floor(150 + intensity * 105);
      const green = Math.floor(100 - intensity * 60);
      const blue = Math.floor(100 - intensity * 60);
      return `rgb(${red}, ${green}, ${blue})`;
    }
  };

  // 智能响应式热力图布局算法 - 根据容器形状调整布局
  const createHeatmapLayout = () => {
    const { width, height } = containerSize;
    const aspectRatio = width / height;
    
    console.log(`📐 Layout calculation: ${width}x${height}, AspectRatio: ${aspectRatio.toFixed(2)}`);
    
    // 按市值（value）排序，大的在前
    const sortedData = [...mockData].sort((a, b) => b.value - a.value);
    
    // 计算总市值用于面积分配
    const totalValue = sortedData.reduce((sum, stock) => sum + stock.value, 0);
    
    // 为每个股票计算面积比例和基本尺寸
    const stocksWithArea = sortedData.map(stock => ({
      ...stock,
      areaRatio: stock.value / totalValue,
      area: (stock.value / totalValue) * width * height
    }));
    
    // 根据容器长宽比选择不同的布局策略
    if (aspectRatio > 1.8) {
      // 极宽容器 - 使用多列布局
      console.log(`🏗️ Using 3-column layout for wide container`);
      return createMultiColumnLayout(stocksWithArea, width, height, 3);
    } else if (aspectRatio > 1.3) {
      // 宽容器 - 使用双列布局
      console.log(`🏗️ Using 2-column layout for wide container`);
      return createMultiColumnLayout(stocksWithArea, width, height, 2);
    } else if (aspectRatio < 0.5) {
      // 极高容器 - 使用多行布局
      console.log(`🏗️ Using 3-row layout for tall container`);
      return createMultiRowLayout(stocksWithArea, width, height, 3);
    } else if (aspectRatio < 0.7) {
      // 高容器 - 使用双行布局
      console.log(`🏗️ Using 2-row layout for tall container`);
      return createMultiRowLayout(stocksWithArea, width, height, 2);
    } else {
      // 接近方形 - 使用传统的递归分割
      console.log(`🏗️ Using squarify layout for square container`);
      return squarifyLayout(stocksWithArea, 0, 0, width, height);
    }
  };

  // 多列布局算法 - 适用于宽容器
  const createMultiColumnLayout = (data, width, height, columns) => {
    const columnWidth = width / columns;
    const rectangles = [];
    
    for (let col = 0; col < columns; col++) {
      const startIndex = Math.floor(col * data.length / columns);
      const endIndex = Math.floor((col + 1) * data.length / columns);
      const columnData = data.slice(startIndex, endIndex);
      
      if (columnData.length > 0) {
        const columnRects = squarifyLayout(
          columnData, 
          col * columnWidth, 
          0, 
          columnWidth, 
          height
        );
        rectangles.push(...columnRects);
      }
    }
    
    return rectangles;
  };

  // 多行布局算法 - 适用于高容器
  const createMultiRowLayout = (data, width, height, rows) => {
    const rowHeight = height / rows;
    const rectangles = [];
    
    for (let row = 0; row < rows; row++) {
      const startIndex = Math.floor(row * data.length / rows);
      const endIndex = Math.floor((row + 1) * data.length / rows);
      const rowData = data.slice(startIndex, endIndex);
      
      if (rowData.length > 0) {
        const rowRects = squarifyLayout(
          rowData, 
          0, 
          row * rowHeight, 
          width, 
          rowHeight
        );
        rectangles.push(...rowRects);
      }
    }
    
    return rectangles;
  };

  // 改进的递归分割布局算法 - 更智能的分割决策
  const squarifyLayout = (data, x, y, width, height) => {
    if (data.length === 0) return [];
    if (data.length === 1) {
      return [{
        ...data[0],
        x,
        y,
        width,
        height
      }];
    }

    // 计算最佳分割点和方向
    const totalArea = data.reduce((sum, item) => sum + item.area, 0);
    const aspectRatio = width / height;
    
    // 智能分割决策：考虑当前容器的长宽比和数据数量
    let isHorizontal;
    if (data.length <= 2) {
      // 少量数据时，根据长宽比决定
      isHorizontal = aspectRatio > 1.2;
    } else if (data.length <= 4) {
      // 中等数量数据时，偏向创建更方形的子区域
      isHorizontal = aspectRatio > 1.5;
    } else {
      // 大量数据时，更激进地分割
      isHorizontal = aspectRatio > 1.0;
    }
    
    // 寻找最佳分割点 - 不总是二分，而是寻找更均衡的分割
    let bestSplitIndex = 1;
    let bestRatio = Infinity;
    
    for (let i = 1; i < data.length; i++) {
      const leftArea = data.slice(0, i).reduce((sum, item) => sum + item.area, 0);
      const rightArea = totalArea - leftArea;
      const areaRatio = Math.max(leftArea, rightArea) / Math.min(leftArea, rightArea);
      
      if (areaRatio < bestRatio) {
        bestRatio = areaRatio;
        bestSplitIndex = i;
      }
    }
    
    const leftData = data.slice(0, bestSplitIndex);
    const rightData = data.slice(bestSplitIndex);
    const leftAreaRatio = leftData.reduce((sum, item) => sum + item.area, 0) / totalArea;
    
    if (isHorizontal) {
      // 水平分割
      const leftWidth = leftAreaRatio * width;
      
      return [
        ...squarifyLayout(leftData, x, y, leftWidth, height),
        ...squarifyLayout(rightData, x + leftWidth, y, width - leftWidth, height)
      ];
    } else {
      // 垂直分割
      const topHeight = leftAreaRatio * height;
      
      return [
        ...squarifyLayout(leftData, x, y, width, topHeight),
        ...squarifyLayout(rightData, x, y + topHeight, width, height - topHeight)
      ];
    }
  };

  return (
    <div 
      style={{ 
        height: "100%", 
        width: "100%",
        display: "flex", 
        flexDirection: "column",
        padding: "0px", // 移除所有内边距
        boxSizing: "border-box"
      }}
      data-treemap-container="true"
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3 style={{ 
          margin: "0", // 保持小的下边距
          color: "white", // 改为白色
          fontSize: "16px", // 稍微减小字体
          fontWeight: "600",
          paddingLeft: "8px" // 只给标题添加左边距
        }}>
          Holdings Treemap
        </h3>
        
        {/* 添加测试按钮 */}
        <button 
          onClick={() => {
            const contentArea = document.getElementById('treemap-content-area');
            if (contentArea) {
              const rect = contentArea.getBoundingClientRect();
              const newWidth = Math.max(Math.floor(rect.width - 8), 300);
              const newHeight = Math.max(Math.floor(rect.height - 8), 200);
              console.log(`🔄 Manual Update: ${newWidth}x${newHeight}`);
              setContainerSize({ width: newWidth, height: newHeight });
              setForceUpdate(prev => prev + 1);
            }
          }}
          style={{ 
            padding: "4px 8px", 
            fontSize: "10px", 
            backgroundColor: "#404040", 
            color: "white", 
            border: "none", 
            borderRadius: "4px", 
            cursor: "pointer",
            marginRight: "8px"
          }}
        >
          Update Size
        </button>
      </div>
      
      <div
        id="treemap-content-area"
        key={`treemap-${containerSize.width}-${containerSize.height}-${forceUpdate}`} // 强制重新渲染
        style={{
          position: "relative",
          width: "100%",
          height: "calc(100% - 32px)", // 为标题和按钮预留更多空间
          backgroundColor: "#1a1a1a", // 改为深色背景
          borderRadius: "8px",
          overflow: "hidden", // 启用overflow hidden确保矩形不超出容器
          marginTop: "8px" // 添加上边距
        }}
      >
        {createHeatmapLayout().map((stock, index) => {
          // 确保矩形不会超出容器边界
          const safeX = Math.max(0, Math.min(stock.x, containerSize.width - stock.width));
          const safeY = Math.max(0, Math.min(stock.y, containerSize.height - stock.height));
          const safeWidth = Math.min(stock.width, containerSize.width - safeX);
          const safeHeight = Math.min(stock.height, containerSize.height - safeY);
          
          return (
          <div
            key={stock.symbol}
            onClick={() => onStockSelect(stock.symbol)}
            style={{
              position: "absolute",
              left: `${safeX}px`,
              top: `${safeY}px`,
              width: `${safeWidth}px`, 
              height: `${safeHeight}px`, 
              backgroundColor: getHeatmapColor(stock.changePercent),
              border: "0.1px solid rgba(255,255,255,0.2)", // 极细边框
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              transition: "all 0.2s ease",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = "inset 0 0 0 2px rgba(255,255,255,0.9)";
              e.target.style.transform = "scale(1.02)";
              e.target.style.zIndex = 10;
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = "none";
              e.target.style.transform = "scale(1)";
              e.target.style.zIndex = 1;
            }}
          >
            {/* 股票代码 - 始终显示 */}
            <div style={{ 
              fontSize: Math.max(8, Math.min(16, safeWidth / 6)), 
              fontWeight: "bold", 
              color: "white", 
              textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
              marginBottom: safeHeight > 40 ? "2px" : "0px",
              lineHeight: 1
            }}>
              {stock.symbol}
            </div>
            
            {/* 市值 - 中等大小以上显示 */}
            {safeWidth > 50 && safeHeight > 35 && (
              <div style={{ 
                fontSize: Math.max(6, Math.min(12, safeWidth / 10)), 
                fontWeight: "600", 
                color: "white",
                textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                marginBottom: "1px",
                lineHeight: 1
              }}>
                ${(stock.value / 1000).toFixed(0)}K
              </div>
            )}
            
            {/* 盈亏金额 - 较大矩形显示 */}
            {safeWidth > 70 && safeHeight > 45 && (
              <div style={{ 
                fontSize: Math.max(6, Math.min(10, safeWidth / 12)), 
                fontWeight: "bold",
                color: "white",
                textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                marginBottom: "1px",
                lineHeight: 1
              }}>
                {stock.profit > 0 ? "+" : ""}${(stock.profit / 1000).toFixed(1)}K
              </div>
            )}
            
            {/* 百分比 - 显示在大多数矩形上 */}
            {safeWidth > 35 && safeHeight > 25 && (
              <div style={{ 
                fontSize: Math.max(6, Math.min(12, safeWidth / 8)), 
                fontWeight: "bold",
                color: "white",
                textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                lineHeight: 1
              }}>
                {stock.changePercent > 0 ? "+" : ""}{stock.changePercent}%
              </div>
            )}
          </div>
          );
        })}
      </div>
    </div>
  );

  // 修复的响应式更新 - 确保window resize能够被正确监听
  useEffect(() => {
    const updateSize = () => {
      const contentArea = document.getElementById('treemap-content-area');
      if (contentArea) {
        const rect = contentArea.getBoundingClientRect();
        const newWidth = Math.max(Math.floor(rect.width - 8), 300);
        const newHeight = Math.max(Math.floor(rect.height - 8), 200);
        
        console.log(`🔄 TreeMap Update: ${newWidth}x${newHeight}, Ratio: ${(newWidth/newHeight).toFixed(2)}`);
        
        // 总是更新，不检查变化
        setContainerSize({
          width: newWidth,
          height: newHeight
        });
        
        // 强制重新渲染
        setForceUpdate(prev => prev + 1);
      }
    };

    // 修复的resize处理函数
    const handleResize = () => {
      console.log('🪟 Window resize detected');
      // 使用多个延迟确保DOM完全更新
      setTimeout(updateSize, 10);
      setTimeout(updateSize, 100);
      setTimeout(updateSize, 300);
    };

    // 确保事件监听器正确添加
    console.log('📡 Setting up resize listener');
    window.addEventListener("resize", handleResize, { passive: true });
    
    // 也监听orientationchange事件（移动设备）
    window.addEventListener("orientationchange", handleResize, { passive: true });
    
    // 添加定期检查作为备用机制
    const intervalCheck = setInterval(() => {
      console.log('⏰ Periodic size check');
      updateSize();
    }, 1000); // 每秒检查一次
    
    // 初始化
    setTimeout(updateSize, 100);
    setTimeout(updateSize, 500);
    
    return () => {
      console.log('🧹 Cleaning up resize listener');
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      clearInterval(intervalCheck);
    };
  }, []);

  // 添加一个额外的useEffect来监听containerSize变化
  useEffect(() => {
    console.log(`📐 Container size changed to: ${containerSize.width}x${containerSize.height}`);
  }, [containerSize]);
}