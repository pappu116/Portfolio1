// Validation for the contact form payload.
//
// The form posts to /api/contact, so this is the system boundary where
// untrusted input arrives. Validation lives here (rather than inline in the
// route) so it can be unit tested without spinning up a request.

export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactValidation =
  | { ok: true; value: ContactMessage }
  | { ok: false; error: string };

// Generous enough for a real enquiry, tight enough that a malformed request
// cannot flood the server logs.
const MAX_LENGTHS: Record<keyof ContactMessage, number> = {
  name: 120,
  email: 200,
  subject: 200,
  message: 5000,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates and normalizes a contact form payload.
 *
 * Rejects non-string fields outright — coercing them with String() would turn
 * an object into the literal text "[object Object]" and let it through.
 */
export function validateContactPayload(payload: unknown): ContactValidation {
  if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
    return { ok: false, error: "Expected a JSON object." };
  }

  const fields = payload as Record<string, unknown>;

  for (const field of ["name", "email", "subject", "message"] as const) {
    if (typeof fields[field] !== "string") {
      return { ok: false, error: `Field "${field}" must be a string.` };
    }
  }

  const value: ContactMessage = {
    name: (fields.name as string).trim(),
    email: (fields.email as string).trim(),
    subject: (fields.subject as string).trim(),
    message: (fields.message as string).trim(),
  };

  for (const field of ["name", "email", "subject", "message"] as const) {
    if (!value[field]) {
      return {
        ok: false,
        error: "All fields (name, email, subject, message) are required.",
      };
    }

    if (value[field].length > MAX_LENGTHS[field]) {
      return {
        ok: false,
        error: `Field "${field}" must be ${MAX_LENGTHS[field]} characters or fewer.`,
      };
    }
  }

  if (!EMAIL_PATTERN.test(value.email)) {
    return { ok: false, error: "Email address looks invalid." };
  }

  return { ok: true, value };
}
