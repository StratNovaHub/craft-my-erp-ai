-- Create enum types
CREATE TYPE customer_status AS ENUM ('active', 'inactive', 'prospect', 'churned');
CREATE TYPE deal_status AS ENUM ('lead', 'qualified', 'proposal', 'negotiation', 'closed_won', 'closed_lost');
CREATE TYPE risk_severity AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE risk_category AS ENUM ('operational', 'financial', 'strategic', 'compliance', 'reputational');
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');

-- CRM: Customers table
CREATE TABLE public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  location TEXT,
  status customer_status DEFAULT 'prospect',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- CRM: Contacts table
CREATE TABLE public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  position TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- CRM: Deals table
CREATE TABLE public.deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  value DECIMAL(12,2),
  status deal_status DEFAULT 'lead',
  expected_close_date DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ERP: Products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  sku TEXT UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(12,2) NOT NULL,
  category TEXT,
  stock_quantity INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ERP: Inventory Batches table
CREATE TABLE public.inventory_batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  batch_number TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  received_date DATE NOT NULL,
  supplier TEXT,
  expiry_date DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ERP: Sales Logs table
CREATE TABLE public.sales_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL,
  sale_price DECIMAL(12,2) NOT NULL,
  total_amount DECIMAL(12,2) NOT NULL,
  sale_date TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ERP: Orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  order_number TEXT UNIQUE NOT NULL,
  total_amount DECIMAL(12,2) NOT NULL,
  status order_status DEFAULT 'pending',
  order_date TIMESTAMPTZ DEFAULT now(),
  delivery_date TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ERP: Order Items table (for many-to-many relationship)
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(12,2) NOT NULL,
  total_price DECIMAL(12,2) NOT NULL
);

-- ERM: Risk Assessments table
CREATE TABLE public.risk_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category risk_category NOT NULL,
  severity risk_severity NOT NULL,
  probability INTEGER CHECK (probability >= 0 AND probability <= 100),
  impact_score INTEGER CHECK (impact_score >= 0 AND impact_score <= 100),
  mitigation_plan TEXT,
  status TEXT DEFAULT 'active',
  assessed_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ERM: Incidents table
CREATE TABLE public.incidents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  severity risk_severity NOT NULL,
  category risk_category NOT NULL,
  reported_date TIMESTAMPTZ DEFAULT now(),
  resolved_date TIMESTAMPTZ,
  status TEXT DEFAULT 'open',
  assigned_to TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ERM: Compliance Records table
CREATE TABLE public.compliance_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  regulation TEXT,
  description TEXT,
  compliance_date DATE,
  next_review_date DATE,
  status TEXT DEFAULT 'compliant',
  responsible_party TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.risk_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_records ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (public access for now - user needs to implement auth later)
-- Customers policies
CREATE POLICY "Enable read access for all users" ON public.customers FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public.customers FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON public.customers FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON public.customers FOR DELETE USING (true);

-- Contacts policies
CREATE POLICY "Enable read access for all users" ON public.contacts FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public.contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON public.contacts FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON public.contacts FOR DELETE USING (true);

-- Deals policies
CREATE POLICY "Enable read access for all users" ON public.deals FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public.deals FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON public.deals FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON public.deals FOR DELETE USING (true);

-- Products policies
CREATE POLICY "Enable read access for all users" ON public.products FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON public.products FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON public.products FOR DELETE USING (true);

-- Inventory Batches policies
CREATE POLICY "Enable read access for all users" ON public.inventory_batches FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public.inventory_batches FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON public.inventory_batches FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON public.inventory_batches FOR DELETE USING (true);

-- Sales Logs policies
CREATE POLICY "Enable read access for all users" ON public.sales_logs FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public.sales_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON public.sales_logs FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON public.sales_logs FOR DELETE USING (true);

-- Orders policies
CREATE POLICY "Enable read access for all users" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON public.orders FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON public.orders FOR DELETE USING (true);

-- Order Items policies
CREATE POLICY "Enable read access for all users" ON public.order_items FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public.order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON public.order_items FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON public.order_items FOR DELETE USING (true);

-- Risk Assessments policies
CREATE POLICY "Enable read access for all users" ON public.risk_assessments FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public.risk_assessments FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON public.risk_assessments FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON public.risk_assessments FOR DELETE USING (true);

-- Incidents policies
CREATE POLICY "Enable read access for all users" ON public.incidents FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public.incidents FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON public.incidents FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON public.incidents FOR DELETE USING (true);

-- Compliance Records policies
CREATE POLICY "Enable read access for all users" ON public.compliance_records FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public.compliance_records FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON public.compliance_records FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON public.compliance_records FOR DELETE USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at columns
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON public.customers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_deals_updated_at BEFORE UPDATE ON public.deals
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_risk_assessments_updated_at BEFORE UPDATE ON public.risk_assessments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_compliance_records_updated_at BEFORE UPDATE ON public.compliance_records
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for testing
INSERT INTO public.customers (name, email, phone, company, location, status) VALUES
  ('John Smith', 'john@techcorp.com', '+1-555-0101', 'TechCorp', 'New York, USA', 'active'),
  ('Sarah Johnson', 'sarah@innovate.com', '+1-555-0102', 'Innovate Inc', 'San Francisco, USA', 'active'),
  ('Michael Chen', 'michael@global.com', '+1-555-0103', 'Global Solutions', 'London, UK', 'prospect');

INSERT INTO public.products (name, sku, description, price, category, stock_quantity) VALUES
  ('Enterprise Software License', 'SOFT-001', 'Annual enterprise software license', 5000.00, 'Software', 100),
  ('Cloud Storage Plan', 'CLOUD-001', 'Premium cloud storage 1TB', 99.99, 'Services', 500),
  ('Hardware Server', 'HW-001', 'Dell PowerEdge Server', 3500.00, 'Hardware', 25);

INSERT INTO public.risk_assessments (title, description, category, severity, probability, impact_score, mitigation_plan) VALUES
  ('Cybersecurity Threat', 'Potential data breach from external attacks', 'operational', 'high', 70, 85, 'Implement advanced firewall and monitoring systems'),
  ('Market Volatility', 'Currency fluctuation affecting international sales', 'financial', 'medium', 60, 65, 'Implement hedging strategies'),
  ('Regulatory Compliance', 'New GDPR requirements', 'compliance', 'high', 80, 75, 'Update privacy policies and data handling procedures');