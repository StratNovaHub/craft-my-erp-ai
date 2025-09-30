import { ModuleCard } from "@/components/ModuleCard";
import { Layout } from "@/components/Layout";
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  AlertTriangle,
  ArrowUpRight,
  Package,
  ShoppingCart,
  Activity
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "Add Customer":
        navigate("/crm");
        toast.success("Opening CRM module");
        break;
      case "New Product":
        navigate("/erp");
        toast.success("Opening ERP module");
        break;
      case "Create Report":
        toast.success("Report generation started");
        break;
      case "Risk Assessment":
        navigate("/erm");
        toast.success("Opening ERM module");
        break;
    }
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Welcome back, <span className="gradient-text">Admin</span>
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening with your business today.
            </p>
          </div>
          <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
            <ArrowUpRight className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ModuleCard
            icon={Users}
            title="Total Customers"
            value="2,543"
            change="+12.5%"
            trend="up"
          />
          <ModuleCard
            icon={DollarSign}
            title="Revenue"
            value="$45,231"
            change="+8.2%"
            trend="up"
          />
          <ModuleCard
            icon={Package}
            title="Products"
            value="1,234"
            change="-2.4%"
            trend="down"
          />
          <ModuleCard
            icon={AlertTriangle}
            title="Risk Score"
            value="Low"
            change="Stable"
            trend="up"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Sales Overview</h3>
                <p className="text-sm text-muted-foreground">Monthly performance</p>
              </div>
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div className="h-64 flex items-center justify-center bg-muted/20 rounded-xl">
              <Activity className="w-12 h-12 text-muted-foreground animate-pulse" />
            </div>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Recent Orders</h3>
                <p className="text-sm text-muted-foreground">Last 7 days</p>
              </div>
              <ShoppingCart className="w-5 h-5 text-secondary" />
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Package className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Order #{1000 + i}</p>
                      <p className="text-sm text-muted-foreground">Customer {i}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-accent">$299</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Add Customer", icon: Users },
              { label: "New Product", icon: Package },
              { label: "Create Report", icon: TrendingUp },
              { label: "Risk Assessment", icon: AlertTriangle },
            ].map((action) => (
              <Button
                key={action.label}
                variant="outline"
                className="h-20 flex-col gap-2 hover:bg-primary/10 hover:border-primary/50 transition-all"
                onClick={() => handleQuickAction(action.label)}
              >
                <action.icon className="w-5 h-5" />
                <span className="text-sm">{action.label}</span>
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
