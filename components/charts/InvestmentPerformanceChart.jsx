"use client";

import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';

export default function InvestmentPerformanceChart({ data }) {
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
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Return (%)',
          data: data.returns,
          backgroundColor: data.returns.map(value => 
            value >= 0 ? 'rgba(75, 192, 192, 0.7)' : 'rgba(255, 99, 132, 0.7)'
          ),
          borderColor: data.returns.map(value => 
            value >= 0 ? 'rgb(75, 192, 192)' : 'rgb(255, 99, 132)'
          ),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',  // Horizontal bar chart
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return `Return: ${context.raw.toFixed(2)}%`;
              }
            }
          },
          legend: {
            display: false
          }
        },
        scales: {
          x: {
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