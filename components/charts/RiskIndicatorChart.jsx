"use client";

import { Skeleton } from "@/components/ui/skeleton";
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

// Only import Chart.js on the client side
const Chart = dynamic(() => import('chart.js/auto'), { ssr: false });

export default function RiskIndicatorChart({ riskLevel }) {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Load the gauge module only on the client side
    const loadGauge = async () => {
      try {
        // Only try to import chartjs-gauge on the client
        await import('chartjs-gauge');
        
        if (riskLevel === undefined || !chartRef.current) return;
        
        setIsLoading(true);
        
        // Short timeout for smooth transition
        const timer = setTimeout(() => {
          // Destroy existing chart
          if (chartInstance) {
            chartInstance.destroy();
          }
          
          // Create risk labels based on level
          let riskLabel = 'Low Risk';
          let color = 'rgba(76, 175, 80, 0.8)';  // green
          
          if (riskLevel > 25 && riskLevel <= 50) {
            riskLabel = 'Moderate Risk';
            color = 'rgba(255, 152, 0, 0.8)';  // orange
          } else if (riskLevel > 50 && riskLevel <= 75) {
            riskLabel = 'High Risk';
            color = 'rgba(244, 67, 54, 0.8)';  // red
          } else if (riskLevel > 75) {
            riskLabel = 'Very High Risk';
            color = 'rgba(183, 28, 28, 0.8)';  // dark red
          }
          
          // Create a doughnut chart as a gauge alternative
          const ctx = chartRef.current.getContext('2d');
          const newChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: ['Risk Level', 'Remaining'],
              datasets: [{
                data: [riskLevel, 100 - riskLevel],
                backgroundColor: [color, 'rgba(224, 224, 224, 0.3)'],
                borderWidth: 0,
                borderRadius: 5
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              circumference: 180,
              rotation: 270,
              cutout: '80%',
              plugins: {
                tooltip: {
                  enabled: false
                },
                legend: {
                  display: false
                }
              },
              animation: {
                animateRotate: true,
                animateScale: true
              }
            }
          });
          
          setChartInstance(newChartInstance);
          
          // Add text in the center for risk level display
          const canvas = chartRef.current;
          if (!canvas || !canvas.parentNode) return;
          
          // Remove any existing text display
          const existingText = canvas.parentNode.querySelector('.risk-display');
          if (existingText) {
            existingText.remove();
          }
          
          // Create new text display
          const textDisplay = document.createElement('div');
          textDisplay.className = 'risk-display';
          textDisplay.style.position = 'absolute';
          textDisplay.style.top = '70%';
          textDisplay.style.left = '50%';
          textDisplay.style.transform = 'translate(-50%, -50%)';
          textDisplay.style.textAlign = 'center';
          textDisplay.innerHTML = `
            <div style="font-size: 28px; font-weight: bold; color: ${color.replace('0.8', '1')};">${riskLevel}%</div>
            <div style="font-size: 16px; color: #666; font-weight: 500; margin-top: 4px">${riskLabel}</div>
          `;
          
          canvas.parentNode.style.position = 'relative';
          canvas.parentNode.appendChild(textDisplay);
          
          setIsLoading(false);
        }, 300);
        
        return () => clearTimeout(timer);
        
      } catch (err) {
        console.error("Error loading chart:", err);
        setIsLoading(false);
      }
    };
    
    loadGauge();
    
    // Cleanup
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
      
      // Remove text display
      const canvas = chartRef.current;
      if (canvas && canvas.parentNode) {
        const textDisplay = canvas.parentNode.querySelector('.risk-display');
        if (textDisplay) {
          textDisplay.remove();
        }
      }
    };
  }, [riskLevel, chartInstance]);
  
  if (riskLevel === undefined) {
    return (
      <div className="flex items-center justify-center h-48 bg-muted/5 rounded-md">
        <p className="text-muted-foreground">No risk data available</p>
      </div>
    );
  }
  
  return (
    <div className="relative w-full h-52 md:h-64">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="space-y-2 w-full px-12">
            <Skeleton className="h-4 w-3/4 mx-auto" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
          </div>
        </div>
      )}
      <div className={`w-full h-full transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
} 