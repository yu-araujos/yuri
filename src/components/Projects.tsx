"use client";

import Card from "./Card";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section className="flex flex-col w-full h-[calc(100vh-3.5rem)] md:h-[calc(100vh-4.5rem)]">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-border-base/50 shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-mono text-base text-accent">•</span>
          <h3 className="font-mono text-xs uppercase tracking-widest text-fg">
            PROJECTS & CASE STUDIES
          </h3>
        </div>
        <span className="font-mono text-xs text-muted-ys tracking-wider">
          {projects.length} TILES
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-6">
        <div className="columns-1 sm:columns-2 gap-4 [column-fill:balance] space-y-4 ">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="break-inside-avoid cursor-pointer p-5 md:p-6"
              subtitle={project.category}
              badge={project.id}
              title={project.title}
              description={project.description}
              footerText="See Project"
            >
              <div
                className={`relative w-full rounded-xl overflow-hidden mt-2 `}
              >
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex ml-0 m-2 justify-center px-2 py-1 rounded-full text-xs font-mono font-medium text-fg bg-surface-high border border-border-base/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
