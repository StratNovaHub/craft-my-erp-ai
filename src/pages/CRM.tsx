import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Users, Mail, Phone, MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CRM = () => {
  const customers = [
    { id: 1, name: "John Doe", email: "john@example.com", phone: "+1 234 567 890", location: "New York", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "+1 234 567 891", location: "London", status: "Active" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", phone: "+1 234 567 892", location: "Paris", status: "Inactive" },
  ];

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="gradient-text">Customer Management</span>
            </h1>
            <p className="text-muted-foreground">Manage your customer relationships</p>
          </div>
          <Button className="bg-gradient-to-r from-primary to-accent">
            <Plus className="w-4 h-4 mr-2" />
            Add Customer
          </Button>
        </div>

        <Card className="glass-card p-6">
          <div className="mb-6">
            <Input
              placeholder="Search customers..."
              className="max-w-md bg-background/50 border-border/50"
            />
          </div>

          <div className="space-y-4">
            {customers.map((customer) => (
              <Card key={customer.id} className="p-4 hover:shadow-card transition-all duration-300 cursor-pointer bg-muted/20 border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{customer.name}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {customer.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {customer.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {customer.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    customer.status === "Active" 
                      ? "bg-accent/10 text-accent" 
                      : "bg-muted/30 text-muted-foreground"
                  }`}>
                    {customer.status}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default CRM;
