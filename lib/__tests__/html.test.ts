import { describe, expect, it } from "vitest";
import { escapeHtml } from "@/lib/html";

describe("escapeHtml", () => {
  it("neutralizes a script tag so it cannot execute", () => {
    const malicious = '<script>alert("xss")</script>';

    const result = escapeHtml(malicious);

    expect(result).not.toContain("<script>");
    expect(result).toBe(
      "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;"
    );
  });

  it("escapes the ampersand first so entities are not double-decoded", () => {
    expect(escapeHtml("a & b")).toBe("a &amp; b");
    expect(escapeHtml("&lt;")).toBe("&amp;lt;");
  });

  it("escapes angle brackets, double quotes and single quotes", () => {
    expect(escapeHtml("<")).toBe("&lt;");
    expect(escapeHtml(">")).toBe("&gt;");
    expect(escapeHtml('"')).toBe("&quot;");
    expect(escapeHtml("'")).toBe("&#39;");
  });

  it("escapes an attribute break-out attempt", () => {
    const attempt = '" onerror="alert(1)';

    expect(escapeHtml(attempt)).not.toContain('"');
  });

  it("leaves ordinary text untouched", () => {
    expect(escapeHtml("Pappu Hasan")).toBe("Pappu Hasan");
    expect(escapeHtml("")).toBe("");
  });
});
