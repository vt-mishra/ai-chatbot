import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";
import mammoth from "mammoth";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export async function extractFileText(file) {
  if (!file) return "";

  // PDF
  if (file.type === "application/pdf") {
    const buffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
      data: buffer,
    }).promise;

    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);

      const content = await page.getTextContent();

      text +=
        content.items.map(item => item.str).join(" ") + "\n";
    }

    return text;
  }

  // DOCX
  if (
    file.type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const buffer = await file.arrayBuffer();

    const result = await mammoth.extractRawText({
      arrayBuffer: buffer,
    });

    return result.value;
  }

  // TXT
  if (file.type === "text/plain") {
    return await file.text();
  }

  // CSV

  if (file.type === "text/csv") {
    return await file.text();
  }

  return "";
}