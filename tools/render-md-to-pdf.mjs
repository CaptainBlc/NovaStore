import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EDGE_EXE =
  process.env.EDGE_EXE ||
  "C:\\\\Program Files (x86)\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe";

function escapeHtml(s) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function mdToHtml(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  let html = "";
  let inList = false;

  const closeList = () => {
    if (inList) {
      html += "</ul>";
      inList = false;
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const t = line.trim();
    if (!t) {
      closeList();
      html += "<div class='spacer'></div>";
      continue;
    }
    if (t === "---") {
      closeList();
      html += "<hr/>";
      continue;
    }
    if (t.startsWith("## ")) {
      closeList();
      html += `<h2>${escapeHtml(t.slice(3))}</h2>`;
      continue;
    }
    if (t.startsWith("### ")) {
      closeList();
      html += `<h3>${escapeHtml(t.slice(4))}</h3>`;
      continue;
    }
    if (t.startsWith("- ")) {
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${escapeHtml(
        t.slice(2).replace(/\*\*/g, "").replace(/`/g, "")
      )}</li>`;
      continue;
    }

    closeList();
    const cleaned = t.replace(/\*\*/g, "").replace(/`/g, "");
    html += `<p>${escapeHtml(cleaned)}</p>`;
  }

  closeList();
  return html;
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
    console.error("Usage: node tools/render-md-to-pdf.mjs <input.md> <output.pdf> [title]");
    process.exit(2);
  }

  const absIn = path.isAbsolute(inPath) ? inPath : path.join(workspaceRoot, inPath);
  const docsDir = await resolveDocsDir(workspaceRoot);
  const absOut = path.join(docsDir, outName);

  const md = await fs.readFile(absIn, "utf8");
  const body = mdToHtml(md);

  const fullHtml = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>${escapeHtml(title || outName)}</title>
    <style>
      @page { margin: 20mm 18mm; }
      body { font-family: "Segoe UI", Arial, sans-serif; font-size: 11.5pt; color: #111; }
      h1 { font-size: 20pt; margin: 0 0 10px; }
      h2 { font-size: 14pt; margin: 18px 0 8px; }
      h3 { font-size: 12.5pt; margin: 14px 0 6px; }
      p { margin: 6px 0; line-height: 1.45; }
      ul { margin: 6px 0 6px 18px; }
      li { margin: 3px 0; line-height: 1.4; }
      hr { border: none; border-top: 1px solid #ddd; margin: 12px 0; }
      .spacer { height: 6px; }
      .title { font-weight: 700; }
      .meta { color: #444; margin-top: 4px; }
    </style>
  </head>
  <body>
    ${title ? `<h1 class="title">${escapeHtml(title)}</h1>` : ""}
    ${body}
  </body>
</html>`;

  const browser = await puppeteer.launch({
    executablePath: EDGE_EXE,
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu", "--no-first-run", "--no-default-browser-check"],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(fullHtml, { waitUntil: "load" });
    const pdf = await page.pdf({ format: "A4", printBackground: true });
    await fs.writeFile(absOut, pdf);
    process.stdout.write(`WROTE_PDF: ${absOut}\n`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

