"use client";

import React, { useState } from "react";
import { FolderOpen, ExternalLink, ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { projects } from "./projects";
import { ProjectCaseStudy } from "./ProjectCaseStudy";
import type { Project } from "./projects/types";

export function ProjectsApp() {
  const [selected, setSelected] = useState<Project | null>(null);

  if (selected) {
    return (
      <ProjectCaseStudy project={selected} onBack={() => setSelected(null)} />
    );
  }

  return (
    <div className="space-y-6 w-full pb-12">
      <p className="text-sm text-zinc-500 dark:text-zinc-400 font-mono">
        // {projects.length} project{projects.length !== 1 ? "s" : ""} — click
        to read the case study
      </p>

      <div className="space-y-4">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => setSelected(project)}
            className="w-full text-left p-5 sm:p-6 rounded-2xl bg-stone-100 dark:bg-zinc-900/80 border border-stone-200 dark:border-zinc-800/80 hover:border-brand/50 transition-all group space-y-3"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-xl bg-brand/10 text-brand shrink-0">
                  <FolderOpen className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="font-mono font-bold text-zinc-900 dark:text-zinc-100 text-base leading-tight">
                    {project.name}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 leading-snug line-clamp-1">
                    {project.tagline}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-lg bg-stone-200/80 dark:bg-zinc-800 hover:bg-stone-300 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 transition-colors"
                    title="GitHub"
                  >
                    <FaGithub className="w-4 h-4" />
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-lg bg-stone-200/80 dark:bg-zinc-800 hover:bg-stone-300 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 transition-colors"
                    title="Live demo"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <div className="p-2 rounded-lg text-zinc-400 group-hover:text-brand transition-colors">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-brand/10 text-brand border border-brand/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
