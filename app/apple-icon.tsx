import { ImageResponse } from "next/og";
import { TEAL } from "@/lib/brand";

// Home-screen icon for iOS: the favicon's "T", drawn as two bars, on teal.
// iOS rounds the corners itself.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const u = 180 / 64; // the favicon is drawn on a 64-unit grid
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: TEAL, position: "relative" }}>
        <div style={{ position: "absolute", left: 15 * u, top: 15 * u, width: 34 * u, height: 9 * u, background: "#fff", borderRadius: 1.5 * u }} />
        <div style={{ position: "absolute", left: 27 * u, top: 15 * u, width: 10 * u, height: 34 * u, background: "#fff", borderRadius: 1.5 * u }} />
      </div>
    ),
    size,
  );
}
