import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

const connectSupabase = createClient<Database>(
  process.env.REACT_APP_SUPABASE_URL as string,
  process.env.REACT_APP_SUPABASE_API_KEY as string
);

export default connectSupabase;
