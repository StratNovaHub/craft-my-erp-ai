

## Update for Schema Change: `organization_members.org_id` → `organization_id`

The database column `org_id` in the `organization_members` table has been renamed to `organization_id`. I need to update the TypeScript types to match.

---

### Summary of Changes

| File | Change |
|------|--------|
| `src/integrations/supabase/types.ts` | Update `organization_members` type definitions from `org_id` to `organization_id` |

---

### Technical Details

#### 1. Update `src/integrations/supabase/types.ts`

The `organization_members` table type definitions need to be updated:

**Current (lines 432-456):**
```typescript
organization_members: {
  Row: {
    org_id: string
    role: string
    user_id: string
  }
  Insert: {
    org_id: string
    role?: string
    user_id: string
  }
  Update: {
    org_id?: string
    role?: string
    user_id?: string
  }
  Relationships: [
    {
      foreignKeyName: "organization_members_org_id_fkey"
      columns: ["org_id"]
      ...
    },
  ]
}
```

**Updated:**
```typescript
organization_members: {
  Row: {
    organization_id: string
    role: string
    user_id: string
  }
  Insert: {
    organization_id: string
    role?: string
    user_id: string
  }
  Update: {
    organization_id?: string
    role?: string
    user_id?: string
  }
  Relationships: [
    {
      foreignKeyName: "organization_members_organization_id_fkey"
      columns: ["organization_id"]
      ...
    },
  ]
}
```

---

### What's Already Correct

- **`src/contexts/AuthContext.tsx`** - Already uses `organization_id` in queries (lines 71, 114)
- **Edge function (`ai-command`)** - Uses `org_id` for business tables (customers, products, etc.) which is correct - only `organization_members` was renamed
- **Other business tables** - Still use `org_id` column (confirmed in database schema)

---

### No Changes Needed

- `src/pages/CRM.tsx` - Uses `org_id` for `customers` table (correct)
- `src/pages/Index.tsx` - Uses `org_id` for business tables (correct)  
- `src/pages/Interfaces.tsx` - Uses `org_id` for `saved_views` table (correct)
- `supabase/functions/ai-command/index.ts` - Uses `org_id` for business tables (correct)

