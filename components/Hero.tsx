import { Box, Text, Flex, Badge } from "@radix-ui/themes";

export function Hero() {
  return (
    <Box py="6">
      <Text size="4" color="gray" as="p" mb="5" style={{ maxWidth: "520px" }}>
        Software engineer. I build things that are fast, useful, and don&apos;t
        get in the way. Based somewhere with good coffee.
      </Text>
      <Flex gap="2" wrap="wrap">
        <Badge variant="soft">Engineering</Badge>
        <Badge variant="soft">TypeScript</Badge>
        <Badge variant="soft">Systems</Badge>
      </Flex>
    </Box>
  );
}
