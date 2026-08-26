import { cva } from "class-variance-authority";
import { AppId } from "@/store/useOSStore";

export const TITLE_MAP: Record<AppId, string> = {
  about: "About",
  projects: "Projects",
  contact: "contact.sh",
  arcade: "Arcade Mode",
};

export const windowContainerVariants = cva(
  "fixed flex flex-col overflow-hidden transition-colors duration-500",
  {
    variants: {
      mode: {
        mobile:
          "inset-0 w-full h-full rounded-none border-none shadow-none bg-light-surface dark:bg-zinc-950 pt-[calc(3.75rem+env(safe-area-inset-top,0px))]",
        maximized:
          "inset-y-0 right-0 w-[calc(100%-4rem)] h-full rounded-none border-none bg-stone-50 dark:bg-zinc-950",
        contact:
          "top-[20%] left-[30%] w-full max-w-xl h-auto rounded-xl bg-zinc-950 border border-zinc-800 shadow-2xl",
        standard:
          "top-[12%] left-[12%] w-[76%] h-[72%] max-w-5xl rounded-xl border border-stone-200 dark:border-zinc-700/50 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-2xl",
      },
    },
    defaultVariants: {
      mode: "standard",
    },
  }
);

export const windowHeaderVariants = cva(
  "hidden md:flex items-center justify-between px-4 py-3 cursor-move select-none transition-colors duration-500",
  {
    variants: {
      app: {
        contact: "bg-zinc-900 border-b border-zinc-800 text-zinc-300",
        default:
          "bg-stone-100/80 dark:bg-zinc-950/80 border-b border-stone-200 dark:border-zinc-800",
      },
    },
    defaultVariants: {
      app: "default",
    },
  }
);

export const windowContentVariants = cva(
  "flex-1 overflow-y-auto font-sans text-zinc-700 dark:text-zinc-300 transition-colors duration-500",
  {
    variants: {
      type: {
        contact:
          "bg-light-surface dark:bg-zinc-950 md:bg-zinc-950 text-zinc-900 dark:text-zinc-100 md:text-zinc-100 px-5 pt-6 pb-12 md:p-6",
        maximized: "bg-light-surface dark:bg-zinc-950 p-6 md:p-16",
        standard:
          "bg-light-surface dark:bg-zinc-950 md:bg-stone-50/80 md:dark:bg-zinc-900/50 px-5 pt-6 pb-12 md:p-8",
      },
    },
    defaultVariants: {
      type: "standard",
    },
  }
);

export const windowTitleVariants = cva(
  "font-mono text-brand uppercase tracking-wider",
  {
    variants: {
      type: {
        contact: "block md:hidden text-2xl mb-4",
        maximized: "text-3xl md:text-5xl mb-6 md:mb-10",
        standard: "text-2xl md:text-3xl mb-4 md:mb-6",
      },
    },
    defaultVariants: {
      type: "standard",
    },
  }
);
