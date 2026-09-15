"use client";

import React from "react";
import { Briefcase, MapPin } from "lucide-react";
import Card from "./Card";

export default function ProfileCard() {
  return (
    <Card
      subtitle={
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-red" />
          <span>SOFTWARE ENGINEER</span>
        </span>
      }
      badge="Open to new remote roles"
      showBadgeDot={true}
      title={
        <>
          Hi, I&apos;m Yuri <span className="text-red">Silva</span>
        </>
      }
      description={
        <>
          <span className="text-fg font-medium">React</span>,{" "}
          <span className="text-fg font-medium">Next.js</span>, and{" "}
          <span className="text-fg font-medium">TypeScript</span> in hand.
          Angular front-end at{" "}
          <span className="text-red font-semibold">Dachser</span> by day,
          full-stack projects like this one on my own time.
        </>
      }
      showFooterAction={false}
      className="w-full max-w-145"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-border-base/40">
        <div className="flex items-center gap-2.5">
          <Briefcase className="w-4 h-4 text-subtle-ys shrink-0 mt-0.5" />
          <div className="font-mono text-xs">
            <span className="block text-subtle-ys text-xs uppercase tracking-wider pb-1">
              CURRENT ROLE
            </span>
            <span className="text-fg font-medium">
              Frontend Engineer ·{" "}
              <span className="text-red font-semibold">Dachser</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <MapPin className="w-4 h-4 text-subtle-ys shrink-0 mt-0.5" />
          <div className="font-mono text-xs">
            <span className="block text-subtle-ys text-xs uppercase tracking-wider pb-1">
              BASE
            </span>
            <span className="text-fg font-medium">Porto, Portugal</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
