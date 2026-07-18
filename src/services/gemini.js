import { GoogleGenAI } from "@google/genai";
import { getApiKey } from "../utils/apiKey";

function getAI() {
  return new GoogleGenAI({
    apiKey: getApiKey(),
  });
}

// Debug only (remove after testing)
export async function listModels() {
  try {
    const models = await getAI().models.list();

    console.log("Available models:");

    for await (const model of models) {
      console.log(model.name);
    }
  } catch (e) {
    console.error(e);
  }
}

function buildContents(history = []) {
  const lastMessageId =
    history[history.length - 1]?.id;

  return history
    .filter(
      (message) =>
        !(
          message.role === "assistant" &&
          message.type === "image"
        )
    )
    .map((message) => {
      const parts = [];

      if (message.text?.trim()) {
        parts.push({
          text: message.text,
        });
      }

      if (
        message.id === lastMessageId &&
        message.role === "user" &&
        message.image
      ) {
        const [meta, data] =
          message.image.split(",");

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
        model: "gemini-3.5-flash",
        contents,
        signal,
      });

    // Latest SDK
    if (typeof response.text === "function") {
      return response.text();
    }

    // Fallback
    return (
      response.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .join("") || ""
    );
  } catch (error) {
    if (
      error.name === "AbortError" ||
      error.message?.includes("aborted")
    ) {
      return "";
    }

    console.error("Gemini Error:", error);

    const message =
      error?.message || JSON.stringify(error);

    if (
      message.includes("429") ||
      message.includes("RESOURCE_EXHAUSTED")
    ) {
      return "__QUOTA_EXCEEDED__";
    }

    if (
      message.includes("401") ||
      message.includes("403") ||
      message.includes("API_KEY_INVALID") ||
      message.includes("PERMISSION_DENIED")
    ) {
      return "__INVALID_API_KEY__";
    }

    return "❌ Sorry, something went wrong.";
  }
}

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