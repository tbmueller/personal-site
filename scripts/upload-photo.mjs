// Upload a travel photo to Vercel Blob, stripped of location and camera data.
//
//   BLOB_READ_WRITE_TOKEN=... npm run photos:upload -- path/to/photo.jpg
//
// Prints the entry to add to data/photos.ts (fill in alt and caption).
// The token comes from the Vercel Blob store (vercel env pull, or the dashboard).
import { readFile } from "node:fs/promises";
import { basename, extname } from "node:path";
import { put } from "@vercel/blob";
import { preparePhoto } from "./prepare-photo.mjs";

const files = process.argv.slice(2);
if (!files.length) {
  console.error("Usage: npm run photos:upload -- <photo> [<photo> ...]");
  process.exit(1);
}
if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error("Set BLOB_READ_WRITE_TOKEN (from the site's Vercel Blob store) first.");
  process.exit(1);
}

for (const file of files) {
  const { data, width, height } = await preparePhoto(await readFile(file));
  const name = basename(file, extname(file)).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const blob = await put(`travel/${name}.jpg`, data, { access: "public", contentType: "image/jpeg", addRandomSuffix: true });
  console.log(`  { src: "${blob.url}", width: ${width}, height: ${height}, alt: "", caption: "" },`);
}
