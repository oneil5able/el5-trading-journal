// utils.ts

/**
 * Conditionally joins class names.
 * Accepts strings, falsy values (false, null, undefined) are ignored.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Converts a page name to a URL-friendly slug with a leading slash.
 * @param page - The name of the page (e.g., "Dashboard", "My Page")
 * @returns A normalized URL path (e.g., "/dashboard", "/my-page")
 */
export function createPageUrl(page?: string): string {
  if (!page) return "/";
  const slug = page.trim().replace(/\s+/g, "-").toLowerCase();
  // Ensure single leading slash
  return `/${slug.replace(/^\/+/, "")}`;
}

// Default export (optional, for projects preferring a single import)
export default { cn, createPageUrl };
