"use client";

import Card from "../Card";
import ProjectWireframeCard from "../projects/ProjectWireframeCard";
import { projects } from "@/data/projects";

const MIN_GRID_SLOTS = 2;

export default function Projects() {
  const placeholderCount = Math.max(0, MIN_GRID_SLOTS - projects.length);

  return (
    <section className="flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-border-base/50 shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-mono text-base text-accent">•</span>
          <h3 className="font-mono text-xs uppercase tracking-widest text-fg">
            PROJECTS & CASE STUDIES
          </h3>
        </div>
        <span className="font-mono text-xs text-muted-ys tracking-wider">
          {projects.length} PROJECT(S)
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-6">
        <div className="columns-1 gap-4 *:mb-4 *:break-inside-avoid">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="cursor-pointer p-5 md:p-6"
              subtitle={project.category}
              badge={project.id}
              title={project.title}
              description={project.description}
              footerText="See Project"
            >
              <div className="relative mt-2 w-full overflow-hidden rounded-xl">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="m-2 ml-0 inline-flex justify-center rounded-full border border-border-base/30 bg-surface-high px-2 py-1 font-mono text-xs font-medium text-fg"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}

          {Array.from({ length: placeholderCount }).map((_, i) => (
            <ProjectWireframeCard key={`placeholder-${i}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
