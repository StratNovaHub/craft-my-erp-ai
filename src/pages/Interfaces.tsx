import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Grid, Loader2, Download } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AVAILABLE_TABLES = [
  'customers', 'contacts', 'deals', 'products', 'inventory_batches',
  'sales_logs', 'orders', 'order_items', 'risk_assessments',
  'incidents', 'compliance_records'
];

const Interfaces = () => {
  const { currentOrg, user } = useAuth();
  const [views, setViews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedView, setSelectedView] = useState<any>(null);
  const [viewData, setViewData] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // New view form
  const [newViewTitle, setNewViewTitle] = useState("");
  const [newViewTable, setNewViewTable] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (!currentOrg) return;
    loadViews();
  }, [currentOrg]);

  const loadViews = async () => {
    if (!currentOrg) return;
    setLoading(true);
    try {
      const { data, error } = await (supabase as any)
        .from('saved_views')
        .select('*')
        .eq('org_id', currentOrg.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Saved views table not ready:', error);
        setViews([]);
      } else {
        setViews(data || []);
      }
    } catch (error) {
      console.warn('Error loading views:', error);
    }
    setLoading(false);
  };

  const createView = async () => {
    if (!currentOrg || !user || !newViewTitle || !newViewTable) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      const { error } = await (supabase as any)
        .from('saved_views')
        .insert({
          org_id: currentOrg.id,
          title: newViewTitle,
          table_name: newViewTable,
          config: {},
          created_by: user.id
        });

      if (error) {
        toast.error('Failed to create view');
        console.error(error);
      } else {
        toast.success('View created successfully');
        setNewViewTitle("");
        setNewViewTable("");
        setDialogOpen(false);
        loadViews();
      }
    } catch (error) {
      console.warn('Saved views not available yet:', error);
      toast.error('This feature requires database migration');
    }
  };

  const openView = async (view: any) => {
    if (!currentOrg) return;
    setSelectedView(view);
    setLoadingData(true);

    try {
      let query = supabase.from(view.table_name).select('*').limit(100);
      
      if (currentOrg) {
        query = (query as any).eq('org_id', currentOrg.id);
      }
      
      const { data, error } = await query;

      if (error) {
        toast.error('Failed to load data');
        console.error(error);
        setViewData([]);
      } else {
        setViewData(data || []);
      }
    } catch (error) {
      console.warn('Error loading view data:', error);
      setViewData([]);
    }
    setLoadingData(false);
  };

  const exportToCSV = () => {
    if (!viewData.length) return;
    
    const headers = Object.keys(viewData[0]).join(',');
    const rows = viewData.map(row => 
      Object.values(row).map(v => `"${v}"`).join(',')
    ).join('\n');
    
    const csv = `${headers}\n${rows}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedView?.title || 'export'}.csv`;
    a.click();
    toast.success('Exported to CSV');
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="gradient-text">Saved Interfaces</span>
            </h1>
            <p className="text-muted-foreground">Create and manage data views</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-accent">
                <Plus className="w-4 h-4 mr-2" />
                New View
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New View</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>View Title</Label>
                  <Input
                    placeholder="My Customer View"
                    value={newViewTitle}
                    onChange={(e) => setNewViewTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Table</Label>
                  <Select value={newViewTable} onValueChange={setNewViewTable}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a table" />
                    </SelectTrigger>
                    <SelectContent>
                      {AVAILABLE_TABLES.map((table) => (
                        <SelectItem key={table} value={table}>
                          {table}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={createView} className="w-full">
                  Create View
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : views.length === 0 ? (
          <Card className="glass-card p-12 text-center">
            <Grid className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No views yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first data view to get started
            </p>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {views.map((view) => (
                <Card
                  key={view.id}
                  className="glass-card p-6 cursor-pointer hover:shadow-card transition-all"
                  onClick={() => openView(view)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Grid className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{view.title}</h3>
                      <p className="text-sm text-muted-foreground">{view.table_name}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {selectedView && (
              <Card className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">{selectedView.title}</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={exportToCSV}
                    disabled={!viewData.length}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>

                {loadingData ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : viewData.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    No data available
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {Object.keys(viewData[0]).map((key) => (
                            <TableHead key={key}>{key}</TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {viewData.map((row, i) => (
                          <TableRow key={i}>
                            {Object.values(row).map((val: any, j) => (
                              <TableCell key={j}>
                                {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </Card>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Interfaces;
