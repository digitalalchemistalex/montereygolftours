import { supabase } from "./supabase";

export type CoursePricingRow = {
  course_slug: string;
  price_label: string;
  price_estimate: number | null;
};

/**
 * Fetches live pricing from the course_pricing Supabase table.
 * Falls back to null on any error so callers can use the static
 * greenFeeEst/priceEstimate already in course-details.ts as a safe default
 * -- the site must never break or show blank pricing just because Supabase
 * is briefly unavailable.
 */
export async function getCoursePricing(slug: string): Promise<CoursePricingRow | null> {
  try {
    const { data, error } = await supabase
      .from("course_pricing")
      .select("course_slug, price_label, price_estimate")
      .eq("course_slug", slug)
      .maybeSingle();

    if (error || !data) return null;
    return data as CoursePricingRow;
  } catch {
    return null;
  }
}

export async function getAllCoursePricing(): Promise<CoursePricingRow[]> {
  try {
    const { data, error } = await supabase
      .from("course_pricing")
      .select("course_slug, price_label, price_estimate");

    if (error || !data) return [];
    return data as CoursePricingRow[];
  } catch {
    return [];
  }
}
