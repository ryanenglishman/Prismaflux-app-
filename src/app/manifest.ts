import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PrismaFlux Auto",
    short_name: "PrismaFlux",
    description: "Le copilote IA des concessions automobiles",
    start_url: "/robin",
    display: "standalone",
    background_color: "#060608",
    theme_color: "#060608",
    orientation: "portrait",
    icons: [
      { src: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
