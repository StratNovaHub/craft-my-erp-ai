# BuilderAI - Enterprise ERP-CRM-ERM Suite

A secure, multi-tenant enterprise management system with AI-powered data operations.

## Features

- **Multi-tenant Architecture**: Secure organization-based data isolation
- **CRM**: Customer relationship management
- **ERP**: Enterprise resource planning (products, inventory, orders)
- **ERM**: Enterprise risk management (risks, incidents, compliance)
- **AI Data Manager**: Natural language data operations via AI
- **Saved Interfaces**: Create custom data views with export capabilities
- **Authentication**: Secure email/password auth with Supabase

## Setup

1. **Clone and Install**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   - Copy `.env.example` to `.env`
   - Add your Supabase credentials from your Supabase project

3. **Database Migration**
   - The SQL migration has been provided for multi-tenant setup
   - Run it in your Supabase SQL editor to create all necessary tables

4. **Start Development**
   ```bash
   npm run dev
   ```

## Architecture

### Database Schema
- **organizations**: Company/tenant records
- **organization_members**: User-organization relationships
- **profiles**: User profile data
- **saved_views**: Custom data interface configurations
- **customers, contacts, deals**: CRM module tables
- **products, inventory_batches, sales_logs, orders, order_items**: ERP module tables
- **risk_assessments, incidents, compliance_records**: ERM module tables

### Security
- Row-Level Security (RLS) enforces org-level data isolation
- All queries automatically scoped to user's current organization
- Server-side validation via Supabase edge functions

### AI Integration
- Uses Lovable AI Gateway (Google Gemini 2.5 Flash)
- Natural language commands parsed to database operations
- Automatic org_id injection for security

## Usage

1. **Sign Up/Sign In**: Create an account at `/auth`
2. **Switch Organizations**: Use org switcher in sidebar (if member of multiple orgs)
3. **AI Commands**: Use natural language in AI Builder
   - Example: "Create a customer named John Doe with email john@example.com"
   - Example: "Add a product called Widget with SKU WID-001 and price 99.99"
4. **Saved Interfaces**: Create custom views of any table with filters and export to CSV

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, Edge Functions)
- **AI**: Lovable AI Gateway (Gemini 2.5 Flash)
- **Deployment**: Lovable Platform

## License

MIT
