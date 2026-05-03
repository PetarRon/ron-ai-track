// Run with: node scripts/build-hero.mjs
// Reads public/hero-bg.png, emits public/hero-bg.{webp,avif} at 2400px max width.
import sharp from "sharp";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, "../public/hero-bg.png");
const OUT_WEBP = path.resolve(__dirname, "../public/hero-bg.webp");
const OUT_AVIF = path.resolve(__dirname, "../public/hero-bg.avif");

const MAX_WIDTH = 2400;

const run = async () => {
  const meta = await sharp(SRC).metadata();
  console.log(`source: ${meta.width}x${meta.height} (${meta.format})`);

  const webpInfo = await sharp(SRC)
    .resize({ width: Math.min(meta.width ?? MAX_WIDTH, MAX_WIDTH), withoutEnlargement: true })
    .webp({ quality: 75 })
    .toFile(OUT_WEBP);
  console.log(`webp:  ${OUT_WEBP} (${(webpInfo.size / 1024).toFixed(0)} KB)`);

  const avifInfo = await sharp(SRC)
    .resize({ width: Math.min(meta.width ?? MAX_WIDTH, MAX_WIDTH), withoutEnlargement: true })
    .avif({ quality: 60, effort: 6 })
    .toFile(OUT_AVIF);
  console.log(`avif:  ${OUT_AVIF} (${(avifInfo.size / 1024).toFixed(0)} KB)`);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
