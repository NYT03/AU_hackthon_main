"use client";

import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';

export default function PortfolioValueChart({ data }) {
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
          label: 'Total Portfolio Value',
          data: data.values,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
          fill: true,
          backgroundColor: 'rgba(75, 192, 192, 0.2)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `$${context.raw.toLocaleString()}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
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