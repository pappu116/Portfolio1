import { describe, expect, it } from "vitest";
import { validateContactPayload } from "@/lib/contact";

const VALID_PAYLOAD = {
  name: "John Doe",
  email: "john@example.com",
  subject: "Portfolio enquiry",
  message: "I would like to discuss a project.",
};

describe("validateContactPayload", () => {
  it("accepts a valid payload", () => {
    const result = validateContactPayload(VALID_PAYLOAD);

    expect(result.ok).toBe(true);
  });

  it("trims whitespace from every field", () => {
    const result = validateContactPayload({
      ...VALID_PAYLOAD,
      name: "  John Doe  ",
      message: "  Hello there  ",
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.name).toBe("John Doe");
      expect(result.value.message).toBe("Hello there");
    }
  });

  it("rejects a non-object payload", () => {
    expect(validateContactPayload(null).ok).toBe(false);
    expect(validateContactPayload("hello").ok).toBe(false);
    expect(validateContactPayload([1, 2, 3]).ok).toBe(false);
  });

  it("rejects a field that is not a string", () => {
    const result = validateContactPayload({ ...VALID_PAYLOAD, name: { a: 1 } });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toContain("name");
    }
  });

  it("rejects a missing field", () => {
    const result = validateContactPayload({ ...VALID_PAYLOAD, subject: undefined });

    expect(result.ok).toBe(false);
  });

  it("rejects an empty field after trimming", () => {
    const result = validateContactPayload({ ...VALID_PAYLOAD, message: "   " });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toContain("required");
    }
  });

  it("rejects an invalid email address", () => {
    const result = validateContactPayload({
      ...VALID_PAYLOAD,
      email: "not-an-email",
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toContain("Email");
    }
  });

  it("rejects a field that exceeds its maximum length", () => {
    const result = validateContactPayload({
      ...VALID_PAYLOAD,
      message: "x".repeat(5001),
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toContain("5000");
    }
  });
});
