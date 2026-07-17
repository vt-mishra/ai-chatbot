const STORAGE_KEY = "gemini_api_key";

export function getApiKey() {
  return (
    import.meta.env.VITE_GEMINI_API_KEY ||
    localStorage.getItem(STORAGE_KEY)
  );
}

export function saveApiKey(key) {
  localStorage.setItem(STORAGE_KEY, key.trim());
}

export function removeApiKey() {
  localStorage.removeItem(STORAGE_KEY);
}

export function hasCustomApiKey() {
  return !!localStorage.getItem(STORAGE_KEY);
}