import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseUrl = "https://ekqduhinpxdvvstppjpw.supabase.co";
const supabaseKey = "sb_publishable_LqHbSQidjYZjm78dEcOG3w_dzpF5qE4";

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: "implicit",
  },
});

export { supabase };
