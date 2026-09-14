export interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  aspectRatio: string;
  accent?: boolean;
  wireframeType: "terminal" | "grid" | "stripes" | "mockup" | "chart" | "nodes";
}

export const projects: Project[] = [
  {
    id: "01",
    title: "Headless Storefront Kit",
    category: "E-Commerce Architecture",
    tags: ["Next.js", "TypeScript", "Stripe"],
    aspectRatio: "aspect-[4/2]",
    accent: true,
    wireframeType: "mockup",
  },
  {
    id: "02",
    title: "Freight Visibility Console",
    category: "Enterprise Logistics",
    tags: ["Angular", "RxJS", "Virtual Grid"],
    aspectRatio: "aspect-[1/1]",
    wireframeType: "stripes",
  },
  {
    id: "03",
    title: "Realtime Tracking Map",
    category: "Geospatial Streaming",
    tags: ["WebSockets", "Mapbox", "Node.js"],
    aspectRatio: "aspect-[4/5]",
    wireframeType: "chart",
  },
  {
    id: "04",
    title: "Shift-Scheduling API + UI",
    category: "Workforce Planning",
    tags: ["PostgreSQL", "NestJS", "Tailwind"],
    aspectRatio: "aspect-[3/4]",
    wireframeType: "terminal",
  },
];
