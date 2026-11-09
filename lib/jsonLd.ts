// schema.org Person: tells search engines and AI agents who this page is about.
import { profile, PHOTO } from "@/data/profile";
import { SITE_URL } from "@/lib/site";

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: SITE_URL,
  image: `${SITE_URL}${PHOTO}`,
  jobTitle: profile.jobTitle,
  worksFor: { "@type": "Organization", name: profile.employer },
  address: { "@type": "PostalAddress", addressLocality: profile.location },
  description: profile.headline,
  knowsAbout: profile.skills,
  sameAs: [profile.links.github, profile.links.linkedin],
};

// Safe to drop into a <script> tag: "<" can't close it early.
export function jsonLdScript(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
