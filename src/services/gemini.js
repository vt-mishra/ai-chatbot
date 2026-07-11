import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

function buildContents(history = []) {

  return history
    // Don't send AI-generated images back to Gemini
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

      // Only user uploaded images
      if (message.role === "user" && message.image) {
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

    .filter((msg) => msg.parts.length > 0);
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
      await ai.models.generateContent({
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

    console.error("Gemini Error:", error);

    return "❌ Sorry, something went wrong.";
  }
}

export async function generateChatTitle(prompt) {
  try {
    const response =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",

        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Generate a short chat title (maximum 5 words).

Rules:
- Return only the title.
- No quotes.
- No punctuation at the end.
- No explanation.

User message:
${prompt}`,
              },
            ],
          },
        ],
      });

    return response.text.trim();
  } catch (error) {
    console.error(error);

    return prompt.length > 30
      ? prompt.slice(0, 30) + "..."
      : prompt;
  }
}