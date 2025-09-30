import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Send, Zap, Layout as LayoutIcon, Database } from "lucide-react";
import { toast } from "sonner";

const AIBuilder = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([
    { role: "assistant", content: "Hello! I'm your AI Builder assistant. I can help you customize your ERP-CRM-ERM system. What would you like to build or modify today?" }
  ]);

  const handleSend = () => {
    if (!prompt.trim()) return;

    setMessages([...messages, { role: "user", content: prompt }]);
    setPrompt("");

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I understand you want to customize your system. I can help you add new modules, modify existing features, or create custom workflows. Would you like me to suggest some options?"
      }]);
      toast.success("AI is processing your request...");
    }, 1000);
  };

  const suggestions = [
    { icon: LayoutIcon, text: "Create custom dashboard" },
    { icon: Database, text: "Add new data fields" },
    { icon: Zap, text: "Automate workflow" },
  ];

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in h-full">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">AI Builder</span>
          </h1>
          <p className="text-muted-foreground">Customize your system with AI-powered assistance</p>
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
                placeholder="Describe what you want to build or customize..."
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

          {/* Suggestions Panel */}
          <Card className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              Quick Actions
            </h3>
            <div className="space-y-3">
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
            </div>

            <div className="mt-6 pt-6 border-t border-border/50">
              <h4 className="text-sm font-semibold mb-3">Recent Customizations</h4>
              <div className="space-y-2">
                {[
                  "Added sales dashboard",
                  "Modified customer fields",
                  "Created automation rule"
                ].map((item, i) => (
                  <div key={i} className="text-sm p-2 rounded-lg bg-muted/20 text-muted-foreground">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AIBuilder;
