export async function typeText(
  text,
  onUpdate,
  shouldStop,
  speed = 3
) {
  if (!text) return;

  // Count words
  const words = text.trim().split(/\s+/);

  // Long responses -> show instantly
  if (words.length > 80) {
    onUpdate(text);
    return;
  }

  // Short responses -> typing animation
  let current = "";

  for (let i = 0; i < text.length; i++) {
    if (shouldStop?.()) {
      break;
    }

    current += text[i];
    onUpdate(current);

    await new Promise((resolve) =>
      setTimeout(resolve, speed)
    );
  }
}