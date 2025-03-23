"use client";

import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';

export default function ProjectedGrowthChart({ data }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  
  useEffect(() => {
    if (!data || !chartRef.current) return;
    
    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    // Find index where projections start (where actual becomes null)
    const projectionStartIndex = data.actual.findIndex(val => val === null);
    
    // Create new chart
    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.dates,
        datasets: [
          {
            label: 'Actual',
            data: data.actual,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.1)',
            tension: 0.1,
            fill: false,
            pointStyle: 'circle'
          },
          {
            label: 'Conservative Projection',
            data: data.conservative,
            borderColor: 'rgb(255, 205, 86)',
            backgroundColor: 'rgba(255, 205, 86, 0.1)',
            borderDash: [5, 5],
            tension: 0.1,
            fill: false,
            pointStyle: projectionStartIndex > 0 ? 
              data.conservative.map((_, i) => i < projectionStartIndex ? 'circle' : 'star') : 
              'star'
          },
          {
            label: 'Aggressive Projection',
            data: data.aggressive,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.1)',
            borderDash: [3, 3],
            tension: 0.1,
            fill: false,
            pointStyle: projectionStartIndex > 0 ? 
              data.aggressive.map((_, i) => i < projectionStartIndex ? 'circle' : 'triangle') : 
              'triangle'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                const value = context.raw;
                if (value === null) return `${context.dataset.label}: N/A`;
                return `${context.dataset.label}: $${value.toLocaleString()}`;
              }
            }
          },
          annotation: {
            annotations: {
              projectionLine: {
                type: 'line',
                xMin: projectionStartIndex > 0 ? projectionStartIndex - 0.5 : undefined,
                xMax: projectionStartIndex > 0 ? projectionStartIndex - 0.5 : undefined,
                borderColor: 'rgba(0, 0, 0, 0.3)',
                borderWidth: 2,
                borderDash: [6, 6],
                label: {
                  display: projectionStartIndex > 0,
                  content: 'Projection Start',
                  position: 'start'
                }
              }
            }
          }
        },
        scales: {
          y: {
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