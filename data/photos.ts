// Travel photos for the carousel on the About tab. Empty for now, so the
// carousel doesn't render. Add photos with `npm run photos:upload`, which
// strips location and camera data, uploads to Vercel Blob, and prints the
// entry to paste here.
export interface Photo {
  src: string; // https://<store>.public.blob.vercel-storage.com/...
  width: number;
  height: number;
  alt: string; // what's in the photo, for screen readers
  caption?: string; // shown under the photo
}

export const photos: Photo[] = [];
