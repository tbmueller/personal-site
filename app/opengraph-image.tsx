import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
import { TEAL } from "@/lib/brand";

// The picture shown when the site's link is pasted into LinkedIn, Slack,
// iMessage and the like. Built at build time from data/profile.ts.
export const alt = `${profile.name}: ${profile.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The favicon's "T" tile, 96px.
function Mark() {
  const u = 96 / 64;
  return (
    <div style={{ width: 96, height: 96, borderRadius: 14 * u, background: TEAL, position: "relative", display: "flex" }}>
      <div style={{ position: "absolute", left: 15 * u, top: 15 * u, width: 34 * u, height: 9 * u, background: "#fff", borderRadius: 1.5 * u }} />
      <div style={{ position: "absolute", left: 27 * u, top: 15 * u, width: 10 * u, height: 34 * u, background: "#fff", borderRadius: 1.5 * u }} />
    </div>
  );
}

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#fcfcfd",
          color: "#1c2024",
          borderTop: `16px solid ${TEAL}`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <Mark />
            <div style={{ fontSize: 84, letterSpacing: -2 }}>{profile.name}</div>
          </div>
          <div style={{ fontSize: 38, color: "#60646c", marginTop: 36, maxWidth: 940, lineHeight: 1.3 }}>
            {profile.headline}
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", gap: 14 }}>
            {profile.skills.map((skill) => (
              <div
                key={skill}
                style={{ fontSize: 26, padding: "8px 18px", borderRadius: 10, background: "#e0f8f3", color: "#0d9b8a" }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
