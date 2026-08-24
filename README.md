# 💻 Yuri Silva — Personal OS Portfolio

An interactive, macOS-inspired personal portfolio web app built with Next.js, TypeScript, Framer Motion, and Tailwind CSS. Designed to showcase interactive case studies, career experience, and technical projects inside a desktop windowing environment.

🌐 **Website**: <a href="https://yuri.pt" target="_blank" rel="noopener noreferrer">yuri.pt</a>

---

## 🌟 Key Features

- **Interactive Desktop Windowing System**: Drag, minimize, maximize, bring to focus, and close windows seamlessly (powered by Zustand & Framer Motion).
- **macOS Dock & Theme Engine**: Animated dock bar with dynamic item scaling and real-time Dark/Light theme switching.
- **Projects & Case Studies App**: Dedicated showcase with modular case studies (including architecture decisions, concurrency patterns, and tech stacks).
- **About Me App**: Career timeline, experience log, and categorized skills (Frontend, Backend, Databases, Testing, Systems).
- **Terminal Contact App**: Interactive `contact.sh` terminal view with one-click copy and quick links.
- **Arcade Mode**: Retro easter egg experience with warp speed transitions.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons & Typography**: Lucide Icons, React Icons, Press Start 2P Pixel Font, Geist Mono

---

## 📁 Project Architecture

```text
src/
├── app/                  # Next.js App Router (layout, metadata, global styles)
├── components/           # Core UI & Desktop environment components
│   ├── apps/             # Window App Views (AboutApp, ContactApp, ProjectsApp, etc.)
│   │   └── projects/     # Modular project datasets & types (e.g. Latchly)
│   ├── Desktop.tsx       # Main desktop background & window orchestrator
│   ├── Dock.tsx          # Interactive macOS Dock
│   └── Window.tsx        # Window frame wrapper with controls & drag gestures
├── store/                # Zustand OS Store (window states, active z-index, theme)
└── utils/                # Sound effects & audio utilities
```
