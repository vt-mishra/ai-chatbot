let utterance = null;

// Load available voices
window.speechSynthesis.onvoiceschanged = () => {
  speechSynthesis.getVoices();
};

function cleanText(text) {
  return text
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, "")

    // Remove inline code
    .replace(/`([^`]*)`/g, "$1")

    // Remove markdown
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/_(.*?)_/g, "$1")

    // Remove headings
    .replace(/^#+\s/gm, "")

    // Remove bullet points
    .replace(/^\s*[-*•]\s/gm, "")

    // Remove URLs
    .replace(/https?:\/\/\S+/g, "")

    // Remove emojis
    .replace(
      /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu,
      ""
    )

    .replace(/\s+/g, " ")
    .trim();
}

function getBestVoice(isHindi) {
  const voices = speechSynthesis.getVoices();

  console.table(
    voices.map((v) => ({
      Name: v.name,
      Lang: v.lang,
    }))
  );

  const femaleKeywords = [
    "female",
    "jenny",
    "aria",
    "zira",
    "samantha",
    "hazel",
    "google uk english female",
  ];

  // Prefer female voice
  let voice = voices.find((v) => {
    const name = v.name.toLowerCase();

    return (
      (isHindi
        ? v.lang.startsWith("hi")
        : v.lang.startsWith("en")) &&
      femaleKeywords.some((k) => name.includes(k))
    );
  });

  // Any Hindi/English voice
  if (!voice) {
    voice = voices.find((v) =>
      isHindi
        ? v.lang.startsWith("hi")
        : v.lang.startsWith("en")
    );
  }

  // Fallback
  return voice || voices[0];
}

export function speak(text) {
  if (!text) return;

  speechSynthesis.cancel();

  const clean = cleanText(text);

  utterance = new SpeechSynthesisUtterance(clean);

  const isHindi = /[\u0900-\u097F]/.test(clean);

  utterance.lang = isHindi ? "hi-IN" : "en-IN";

  utterance.voice = getBestVoice(isHindi);

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