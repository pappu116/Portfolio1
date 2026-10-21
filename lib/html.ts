// Escaping helpers for the places where the app renders HTML strings.
//
// Two components (Terminal, CodeShowcase) build HTML markup and inject it with
// `dangerouslySetInnerHTML`. The markup itself is authored here and is safe,
// but the values interpolated into it come from the GitHub API and are not
// under our control — a display name or bio can contain arbitrary characters.
//
// Rule: escape the VALUES, never the template. Escaping the finished markup
// would turn its own `<span>` tags into visible text.

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/**
 * Escapes the five characters that can break out of HTML text or an attribute
 * value. Use this on every externally sourced string before interpolating it
 * into an HTML string.
 */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => HTML_ESCAPES[character]);
}
