import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
} from "docx";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function mdToDocxParagraphs(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out = [];

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) continue;
    if (line === "---") continue;
    if (line.startsWith("# ")) continue; // title handled separately

    if (line.startsWith("## ")) {
      out.push(new Paragraph({ text: line.slice(3).trim(), heading: HeadingLevel.HEADING_1 }));
      continue;
    }
    if (line.startsWith("### ")) {
      out.push(new Paragraph({ text: line.slice(4).trim(), heading: HeadingLevel.HEADING_2 }));
      continue;
    }
    if (line.startsWith("- ")) {
      out.push(
        new Paragraph({
          text: line.slice(2).replace(/\*\*/g, "").replace(/`/g, "").trim(),
          bullet: { level: 0 },
        })
      );
      continue;
    }

    const cleaned = line.replace(/\*\*/g, "").replace(/`/g, "");
    out.push(new Paragraph({ children: [new TextRun(cleaned)] }));
  }

  return out;
}

async function resolveDocsDir(workspaceRoot) {
  const entries = await fs.readdir(workspaceRoot, { withFileTypes: true });
  const docs = entries.find((e) => e.isDirectory() && e.name.toLowerCase().startsWith("dok"));
  if (!docs) throw new Error("Dokümanlar folder not found in workspace root.");
  return path.join(workspaceRoot, docs.name);
}

async function main() {
  const workspaceRoot = path.resolve(__dirname, "..");
  const srcMd = path.join(workspaceRoot, "2_Figma_UIUX", "BatuhanTasdemir_FigmaUIUX_Aciklama_RaporMetni.md");
  const docsDir = await resolveDocsDir(workspaceRoot);
  const outDocx = path.join(docsDir, "Batuhan_Tasdemir_FigmaUIUX_Aciklama.docx");

  const md = await fs.readFile(srcMd, "utf8");
  const body = mdToDocxParagraphs(md);

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: "Batuhan Taşdemir – NovaStore | Figma UI/UX Açıklama Raporu",
            heading: HeadingLevel.TITLE,
          }),
          new Paragraph({ text: "Tarih: Nisan 2026" }),
          new Paragraph({ text: "Platform: Mobil (iOS ve Android)" }),
          new Paragraph({ text: "Ekranlar: Login / Home / Detail" }),
          new Paragraph({ text: "" }),
          ...body,
        ],
      },
    ],
  });

  const buf = await Packer.toBuffer(doc);
  await fs.writeFile(outDocx, buf);
  process.stdout.write(`WROTE_DOCX: ${outDocx}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

