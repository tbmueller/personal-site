// @vitest-environment node
import { describe, expect, it } from "vitest";
import { join } from "node:path";
import sharp from "sharp";

describe("headshot file", () => {
  it("is a square JPEG with no metadata (no camera, GPS or timestamps)", async () => {
    const meta = await sharp(join(__dirname, "..", "public", "me.jpg")).metadata();
    expect(meta.format).toBe("jpeg");
    expect(meta.width).toBe(meta.height);
    expect(meta.width).toBeGreaterThanOrEqual(144); // sharp at 72px on 2x screens
    expect(meta.exif).toBeUndefined();
    expect(meta.xmp).toBeUndefined();
    expect(meta.iptc).toBeUndefined();
  });
});
