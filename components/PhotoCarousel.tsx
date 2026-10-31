"use client";

import { useCallback, useEffect, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Box, Flex, Heading, IconButton, Text } from "@radix-ui/themes";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { photos as allPhotos, type Photo } from "@/data/photos";

// A swipeable photo carousel (Embla) with arrow buttons and keyboard arrows.
// Renders nothing until there are photos.
export function PhotoCarousel({ photos = allPhotos }: { photos?: Photo[] }) {
  const [viewportRef, embla] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    embla.on("select", onSelect);
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla]);

  const prev = useCallback(() => embla?.scrollPrev(), [embla]);
  const next = useCallback(() => embla?.scrollNext(), [embla]);
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
  };

  if (photos.length === 0) return null;
  const many = photos.length > 1;

  return (
    <Box asChild mt="7">
      <section aria-roledescription="carousel" aria-label="Travel photos" onKeyDown={onKeyDown}>
        <Heading as="h2" size="4" mb="3">
          Travel
        </Heading>
        <div ref={viewportRef} style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", touchAction: "pan-y pinch-zoom" }}>
            {photos.map((photo, i) => (
              <figure
                key={photo.src}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${photos.length}`}
                style={{ flex: "0 0 100%", minWidth: 0, margin: 0 }}
              >
                <div style={{ position: "relative", aspectRatio: "3 / 2", background: "var(--gray-3)", borderRadius: "var(--radius-4)", overflow: "hidden" }}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 600px"
                    style={{ objectFit: "cover" }}
                    priority={i === 0}
                  />
                </div>
                {photo.caption && (
                  <Text as="p" size="2" color="gray" mt="2">
                    {photo.caption}
                  </Text>
                )}
              </figure>
            ))}
          </div>
        </div>
        {many && (
          <Flex align="center" justify="between" mt="2">
            <IconButton variant="ghost" color="gray" onClick={prev} aria-label="Previous photo">
              <ChevronLeftIcon />
            </IconButton>
            <Text size="1" color="gray" aria-live="polite">
              {selected + 1} / {photos.length}
            </Text>
            <IconButton variant="ghost" color="gray" onClick={next} aria-label="Next photo">
              <ChevronRightIcon />
            </IconButton>
          </Flex>
        )}
      </section>
    </Box>
  );
}
