import { Container, Separator } from "@radix-ui/themes";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <Container size="3" px="5">
      <Hero />
      <Separator size="4" mb="8" />
      <Projects />
      <Footer />
    </Container>
  );
}
