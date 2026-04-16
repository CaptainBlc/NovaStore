import fs from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer-core";
import { PDFDocument, StandardFonts } from "pdf-lib";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const EDGE_EXE =
  process.env.EDGE_EXE ||
  "C:\\\\Program Files (x86)\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173";

const VIEWPORT = {
  width: 393,
  height: 852,
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
};

const ROUTES = [
  { name: "Login Screen", path: "/" },
  { name: "Home Screen", path: "/home" },
  { name: "Detail Screen", path: "/detail/1" },
];

function ensureTrailingSlash(url) {
  return url.endsWith("/") ? url : `${url}/`;
}

async function renderRoutePdf({ browser, route }) {
  console.log(`Rendering: ${route.name} (${route.path})`);
  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);

  const url = new URL(route.path, ensureTrailingSlash(BASE_URL)).toString();
  console.log(`Goto: ${url}`);
  await page.goto(url, { waitUntil: "networkidle2", timeout: 60_000 });
  await sleep(500);

  // Ensure full height (no scroll cut-off)
  const fullHeight = await page.evaluate(() =>
    Math.max(
      document.documentElement.scrollHeight,
      document.body?.scrollHeight || 0,
      document.documentElement.offsetHeight,
      document.body?.offsetHeight || 0
    )
  );
  const height = Math.min(Math.max(fullHeight, VIEWPORT.height), 5000);
  await page.setViewport({ ...VIEWPORT, height });
  await sleep(250);

  const pdfBytes = await page.pdf({
    printBackground: true,
    preferCSSPageSize: true,
    width: `${VIEWPORT.width}px`,
    height: `${height}px`,
    margin: { top: "0px", right: "0px", bottom: "0px", left: "0px" },
    pageRanges: "1",
  });

  await page.close();
  return pdfBytes;
}

async function main() {
  const projectRoot = path.resolve(import.meta.dirname, "..");
  const workspaceRoot = path.resolve(projectRoot, "..", "..");
  const docsDir = path.join(workspaceRoot, "Dokümanlar");
  const fallbackDocsDir = path.join(workspaceRoot, "Dok\uFFFdmanlar"); // best-effort

  let outDir = docsDir;
  try {
    await fs.access(docsDir);
  } catch {
    outDir = fallbackDocsDir;
  }

  const outPath = path.join(outDir, "Batuhan_Tasdemir_FigmaUIUX_Tasarim.pdf");

  console.log(`Using Edge: ${EDGE_EXE}`);
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Output: ${outPath}`);

  const browser = await puppeteer.launch({
    executablePath: EDGE_EXE,
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--no-first-run",
      "--no-default-browser-check",
    ],
  });

  try {
    const merged = await PDFDocument.create();
    const helvetica = await merged.embedFont(StandardFonts.Helvetica);

    for (const route of ROUTES) {
      const pdfBytes = await renderRoutePdf({ browser, route });
      const doc = await PDFDocument.load(pdfBytes);
      const pages = await merged.copyPages(doc, doc.getPageIndices());
      for (const p of pages) merged.addPage(p);

      // Add a small title at top-left of first page of this section (optional)
      const lastPage = merged.getPage(merged.getPageCount() - 1);
      lastPage.drawText(route.name, {
        x: 12,
        y: lastPage.getHeight() - 18,
        size: 10,
        font: helvetica,
        opacity: 0.6,
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

