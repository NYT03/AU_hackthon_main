"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Chart from 'chart.js/auto';
import { useEffect, useRef, useState } from 'react';

export default function BenchmarkComparisonChart({ data }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!data) return;
    
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      if (!chartRef.current) return;
      
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
          datasets: [
            {
              label: 'Your Portfolio',
              data: data.portfolio,
              borderColor: 'rgb(94, 129, 244)',
              backgroundColor: 'rgba(94, 129, 244, 0.1)',
              borderWidth: 2,
              tension: 0.3,
              fill: true,
              pointRadius: 3,
              pointBackgroundColor: '#fff',
              pointBorderColor: 'rgb(94, 129, 244)',
              pointHoverRadius: 5
            },
            {
              label: 'S&P 500',
              data: data.sp500,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.05)',
              borderWidth: 2,
              tension: 0.3,
              fill: true,
              pointRadius: 3,
              pointBackgroundColor: '#fff',
              pointBorderColor: 'rgb(255, 99, 132)',
              pointHoverRadius: 5
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          layout: {
            padding: {
              top: 5,
              right: 15,
              bottom: 5,
              left: 10
            }
          },
          plugins: {
            legend: {
              position: 'top',
              align: 'end',
              labels: {
                boxWidth: 12,
                usePointStyle: true,
                pointStyle: 'circle',
                padding: 15
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleFont: {
                size: 13
              },
              bodyFont: {
                size: 12
              },
              padding: 10,
              callbacks: {
                label: function(context) {
                  return `${context.dataset.label}: ${context.raw.toFixed(2)}%`;
                }
              }
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              },
              ticks: {
                maxRotation: 0,
                font: {
                  size: 10
                }
              }
            },
            y: {
              grid: {
                color: 'rgba(200, 200, 200, 0.1)'
              },
              ticks: {
                font: {
                  size: 11
                },
                callback: function(value) {
                  return value + '%';
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