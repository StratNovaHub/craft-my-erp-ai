import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Shield, AlertTriangle, TrendingDown, Activity } from "lucide-react";
import { ModuleCard } from "@/components/ModuleCard";

const ERM = () => {
  const risks = [
    { category: "Financial", level: "Low", score: 15, color: "text-accent" },
    { category: "Operational", level: "Medium", score: 45, color: "text-yellow-500" },
    { category: "Strategic", level: "Low", score: 20, color: "text-accent" },
    { category: "Compliance", level: "High", score: 75, color: "text-destructive" },
  ];

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">Risk Management</span>
          </h1>
          <p className="text-muted-foreground">Monitor and mitigate business risks</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ModuleCard
            icon={Shield}
            title="Risk Score"
            value="Medium"
            change="Stable"
            trend="up"
          />
          <ModuleCard
            icon={AlertTriangle}
            title="Active Risks"
            value="12"
            change="-3"
            trend="up"
          />
          <ModuleCard
            icon={TrendingDown}
            title="Mitigated"
            value="45"
            change="+8"
            trend="up"
          />
          <ModuleCard
            icon={Activity}
            title="Monitoring"
            value="23"
            change="+2"
            trend="up"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4">Risk Categories</h3>
            <div className="space-y-4">
              {risks.map((risk) => (
                <div key={risk.category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{risk.category}</span>
                    <span className={`text-sm font-medium ${risk.color}`}>
                      {risk.level}
                    </span>
                  </div>
                  <div className="h-2 bg-muted/20 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        risk.level === "High" 
                          ? "bg-destructive" 
                          : risk.level === "Medium" 
                            ? "bg-yellow-500" 
                            : "bg-accent"
                      }`}
                      style={{ width: `${risk.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4">Risk Alerts</h3>
            <div className="space-y-3">
              {[
                { text: "Compliance review due next week", priority: "high" },
                { text: "Financial audit scheduled", priority: "medium" },
                { text: "Update security protocols", priority: "medium" },
                { text: "Review insurance coverage", priority: "low" },
                { text: "Disaster recovery test pending", priority: "high" },
              ].map((alert, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/20">
                  <AlertTriangle className={`w-4 h-4 ${
                    alert.priority === "high" 
                      ? "text-destructive" 
                      : alert.priority === "medium" 
                        ? "text-yellow-500" 
                        : "text-accent"
                  }`} />
                  <span className="text-sm flex-1">{alert.text}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ERM;
