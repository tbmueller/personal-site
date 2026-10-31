// Makes a travel photo safe and web-sized before it's uploaded: applies the
// camera's rotation, shrinks it to fit 2400px, and re-encodes it as JPEG.
// sharp drops all metadata on re-encode, so GPS location, camera details and
// timestamps are gone; we check that, and refuse to continue if any survive.
import sharp from "sharp";

export const MAX_EDGE = 2400;

export async function preparePhoto(input) {
  const { data, info } = await sharp(input)
    .rotate()
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer({ resolveWithObject: true });
  const meta = await sharp(data).metadata();
  if (meta.exif || meta.xmp || meta.iptc) throw new Error("metadata survived re-encoding; not uploading");
  return { data, width: info.width, height: info.height };
}
