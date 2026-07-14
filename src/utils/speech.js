let utterance = null;

// Load voices when browser finishes loading them
window.speechSynthesis.onvoiceschanged = () => {
  speechSynthesis.getVoices();
};

export function speak(text) {
  if (!text) return;

  speechSynthesis.cancel();

  utterance = new SpeechSynthesisUtterance(text);

  // Detect Hindi
  const isHindi = /[\u0900-\u097F]/.test(text);

  utterance.lang = isHindi ? "hi-IN" : "en-IN";

  const voices = speechSynthesis.getVoices();

  utterance.voice =
    voices.find((v) => v.lang === utterance.lang) ||
    voices.find((v) =>
      isHindi
        ? v.lang.startsWith("hi")
        : v.lang.startsWith("en")
    ) ||
    voices.find((v) => v.lang === "en-IN") ||
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