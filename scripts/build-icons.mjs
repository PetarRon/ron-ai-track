// Run with: npm run build:icons
// Reads public/petaron_logo.svg and emits every favicon / touch icon the site declares:
//   favicon.ico (16/32/48 frames), favicon-32x32.png, favicon-96x96.png,
//   apple-touch-icon.png (180), icon-192.png, icon-512.png
// Rasters render the dark "R" on the site's cream page background (#FAF8F5)
// so they look exactly like the mark in the header.
import sharp from "sharp";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.resolve(__dirname, "../public");
const SRC = path.join(PUBLIC, "petaron_logo.svg");

const BG = { r: 250, g: 248, b: 245, alpha: 1 }; // --th-page / theme-color #FAF8F5
const PADDING = 0.12; // fraction of each edge left empty around the mark
const SMALL_PADDING = 0.04; // tab-size frames (<= 32px) need nearly all the pixels

const renderPng = async (size) => {
  const pad = size <= 32 ? SMALL_PADDING : PADDING;
  const inner = Math.round(size * (1 - pad * 2));
  const mark = await sharp(SRC, { density: 600 })
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  const offset = Math.round((size - inner) / 2);
  return sharp({ create: { width: size, height: size, channels: 4, background: BG } })
    .composite([{ input: mark, left: offset, top: offset }])
    .png({ compressionLevel: 9 })
    .toBuffer();
};

// ICO container with PNG-encoded frames (supported by every modern browser and by Google).
const buildIco = (frames) => {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(frames.length, 4);

  const dirSize = 16 * frames.length;
  let offset = 6 + dirSize;
  const entries = [];
  for (const { size, png } of frames) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // width
    e.writeUInt8(size >= 256 ? 0 : size, 1); // height
    e.writeUInt8(0, 2); // palette
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // color planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(png.length, 8);
    e.writeUInt32LE(offset, 12);
    entries.push(e);
    offset += png.length;
  }
  return Buffer.concat([header, ...entries, ...frames.map((f) => f.png)]);
};

const write = async (name, buf) => {
  const out = path.join(PUBLIC, name);
  await fs.writeFile(out, buf);
  console.log(`${name.padEnd(22)} ${(buf.length / 1024).toFixed(1)} KB`);
};

const run = async () => {
  const icoFrames = [];
  for (const size of [16, 32, 48]) icoFrames.push({ size, png: await renderPng(size) });
  await write("favicon.ico", buildIco(icoFrames));

  await write("favicon-32x32.png", icoFrames[1].png);
  await write("favicon-96x96.png", await renderPng(96));
  await write("apple-touch-icon.png", await renderPng(180));
  await write("icon-192.png", await renderPng(192));
  await write("icon-512.png", await renderPng(512));
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
