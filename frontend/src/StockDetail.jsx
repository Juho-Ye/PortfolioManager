// StockDetail.jsx
import React, { useEffect, useState } from "react";
export default function StockDetail({ symbol, onClose }) {
  const [detail, setDetail] = useState(null);
  useEffect(() => {
    fetch(`/api/stock/${symbol}`)
      .then(res => res.json())
      .then(setDetail);
  }, [symbol]);
  if (!detail) return null;
  return (
    <div className="modal">
      <button onClick={onClose}>关闭</button>
      <h2>{detail.symbol}</h2>
      {/* 这里可用 K 线图/柱状图等 */}
      <div>
        当前价：{detail.price} <br />
        涨跌：{detail.change} ({detail.rate}%)
      </div>
      {/* 其他详细信息 */}
      <div>
        {/* 伪代码：用图表库渲染K线/柱状图 */}
        {/* <KLineChart data={detail.kline} /> */}
      </div>
      <div>股票基金债券</div>
    </div>
  );
}