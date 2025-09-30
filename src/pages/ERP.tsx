import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Package, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { ModuleCard } from "@/components/ModuleCard";

const ERP = () => {
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">Resource Planning</span>
          </h1>
          <p className="text-muted-foreground">Manage your business resources efficiently</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ModuleCard
            icon={Package}
            title="Total Inventory"
            value="8,432"
            change="+5.2%"
            trend="up"
          />
          <ModuleCard
            icon={TrendingUp}
            title="Production Rate"
            value="94%"
            change="+2.1%"
            trend="up"
          />
          <ModuleCard
            icon={AlertCircle}
            title="Low Stock Items"
            value="23"
            change="-8.3%"
            trend="up"
          />
          <ModuleCard
            icon={CheckCircle}
            title="Completed Orders"
            value="1,234"
            change="+12.5%"
            trend="up"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4">Resource Allocation</h3>
            <div className="space-y-4">
              {["Manufacturing", "Logistics", "Quality Control", "Research & Development"].map((dept) => (
                <div key={dept} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{dept}</span>
                    <span className="text-muted-foreground">{Math.floor(Math.random() * 30 + 70)}%</span>
                  </div>
                  <div className="h-2 bg-muted/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                      style={{ width: `${Math.floor(Math.random() * 30 + 70)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
            <div className="space-y-3">
              {[
                "New order received - Order #1045",
                "Inventory updated - Product SKU-234",
                "Production milestone reached",
                "Quality check completed - Batch #789",
                "Shipment dispatched - Order #1044"
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/20">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-sm">{activity}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ERP;
