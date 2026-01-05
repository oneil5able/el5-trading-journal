import React, { useEffect, useRef } from 'react';

export default function LiveMarketWidget({ symbol = 'BTCUSDT', width = '100%', height = 400 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const id = `tradingview-widget-${symbol.replace(/[^a-zA-Z0-9]/g, '')}`;
    const node = containerRef.current;
    if (!node) return;

    // Remove existing child
    node.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.id = id;
    node.appendChild(wrapper);

    // Load TradingView script if not present
    const scriptId = 'tradingview-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://s3.tradingview.com/tv.js';
      script.async = true;
      script.onload = () => {
        if (window.TradingView) {
          new window.TradingView.widget({
            autosize: true,
            symbol: symbol,
            interval: '60',
            timezone: 'Etc/UTC',
            theme: 'Dark',
            style: '1',
            toolbar_bg: '#f1f3f6',
            container_id: id,
          });
        }
      };
      document.body.appendChild(script);
    } else {
      if (window.TradingView) {
        new window.TradingView.widget({
          autosize: true,
          symbol: symbol,
          interval: '60',
          timezone: 'Etc/UTC',
          theme: 'Dark',
          style: '1',
          toolbar_bg: '#f1f3f6',
          container_id: id,
        });
      }
    }

    return () => {
      // cleanup
      if (node) node.innerHTML = '';
    };
  }, [symbol]);

  return <div ref={containerRef} style={{ width: width, height: height }} />;
}
