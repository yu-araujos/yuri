"use client";

import React from "react";
import { Briefcase, MapPin } from "lucide-react";
import Card from "./Card";

interface ProfileCardProps {
  className?: string;
}

export function ProfileCard({ className = "" }: ProfileCardProps) {
  return (
    <Card
      subtitle="SOFTWARE ENGINEER"
      badge="Open to new remote roles"
      title="Hi, I'm Yuri Silva"
      description="React, Next.js, and TypeScript in hand. Angular front-end at Dachser by day, full-stack projects like this one on my own time."
      showFooterAction={false}
      className={className}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-border-base/40">
        <div className="flex items-start gap-2.5">
          <Briefcase className="w-4 h-4 text-subtle-ys shrink-0 mt-0.5" />
          <div className="font-mono text-xs">
            <span className="block text-subtle-ys text-[10px] uppercase tracking-wider">
              CURRENT ROLE
            </span>
            <span className="text-fg font-medium">
              Frontend Engineer · Dachser
            </span>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <MapPin className="w-4 h-4 text-subtle-ys shrink-0 mt-0.5" />
          <div className="font-mono text-xs">
            <span className="block text-subtle-ys text-[10px] uppercase tracking-wider">
              BASE
            </span>
            <span className="text-fg font-medium">Porto, Portugal</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ProfileCard;
