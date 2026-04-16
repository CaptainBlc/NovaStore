import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";
import { PDFDocument, StandardFonts } from "pdf-lib";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EDGE_EXE =
  process.env.EDGE_EXE ||
  "C:\\\\Program Files (x86)\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

const ROUTES = [
  { name: "Dashboard", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Add Product", path: "/add" },
  { name: "Orders", path: "/orders" },
  { name: "Customers", path: "/customers" },
];

function ensureTrailingSlash(url) {
  return url.endsWith("/") ? url : `${url}/`;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function resolveDocsDir(workspaceRoot) {
  const entries = await fs.readdir(workspaceRoot, { withFileTypes: true });
  const docs = entries.find((e) => e.isDirectory() && e.name.toLowerCase().startsWith("dok"));
  if (!docs) throw new Error("Dokümanlar folder not found in workspace root.");
  return path.join(workspaceRoot, docs.name);
}

async function renderRoutePdf({ browser, route }) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  const url = new URL(route.path, ensureTrailingSlash(BASE_URL)).toString();
  console.log(`Goto: ${url}`);
  await page.goto(url, { waitUntil: "networkidle2", timeout: 90_000 });
  await sleep(800);

  const pdfBytes = await page.pdf({
    format: "A4",
    landscape: true,
    printBackground: true,
    margin: { top: "10mm", right: "10mm", bottom: "10mm", left: "10mm" },
  });

  await page.close();
  return pdfBytes;
}

async function main() {
  const workspaceRoot = path.resolve(__dirname, "..");
  const docsDir = await resolveDocsDir(workspaceRoot);
  const outPath = path.join(docsDir, "BatuhanTasdemir_NovaStore_AdminPanel_Ekranlar.pdf");

  console.log(`Using Edge: ${EDGE_EXE}`);
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Output: ${outPath}`);

  const browser = await puppeteer.launch({
    executablePath: EDGE_EXE,
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu", "--no-first-run", "--no-default-browser-check"],
  });

  try {
    const merged = await PDFDocument.create();
    const font = await merged.embedFont(StandardFonts.Helvetica);

    for (const route of ROUTES) {
      const pdfBytes = await renderRoutePdf({ browser, route });
      const doc = await PDFDocument.load(pdfBytes);
      const pages = await merged.copyPages(doc, doc.getPageIndices());
      for (const p of pages) merged.addPage(p);

      const last = merged.getPage(merged.getPageCount() - 1);
      last.drawText(route.name, {
        x: 14,
        y: last.getHeight() - 18,
        size: 10,
        font,
        opacity: 0.65,
      });
    }

    const finalBytes = await merged.save();
    await fs.writeFile(outPath, finalBytes);
    process.stdout.write(`WROTE_PDF: ${outPath}\n`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

