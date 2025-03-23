"use client";

import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';

export default function PortfolioGrowthChart({ data }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  
  useEffect(() => {
    if (!data || !chartRef.current) return;
    
    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    // Create new chart
    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.dates,
        datasets: [{
          label: 'Portfolio Growth (%)',
          data: data.percentages,
          borderColor: 'rgb(54, 162, 235)',
          tension: 0.1,
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.raw.toFixed(2)}%`;
              }
            }
          }
        },
        scales: {
          y: {
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            }
          }
        }
      }
    });
    
    // Cleanup
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);
  
  if (!data) {
    return <div className="flex items-center justify-center h-full">No data available</div>;
  }
  
  return <canvas ref={chartRef} />;
} 