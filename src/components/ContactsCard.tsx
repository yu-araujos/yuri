"use client";

import Card from "./Card";
import { CONTACTS } from "@/data/contact";

export function ContactsCard() {
  return (
    <Card
      subtitle={
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-red" />
          <span>CONTACTS</span>
        </span>
      }
      showFooterAction={false}
      title={
        <>
          Let's <span className="text-red">Connect</span>
        </>
      }
      className="h-full w-full min-w-0"
    >
      <div className="flex flex-col gap-3">
        {CONTACTS.map((contact) => (
          <a
            key={contact.label}
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link flex items-center gap-4 rounded-xl border border-border-base/50 bg-surface-mid/40 px-4 py-3 transition-all duration-300 hover:border-red/40 hover:bg-surface-mid"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border-base/50 bg-surface-mid transition-all duration-300 group-hover/link:border-red/50 group-hover/link:bg-red/10">
              <contact.icon className="h-5 w-5 text-subtle-ys transition-colors duration-300 group-hover/link:text-red" />
            </div>

            <div className="min-w-0 flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-subtle-ys">
                {contact.label}
              </span>
              <span className="truncate font-mono text-xs font-medium text-fg transition-colors duration-300 group-hover/link:text-red">
                {contact.href.replace("https://", "")}
              </span>
            </div>

            <div className="-translate-x-2 ml-auto opacity-0 transition-all duration-300 group-hover/link:translate-x-0 group-hover/link:opacity-100">
              <span className="font-mono text-[10px] uppercase tracking-wider text-red">
                Visit →
              </span>
            </div>
          </a>
        ))}
      </div>
    </Card>
  );
}

export default ContactsCard;
