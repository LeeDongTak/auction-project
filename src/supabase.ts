import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.REACT_APP_SUPABASE_URL || "";
const supabaseServerKey: string = process.env.REACT_APP_SUPABASE_API_KEY || "";

const supabase = createClient(supabaseUrl, supabaseServerKey);

// Export for usage by the rest of the app
export { supabase };
