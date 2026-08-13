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
      handle: "yuriaraujoo",
      url: "https://github.com/yuriaraujoo",
      icon: FaGithub,
    },
  ];

  const handleCopy = (url: string, name: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(name);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  return (
    <div className="font-mono space-y-4 w-full select-text">
      <div className="space-y-1">
        <p className="text-sm font-mono text-zinc-300">
          <span className="text-brand font-semibold">dev@yuri</span>:
          <span className="text-zinc-400">~</span>$ ./contact.sh --list
        </p>
        <p className="text-xs text-zinc-500 font-mono">
          [INFO] Initializing channels... Done.
        </p>
      </div>

      <div className="space-y-3 pt-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isCopied = copiedLink === link.name;

          return (
            <div
              key={link.name}
              className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800/80 hover:border-brand/50 transition-all flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center space-x-3 min-w-0">
                <div className="p-2 rounded-lg bg-zinc-800 text-brand group-hover:bg-brand/15 transition-colors shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-zinc-400 font-mono">{link.name}</p>
                  <p className="text-sm font-semibold text-zinc-100 font-mono">
                    {link.handle}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => handleCopy(link.url, link.name)}
                  className="px-2.5 py-1.5 rounded-md text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors flex items-center space-x-1 font-mono"
                  title="Copy URL"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
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
                  className="px-3 py-1.5 rounded-md text-xs bg-brand text-zinc-950 font-semibold font-mono hover:bg-brand/90 transition-colors flex items-center space-x-1 shadow-sm"
                >
                  <span>Open</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-1 text-xs text-zinc-500 font-mono flex items-center space-x-1.5">
        <span className="text-emerald-500">●</span>
        <span>Status: Online</span>
        <span className="animate-pulse text-brand font-bold">_</span>
      </div>
    </div>
  );
}
