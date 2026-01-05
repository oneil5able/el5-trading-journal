export function createPageUrl(page) {
  if (!page) return '/';
  const slug = String(page).trim().replace(/\s+/g, '-').toLowerCase();
  // Ensure leading slash and normalize
  return `/${slug.replace(/^\/+/, '')}`;
}

export default createPageUrl;
