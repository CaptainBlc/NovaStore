import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import JSZip from "jszip";
import { PDFDocument } from "pdf-lib";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function decodeXmlEntities(s) {
  return s
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}

// NOTE: We intentionally avoid parsing headings/captions because DOCX exports
// may store them in ways that are hard to reliably detect. Instead we classify
// screenshots by orientation (portrait ~= mobile/Flutter, landscape ~= SQL/desktop).

async function resolveDocsDir(workspaceRoot) {
  const entries = await fs.readdir(workspaceRoot, { withFileTypes: true });
  const docs = entries.find((e) => e.isDirectory() && e.name.toLowerCase().startsWith("dok"));
  if (!docs) throw new Error("Dokümanlar folder not found in workspace root.");
  return path.join(workspaceRoot, docs.name);
}

async function addImagePage(pdf, bytes, ext) {
  let img;
  if (ext === ".png") img = await pdf.embedPng(bytes);
  else img = await pdf.embedJpg(bytes);

  const { width, height } = img;

  // Page size based on image ratio, capped to A4 landscape-ish max.
  const maxW = 842; // A4 landscape width in points
  const maxH = 595; // A4 landscape height in points

  const scale = Math.min(maxW / width, maxH / height, 1);
  const w = width * scale;
  const h = height * scale;

  const page = pdf.addPage([maxW, maxH]);
  page.drawImage(img, {
    x: (maxW - w) / 2,
    y: (maxH - h) / 2,
    width: w,
    height: h,
  });

  return { width, height };
}

async function main() {
  const workspaceRoot = path.resolve(__dirname, "..");
  const docsDir = await resolveDocsDir(workspaceRoot);

  const docxPath = path.join(workspaceRoot, "Ekran_Goruntuleri", "Proje_EkranG\uFFFdru\uFFFdnt\uFFFdleri.docx");
  // fallback: find the first docx in Ekran_Goruntuleri (handles weird characters)
  const egDir = path.join(workspaceRoot, "Ekran_Goruntuleri");
  const egFiles = await fs.readdir(egDir);
  const firstDocx = egFiles.find((f) => f.toLowerCase().endsWith(".docx"));
  const resolvedDocx = firstDocx ? path.join(egDir, firstDocx) : docxPath;

  const buf = await fs.readFile(resolvedDocx);
  const zip = await JSZip.loadAsync(buf);

  // Collect all images inside word/media in a stable order.
  const mediaFolder = zip.folder("word/media");
  if (!mediaFolder) throw new Error("Invalid DOCX: missing word/media folder.");

  const mediaFiles = Object.values(mediaFolder.files)
    .filter((f) => !f.dir)
    .map((f) => f.name)
    .filter((n) => {
      const ext = path.extname(n).toLowerCase();
      return ext === ".png" || ext === ".jpg" || ext === ".jpeg";
    })
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const pdfSql = await PDFDocument.create();
  const pdfFlutter = await PDFDocument.create();

  let sqlCount = 0;
  let flutterCount = 0;

  for (const mediaPath of mediaFiles) {
    const file = zip.file(mediaPath);
    if (!file) continue;
    const bytes = await file.async("uint8array");
    const ext = path.extname(mediaPath).toLowerCase();

    // Decide bucket by orientation:
    // - portrait-ish (mobile screens): flutter
    // - landscape-ish (SSMS/desktop): sql
    const probeDoc = await PDFDocument.create();
    const dims = await addImagePage(probeDoc, bytes, ext === ".png" ? ".png" : ".jpg");
    const ratio = dims.width / dims.height;

    if (ratio >= 1.15) {
      await addImagePage(pdfSql, bytes, ext === ".png" ? ".png" : ".jpg");
      sqlCount++;
    } else {
      await addImagePage(pdfFlutter, bytes, ext === ".png" ? ".png" : ".jpg");
      flutterCount++;
    }
  }

  console.log(`Classified images: sql=${sqlCount}, flutter=${flutterCount} (total=${mediaFiles.length})`);

  if (sqlCount > 0) {
    const outPath = path.join(docsDir, "BatuhanTasdemir_NovaStore_SQL_EkranGoruntuleri.pdf");
    await fs.writeFile(outPath, await pdfSql.save());
    process.stdout.write(`WROTE_PDF: ${outPath} (pages=${pdfSql.getPageCount()})\n`);
  }

  if (flutterCount > 0) {
    const outPath = path.join(docsDir, "BatuhanTasdemir_NovaStore_Flutter_EkranGoruntuleri.pdf");
    await fs.writeFile(outPath, await pdfFlutter.save());
    process.stdout.write(`WROTE_PDF: ${outPath} (pages=${pdfFlutter.getPageCount()})\n`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

