import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://osbwqoklbsjptiobzjco.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;

const client = createClient(supabaseUrl, supabaseAnonKey);

// Fetch articles with a limit
export const fetchArticleData = async (limit) => {
  const { data: Adata, error } = await client
    .from("article")
    .select("*")
    .limit(limit);

  if (error) {
    console.error("Error fetching data:", error.message);
    return { articles: [] };
  }

  return { articles: Adata };
};

// Fetch a single article by its ID
export const fetchArticleDataById = async (id) => {
  const { data: article, error } = await client
    .from("article")
    .select("*")
    .eq("id", id)
    .single(); // Fetch a single article

  if (error) {
    console.error("Error fetching article by ID:", error.message);
    return null;
  }

  return article;
};
