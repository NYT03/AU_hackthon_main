"use client";

import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';

export default function MarketTrendsChart({ data }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  
  useEffect(() => {
    if (!data || !chartRef.current) return;
    
    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    // Color palette for sectors
    const colors = [
      'rgb(75, 192, 192)',   // teal
      'rgb(255, 99, 132)',   // pink
      'rgb(255, 205, 86)',   // yellow
      'rgb(54, 162, 235)',   // blue
      'rgb(153, 102, 255)',  // purple
      'rgb(255, 159, 64)',   // orange
      'rgb(201, 203, 207)'   // gray
    ];
    
    // Create datasets for each sector
    const datasets = data.sectors.map((sector, index) => ({
      label: sector.name,
      data: sector.performance,
      borderColor: colors[index % colors.length],
      backgroundColor: colors[index % colors.length].replace('rgb', 'rgba').replace(')', ', 0.1)'),
      tension: 0.1,
      fill: false
    }));
    
    // Create new chart
    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.dates,
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: ${context.raw.toFixed(2)}%`;
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