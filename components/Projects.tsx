import { Box, Heading, Text, Flex, Badge, Card, Link, Grid } from "@radix-ui/themes";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <Box pb="9">
      <Heading size="5" mb="5" color="gray">
        Projects
      </Heading>
      <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="4">
        {projects.map((project) => (
          <Card key={project.name} variant="surface">
            <Flex direction="column" gap="2" height="100%">
              <Flex align="center" justify="between" gap="2">
                <Heading size="3">{project.name}</Heading>
                {project.url && (
                  <Link href={project.url} target="_blank" rel="noopener noreferrer" color="gray">
                    <ExternalLinkIcon />
                  </Link>
                )}
              </Flex>
              <Text size="2" color="gray" style={{ flex: 1 }}>
                {project.description}
              </Text>
              <Flex gap="1" wrap="wrap" mt="1">
                {project.tags.map((tag) => (
                  <Badge key={tag} size="1" variant="soft" color="gray">
                    {tag}
                  </Badge>
                ))}
              </Flex>
            </Flex>
          </Card>
        ))}
      </Grid>
    </Box>
  );
}
