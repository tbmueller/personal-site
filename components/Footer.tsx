import { Box, Flex, Text, IconButton } from "@radix-ui/themes";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <Box asChild py="5" style={{ borderTop: "1px solid var(--gray-a4)" }}>
      <footer>
        <Flex align="center" justify="between">
          <Text size="1" color="gray">
            © {new Date().getFullYear()} {profile.name}
          </Text>
          <Flex gap="2">
            {/* The icon button IS the link (asChild), so it's one tab stop, not a button inside a link. */}
            <IconButton asChild variant="ghost" color="gray" size="1">
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)">
                <GitHubLogoIcon aria-hidden />
              </a>
            </IconButton>
            <IconButton asChild variant="ghost" color="gray" size="1">
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)">
                <LinkedInLogoIcon aria-hidden />
              </a>
            </IconButton>
          </Flex>
        </Flex>
      </footer>
    </Box>
  );
}
