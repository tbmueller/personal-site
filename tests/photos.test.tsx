import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Theme } from "@radix-ui/themes";
import type { ReactNode } from "react";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import { Hero } from "@/components/Hero";
import { photos } from "@/data/photos";
import { indexMd } from "@/lib/markdown";
import type { Photo } from "@/data/photos";

const renderThemed = (ui: ReactNode) => render(<Theme>{ui}</Theme>);
afterEach(cleanup);

const host = "https://abc123.public.blob.vercel-storage.com/travel";
const sample: Photo[] = [
  { src: `${host}/lisbon-x1.jpg`, width: 2400, height: 1600, alt: "Yellow tram on a steep street", caption: "Lisbon" },
  { src: `${host}/fjord-x2.jpg`, width: 2400, height: 1600, alt: "Kayak on a still fjord" },
];

describe("travel photo carousel", () => {
  it("renders nothing while there are no photos", () => {
    const { container } = renderThemed(<PhotoCarousel photos={[]} />);
    expect(container.querySelector("section")).toBeNull();
  });

  it("is absent from the About tab until photos are added", () => {
    if (photos.length) return; // once there are photos, the next tests cover it
    renderThemed(<Hero />);
    expect(screen.queryByRole("heading", { name: "Travel" })).toBeNull();
    expect(screen.queryByRole("region", { name: "Travel photos" })).toBeNull();
  });

  it("shows each photo as a labelled slide, with captions", () => {
    renderThemed(<PhotoCarousel photos={sample} />);
    const carousel = screen.getByRole("region", { name: "Travel photos" });
    expect(carousel.getAttribute("aria-roledescription")).toBe("carousel");
    expect(screen.getByRole("heading", { name: "Travel" })).toBeTruthy();
    expect(screen.getByRole("group", { name: "1 of 2" })).toBeTruthy();
    expect(screen.getByRole("group", { name: "2 of 2" })).toBeTruthy();
    for (const p of sample) expect(screen.getByAltText(p.alt)).toBeTruthy();
    expect(screen.getByText("Lisbon")).toBeTruthy();
  });

  it("has previous/next buttons and a counter when there's more than one photo", () => {
    renderThemed(<PhotoCarousel photos={sample} />);
    expect(screen.getByRole("button", { name: "Previous photo" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Next photo" })).toBeTruthy();
    expect(screen.getByText("1 / 2")).toBeTruthy();
  });

  it("drops the controls for a single photo", () => {
    renderThemed(<PhotoCarousel photos={sample.slice(0, 1)} />);
    expect(screen.queryByRole("button", { name: "Next photo" })).toBeNull();
  });
});

describe("photo data", () => {
  it.each(photos.map((p) => [p.src, p]))("%s is a Blob URL with alt text and a size", (_src, p) => {
    expect(p.src).toMatch(/^https:\/\/[a-z0-9]+\.public\.blob\.vercel-storage\.com\/travel\//);
    expect(p.alt.trim()).not.toBe("");
    expect(p.width).toBeGreaterThan(0);
    expect(p.height).toBeGreaterThan(0);
  });

  it("index.md only mentions travel photos when there are some", () => {
    expect(indexMd().includes("Travel photos:")).toBe(photos.length > 0);
  });
});
