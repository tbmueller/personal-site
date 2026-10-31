import { Box, Text, Flex, Badge, Heading } from "@radix-ui/themes";
import { profile } from "@/data/profile";
import { PhotoCarousel } from "@/components/PhotoCarousel";

export function Hero() {
  return (
    <Box py="6" style={{ maxWidth: "600px" }}>
      <Heading as="h2" size="4" mb="2">
        At work
      </Heading>
      {profile.work.map((paragraph, i) => (
        <Text key={i} size="3" color="gray" as="p" mb={i === profile.work.length - 1 ? "4" : "3"}>
          {paragraph}
        </Text>
      ))}
      <Flex gap="2" wrap="wrap" mb="7">
        {profile.skills.map((skill) => (
          <Badge key={skill} variant="soft">
            {skill}
          </Badge>
        ))}
      </Flex>

      <Heading as="h2" size="4" mb="2">
        Outside work
      </Heading>
      <Text size="3" color="gray" as="p">
        {profile.outside}
      </Text>
      <PhotoCarousel />
    </Box>
  );
}
