import Image from "next/image";
import { Container, Tabs, Heading, Flex, Box } from "@radix-ui/themes";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <Container size="3" px="5">
      <Flex align="center" gap="4" pt="8" pb="5">
        {/* Replace src with your photo path, e.g. /me.jpg placed in /public */}
        <Box
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            overflow: "hidden",
            flexShrink: 0,
            background: "var(--gray-4)",
          }}
        >
          {/* Uncomment and update src once you add a photo to /public:
          <Image src="/me.jpg" alt="Trista Mueller" width={72} height={72} style={{ objectFit: "cover" }} />
          */}
        </Box>
        <Heading size="8" weight="bold">
          Trista Mueller
        </Heading>
      </Flex>

      <Tabs.Root defaultValue="about">
        <Tabs.List mb="6">
          <Tabs.Trigger value="about">About</Tabs.Trigger>
          <Tabs.Trigger value="projects">Projects</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="about">
          <Hero />
        </Tabs.Content>
        <Tabs.Content value="projects">
          <Projects />
        </Tabs.Content>
      </Tabs.Root>

      <Footer />
    </Container>
  );
}
