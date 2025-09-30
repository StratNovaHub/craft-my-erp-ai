import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Package, TrendingUp, AlertCircle, CheckCircle, Plus } from "lucide-react";
import { ModuleCard } from "@/components/ModuleCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Validation schemas
const productSchema = z.object({
  name: z.string().trim().min(1, "Product name is required").max(100),
  sku: z.string().trim().min(1, "SKU is required").max(50),
  category: z.string().trim().min(1, "Category is required").max(50),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Valid price required"),
  description: z.string().max(500).optional(),
});

const batchSchema = z.object({
  productName: z.string().trim().min(1, "Product name is required").max(100),
  batchNumber: z.string().trim().min(1, "Batch number is required").max(50),
  quantity: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Valid quantity required"),
  deliveryDate: z.string().min(1, "Delivery date is required"),
  supplier: z.string().trim().min(1, "Supplier is required").max(100),
});

const salesSchema = z.object({
  productName: z.string().trim().min(1, "Product name is required").max(100),
  quantity: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Valid quantity required"),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Valid amount required"),
  customer: z.string().trim().min(1, "Customer name is required").max(100),
  saleDate: z.string().min(1, "Sale date is required"),
});

const orderSchema = z.object({
  orderNumber: z.string().trim().min(1, "Order number is required").max(50),
  customer: z.string().trim().min(1, "Customer name is required").max(100),
  items: z.string().trim().min(1, "Items are required").max(500),
  totalAmount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Valid amount required"),
  status: z.enum(["completed", "pending", "processing"]),
  completionDate: z.string().min(1, "Completion date is required"),
});

type Product = z.infer<typeof productSchema> & { id: string };
type Batch = z.infer<typeof batchSchema> & { id: string };
type Sale = z.infer<typeof salesSchema> & { id: string };
type Order = z.infer<typeof orderSchema> & { id: string };

const ERP = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [openDialog, setOpenDialog] = useState<string | null>(null);

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
          <ModuleCard icon={Package} title="Total Products" value={products.length.toString()} change="+5.2%" trend="up" />
          <ModuleCard icon={TrendingUp} title="Total Batches" value={batches.length.toString()} change="+2.1%" trend="up" />
          <ModuleCard icon={AlertCircle} title="Sales Records" value={sales.length.toString()} change="-8.3%" trend="up" />
          <ModuleCard icon={CheckCircle} title="Completed Orders" value={orders.filter(o => o.status === "completed").length.toString()} change="+12.5%" trend="up" />
        </div>

        <Card className="glass-card p-6">
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="batches">Inventory Batches</TabsTrigger>
              <TabsTrigger value="sales">Sales Logs</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Product Management</h3>
                <ProductDialog onAdd={(product) => {
                  setProducts([...products, { ...product, id: Date.now().toString() }]);
                  toast.success("Product added successfully");
                  setOpenDialog(null);
                }} open={openDialog === "product"} onOpenChange={(open) => setOpenDialog(open ? "product" : null)} />
              </div>
              <ProductTable products={products} />
            </TabsContent>

            <TabsContent value="batches" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Inventory Batches</h3>
                <BatchDialog onAdd={(batch) => {
                  setBatches([...batches, { ...batch, id: Date.now().toString() }]);
                  toast.success("Batch added successfully");
                  setOpenDialog(null);
                }} open={openDialog === "batch"} onOpenChange={(open) => setOpenDialog(open ? "batch" : null)} />
              </div>
              <BatchTable batches={batches} />
            </TabsContent>

            <TabsContent value="sales" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Sales Logs</h3>
                <SalesDialog onAdd={(sale) => {
                  setSales([...sales, { ...sale, id: Date.now().toString() }]);
                  toast.success("Sale recorded successfully");
                  setOpenDialog(null);
                }} open={openDialog === "sale"} onOpenChange={(open) => setOpenDialog(open ? "sale" : null)} />
              </div>
              <SalesTable sales={sales} />
            </TabsContent>

            <TabsContent value="orders" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Completed Orders</h3>
                <OrderDialog onAdd={(order) => {
                  setOrders([...orders, { ...order, id: Date.now().toString() }]);
                  toast.success("Order added successfully");
                  setOpenDialog(null);
                }} open={openDialog === "order"} onOpenChange={(open) => setOpenDialog(open ? "order" : null)} />
              </div>
              <OrderTable orders={orders} />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </Layout>
  );
};

// Product Dialog Component
const ProductDialog = ({ onAdd, open, onOpenChange }: { onAdd: (product: Omit<Product, "id">) => void; open: boolean; onOpenChange: (open: boolean) => void }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = (data: any) => {
    onAdd(data);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-primary to-accent"><Plus className="w-4 h-4 mr-2" />Add Product</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message as string}</p>}
          </div>
          <div>
            <Label htmlFor="sku">SKU</Label>
            <Input id="sku" {...register("sku")} />
            {errors.sku && <p className="text-sm text-destructive">{errors.sku.message as string}</p>}
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input id="category" {...register("category")} />
            {errors.category && <p className="text-sm text-destructive">{errors.category.message as string}</p>}
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input id="price" type="number" step="0.01" {...register("price")} />
            {errors.price && <p className="text-sm text-destructive">{errors.price.message as string}</p>}
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register("description")} />
          </div>
          <Button type="submit" className="w-full">Add Product</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Batch Dialog Component
const BatchDialog = ({ onAdd, open, onOpenChange }: { onAdd: (batch: Omit<Batch, "id">) => void; open: boolean; onOpenChange: (open: boolean) => void }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(batchSchema),
  });

  const onSubmit = (data: any) => {
    onAdd(data);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-primary to-accent"><Plus className="w-4 h-4 mr-2" />Add Batch</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Inventory Batch</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="productName">Product Name</Label>
            <Input id="productName" {...register("productName")} />
            {errors.productName && <p className="text-sm text-destructive">{errors.productName.message as string}</p>}
          </div>
          <div>
            <Label htmlFor="batchNumber">Batch Number</Label>
            <Input id="batchNumber" {...register("batchNumber")} />
            {errors.batchNumber && <p className="text-sm text-destructive">{errors.batchNumber.message as string}</p>}
          </div>
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input id="quantity" type="number" {...register("quantity")} />
            {errors.quantity && <p className="text-sm text-destructive">{errors.quantity.message as string}</p>}
          </div>
          <div>
            <Label htmlFor="deliveryDate">Delivery Date</Label>
            <Input id="deliveryDate" type="date" {...register("deliveryDate")} />
            {errors.deliveryDate && <p className="text-sm text-destructive">{errors.deliveryDate.message as string}</p>}
          </div>
          <div>
            <Label htmlFor="supplier">Supplier</Label>
            <Input id="supplier" {...register("supplier")} />
            {errors.supplier && <p className="text-sm text-destructive">{errors.supplier.message as string}</p>}
          </div>
          <Button type="submit" className="w-full">Add Batch</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Sales Dialog Component
const SalesDialog = ({ onAdd, open, onOpenChange }: { onAdd: (sale: Omit<Sale, "id">) => void; open: boolean; onOpenChange: (open: boolean) => void }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(salesSchema),
  });

  const onSubmit = (data: any) => {
    onAdd(data);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-primary to-accent"><Plus className="w-4 h-4 mr-2" />Record Sale</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Record Sale</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="productName">Product Name</Label>
            <Input id="productName" {...register("productName")} />
            {errors.productName && <p className="text-sm text-destructive">{errors.productName.message as string}</p>}
          </div>
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input id="quantity" type="number" {...register("quantity")} />
            {errors.quantity && <p className="text-sm text-destructive">{errors.quantity.message as string}</p>}
          </div>
          <div>
            <Label htmlFor="amount">Amount ($)</Label>
            <Input id="amount" type="number" step="0.01" {...register("amount")} />
            {errors.amount && <p className="text-sm text-destructive">{errors.amount.message as string}</p>}
          </div>
          <div>
            <Label htmlFor="customer">Customer</Label>
            <Input id="customer" {...register("customer")} />
            {errors.customer && <p className="text-sm text-destructive">{errors.customer.message as string}</p>}
          </div>
          <div>
            <Label htmlFor="saleDate">Sale Date</Label>
            <Input id="saleDate" type="date" {...register("saleDate")} />
            {errors.saleDate && <p className="text-sm text-destructive">{errors.saleDate.message as string}</p>}
          </div>
          <Button type="submit" className="w-full">Record Sale</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Order Dialog Component
const OrderDialog = ({ onAdd, open, onOpenChange }: { onAdd: (order: Omit<Order, "id">) => void; open: boolean; onOpenChange: (open: boolean) => void }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(orderSchema),
  });

  const onSubmit = (data: any) => {
    onAdd(data);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-primary to-accent"><Plus className="w-4 h-4 mr-2" />Add Order</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Completed Order</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="orderNumber">Order Number</Label>
            <Input id="orderNumber" {...register("orderNumber")} />
            {errors.orderNumber && <p className="text-sm text-destructive">{errors.orderNumber.message as string}</p>}
          </div>
          <div>
            <Label htmlFor="customer">Customer</Label>
            <Input id="customer" {...register("customer")} />
            {errors.customer && <p className="text-sm text-destructive">{errors.customer.message as string}</p>}
          </div>
          <div>
            <Label htmlFor="items">Items</Label>
            <Textarea id="items" {...register("items")} placeholder="List of items in order" />
            {errors.items && <p className="text-sm text-destructive">{errors.items.message as string}</p>}
          </div>
          <div>
            <Label htmlFor="totalAmount">Total Amount ($)</Label>
            <Input id="totalAmount" type="number" step="0.01" {...register("totalAmount")} />
            {errors.totalAmount && <p className="text-sm text-destructive">{errors.totalAmount.message as string}</p>}
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <select id="status" {...register("status")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
            </select>
          </div>
          <div>
            <Label htmlFor="completionDate">Completion Date</Label>
            <Input id="completionDate" type="date" {...register("completionDate")} />
            {errors.completionDate && <p className="text-sm text-destructive">{errors.completionDate.message as string}</p>}
          </div>
          <Button type="submit" className="w-full">Add Order</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Table Components
const ProductTable = ({ products }: { products: Product[] }) => (
  <div className="rounded-md border">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>SKU</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-muted-foreground">No products added yet</TableCell>
          </TableRow>
        ) : (
          products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>{product.description || "-"}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </div>
);

const BatchTable = ({ batches }: { batches: Batch[] }) => (
  <div className="rounded-md border">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Batch #</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Delivery Date</TableHead>
          <TableHead>Supplier</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {batches.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-muted-foreground">No batches added yet</TableCell>
          </TableRow>
        ) : (
          batches.map((batch) => (
            <TableRow key={batch.id}>
              <TableCell>{batch.productName}</TableCell>
              <TableCell>{batch.batchNumber}</TableCell>
              <TableCell>{batch.quantity}</TableCell>
              <TableCell>{batch.deliveryDate}</TableCell>
              <TableCell>{batch.supplier}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </div>
);

const SalesTable = ({ sales }: { sales: Sale[] }) => (
  <div className="rounded-md border">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sales.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-muted-foreground">No sales recorded yet</TableCell>
          </TableRow>
        ) : (
          sales.map((sale) => (
            <TableRow key={sale.id}>
              <TableCell>{sale.productName}</TableCell>
              <TableCell>{sale.quantity}</TableCell>
              <TableCell>${sale.amount}</TableCell>
              <TableCell>{sale.customer}</TableCell>
              <TableCell>{sale.saleDate}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </div>
);

const OrderTable = ({ orders }: { orders: Order[] }) => (
  <div className="rounded-md border">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order #</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center text-muted-foreground">No orders added yet</TableCell>
          </TableRow>
        ) : (
          orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.orderNumber}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell className="max-w-xs truncate">{order.items}</TableCell>
              <TableCell>${order.totalAmount}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  order.status === "completed" ? "bg-green-500/20 text-green-700 dark:text-green-400" :
                  order.status === "processing" ? "bg-blue-500/20 text-blue-700 dark:text-blue-400" :
                  "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400"
                }`}>
                  {order.status}
                </span>
              </TableCell>
              <TableCell>{order.completionDate}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </div>
);

export default ERP;
