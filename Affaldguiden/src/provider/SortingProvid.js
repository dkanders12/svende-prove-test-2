import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://osbwqoklbsjptiobzjco.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;

const client = createClient(supabaseUrl, supabaseAnonKey);

export const fetchTrashData = async () => {
  // Fetch sections
  const { data: sections, error: sectionError } = await client
    .from("trash_sections")
    .select("*");

  if (sectionError) {
    console.error("Error fetching sections:", sectionError.message);
    return [];
  }

  // Fetch categories
  const { data: categories, error: categoryError } = await client
    .from("trash_categories")
    .select("*");

  if (categoryError) {
    console.error("Error fetching categories:", categoryError.message);
    return [];
  }

  // Fetch category-type relations
  const { data: categoryTypeRel, error: relError } = await client
    .from("trash_category_type_rel")
    .select("*");

  if (relError) {
    console.error("Error fetching category-type relations:", relError.message);
    return [];
  }

  // Fetch types
  const { data: types, error: typeError } = await client
    .from("trash_types")
    .select("*");

  if (typeError) {
    console.error("Error fetching types:", typeError.message);
    return [];
  }

  // Map categories to types
  const categoriesWithTypes = categories.map((category) => {
    const relatedTypes = categoryTypeRel
      .filter((rel) => rel.category_id === category.id)
      .map((rel) => {
        return types.find((type) => type.id === rel.type_id);
      });

    return {
      ...category,
      types: relatedTypes,
    };
  });

  // Map sections to categories
  const sectionsWithCategories = sections.map((section) => {
    const relatedCategories = categoriesWithTypes.filter(
      (category) => category.section_id === section.id
    );

    return {
      ...section,
      categories: relatedCategories,
    };
  });

  return sectionsWithCategories;
};
export const fetchTrashDataBySectionId = async (sectionId) => {
  // Fetch all categories that belong to the specified section
  const { data: categories, error } = await client
    .from("trash_categories")
    .select("*")
    .eq("section_id", sectionId); // Filter by section_id

  if (error) {
    console.error("Error fetching data by section_id:", error.message);
    return null;
  }
  console.log(categories);

  return categories; // This will return an array of categories related to the section_id
};
