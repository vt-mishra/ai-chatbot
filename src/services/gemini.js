import { GoogleGenAI } from "@google/genai";
import { getApiKey } from "../utils/apiKey";

function getAI() {
  return new GoogleGenAI({
    apiKey: getApiKey(),
  });
}

function buildContents(history = []) {
  // Only the latest uploaded image is sent to Gemini
  const lastMessageId =
    history[history.length - 1]?.id;

  return history
    // Don't send AI generated images back to Gemini
    .filter(
      (message) =>
        !(message.role === "assistant" && message.type === "image")
    )

    .map((message) => {
      const parts = [];

      // Text
      if (message.text?.trim()) {
        parts.push({
          text: message.text,
        });
      }

      // Only send the latest uploaded image
      if (
        message.id === lastMessageId &&
        message.role === "user" &&
        message.image
      ) {
        const [meta, data] = message.image.split(",");

        const mimeType =
          meta.match(/data:(.*?);base64/)?.[1] ||
          "image/png";

        parts.push({
          inlineData: {
            mimeType,
            data,
          },
        });
      }

      return {
        role:
          message.role === "assistant"
            ? "model"
            : "user",
        parts,
      };
    })

    .filter((msg) => msg.parts.length);
}

export async function getGeminiResponse(
  history,
  signal
) {
  try {
    const contents = buildContents(history);

    if (!contents.length) {
      return "❌ No message to send.";
    }

    const response =
      await getAI().models.generateContent({
        model: "gemini-2.5-flash",
        contents,
        // signal,
      });

    return response.text || "";
} catch (error) {
  if (
    error.name === "AbortError" ||
    error.message?.includes("aborted")
  ) {
    return "";
  }

  if(error === "An API Key must be set when running in a browser"){
    return ""
  }
  console.error("Gemini Error:", error);

  const message =
    error?.message ||
    JSON.stringify(error);

  // Quota exceeded
  if (
    message.includes("429") ||
    message.includes("RESOURCE_EXHAUSTED")
  ) {
    return "__QUOTA_EXCEEDED__";
  }

  // Invalid or missing API key
  if (
    message.includes("401") ||
    message.includes("403") ||
    message.includes("API_KEY_INVALID") ||
    message.includes("API key") ||
    message.includes("API_KEY") ||
    message.includes("PERMISSION_DENIED")
  ) {
    return "__INVALID_API_KEY__";
  }

  return "❌ Sorry, something went wrong.";
}
}

/**
 * Local title generation
 * No Gemini API call required.
 */
export function generateChatTitle(prompt) {
  if (!prompt?.trim()) {
    return "New Chat";
  }

  let title = prompt
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (title.length > 35) {
    title = title.slice(0, 35).trim() + "...";
  }

  return title;
}