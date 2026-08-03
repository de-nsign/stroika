/**
 * favicon.mjs — install the client's mark as the site icon.
 *
 * The template ships its own `icon.svg` and `favicon.ico`. Left in place they
 * show the template's brand in the browser tab, on bookmarks and in history —
 * the one piece of the old identity a page screenshot never catches.
 *
 * Next's App Router picks up `app/icon.png` automatically, but browsers still
 * request `/favicon.ico` by convention, so both have to be replaced.
 */

import { rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

/** Wrap a PNG in an ICO container. Every browser since IE11 reads PNG-in-ICO,
 *  and it avoids pulling in a BMP encoder for a 32×32 image. */
function pngToIco(png, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // one image

  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0); // 0 means 256
  entry.writeUInt8(size >= 256 ? 0 : size, 1);
  entry.writeUInt8(0, 2); // palette size
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // colour planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(header.length + entry.length, 12);

  return Buffer.concat([header, entry, png]);
}

/**
 * @param {string} markPath  square, transparent source mark
 * @param {string} appDir    the Next app directory
 */
export async function installFavicon(markPath, appDir = join('src', 'app')) {
  const square = (size) =>
    sharp(markPath)
      .resize({
        width: size,
        height: size,
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();

  await writeFile(join(appDir, 'icon.png'), await square(512));
  await writeFile(join(appDir, 'apple-icon.png'), await square(180));
  await writeFile(join(appDir, 'favicon.ico'), pngToIco(await square(48), 48));

  /* the template's own SVG mark would otherwise win over icon.png */
  await rm(join(appDir, 'icon.svg'), { force: true });

  return ['icon.png', 'apple-icon.png', 'favicon.ico', '-icon.svg'];
}
