const STORAGE_KEY = "ai-chatbot-conversations";

export function loadConversations() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) return [];

    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export function saveConversations(conversations) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(conversations)
    );
  } catch (error) {
    console.error(error);
  }
}