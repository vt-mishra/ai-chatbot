import jsPDF from "jspdf";

export function downloadPDF(messages) {
  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(18);
  doc.text("V/S Chat Export", 15, y);

  y += 10;

  doc.setFontSize(10);
  doc.text(
    new Date().toLocaleString(),
    15,
    y
  );

  y += 15;

  messages.forEach((message) => {
    const role =
      message.role === "user"
        ? "You"
        : "AI";

    const text =
      message.text ||
      (message.type === "image"
        ? `[Image] ${message.prompt}`
        : "");

    const lines = doc.splitTextToSize(
      `${role}: ${text}`,
      180
    );

    if (y + lines.length * 7 > 280) {
      doc.addPage();
      y = 20;
    }

    doc.setFont(
      "helvetica",
      role === "You"
        ? "bold"
        : "normal"
    );

    doc.text(lines, 15, y);

    y += lines.length * 7 + 6;
  });

  doc.save("chat-export.pdf");
}

export function downloadMarkdown(messages) {
  let md = `# V/S Chat Export

Generated: ${new Date().toLocaleString()}

---

`;

  messages.forEach((message) => {
    if (message.role === "user") {
      md += `## 👤 You

${message.text || ""}

`;
    } else if (message.type === "image") {
      md += `## 🤖 AI (Image)

Prompt: ${message.prompt}

Image: ${message.image}

`;
    } else {
      md += `## 🤖 AI

${message.text || ""}

`;
    }

    md += "---\n\n";
  });

  const blob = new Blob(
    [md],
    {
      type: "text/markdown",
    }
  );

  const url =
    URL.createObjectURL(blob);

  const a =
    document.createElement("a");

  a.href = url;

  a.download = "chat-export.md";

  a.click();

  URL.revokeObjectURL(url);
}