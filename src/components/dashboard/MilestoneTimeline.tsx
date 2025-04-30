
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Milestone {
  date: string;
  title: string;
  status: "completed" | "current" | "upcoming";
}

const milestones: Milestone[] = [
  {
    date: "March 15, 2025",
    title: "ICO Announcement",
    status: "completed"
  },
  {
    date: "April 1, 2025",
    title: "Pre-Sale Start",
    status: "completed"
  },
  {
    date: "April 30, 2025",
    title: "Main Sale Start",
    status: "current"
  },
  {
    date: "May 14, 2025",
    title: "ICO End",
    status: "upcoming"
  },
  {
    date: "May 21, 2025",
    title: "Token Distribution",
    status: "upcoming"
  }
];

const MilestoneTimeline = () => {
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <CardTitle>ICO Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <div 
              key={index} 
              className={cn(
                "flex items-start",
                milestone.status === "current" && "animate-pulse-glow"
              )}
            >
              <div className="mr-4 flex flex-col items-center">
                <div className={cn(
                  "rounded-full p-1",
                  milestone.status === "completed" && "bg-success text-success-foreground",
                  milestone.status === "current" && "bg-primary text-primary-foreground",
                  milestone.status === "upcoming" && "bg-muted text-muted-foreground"
                )}>
                  {milestone.status === "completed" ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Clock className="h-4 w-4" />
                  )}
                </div>
                {index < milestones.length - 1 && (
                  <div className={cn(
                    "h-10 w-0.5 my-1", 
                    milestone.status === "completed" ? "bg-success" : "bg-muted"
                  )} />
                )}
              </div>
              <div>
                <h4 className={cn(
                  "font-medium",
                  milestone.status === "completed" && "text-foreground",
                  milestone.status === "current" && "text-primary",
                  milestone.status === "upcoming" && "text-muted-foreground"
                )}>
                  {milestone.title}
                </h4>
                <p className="text-sm text-muted-foreground">{milestone.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MilestoneTimeline;
