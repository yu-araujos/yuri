"use client";

import React from "react";
import {
  Layers,
  GitCommit,
  Cpu,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Zap,
  ArrowLeft,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import type { Project } from "./projects/types";

interface ProjectCaseStudyProps {
  project: Project;
  onBack: () => void;
}

export function ProjectCaseStudy({ project, onBack }: ProjectCaseStudyProps) {
  return (
    <div className="space-y-10 sm:space-y-12 w-full pb-12">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-brand transition-colors group"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
        <span>All projects</span>
      </button>

      <div className="p-5 sm:p-6 rounded-2xl bg-stone-100 dark:bg-zinc-900/80 border border-stone-200 dark:border-zinc-800/80 space-y-4 transition-colors">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-brand shrink-0" />
              <h3 className="text-xl sm:text-2xl font-mono font-bold text-zinc-900 dark:text-zinc-100">
                {project.name}
              </h3>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-lg">
              {project.tagline}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono font-semibold bg-stone-200/80 dark:bg-zinc-800 hover:bg-stone-300 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors border border-stone-300 dark:border-zinc-700"
              >
                <FaGithub className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono font-semibold bg-brand text-zinc-950 hover:bg-brand/90 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live</span>
              </a>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-brand/10 text-brand border border-brand/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-mono text-zinc-900 dark:text-zinc-100 font-semibold flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-brand" />
          <span>Context & Problem</span>
        </h3>
        {project.context.map((para, idx) => (
          <p
            key={idx}
            className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm md:text-base"
          >
            {para}
          </p>
        ))}
      </div>

      <div className="space-y-5">
        <h3 className="text-lg font-mono text-zinc-900 dark:text-zinc-100 font-semibold flex items-center space-x-2">
          <Cpu className="w-5 h-5 text-brand" />
          <span>Tech Stack</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {project.techCategories.map((cat, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-stone-100 dark:bg-zinc-900/60 border border-stone-200 dark:border-zinc-800/80 space-y-4"
            >
              <h4 className="text-xs font-mono text-brand uppercase tracking-wider font-bold">
                {cat.title}
              </h4>
              <ul className="space-y-2">
                {cat.skills.map((skill, sIdx) => (
                  <li
                    key={sIdx}
                    className="text-xs md:text-sm text-zinc-700 dark:text-zinc-300 flex items-center space-x-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-mono text-zinc-900 dark:text-zinc-100 font-semibold flex items-center space-x-2">
          <GitCommit className="w-5 h-5 text-brand" />
          <span>Decisions Log</span>
        </h3>

        <div className="relative pl-6 sm:pl-8 space-y-8 sm:space-y-10 border-l-2 border-stone-200 dark:border-zinc-800">
          {project.decisions.map((item, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-7.75 sm:-left-9.75 top-1.5 w-3.5 h-3.5 rounded-full bg-stone-300 dark:bg-zinc-700 group-hover:bg-brand transition-colors border-2 border-stone-50 dark:border-zinc-950" />

              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-zinc-500">
                  <span className="text-brand font-semibold">{item.hash}</span>
                  <span>•</span>
                  <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                    {item.period}
                  </span>
                </div>
                <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  {item.title}
                </h4>
                <ul className="space-y-1.5 mt-2.5">
                  {item.bullets.map((bullet, bIdx) => (
                    <li
                      key={bIdx}
                      className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 flex items-start space-x-2"
                    >
                      <span className="text-brand select-none">›</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        <div className="p-5 sm:p-6 rounded-2xl bg-stone-100 dark:bg-zinc-900/60 border border-stone-200 dark:border-zinc-800/80 space-y-3">
          <div className="flex items-center space-x-2 text-brand font-mono text-xs font-bold uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            <span>Results</span>
          </div>
          <ul className="space-y-2">
            {project.results.map((r, idx) => (
              <li
                key={idx}
                className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 flex items-start space-x-2"
              >
                <span className="text-brand select-none shrink-0">›</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl bg-stone-100 dark:bg-zinc-900/60 border border-stone-200 dark:border-zinc-800/80 space-y-3">
          <div className="flex items-center space-x-2 text-brand font-mono text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Learnings</span>
          </div>
          <ul className="space-y-2">
            {project.learnings.map((l, idx) => (
              <li
                key={idx}
                className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 flex items-start space-x-2"
              >
                <span className="text-brand select-none shrink-0">›</span>
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
