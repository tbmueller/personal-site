import { Box, Flex, Text, IconButton, Link } from "@radix-ui/themes";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <Box py="5" style={{ borderTop: "1px solid var(--gray-a4)" }}>
      <Flex align="center" justify="between">
        <Text size="1" color="gray">
          © {new Date().getFullYear()} {profile.name}
        </Text>
        <Flex gap="2">
          <Link href={profile.links.github} target="_blank" rel="noopener noreferrer">
            <IconButton variant="ghost" color="gray" size="1" aria-label="GitHub">
              <GitHubLogoIcon />
            </IconButton>
          </Link>
          <Link href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
            <IconButton variant="ghost" color="gray" size="1" aria-label="LinkedIn">
              <LinkedInLogoIcon />
            </IconButton>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}
