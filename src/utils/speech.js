let utterance = null;

export function speak(text) {
  if (!text) return;

  window.speechSynthesis.cancel();

  utterance = new SpeechSynthesisUtterance(text);

  utterance.voice =
    speechSynthesis
      .getVoices()
      .find((v) => v.name.includes("Ravi")) ||
    speechSynthesis
      .getVoices()
      .find((v) => v.lang === "en-IN") ||
    speechSynthesis.getVoices()[0];

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