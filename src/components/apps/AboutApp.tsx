"use client";

import React, { useEffect, useState } from "react";
import {
  MapPin,
  Clock,
  Terminal,
  Cpu,
  GitCommit,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Languages,
} from "lucide-react";

export function AboutApp() {
  const [portoTime, setPortoTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Lisbon",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setPortoTime(formatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: "Years Experience", value: "4+" },
    { label: "Primary Role", value: "Frontend Engineer" },
    { label: "Focus Stack", value: "Angular & React" },
    { label: "Location", value: "Porto, PT" },
  ];

  const techCategories = [
    {
      title: "Frontend & Frameworks",
      skills: [
        "Angular (RxJS, NgRx, Signals)",
        "React & Next.js",
        "TypeScript & JavaScript",
        "Tailwind CSS & Bootstrap",
        "HTML5 / Modern CSS",
      ],
    },
    {
      title: "Backend & Systems",
      skills: ["Node.js & Express", "Java", "RESTful APIs"],
    },
    {
      title: "Testing & Ecosystem",
      skills: [
        "Jest & Jasmine/Karma",
        "Git & GitHub",
        "Docker & Jenkins",
        "Agile / SAFe & Scrum",
      ],
    },
  ];

  const timeline = [
    {
      hash: "commit_dachser",
      role: "Software Engineer",
      company: "DACHSER",
      type: "Full-time • Hybrid",
      period: "May 2025 - Present",
      location: "Porto, Portugal",
      bullets: [
        "Front-end developer on a new invoicing platform built with Angular, serving international branches in a SAFe team (Portugal & Germany).",
        "Expanded Jest test coverage and pushed the team toward modern Angular patterns, including standalone components.",
        "Work in a full Scrum cycle (planning, refinement, daily, review, retro) inside a SAFe team.",
      ],
    },
    {
      hash: "commit_btg_pactual",
      role: "Front-End Developer",
      company: "BTG Pactual",
      type: "Full-time • Remote",
      period: "Aug 2021 - May 2024",
      location: "São Paulo, Brazil",
      bullets: [
        "Front-end developer on internal asset administration system used daily by fund account managers.",
        "Built a real-time spreadsheet upload module with WebSocket integration for instant processing feedback.",
      ],
    },
  ];

  return (
    <div className="space-y-8 w-full pb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        <div className="p-3.5 sm:p-4 rounded-xl bg-stone-100 dark:bg-zinc-900/80 border border-stone-200 dark:border-zinc-800/80 flex items-center gap-3 transition-colors">
          <div className="p-2 sm:p-2.5 rounded-lg bg-brand/10 text-brand shrink-0 flex items-center justify-center">
            <Briefcase className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Current Role
            </p>
            <p className="text-xs sm:text-[13px] lg:text-sm font-medium text-zinc-900 dark:text-zinc-100 mt-0.5 leading-snug whitespace-nowrap">
              Software Engineer @ DACHSER
            </p>
          </div>
        </div>

        <div className="p-3.5 sm:p-4 rounded-xl bg-stone-100 dark:bg-zinc-900/80 border border-stone-200 dark:border-zinc-800/80 flex items-center gap-3 transition-colors">
          <div className="relative flex h-2.5 w-2.5 shrink-0 ml-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Status
            </p>
            <p className="text-xs sm:text-[13px] lg:text-sm font-medium text-zinc-900 dark:text-zinc-100 mt-0.5 leading-snug whitespace-nowrap">
              Open for new opportunities
            </p>
          </div>
        </div>

        <div className="p-3.5 sm:p-4 rounded-xl bg-stone-100 dark:bg-zinc-900/80 border border-stone-200 dark:border-zinc-800/80 flex items-center justify-between gap-2.5 transition-colors">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-2 sm:p-2.5 rounded-lg bg-brand/10 text-brand shrink-0 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Location
              </p>
              <p className="text-xs sm:text-[13px] lg:text-sm font-medium text-zinc-900 dark:text-zinc-100 mt-0.5 leading-snug whitespace-nowrap">
                Porto, Portugal
              </p>
            </div>
          </div>

          <div className="text-right shrink-0 pl-1">
            <p className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 flex items-center justify-end space-x-1 uppercase tracking-wider">
              <Clock className="w-3 h-3 mr-0.5" /> WET
            </p>
            <p className="text-xs font-mono font-semibold text-brand tracking-wider mt-0.5">
              {portoTime || "--:--:--"}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-mono text-zinc-900 dark:text-zinc-100 font-semibold flex items-center space-x-2">
          <Terminal className="w-5 h-5 text-brand" />
          <span>About Me</span>
        </h3>
        <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm md:text-base">
          I have spent the last four years building front-end applications,
          mostly dealing with the messy realities of enterprise software:{" "}
          <strong className="text-zinc-900 dark:text-white font-medium">
            data conflicts, real-time updates, and complex state management
          </strong>
          .
        </p>
        <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm md:text-base">
          I started out in the Angular ecosystem (
          <code className="text-brand text-xs font-mono bg-stone-200/60 dark:bg-zinc-800/80 px-1.5 py-0.5 rounded">
            RxJS
          </code>
          ,{" "}
          <code className="text-brand text-xs font-mono bg-stone-200/60 dark:bg-zinc-800/80 px-1.5 py-0.5 rounded">
            NgRx
          </code>
          ,{" "}
          <code className="text-brand text-xs font-mono bg-stone-200/60 dark:bg-zinc-800/80 px-1.5 py-0.5 rounded">
            Signals
          </code>
          ) building internal tools for fund managers at{" "}
          <strong className="text-zinc-900 dark:text-white font-medium">
            BTG Pactual
          </strong>{" "}
          and invoicing platforms at{" "}
          <strong className="text-zinc-900 dark:text-white font-medium">
            DACHSER
          </strong>
          . That experience taught me a lot about architectural discipline and
          testing.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl bg-stone-100/70 dark:bg-zinc-900/50 border border-stone-200/80 dark:border-zinc-800/60 text-center transition-all hover:border-brand/40 flex flex-col justify-between h-28"
          >
            <div className="flex-1 flex items-center justify-center">
              <p className="text-xl md:text-2xl font-mono font-bold text-brand leading-tight">
                {stat.value}
              </p>
            </div>
            <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 mt-auto pt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-mono text-zinc-900 dark:text-zinc-100 font-semibold flex items-center space-x-2">
          <Cpu className="w-5 h-5 text-brand" />
          <span>Tech Stack & Competencies</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {techCategories.map((cat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-stone-100 dark:bg-zinc-900/60 border border-stone-200 dark:border-zinc-800/80 space-y-3"
            >
              <h4 className="text-xs font-mono text-brand uppercase tracking-wider font-bold">
                {cat.title}
              </h4>
              <ul className="space-y-1.5">
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

      <div className="space-y-4">
        <h3 className="text-lg font-mono text-zinc-900 dark:text-zinc-100 font-semibold flex items-center space-x-2">
          <GitCommit className="w-5 h-5 text-brand" />
          <span>Experience Log</span>
        </h3>

        <div className="relative pl-6 space-y-6 border-l-2 border-stone-200 dark:border-zinc-800">
          {timeline.map((item, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-stone-300 dark:bg-zinc-700 group-hover:bg-brand transition-colors border-2 border-stone-50 dark:border-zinc-950" />

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-zinc-500">
                  <span className="text-brand font-semibold">{item.hash}</span>
                  <span>•</span>
                  <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                    {item.period}
                  </span>
                  <span>•</span>
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Briefcase className="w-4 h-4 text-brand shrink-0" />
                  <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.role}{" "}
                    <span className="text-brand">@ {item.company}</span>
                  </h4>
                </div>
                <p className="text-xs font-mono text-zinc-500">{item.type}</p>
                <ul className="space-y-1 mt-2">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-stone-100 dark:bg-zinc-900/60 border border-stone-200 dark:border-zinc-800/80 space-y-2">
          <div className="flex items-center space-x-2 text-brand font-mono text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            <span>Education</span>
          </div>
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            FIAP
          </h4>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Associate&apos;s Degree, Systems Analysis and Development
          </p>
          <p className="text-xs font-mono text-zinc-500">Feb 2021 – Feb 2025</p>
        </div>

        <div className="p-4 rounded-xl bg-stone-100 dark:bg-zinc-900/60 border border-stone-200 dark:border-zinc-800/80 space-y-2">
          <div className="flex items-center space-x-2 text-brand font-mono text-xs font-bold uppercase tracking-wider">
            <Languages className="w-4 h-4" />
            <span>Languages</span>
          </div>
          <ul className="space-y-1.5 text-xs md:text-sm text-zinc-700 dark:text-zinc-300">
            <li className="flex items-center justify-between">
              <span>Portuguese</span>
              <span className="font-mono text-xs text-zinc-500">Native</span>
            </li>
            <li className="flex items-center justify-between">
              <span>English</span>
              <span className="font-mono text-xs text-zinc-500">
                B2 Upper Intermediate
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
