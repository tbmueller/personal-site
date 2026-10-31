import { describe, expect, it } from "vitest";
import sharp from "sharp";
import { preparePhoto, MAX_EDGE } from "@/scripts/prepare-photo.mjs";

// A phone-style photo: 4000x3000, rotated by EXIF, with GPS and camera data.
async function phonePhoto() {
  return sharp({ create: { width: 4000, height: 3000, channels: 3, background: "#4a7" } })
    .withExif({
      IFD0: { Make: "Phone", Model: "Phone 15" },
      IFD3: { GPSLatitudeRef: "N", GPSLatitude: "37/1 46/1 30/1", GPSLongitudeRef: "W", GPSLongitude: "122/1 25/1 10/1" },
    })
    .withMetadata({ orientation: 6 })
    .jpeg()
    .toBuffer();
}

describe("preparePhoto", () => {
  it("starts from a photo that really has GPS data", async () => {
    const meta = await sharp(await phonePhoto()).metadata();
    expect(meta.exif).toBeDefined();
    expect(meta.exif!.includes(Buffer.from("Phone 15"))).toBe(true);
    expect(meta.orientation).toBe(6);
  });

  it("strips all metadata, including GPS", async () => {
    const { data } = await preparePhoto(await phonePhoto());
    const meta = await sharp(data).metadata();
    expect(meta.exif).toBeUndefined();
    expect(meta.xmp).toBeUndefined();
    expect(meta.iptc).toBeUndefined();
  });

  it("applies the camera rotation, then fits it within the max edge", async () => {
    const { data, width, height } = await preparePhoto(await phonePhoto());
    // Orientation 6 turns 4000x3000 into portrait; then it shrinks to fit 2400.
    expect([width, height]).toEqual([1800, MAX_EDGE]);
    const meta = await sharp(data).metadata();
    expect([meta.width, meta.height, meta.format]).toEqual([1800, 2400, "jpeg"]);
  });

  it("doesn't enlarge small photos", async () => {
    const small = await sharp({ create: { width: 800, height: 600, channels: 3, background: "#fff" } }).png().toBuffer();
    const { width, height } = await preparePhoto(small);
    expect([width, height]).toEqual([800, 600]);
  });
});
