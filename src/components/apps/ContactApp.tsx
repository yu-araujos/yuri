"use client";

import { useState } from "react";
import { ExternalLink, Check, Copy } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

export function ContactApp() {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const links = [
    {
      name: "LinkedIn",
      handle: "in/yuriaraujoo",
      url: "https://www.linkedin.com/in/yuriaraujoo/",
      icon: FaLinkedin,
    },
    {
      name: "GitHub",
      handle: "yu-araujos",
      url: "https://github.com/yu-araujos",
      icon: FaGithub,
    },
  ];

  const handleCopy = (url: string, name: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(name);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  return (
    <div className="font-mono space-y-6 sm:space-y-8 w-full pb-6 text-zinc-800 dark:text-zinc-100 md:text-zinc-100 select-text">
      <div className="space-y-2">
        <p className="text-sm md:text-base font-mono text-zinc-600 dark:text-zinc-300 md:text-zinc-300">
          <span className="text-brand font-semibold">dev@yuri</span>:
          <span className="text-zinc-500 dark:text-zinc-400 md:text-zinc-400">~</span>$ ./contact.sh --list
        </p>
        <p className="text-xs md:text-sm text-zinc-500 font-mono">
          [INFO] Initializing channels... Done.
        </p>
      </div>

      <div className="space-y-4 pt-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isCopied = copiedLink === link.name;

          return (
            <div
              key={link.name}
              className="p-4 sm:p-5 rounded-2xl bg-stone-100 dark:bg-zinc-900/90 md:bg-zinc-900/90 border border-stone-200 dark:border-zinc-800/80 md:border-zinc-800/80 hover:border-brand/50 transition-all flex items-center justify-between gap-4 group shadow-sm md:shadow-lg"
            >
              <div className="flex items-center space-x-3.5 min-w-0">
                <div className="p-3 rounded-xl bg-stone-200/80 dark:bg-zinc-800 md:bg-zinc-800 text-brand group-hover:bg-brand/15 transition-colors shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 md:text-zinc-400 font-mono">{link.name}</p>
                  <p className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100 md:text-zinc-100 font-mono mt-0.5">
                    {link.handle}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => handleCopy(link.url, link.name)}
                  className="hidden sm:flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs bg-stone-200/80 dark:bg-zinc-800 md:bg-zinc-800 hover:bg-stone-300 dark:hover:bg-zinc-700 md:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 md:text-zinc-300 transition-colors font-mono"
                  title="Copy URL"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500 md:text-emerald-400" />
                      <span className="text-emerald-500 md:text-emerald-400 font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg text-xs bg-brand text-zinc-950 font-semibold font-mono hover:bg-brand/90 transition-colors flex items-center space-x-1.5 shadow-sm"
                >
                  <span>Open</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-2 text-xs md:text-sm text-zinc-500 font-mono flex items-center space-x-2">
        <span className="text-emerald-500">●</span>
        <span>Status: Online</span>
        <span className="animate-pulse text-brand font-bold">_</span>
      </div>
    </div>
  );
}
