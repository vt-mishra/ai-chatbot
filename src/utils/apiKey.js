const STORAGE_KEY = "gemini_api_key";

export function getDefaultApiKey() {
  return import.meta.env.VITE_GEMINI_API_KEY;
}

export function getCustomApiKey() {
  return localStorage.getItem(STORAGE_KEY);
}

export function getApiKey() {
  const key = getCustomApiKey() || getDefaultApiKey();

  console.log("Using API Key:", key);

  return key;
}

export function saveApiKey(key) {
  localStorage.setItem(STORAGE_KEY, key.trim());

    console.log(
    "Saved:",
    localStorage.getItem("gemini_api_key")
  );
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