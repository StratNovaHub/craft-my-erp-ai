import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { command, orgId } = await req.json();
    
    if (!command || !orgId) {
      return new Response(JSON.stringify({ error: 'Missing command or orgId' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Call AI to parse the command
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are a data management assistant. Parse the user's command and return JSON with: 
{
  "table": "table_name",
  "operation": "insert|update|delete",
  "data": {...fields},
  "filters": {...conditions for update/delete}
}

Available tables: customers, contacts, deals, products, inventory_batches, sales_logs, orders, order_items, risk_assessments, incidents, compliance_records.

For customers: name (required), email, phone, company, location, status (prospect|active|inactive).
For products: name (required), sku (required), price (required), category, description, stock_quantity.
For risk_assessments: title (required), category (required), severity (required), description, probability, impact_score.
For incidents: title (required), category (required), severity (required), description, assigned_to.
For compliance_records: title (required), regulation, description, compliance_date, responsible_party.

Always include org_id=${orgId} in the response.`
          },
          { role: 'user', content: command }
        ],
      }),
    });

    if (!aiResponse.ok) {
      throw new Error(`AI API error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const parsedCommand = JSON.parse(aiData.choices[0].message.content);
    
    console.log('Parsed command:', parsedCommand);

    // Execute the database operation
    let result;
    const { table, operation, data, filters } = parsedCommand;

    // Inject org_id into data
    const dataWithOrg = { ...data, org_id: orgId };

    switch (operation) {
      case 'insert':
        result = await supabase.from(table).insert(dataWithOrg).select();
        break;
      case 'update':
        result = await supabase.from(table).update(dataWithOrg).match({ ...filters, org_id: orgId }).select();
        break;
      case 'delete':
        result = await supabase.from(table).delete().match({ ...filters, org_id: orgId });
        break;
      default:
        throw new Error('Invalid operation');
    }

    if (result.error) {
      throw result.error;
    }

    return new Response(JSON.stringify({
      success: true,
      message: `Successfully executed ${operation} on ${table}`,
      data: result.data,
      parsed: parsedCommand
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
