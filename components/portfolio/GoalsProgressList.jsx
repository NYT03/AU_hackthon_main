"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function GoalsProgressList({ goals }) {
  if (!goals || goals.length === 0) {
    return (
      <div className="text-center py-8 px-4 border border-dashed rounded-lg bg-muted/5">
        <h3 className="text-lg font-medium text-muted-foreground">No financial goals set</h3>
        <p className="text-sm text-muted-foreground mt-2">Create a goal to track your financial progress</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-5">
      {goals.map((goal, index) => {
        const progressPercentage = Math.min(100, Math.round((goal.current / goal.target) * 100));
        let statusBadge;
        let progressColor;
        
        if (progressPercentage < 25) {
          statusBadge = <Badge className="bg-red-100 text-red-800 border-red-200">Just Started</Badge>;
          progressColor = "bg-red-500";
        } else if (progressPercentage < 50) {
          statusBadge = <Badge className="bg-orange-100 text-orange-800 border-orange-200">In Progress</Badge>;
          progressColor = "bg-orange-500";
        } else if (progressPercentage < 75) {
          statusBadge = <Badge className="bg-blue-100 text-blue-800 border-blue-200">Good Progress</Badge>;
          progressColor = "bg-blue-500";
        } else if (progressPercentage < 100) {
          statusBadge = <Badge className="bg-green-100 text-green-800 border-green-200">Almost There</Badge>;
          progressColor = "bg-green-500";
        } else {
          statusBadge = <Badge className="bg-purple-100 text-purple-800 border-purple-200">Achieved!</Badge>;
          progressColor = "bg-purple-500";
        }
        
        return (
          <Card key={index} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="bg-card/5 border-b pb-3 pt-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base font-semibold">{goal.name}</CardTitle>
                {statusBadge}
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-5">
              <div className="space-y-3">
                <Progress value={progressPercentage} className={`h-2 ${progressColor}`} />
                <div className="flex justify-between text-sm font-medium">
                  <span>{progressPercentage}% Complete</span>
                  <span className="text-primary">${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 mt-3 pt-2 border-t text-sm text-muted-foreground">
                  {progressPercentage < 100 ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 8v4l3 3" />
                      </svg>
                      <span>${(goal.target - goal.current).toLocaleString()} more to reach your goal</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      <span className="text-green-600 font-medium">Goal achieved! Consider setting a new target.</span>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
} 