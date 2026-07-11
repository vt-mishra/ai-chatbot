// src/services/imageGeneration.js

const PROVIDER = "pollinations"; // pollinations | together | openai

export async function generateImage(prompt) {
  switch (PROVIDER) {
    case "pollinations":
      return generatePollinations(prompt);

    default:
      throw new Error("Unknown image provider.");
  }
}

function generatePollinations(prompt) {
  const encoded = encodeURIComponent(prompt);

  // Random seed avoids browser caching
  const seed = Date.now();

  return `https://image.pollinations.ai/prompt/${encoded}?width=1024&height=1024&seed=${seed}`;
}