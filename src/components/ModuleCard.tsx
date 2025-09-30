import { LucideIcon } from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  className?: string;
}

export const ModuleCard = ({ 
  icon: Icon, 
  title, 
  value, 
  change, 
  trend,
  className 
}: ModuleCardProps) => {
  return (
    <Card className={cn(
      "glass-card p-6 hover:shadow-card transition-all duration-300 group cursor-pointer",
      className
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <span className={cn(
          "text-sm font-medium px-2 py-1 rounded-full",
          trend === "up" ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"
        )}>
          {change}
        </span>
      </div>
      
      <h3 className="text-sm text-muted-foreground mb-2">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </Card>
  );
};
