import React from 'react';
import { ExternalLink } from 'lucide-react';

export const Projects = () => {

  const projectsData = [
    {
      id: 1,
      title: "Library Management System",
      tech: ["Python", "MySQL", "Tkinter"],
      desc: "Custom desktop application with complete book records, student ledger tracking, and automated fine calculation.",
      accent: "#3b82f6",
      tag: "Desktop App",
      link: "#"
    },
    {
      id: 2,
      title: "Student Parking System",
      tech: ["React", "Express", "MySQL"],
      desc: "Web-based portal that automates slot allotment, QR entry codes, and vehicle logging for campus administration.",
      accent: "#f43f5e",
      tag: "Web App",
      link: "#"
    },
    {
      id: 3,
      title: "Architecture Website",
      tech: ["Vite", "TailwindCSS", "GSAP"],
      desc: "High-end design showcase featuring minimalist layouts, responsive structural grids, and elegant animation reveals.",
      accent: "#facc15",
      tag: "Frontend",
      link: "#"
    },
    {
      id: 4,
      title: "Personal Portfolio Website",
      tech: ["React", "GSAP", "Lenis"],
      desc: "Award-winning portfolio featuring 3D curved carousels, archive explosion folders, and custom mouse mask reveal scanners.",
      accent: "#22c55e",
      tag: "Portfolio",
      link: "https://parshfolio.onrender.com"
    },
    {
      id: 5,
      title: "AIML Academic Projects",
      tech: ["Python", "PyTorch", "NumPy"],
      desc: "A collection of predictive ML models including regression classifiers, object trackers, and text sentiment evaluators.",
      accent: "#a855f7",
      tag: "Machine Learning",
      link: "#"
    },
    {
      id: 6,
      title: "CropGuard Diagnostic AI",
      tech: ["React", "TailwindCSS", "AI"],
      desc: "Instant leaf disease classifier equipped with real-time camera scanning simulation and treatment recipes.",
      accent: "#f97316",
      tag: "AI / Healthcare",
      link: "#"
    }
  ];

  return (
    <section
      id="portfolio-showcase"
      className="relative w-full bg-[#0d0d0d] text-white overflow-hidden py-24 md:py-32"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-yellow/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Background Watermark Text */}
      <h2 className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading font-black text-[18vw] leading-none tracking-tighter uppercase select-none pointer-events-none text-white/[0.025] whitespace-nowrap">
        MY WORK
      </h2>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-brand-yellow font-sans font-bold text-xs uppercase tracking-[0.3em] mb-3 block">
            // SELECTED WORK
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl md:text-6xl font-heading font-black uppercase text-white tracking-tight leading-none">
              My Projects
            </h2>
            <p className="text-white/40 text-sm font-sans max-w-xs md:text-right leading-relaxed">
              A curated selection of projects built across web development, Python, and machine learning.
            </p>
          </div>
          {/* Divider */}
          <div className="mt-8 h-px bg-white/5 w-full" />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              className="group relative flex flex-col bg-zinc-900/60 border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
              style={{
                '--accent': project.accent,
                boxShadow: '0 0 0 0 transparent',
              }}
            >
              {/* Card Top Color Bar */}
              <div
                className="w-full h-1 rounded-t-3xl transition-all duration-500 group-hover:h-1.5"
                style={{ backgroundColor: project.accent }}
              />

              {/* Card Ambient Glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl pointer-events-none"
                style={{ backgroundColor: project.accent }}
              />

              <div className="flex flex-col flex-1 p-5 sm:p-7 gap-5">
                {/* Top Row: Tag + Link */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border"
                    style={{
                      color: project.accent,
                      borderColor: `${project.accent}30`,
                      backgroundColor: `${project.accent}10`,
                    }}
                  >
                    {project.tag}
                  </span>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-300"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>

                {/* Project Index + Title */}
                <div>
                  <span className="text-white/15 font-mono text-xs mb-1 block">
                    {String(index + 1).padStart(2, '0')} /
                  </span>
                  <h3 className="text-xl font-bold font-heading text-white leading-snug group-hover:text-brand-yellow transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-white/55 text-sm font-sans font-light leading-relaxed flex-1">
                  {project.desc}
                </p>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono text-white/40 px-2.5 py-1 bg-white/4 border border-white/5 rounded-lg"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 flex justify-center">
          <a
            href="https://parshfolio.onrender.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 border border-white/10 hover:border-brand-yellow px-8 py-4 rounded-full text-white text-sm font-bold uppercase tracking-widest hover:text-brand-yellow hover:bg-brand-yellow/5 transition-all duration-300"
          >
            View Live Portfolio
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
