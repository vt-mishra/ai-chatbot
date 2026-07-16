let utterance = null;

// Load voices
window.speechSynthesis.onvoiceschanged = () => {
  speechSynthesis.getVoices();
};

function cleanText(text) {
  return text
    // Remove markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/_(.*?)_/g, "$1")

    // Remove URLs
    .replace(/https?:\/\/\S+/g, "")

    // Remove markdown headings
    .replace(/^#+\s/gm, "")

    // Remove bullets
    .replace(/^\s*[-*•]\s/gm, "")

    // Remove emojis
    .replace(
      /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu,
      ""
    )

    // Compress spaces
    .replace(/\s+/g, " ")
    .trim();
}

export function speak(text) {
  if (!text) return;

  // Stop previous speech
  speechSynthesis.cancel();

  const clean = cleanText(text);

  utterance = new SpeechSynthesisUtterance(clean);

  const isHindi = /[\u0900-\u097F]/.test(clean);

  utterance.lang = isHindi ? "hi-IN" : "en-IN";

  const voices = speechSynthesis.getVoices();

  utterance.voice =
    voices.find((v) => v.lang === utterance.lang) ||
    voices.find((v) =>
      isHindi
        ? v.lang.startsWith("hi")
        : v.lang.startsWith("en")
    ) ||
    voices[0];

  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;

  speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  speechSynthesis.cancel();
}

export function isSpeaking() {
  return speechSynthesis.speaking;
}