"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { IconButton } from "@radix-ui/themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

const subscribe = () => () => {};

// Light/dark switch. Until you click it, the site follows your system setting.
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // The theme is only known in the browser: false while server-rendering and
  // hydrating, true after, so the server and client HTML match.
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  const dark = mounted && resolvedTheme === "dark";
  return (
    <IconButton
      variant="ghost"
      color="gray"
      size="3"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      disabled={!mounted}
    >
      {dark ? <SunIcon width="18" height="18" /> : <MoonIcon width="18" height="18" />}
    </IconButton>
  );
}
