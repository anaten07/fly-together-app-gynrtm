import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Database } from './types';
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://jwjzldkiisqyqsousuhr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3anpsZGtpaXNxeXFzb3VzdWhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1NzEzMTIsImV4cCI6MjA3MTE0NzMxMn0.qi5eeEyWrlWYWJp_zeIUHzf1AXan4qEevJrFKhCtYb8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
