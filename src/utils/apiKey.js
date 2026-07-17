const STORAGE_KEY = "gemini_api_key";

export function getDefaultApiKey() {
  return import.meta.env.VITE_GEMINI_API_KEY;
}

export function getCustomApiKey() {
  return localStorage.getItem(STORAGE_KEY);
}

export function getApiKey() {
  return getCustomApiKey() || getDefaultApiKey();
}

export function saveApiKey(key) {
  localStorage.setItem(STORAGE_KEY, key.trim());
}

export function removeApiKey() {
  localStorage.removeItem(STORAGE_KEY);
}

export function hasCustomApiKey() {
  return !!getCustomApiKey();
}

// NEW
export function isUsingPersonalApiKey() {
  return !!getCustomApiKey();
}