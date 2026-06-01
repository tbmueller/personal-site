import { Container, Tabs } from "@radix-ui/themes";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <Container size="3" px="5">
      <Tabs.Root defaultValue="about">
        <Tabs.List mt="6" mb="6">
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
