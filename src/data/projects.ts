export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: "01",
    title: "Latchly",
    description: "Real-time Kanban Board",
    category: "Fullstack Project",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Framer Motion",
      "@hello-pangea/dnd",
      "Sonner",
      "NodeJS",
      "PostgreSQL",
      "Prisma",
      "Socket.IO",
    ],
  },
];
