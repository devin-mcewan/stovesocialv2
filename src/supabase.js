import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseUrl = "https://ekqduhinpxdvvstppjpw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrcWR1aGlucHhkdnZzdHBwanB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwMDE0ODAsImV4cCI6MjA5NTU3NzQ4MH0.DojL-Kw7ilAMdEqEDPdvimUXru0McKFVwHbOTo3jVUQ";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: "implicit",
  },
});
