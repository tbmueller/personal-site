import { Box, Text, Flex, Badge, Heading } from "@radix-ui/themes";

export function Hero() {
  return (
    <Box py="6" style={{ maxWidth: "600px" }}>
      <Heading as="h2" size="4" mb="2">
        At work
      </Heading>
      <Text size="3" color="gray" as="p" mb="3">
        I&apos;m a senior software engineer with over ten years of experience,
        and these days I specialize in billing, payments and monetization. At
        Handshake I own billing for the employer business. I led the move from
        slot-based subscriptions to per-job pricing, and cut billing incidents
        by 80% along the way.
      </Text>
      <Text size="3" color="gray" as="p" mb="4">
        Before that I built a design system at Patch and led onboarding work
        at Wealthsimple that brought in CAD$600M in deposits. I&apos;m at home
        across the stack, from Rails and Postgres to TypeScript and React.
      </Text>
      <Flex gap="2" wrap="wrap" mb="7">
        <Badge variant="soft">Billing &amp; payments</Badge>
        <Badge variant="soft">Rails</Badge>
        <Badge variant="soft">TypeScript</Badge>
        <Badge variant="soft">React</Badge>
        <Badge variant="soft">Design systems</Badge>
      </Flex>

      <Heading as="h2" size="4" mb="2">
        Outside work
      </Heading>
      <Text size="3" color="gray" as="p">
        I live in San Francisco. Before that, I lived in Toronto. I enjoy
        kayaking, fiber crafts, hiking, traveling, and low-stakes board games
        like Taboo and Telestrations.
      </Text>
    </Box>
  );
}
