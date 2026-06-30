export async function typeText(text, onUpdate, speed = 15) {
  let current = "";

  for (let i = 0; i < text.length; i++) {
    current += text[i];
    onUpdate(current);

    await new Promise((resolve) =>
      setTimeout(resolve, speed)
    );
  }
}