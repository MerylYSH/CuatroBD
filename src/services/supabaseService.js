import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rolhcuzbyixxdtdcaowa.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvbGhjdXpieWl4eGR0ZGNhb3dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNzAxNDEsImV4cCI6MjA4ODY0NjE0MX0.Ta7Vmci2tkk17VM1Zunpr3QbNm3ZJv2V-qm2tCtPzOU";

export const supabase = createClient(supabaseUrl, supabaseKey);