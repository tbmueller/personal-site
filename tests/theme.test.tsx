import { afterEach, describe, expect, it } from "vitest";
import { act, cleanup, render, screen } from "@testing-library/react";
import { ThemeProvider } from "next-themes";
import { Theme } from "@radix-ui/themes";
import { ThemeToggle } from "@/components/ThemeToggle";

afterEach(() => {
  cleanup();
  localStorage.clear();
  document.documentElement.className = "";
});

const renderToggle = () =>
  render(
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Theme>
        <ThemeToggle />
      </Theme>
    </ThemeProvider>,
  );

describe("ThemeToggle", () => {
  it("follows the system (light here) until clicked", () => {
    renderToggle();
    expect(screen.getByRole("button", { name: "Switch to dark mode" })).toBeTruthy();
    expect(localStorage.getItem("theme")).toBeNull();
  });

  it("switches to dark and back, and remembers the choice", () => {
    renderToggle();
    act(() => screen.getByRole("button", { name: "Switch to dark mode" }).click());
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
    act(() => screen.getByRole("button", { name: "Switch to light mode" }).click());
    expect(document.documentElement.classList.contains("light")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("light");
  });
});
