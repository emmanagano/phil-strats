// Builds web-ready images in public/images from the full-size originals in images-src/.
// Per <slug>.jpg it writes: <slug>.jpg (1600w), <slug>-800.jpg (800w), <slug>-og.jpg (1200x630).
// Run: npm run images
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const src = path.resolve("images-src");
const out = path.resolve("public/images");
fs.mkdirSync(out, { recursive: true });

for (const file of fs.readdirSync(src).filter((f) => f.endsWith(".jpg"))) {
  const slug = file.replace(/\.jpg$/, "");
  const input = path.join(src, file);
  const jpeg = { quality: 80, progressive: true, mozjpeg: true };
  await sharp(input).rotate().resize({ width: 1600, withoutEnlargement: true }).jpeg(jpeg).toFile(path.join(out, `${slug}.jpg`));
  await sharp(input).rotate().resize({ width: 800, withoutEnlargement: true }).jpeg(jpeg).toFile(path.join(out, `${slug}-800.jpg`));
  await sharp(input).rotate().resize(1200, 630, { fit: "cover", position: "attention" }).jpeg(jpeg).toFile(path.join(out, `${slug}-og.jpg`));
  console.log("optimized", slug);
}
