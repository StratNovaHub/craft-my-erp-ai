import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { ModuleCard } from "@/components/ModuleCard";
import { Users, Package, Shield, TrendingUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const { currentOrg } = useAuth();
  const [stats, setStats] = useState({
    customers: 0,
    products: 0,
    risks: 0,
    orders: 0
  });

  useEffect(() => {
    if (!currentOrg) return;
    
    const loadStats = async () => {
      const [customers, products, risks, orders] = await Promise.all([
        supabase.from('customers').select('id', { count: 'exact', head: true }).eq('org_id', currentOrg.id),
        supabase.from('products').select('id', { count: 'exact', head: true }).eq('org_id', currentOrg.id),
        supabase.from('risk_assessments').select('id', { count: 'exact', head: true }).eq('org_id', currentOrg.id),
        supabase.from('orders').select('id', { count: 'exact', head: true }).eq('org_id', currentOrg.id),
      ]);

      setStats({
        customers: customers.count || 0,
        products: products.count || 0,
        risks: risks.count || 0,
        orders: orders.count || 0,
      });
    };

    loadStats();
  }, [currentOrg]);

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-muted-foreground">
            Welcome to your Enterprise Management Suite
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ModuleCard
            title="Customers"
            value={stats.customers.toString()}
            change="+12%"
            icon={Users}
            trend="up"
          />
          <ModuleCard
            title="Products"
            value={stats.products.toString()}
            change="+8%"
            icon={Package}
            trend="up"
          />
          <ModuleCard
            title="Active Risks"
            value={stats.risks.toString()}
            change="-5%"
            icon={Shield}
            trend="down"
          />
          <ModuleCard
            title="Orders"
            value={stats.orders.toString()}
            change="+23%"
            icon={TrendingUp}
            trend="up"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
