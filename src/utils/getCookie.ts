import axios from "axios";

export async function getCookie(name: string): Promise<string | null> {
  if (typeof document === "undefined") return null; // SSR-safe

  // Try to get cookie from document
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) return match[2];

  // If not found, fetch CSRF token (optional, only if you want to force it)
  try {
    const response = await axios.get("/api/csrf-token");
    return response.data.csrfToken || null;
  } catch (err) {
    console.error("Failed to fetch CSRF token:", err);
    return null;
  }
}
