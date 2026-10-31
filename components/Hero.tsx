import { Box, Text, Flex, Badge } from "@radix-ui/themes";

export function Hero() {
  return (
    <Box py="6">
      <Text size="4" color="gray" as="p" mb="5" style={{ maxWidth: "520px" }}>
        Senior full-stack software developer with a front-end focus. Over ten
        years building product across fintech, B2B SaaS and climate tech:
        design systems, onboarding flows, and making slow pages fast. Most at
        home in TypeScript and React, with plenty of Rails on the back end.
      </Text>
      <Flex gap="2" wrap="wrap">
        <Badge variant="soft">TypeScript</Badge>
        <Badge variant="soft">React</Badge>
        <Badge variant="soft">Rails</Badge>
        <Badge variant="soft">Design systems</Badge>
      </Flex>
    </Box>
  );
}
