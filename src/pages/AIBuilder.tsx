import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Send, Database, Users, Package, Shield, FileText, BarChart } from "lucide-react";
import { toast } from "sonner";

const AIBuilder = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([
    { role: "assistant", content: "Hello! I'm your Data Management AI. Tell me what record you need to create, update, or where you need to allocate data, and I'll handle it across your ERP, CRM, and ERM systems." }
  ]);

  const handleSend = () => {
    if (!prompt.trim()) return;

    setMessages([...messages, { role: "user", content: prompt }]);
    setPrompt("");

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I'm analyzing your request and routing the data to the appropriate modules. I'll update all relevant records and confirm once complete."
      }]);
      toast.success("Processing data allocation...");
    }, 1000);
  };

  const suggestions = [
    { icon: Database, text: "Create new customer record" },
    { icon: Package, text: "Update inventory data" },
    { icon: Users, text: "Add employee information" },
  ];

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in h-full">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">AI Data Manager</span>
          </h1>
          <p className="text-muted-foreground">Intelligent record management across all your systems</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Chat Area */}
          <Card className="glass-card p-6 lg:col-span-2 flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/30"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Tell me what record to create or update..."
                className="min-h-[60px] resize-none bg-background/50 border-border/50"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <Button 
                onClick={handleSend}
                className="bg-gradient-to-r from-primary to-accent"
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* Data Views Panel */}
          <Card className="glass-card p-6 overflow-hidden flex flex-col">
            <Tabs defaultValue="quick" className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="quick">Quick Actions</TabsTrigger>
                <TabsTrigger value="views">Data Views</TabsTrigger>
              </TabsList>
              
              <TabsContent value="quick" className="space-y-3 mt-0">
                {suggestions.map((suggestion, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    className="w-full justify-start gap-3 h-auto py-4 hover:bg-primary/10 hover:border-primary/50 transition-all"
                    onClick={() => setPrompt(suggestion.text)}
                  >
                    <suggestion.icon className="w-5 h-5" />
                    <span className="text-sm">{suggestion.text}</span>
                  </Button>
                ))}
                
                <div className="pt-4 border-t border-border/50">
                  <h4 className="text-sm font-semibold mb-3">Recent Operations</h4>
                  <div className="space-y-2">
                    {[
                      "Customer #1234 created",
                      "Inventory updated",
                      "Risk assessment filed"
                    ].map((item, i) => (
                      <div key={i} className="text-sm p-2 rounded-lg bg-muted/20 text-muted-foreground">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="views" className="space-y-3 mt-0">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 py-3 hover:bg-primary/10 hover:border-primary/50"
                >
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Customer Records</span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 py-3 hover:bg-primary/10 hover:border-primary/50"
                >
                  <Package className="w-4 h-4" />
                  <span className="text-sm">Inventory Items</span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 py-3 hover:bg-primary/10 hover:border-primary/50"
                >
                  <Shield className="w-4 h-4" />
                  <span className="text-sm">Risk Assessments</span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 py-3 hover:bg-primary/10 hover:border-primary/50"
                >
                  <FileText className="w-4 h-4" />
                  <span className="text-sm">All Documents</span>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 py-3 hover:bg-primary/10 hover:border-primary/50"
                >
                  <BarChart className="w-4 h-4" />
                  <span className="text-sm">Analytics View</span>
                </Button>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AIBuilder;
