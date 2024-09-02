import { createClient } from "@supabase/supabase-js";

export const fetchArticleData = async (limit) => {
  const supabaseUrl = "https://osbwqoklbsjptiobzjco.supabase.co";
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;

  const client = createClient(supabaseUrl, supabaseAnonKey);

  // Fetch data from the 'article' table with a limit
  const { data: Adata, error } = await client
    .from("article")
    .select("*")
    .limit(limit); // Use the limit parameter

  // Check for errors
  if (error) {
    console.error("Error fetching data:", error.message);
    return { articles: [] };
  }

  return { articles: Adata };
};
