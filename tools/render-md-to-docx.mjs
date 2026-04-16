import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from "docx";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function mdToDocxParagraphs(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out = [];

  for (const raw of lines) {
    const line = raw.trimEnd();
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed === "---") continue;

    if (trimmed.startsWith("## ")) {
      out.push(new Paragraph({ text: trimmed.slice(3).trim(), heading: HeadingLevel.HEADING_1 }));
      continue;
    }
    if (trimmed.startsWith("### ")) {
      out.push(new Paragraph({ text: trimmed.slice(4).trim(), heading: HeadingLevel.HEADING_2 }));
      continue;
    }
    if (trimmed.startsWith("- ")) {
      out.push(
        new Paragraph({
          text: trimmed.slice(2).replace(/\*\*/g, "").replace(/`/g, "").trim(),
          bullet: { level: 0 },
        })
      );
      continue;
    }

    // Remove simple markdown emphasis/code
    const cleaned = trimmed.replace(/\*\*/g, "").replace(/`/g, "");
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

  const inPath = process.argv[2];
  const outName = process.argv[3];
  const title = process.argv[4] || "";

  if (!inPath || !outName) {
    console.error("Usage: node tools/render-md-to-docx.mjs <input.md> <output.docx> [title]");
    process.exit(2);
  }

  const absIn = path.isAbsolute(inPath) ? inPath : path.join(workspaceRoot, inPath);
  const docsDir = await resolveDocsDir(workspaceRoot);
  const absOut = path.join(docsDir, outName);

  const md = await fs.readFile(absIn, "utf8");
  const body = mdToDocxParagraphs(md);

  const children = [];
  if (title.trim()) {
    children.push(new Paragraph({ text: title.trim(), heading: HeadingLevel.TITLE }));
    children.push(new Paragraph({ text: "" }));
  }
  children.push(...body);

  const doc = new Document({
    sections: [{ properties: {}, children }],
  });

  const buf = await Packer.toBuffer(doc);
  await fs.writeFile(absOut, buf);
  process.stdout.write(`WROTE_DOCX: ${absOut}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

