
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bosxxgbinzcjgwjaotyb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvc3h4Z2Jpbnpjamd3amFvdHliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0NjQ4NTUsImV4cCI6MjA1NTA0MDg1NX0.PPQPO_Q140Ec0qm1-Z5jDggAQULyz29r4jm76nk97aA';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
