import type { Project } from "./types";

export const latchly: Project = {
  id: "latchly",
  name: "Latchly",
  tagline:
    "Real-time collaborative Kanban board with pessimistic concurrency locking.",
  tags: [
    "Next.js",
    "Node.js",
    "Express",
    "Prisma",
    "PostgreSQL",
    "Socket.io",
    "Framer Motion",
  ],
  github: "https://github.com/yu-araujos/latchly",
  live: null,

  context: [
    "Latchly is a real-time Kanban board built around one specific problem: what happens when two users try to edit or drag the same card at the same time?",
  ],
  techCategories: [
    {
      title: "Frontend",
      skills: [
        "Next.js (App Router)",
        "TypeScript",
        "Tailwind CSS v4",
        "Framer Motion",
        "@hello-pangea/dnd",
        "Socket.io client",
      ],
    },
    {
      title: "Backend",
      skills: [
        "Node.js & Express",
        "Socket.io (WebSocket)",
        "PostgreSQL (Neon Serverless)",
        "Prisma ORM",
      ],
    },
    {
      title: "Concurrency Layer",
      skills: [
        "Pessimistic locking (DB-backed)",
        "PostgreSQL Transactions (FOR UPDATE)",
        "60s TTL auto-release",
        "Atomic position reordering",
        "Lock-aware drag & drop",
      ],
    },
  ],
  decisions: [
    {
      hash: "decision_pessimistic_lock",
      title: "Pessimistic over Optimistic Locking",
      period: "Core Architecture",
      bullets: [
        "Chose pessimistic locking (block upfront) over optimistic (detect & merge after) to simplify UX.",
        "A lock is claimed in PostgreSQL the moment a user opens a card, and released on close or connection drop.",
        "Locks have a 60s TTL: if a user closes the tab or loses connection, the lock expires automatically without requiring manual cleanup.",
      ],
    },
    {
      hash: "decision_atomic_reorder",
      title: "Atomic Position Reordering",
      period: "Drag & Drop",
      bullets: [
        "Card drag emits a move event to the backend, which runs a DB transaction to shift neighbor positions safely.",
        "The transaction uses batch increment/decrement on affected rows to avoid ordinal gaps and duplicate positions on concurrent moves.",
        "This prevents race conditions when two moves happen close together. The final board state is always consistent.",
        "Dragging is disabled client-side if the target card is currently locked by another user.",
      ],
    },
    {
      hash: "decision_auth_tradeoff",
      title: "Auth Trade-off (intentional)",
      period: "Scope Decision",
      bullets: [
        "userId is sent directly from the client to keep the focus on the concurrency problem, not auth flows.",
        "This allows easy local testing: open two tabs, pick different users, and observe the real-time lock behavior.",
        "In a production build, userId would be extracted from a verified JWT/session inside Express middleware.",
      ],
    },
  ],
  results: [
    "Real-time lock state propagates to all connected clients instantly via WebSocket: opening a card in one tab locks it in every other tab.",
    "The full concurrency flow (claim → hold → release / TTL expire) works end-to-end with no silent overwrites.",
  ],
  learnings: [
    "Pessimistic locking is simpler to reason about at the UX level, but requires thinking carefully about orphaned locks (solved via TTL + disconnect handler).",
    "Atomic DB transactions for position reordering are non-trivial — naive approaches leave gaps or duplicates on concurrent moves.",
    "WebSocket events need to be designed as commands with explicit ack/nack, not just fire-and-forget notifications.",
  ],
};
