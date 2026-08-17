"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CanvasParticles } from "@/components/canvas-particles"
import { RadarChart } from "@/components/radar-chart"
import { TechOrbit } from "@/components/tech-orbit"
import { Counter } from "@/components/counter"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { 
  Mail, 
  Phone, 
  ExternalLink, 
  Terminal, 
  Cpu, 
  Layers, 
  Globe, 
  BookOpen, 
  Award,
  ArrowRight,
  Code,
  CheckCircle2,
  FileText
} from "lucide-react"
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from "@/components/icons"

// Types for Projects
interface Project {
  title: string
  type: string
  description: string
  categories: string[]
  tags: string[]
  bullets: string[]
  liveLink?: string
  githubLink?: string
  codeLabel?: string
}

function getTechIcon(skill: string) {
  const s = skill.toLowerCase()
  
  if (s.includes("html5") || s === "html") {
    return (
      <svg className="w-3.5 h-3.5 mr-1.5 text-orange-500 fill-orange-500/10 flex-shrink-0" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
        <path d="M5 2l1.5 17L12 22l5.5-3L19 2z" />
        <path d="M12 6H8.5l.5 5h3m0 3H9.5l.2 2 2.3.8m0-10.8V22" />
      </svg>
    )
  }
  if (s.includes("css3") || s === "css") {
    return (
      <svg className="w-3.5 h-3.5 mr-1.5 text-blue-500 fill-blue-500/10 flex-shrink-0" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
        <path d="M5 2l1.5 17L12 22l5.5-3L19 2z" />
        <path d="M12 6H8.5l.3 3h3.2v3H9.1l.3 3.3 2.6.7m0-10V22" />
      </svg>
    )
  }
  if (s.includes("javascript") || s === "js") {
    return (
      <svg className="w-3.5 h-3.5 mr-1.5 text-yellow-500 fill-yellow-500/10 flex-shrink-0" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M15 9h-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2m-4-3v6" />
      </svg>
    )
  }
  if (s.includes("react")) {
    return (
      <svg className="w-3.5 h-3.5 mr-1.5 text-cyan-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="2" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
      </svg>
    )
  }
  if (s === "java") {
    return (
      <svg className="w-3.5 h-3.5 mr-1.5 text-orange-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
        <path d="M6 2v2M10 2v2M14 2v2" />
      </svg>
    )
  }
  if (s === "python") {
    return (
      <svg className="w-3.5 h-3.5 mr-1.5 text-blue-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm1-5v3M9 13v-3" />
      </svg>
    )
  }
  if (s.includes("node")) {
    return (
      <svg className="w-3.5 h-3.5 mr-1.5 text-green-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l9 4.5v11L12 22l-9-4.5v-11z" />
      </svg>
    )
  }
  if (s.includes("spring")) {
    return (
      <svg className="w-3.5 h-3.5 mr-1.5 text-emerald-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 22 2c-2.48 5-3 6.5-4.1 12.2A7 7 0 0 1 11 20z" />
        <path d="M9 15l3-3" />
      </svg>
    )
  }
  if (s.includes("sql") || s.includes("database") || s.includes("mysql")) {
    return (
      <svg className="w-3.5 h-3.5 mr-1.5 text-slate-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
      </svg>
    )
  }
  if (s === "git" || s === "github") {
    return (
      <svg className="w-3.5 h-3.5 mr-1.5 text-purple-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M18 15V9a4 4 0 0 0-4-4H9" />
        <path d="M6 9v6" />
      </svg>
    )
  }
  if (s.includes("postman") || s.includes("api") || s.includes("rest")) {
    return (
      <svg className="w-3.5 h-3.5 mr-1.5 text-orange-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4.5 16.5c-1.5 1.26-2 2.76-2 4.5 3.32.18 5-.82 6-2.5m11-14c1.26-1.5 2.76-2 4.5-2-1.88 3.32-2.88 5-4.5 6M9 9l7 7M19 5l-4 4M10 14L5 19M14 10l-4 4" />
      </svg>
    )
  }

  return (
    <svg className="w-3.5 h-3.5 mr-1.5 text-muted-foreground flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  )
}

export default function Home() {
  // Cursor position for spotlight effect
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 })
  const [activeFilter, setActiveFilter] = useState("all")
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formState, setFormState] = useState({ name: "", email: "", message: "" })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const skillsData = [
    {
      category: "Programming Languages",
      skills: ["Java", "Python", "JavaScript ES6+"],
    },
    {
      category: "Web Development",
      skills: ["React.js", "Node.js", "Express.js", "Spring Boot", "REST APIs", "HTML5", "CSS3"],
    },
    {
      category: "Machine Learning",
      skills: ["Machine Learning", "Deep Learning", "NLP", "Model Evaluation", "OpenAI API"],
    },
    {
      category: "Data Science",
      skills: ["MySQL", "Business Intelligence", "Social Media Analytics", "Data Consolidation"],
    },
    {
      category: "Cloud",
      skills: ["Oracle Cloud (OCI)", "IBM Cloud Basics", "Netlify", "Vercel"],
    },
    {
      category: "Tools & Agile",
      skills: ["Git", "GitHub", "Postman", "VS Code", "Agile Workflow", "MS Excel"],
    },
  ]

  const projectsData: Project[] = [
    {
      title: "AI Career Copilot",
      type: "AI Career Guidance Platform",
      description: "Analyzes resumes, scores ATS compatibility, detects skill gaps, generates roadmaps, prepares interview questions, and recommends jobs.",
      categories: ["ai", "fullstack"],
      tags: ["Node.js", "REST APIs", "JavaScript", "JSON", "ATS Engine"],
      bullets: [
        "Built role-based skill comparison and actionable feedback workflows.",
        "Designed a responsive dashboard for resume analysis and interview practice."
      ],
      liveLink: "https://sagar42swami.github.io/CareerForge-AI---Career-Build-Platform/",
      githubLink: "https://github.com/Sagar42Swami/CareerForge-AI---Career-Build-Platform",
    },
    {
      title: "Mind Metric",
      type: "Cognitive Telemetry HUD",
      description: "A real-time, interactive browser dashboard that visualizes cognitive telemetry (focus, stress, brainwave coherence) without a backend, featuring dynamic dials, streaming area charts, and neon HUD aesthetics.",
      categories: ["frontend"],
      tags: ["React.js", "Tailwind CSS", "Recharts", "Lucide React", "Telemetry"],
      bullets: [
        "Built a responsive Recharts dial gauge reading real-time cognitive state (flow, fatigue, active).",
        "Created rolling area charts with gradient fills, neon grid meshes, and a manual anomaly injector to simulate stress spikes."
      ],
      liveLink: "https://metric-mind-neon.vercel.app/",
      githubLink: "https://github.com/Sagar42Swami/metric-mind-neon",
    },
    {
      title: "AI-Based Interview Platform",
      type: "Interview Intelligence Engine",
      description: "Flask backend with OpenAI API integration for question generation, answer feedback, session tracking, and structured reporting.",
      categories: ["ai", "fullstack"],
      tags: ["Python", "Flask", "OpenAI API", "MySQL", "React.js"],
      bullets: [
        "Tested question-generation and evaluation logic across input scenarios.",
        "Protected data quality through session and response integrity checks."
      ],
      githubLink: "https://github.com/Sagar42Swami/AI-Based-Interview-Platform",
    },
    {
      title: "Cryptocurrency Price Tracker",
      type: "Market Data Analytics",
      description: "Tracks real-time price, market cap, and volume through CoinGecko APIs with search, filters, and responsive data views.",
      categories: ["frontend"],
      tags: ["React.js", "Node.js", "Express.js", "CoinGecko API", "Netlify"],
      bullets: [
        "Handled asynchronous state updates for accurate market information.",
        "Created interactive visualizations for fast market scanning."
      ],
      liveLink: "https://crypto-tracker-swami.netlify.app", // Clean fallback netlify structure
      githubLink: "https://github.com/Sagar42Swami/Cryptocurrency-Price-Tracker",
    },
    {
      title: "BrewPredict",
      type: "Tea Management & ML Prediction API",
      description: "A high-performance, fully documented FastAPI REST API for managing tea products (CRUD operations) and serving machine learning predictions using a trained Scikit-Learn model.",
      categories: ["ai", "fullstack"],
      tags: ["Python", "FastAPI", "Scikit-learn", "Pydantic", "Joblib", "Render"],
      bullets: [
        "Implemented tea product management endpoints with Pydantic validation filters.",
        "Connected an ML model loaded with Joblib to serve prediction endpoints."
      ],
      liveLink: "https://brewpredict.onrender.com/",
      githubLink: "https://github.com/Sagar42Swami/BrewPredict",
    },
    {
      title: "Film Galaxy",
      type: "Cinematic Exploration Portal",
      description: "A premium movie search and exploration portal built with React 18, TypeScript, Tailwind CSS, and Framer Motion, featuring responsive glassmorphic UI and cinematic animations.",
      categories: ["frontend"],
      tags: ["React 18", "TypeScript", "Tailwind CSS", "Framer Motion", "TMDB API"],
      bullets: [
        "Built responsive glassmorphic interfaces with smooth Framer Motion layout transitions.",
        "Integrated real-time movie search, interactive filtering, and dynamic detail exploration views."
      ],
      liveLink: "https://film-galaxy-two.vercel.app/",
      githubLink: "https://github.com/Sagar42Swami/film-galaxy",
    },
  ]

  const filteredProjects = projectsData.filter(project => 
    activeFilter === "all" || project.categories.includes(activeFilter)
  )

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Trigger native mailto action but show success state first
    const emailSubject = encodeURIComponent(`Portfolio Message from ${formState.name}`)
    const emailBody = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`)
    window.location.href = `mailto:sagarswami4530@gmail.com?subject=${emailSubject}&body=${emailBody}`
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      setFormState({ name: "", email: "", message: "" })
    }, 5000)
  }

  return (
    <div className="relative min-h-screen flex flex-col selection:bg-brand-cyan/20 selection:text-brand-cyan">
      {/* Background Interactive Elements */}
      <CanvasParticles />

      {/* Dynamic Cursor Spotlight Overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden lg:block"
        style={{
          background: `radial-gradient(450px at ${mousePos.x}px ${mousePos.y}px, rgba(34, 211, 238, 0.04), transparent 80%)`,
        }}
      />

      <Header />

      <main id="main" className="flex-grow pt-24">
        {/* HERO SECTION */}
        <section id="home" className="max-w-6xl mx-auto px-6 py-12 md:py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan px-3 py-1.5 rounded-full text-xs font-semibold w-fit tracking-wide"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
              <span>Available for Software, React, Java, and ML roles</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05]"
            >
              Software Engineer building <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-cyan to-brand-purple">fast web apps</span> and practical <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-blue">AI systems</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-muted-foreground max-w-xl font-light leading-relaxed"
            >
              I am Sagar Swami, a Computer Engineering graduate from AISSMS College of Engineering, Pune, with hands-on work across React.js, Java, Spring Boot, Python, machine learning, data workflows, and cloud foundations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <a
                href="/Sagar_Swami_resume.pdf"
                download="Sagar_Swami_resume.pdf"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-brand-cyan to-brand-purple text-white font-medium text-sm hover:brightness-110 shadow-lg shadow-brand-cyan/10 active:scale-95 transition-all cursor-pointer"
              >
                Download Resume
                <FileText className="ml-2 h-4 w-4" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-border text-foreground font-medium text-sm hover:bg-muted active:scale-95 transition-all cursor-pointer"
              >
                View Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center space-x-6 pt-4"
            >
              <a
                href="https://github.com/Sagar42Swami"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-5.5 h-5.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/sagar-swami95/"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-5.5 h-5.5" />
              </a>
              <a
                href="https://leetcode.com/u/Sagar67Swamii/"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110"
                aria-label="LeetCode Profile"
              >
                <LeetcodeIcon className="w-5.5 h-5.5" />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Visual stage containing orbit + floating dashboard cards */}
            <div className="relative w-full aspect-square max-w-[420px] flex items-center justify-center">
              <div className="absolute inset-0 scale-90 opacity-80 pointer-events-none">
                <TechOrbit />
              </div>

              {/* Floating Code Console inside Orbit */}
              <div className="absolute z-10 glass rounded-2xl border border-border/50 shadow-2xl p-4 w-72 backdrop-blur-xl hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center space-x-1.5 border-b border-border/50 pb-2 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="text-[10px] text-muted-foreground pl-2 font-mono font-bold">sagar.dev</span>
                </div>
                <pre className="text-[11px] font-mono text-muted-foreground leading-relaxed">
                  <code>
                    <span className="text-brand-purple">const</span> engineer = &#123;{"\n"}
                    {"  "}stack: [<span className="text-brand-cyan">&quot;React&quot;</span>, <span className="text-brand-cyan">&quot;Java&quot;</span>, <span className="text-brand-cyan">&quot;Python&quot;</span>, <span className="text-brand-cyan">&quot;ML&quot;</span>],{"\n"}
                    {"  "}focus: <span className="text-amber-500">&quot;products + useful AI&quot;</span>,{"\n"}
                    {"  "}status: <span className="text-emerald-500">&quot;open to build&quot;</span>{"\n"}
                    &#125;;
                  </code>
                </pre>
              </div>

              {/* Status Pill Mini Card */}
              <div className="absolute bottom-4 left-4 z-15 glass rounded-xl border border-border/50 shadow-lg py-2 px-3 flex items-center space-x-2 backdrop-blur-lg hover:scale-105 transition-transform duration-200">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-semibold text-muted-foreground">Ready for opportunities</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* STATS BAND */}
        <section className="border-y border-border/30 bg-muted/10 py-10 w-full mb-16">
          <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-8">
            <div className="text-center flex flex-col justify-center space-y-1">
              <Counter target={12} suffix="+" />
              <p className="text-xs md:text-sm text-muted-foreground uppercase font-semibold tracking-wider">Core Technologies</p>
            </div>
            <div className="text-center flex flex-col justify-center space-y-1">
              <Counter target={4} suffix="+" />
              <p className="text-xs md:text-sm text-muted-foreground uppercase font-semibold tracking-wider">Highlighted Projects</p>
            </div>
            <div className="text-center flex flex-col justify-center space-y-1">
              <Counter target={4} suffix="" />
              <p className="text-xs md:text-sm text-muted-foreground uppercase font-semibold tracking-wider">Certifications</p>
            </div>
          </div>
        </section>

        {/* SKILLS MAP SECTION */}
        <section id="skills" className="max-w-6xl mx-auto px-6 py-12 scroll-mt-20">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-cyan">Capability Map</p>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl">Skills</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillsData.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="glass-card hover:-translate-y-1 group"
              >
                <h3 className="font-heading font-bold text-base mb-4 text-foreground/90 group-hover:text-brand-cyan transition-colors">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 text-xs rounded-lg bg-secondary text-secondary-foreground font-medium border border-border/20 hover:border-brand-cyan/30 transition-all cursor-default flex items-center"
                    >
                      {getTechIcon(skill)}
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PROJECTS GRID SECTION */}
        <section id="projects" className="max-w-6xl mx-auto px-6 py-16 md:py-24 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-purple">Project Proof</p>
              <h2 className="font-heading font-extrabold text-3xl md:text-4xl">Full-stack, AI, and analytics.</h2>
            </div>
            
            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 bg-muted/40 p-1 rounded-xl border border-border/50 w-fit">
              {["all", "fullstack", "ai", "frontend"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                    activeFilter === filter
                      ? "bg-gradient-to-r from-brand-cyan to-brand-purple text-white shadow"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {filter === "fullstack" ? "Full Stack" : filter === "ai" ? "AI / ML" : filter}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid with layout animated transitions */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.article
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  key={project.title}
                  className="glass-card flex flex-col justify-between h-full group border-border/60 overflow-hidden relative"
                >
                  {/* Subtle hover visual glow inside card */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan/5 to-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="space-y-4 relative z-10">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-brand-cyan">
                          {project.type}
                        </span>
                        <h3 className="font-heading font-extrabold text-xl mt-1 text-foreground/90 group-hover:text-brand-cyan transition-colors">
                          {project.title}
                        </h3>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg border border-border bg-background/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                            aria-label={`${project.title} GitHub repository`}
                          >
                            <GithubIcon className="w-4 h-4" />
                          </a>
                        )}
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg border border-border bg-background/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                            aria-label={`${project.title} live demo`}
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="text-muted-foreground font-light text-sm leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-cyan/5 text-brand-cyan border border-brand-cyan/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Preserving actual bullets from legacy portfolio */}
                    <ul className="text-xs space-y-1.5 text-muted-foreground/90 border-t border-border/30 pt-3">
                      {project.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle2 size={12} className="text-brand-purple mr-2 mt-0.5 flex-shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>



        {/* TIMELINE EXPERIENCE SECTION */}
        <section id="experience" className="max-w-4xl mx-auto px-6 py-16 scroll-mt-20">
          <div className="text-center mb-12 space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-purple">Career Timeline</p>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl">Practical Engineering Work</h2>
          </div>

          {/* Interactive vertical timeline */}
          <div className="relative border-l-2 border-border/60 ml-4 md:ml-32 space-y-12">
            {[
              {
                period: "Dec 2024 - Jan 2025",
                role: "Web Development Intern",
                company: "Unified Mentor",
                desc: "Developed and deployed responsive web applications using React.js, JavaScript, HTML5, CSS3, and modern frontend practices. Tested flows across desktop and mobile to improve usability."
              },
              {
                period: "Jun 2022 - Aug 2022",
                role: "Web Development Trainee",
                company: "Operand Technologies & IT Solutions",
                desc: "Built and optimized React.js applications, improved page load performance by 25%, coordinated with teams, prepared reports, and supported clean delivery workflows."
              }
            ].map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-6 md:pl-8 group"
              >
                {/* Timeline connector node */}
                <span className="absolute -left-[9px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-background border-2 border-brand-cyan group-hover:scale-125 group-hover:bg-brand-cyan transition-all duration-300" />
                
                {/* Side floating year labels for medium/large displays */}
                <span className="hidden md:block absolute -left-36 top-1 text-xs font-bold text-muted-foreground text-right w-24">
                  {exp.period}
                </span>

                <div className="glass-card hover:-translate-y-0.5 border-border/50">
                  <span className="block md:hidden text-xs font-bold text-brand-cyan mb-1">
                    {exp.period}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-foreground/95">
                    {exp.role}
                  </h3>
                  <p className="text-xs font-semibold text-brand-purple mt-0.5">
                    {exp.company}
                  </p>
                  <p className="text-muted-foreground font-light text-sm mt-3 leading-relaxed">
                    {exp.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* EDUCATION & CERTIFICATIONS */}
        <section id="education" className="max-w-6xl mx-auto px-6 py-16 scroll-mt-20">
          <div className="text-center mb-12 space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-cyan">Education & Credentials</p>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl">Academic & Cloud Foundations</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Education cards */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card flex items-start space-x-4 border-border/50 hover:-translate-y-0.5"
              >
                <div className="p-3 bg-brand-cyan/10 rounded-xl text-brand-cyan">
                  <BookOpen size={22} />
                </div>
                <div>
                  <span className="text-xs font-bold text-brand-cyan">2023 - 2026</span>
                  <h3 className="font-heading font-extrabold text-lg text-foreground mt-1">B.E. Computer Engineering</h3>
                  <p className="text-sm text-muted-foreground font-medium mt-0.5">AISSMS College of Engineering, Pune</p>
                  <p className="text-xs font-bold text-brand-purple mt-2">CGPA 8.55 / 10 &bull; First Class with Distinction</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card flex items-start space-x-4 border-border/50 hover:-translate-y-0.5"
              >
                <div className="p-3 bg-brand-cyan/10 rounded-xl text-brand-cyan">
                  <BookOpen size={22} />
                </div>
                <div>
                  <span className="text-xs font-bold text-brand-cyan">2020 - 2023</span>
                  <h3 className="font-heading font-extrabold text-lg text-foreground mt-1">Diploma in Information Technology</h3>
                  <p className="text-sm text-muted-foreground font-medium mt-0.5">Puranmal Lahoti Government Polytechnic, Latur</p>
                  <p className="text-xs font-bold text-brand-purple mt-2">Aggregate Percentage: 89.38%</p>
                </div>
              </motion.div>
            </div>

            {/* Certifications Row */}
            <div className="lg:col-span-5 glass-card border-border/50 h-full flex flex-col justify-between">
              <div>
                <h3 className="font-heading font-bold text-lg mb-6 flex items-center">
                  <Award className="text-brand-purple mr-2" size={20} />
                  Professional Certifications
                </h3>
                <div className="flex flex-col space-y-3.5">
                  {[
                    "Oracle Cloud Infrastructure Foundations Associate",
                    "Data Science Course By CISCO",
                    "CISCO Python Essentials 1 & 2",
                    "IBM Storage and Cloud"
                  ].map((cert, idx) => (
                    <div key={idx} className="flex items-center space-x-3 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-purple" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="max-w-6xl mx-auto px-6 py-16 md:py-24 scroll-mt-20">
          <div className="glass rounded-3xl border border-border/60 p-8 lg:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan/5 to-brand-purple/5 opacity-50 pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
              
              <div className="lg:col-span-5 flex flex-col justify-between gap-8">
                <div className="space-y-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-cyan">Contact</p>
                  <h2 className="font-heading font-extrabold text-3xl md:text-4xl">Let’s build something useful.</h2>
                  <p className="text-muted-foreground font-light text-sm leading-relaxed">
                    Have a full-stack role, an internship opening, or a system deployment challenge? Let's connect. I'm always open to new software engineering and AI projects.
                  </p>
                </div>

                <div className="space-y-4 text-sm">
                  <a href="mailto:sagarswami4530@gmail.com" className="flex items-center space-x-3 text-muted-foreground hover:text-brand-cyan transition-colors">
                    <Mail size={18} className="text-brand-cyan" />
                    <span>sagarswami4530@gmail.com</span>
                  </a>
                  <a href="tel:+919860541959" className="flex items-center space-x-3 text-muted-foreground hover:text-brand-cyan transition-colors">
                    <Phone size={18} className="text-brand-cyan" />
                    <span>+91 98605 41959</span>
                  </a>
                </div>

                <div className="glass rounded-2xl border border-border/40 p-4 text-xs font-medium text-muted-foreground bg-background/30 max-w-sm flex items-center space-x-3">
                  <span className="flex h-2.5 w-2.5 relative flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span>Currently available for entry-level Software, React, Java &amp; ML roles.</span>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-7">
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="form-name" className="text-xs font-bold text-muted-foreground">Name</label>
                      <input
                        id="form-name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm outline-none focus:border-brand-cyan transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="form-email" className="text-xs font-bold text-muted-foreground">Email</label>
                      <input
                        id="form-email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm outline-none focus:border-brand-cyan transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="form-message" className="text-xs font-bold text-muted-foreground">Message</label>
                    <textarea
                      id="form-message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="rounded-xl border border-border bg-background/50 px-4 py-2.5 text-sm outline-none focus:border-brand-cyan transition-colors resize-none"
                      placeholder="Hi Sagar, let's collaborate on..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full md:w-auto self-end rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple text-white hover:brightness-110 shadow-lg py-2.5 px-6"
                  >
                    Send Message
                    <Mail className="ml-2 h-4 w-4" />
                  </Button>

                  <AnimatePresence>
                    {formSubmitted && (
                      <motion.p
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="text-xs text-emerald-500 font-semibold text-right"
                      >
                        ✓ Ready. Opening your email client to complete sending the message.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </form>
              </div>

            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
