"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Chart from 'chart.js/auto';
import { useEffect, useRef, useState } from 'react';

export default function AssetAllocationChart({ data }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!data) return;
    
    setIsLoading(true);
    
    // Short timeout to allow for smooth transition if data changes
    const timer = setTimeout(() => {
      if (!chartRef.current) return;
      
      // Destroy existing chart
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      
      // Create new chart
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: data.labels,
          datasets: [{
            data: data.values,
            backgroundColor: [
              'rgba(94, 129, 244, 0.8)',
              'rgba(255, 99, 132, 0.8)',
              'rgba(255, 206, 86, 0.8)',
              'rgba(75, 192, 192, 0.8)',
              'rgba(153, 102, 255, 0.8)',
              'rgba(255, 159, 64, 0.8)',
              'rgba(46, 204, 113, 0.8)'
            ],
            borderColor: '#ffffff',
            borderWidth: 2,
            hoverBorderWidth: 3,
            hoverBorderColor: '#ffffff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: 20
          },
          plugins: {
            legend: {
              position: 'right',
              labels: {
                padding: 20,
                usePointStyle: true,
                pointStyle: 'circle',
                font: {
                  size: 11
                }
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              padding: 12,
              titleFont: {
                size: 14,
                weight: 'bold'
              },
              bodyFont: {
                size: 13
              },
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.raw || 0;
                  const percentage = ((value / data.values.reduce((a, b) => a + b, 0)) * 100).toFixed(1);
                  return `${label}: ${percentage}% ($${value.toLocaleString()})`;
                }
              }
            }
          }
        }
      });
      
      setIsLoading(false);
    }, 300);
    
    // Cleanup
    return () => {
      clearTimeout(timer);
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);
  
  if (!data) {
    return (
      <div className="flex items-center justify-center h-48 bg-muted/5 rounded-md">
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }
  
  return (
    <div className="relative w-full h-64 md:h-80">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="space-y-2 w-full px-12">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        </div>
      )}
      <div className={`w-full h-full transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
} 