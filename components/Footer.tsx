import { Box, Flex, Text, IconButton, Link } from "@radix-ui/themes";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

export function Footer() {
  return (
    <Box py="5" style={{ borderTop: "1px solid var(--gray-a4)" }}>
      <Flex align="center" justify="between">
        <Text size="1" color="gray">
          © {new Date().getFullYear()} Trista Mueller
        </Text>
        <Flex gap="2">
          <Link href="https://github.com/tbmueller" target="_blank" rel="noopener noreferrer">
            <IconButton variant="ghost" color="gray" size="1" aria-label="GitHub">
              <GitHubLogoIcon />
            </IconButton>
          </Link>
          <Link href="https://linkedin.com/in/tristamueller" target="_blank" rel="noopener noreferrer">
            <IconButton variant="ghost" color="gray" size="1" aria-label="LinkedIn">
              <LinkedInLogoIcon />
            </IconButton>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}
