"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function RecommendationsList({ recommendations }) {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="text-center py-8 px-4 border border-dashed rounded-lg bg-muted/5">
        <h3 className="text-lg font-medium text-muted-foreground">No recommendations available</h3>
        <p className="text-sm text-muted-foreground mt-2">Check back later for personalized investment suggestions</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {recommendations.map((item, index) => (
        <Card key={index} className="overflow-hidden shadow-sm hover:shadow-md transition-all hover:translate-y-[-2px] cursor-pointer bg-gradient-to-br from-card to-card/90">
          <div className="p-5 flex items-start space-x-4">
            <div className="bg-primary/10 p-3 rounded-full flex items-center justify-center">
              <span className="text-lg font-bold text-primary">{item.symbol}</span>
            </div>
            <div className="space-y-2 flex-1">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-primary-foreground">{item.name}</h4>
                <Badge variant="outline" className="bg-green-50 text-green-700 border border-green-200">Recommended</Badge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.reason}</p>
              <div className="flex items-center mt-2 text-sm text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                View Details
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
} 