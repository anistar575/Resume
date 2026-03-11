// ============================================================
// PORTFOLIO DATA FILE — data.js
// ============================================================
// All resume / portfolio content lives here as a single JSON-like
// object.  To update the website you only need to edit THIS file.
//
// HOW TO ADD A NEW PROJECT:
//   1. Go to the `projects` array below.
//   2. Copy an existing project object.
//   3. Change the values (title, description, tags, etc.).
//   4. Save the file — the website re-renders automatically.
//
// HOW TO EDIT EDUCATION:
//   Same idea — find the `education` array and modify entries.
//
// HOW TO UPDATE SKILLS:
//   Edit the `skills` object.  Each category is an array of
//   { name, level } objects where `level` is 0 – 100.
//
// HOW TO ADD ACHIEVEMENTS:
//   Add an object to the `achievements` array with `title`,
//   `stat`, and `description` fields.
// ============================================================

const portfolioData = {

  // ── Hero ───────────────────────────────────────────────────
  hero: {
    name: "Aniket Singh",
    title: "Computer Science Student | Software Developer",
    tagline: "Building practical user-centric tech solutions",
    typingTexts: [
      "Full-Stack Developer",
      "Problem Solver",
      "Open Source Enthusiast",
      "CS Student @ VIT-AP"
    ],

    githubLink: "https://github.com/",
    linkedinLink: "https://linkedin.com/in/aniket-singh-a04177358",
    email: "anistar575@gmail.com"
  },

  // ── About ──────────────────────────────────────────────────
  about: {
    summary: "I am a passionate Computer Science student at VIT-AP University pursuing an Integrated M.Tech degree. I love building full-stack web applications and solving challenging algorithmic problems. With a strong foundation in Java, Python, and modern web technologies, I focus on creating practical, user-centric solutions that make a real impact. I'm actively seeking software engineering internships where I can contribute to innovative teams and grow as a developer.",
    stats: [
      { label: "Projects Built", value: 5, suffix: "+" },
      { label: "LeetCode Solved", value: 100, suffix: "+" },
      { label: "CGPA", value: 8.94, suffix: "", decimals: 2 },
      { label: "Certifications", value: 4, suffix: "" }
    ]
  },

  // ── Education ──────────────────────────────────────────────
  education: [
    {
      institution: "VIT-AP University",
      degree: "Integrated M.Tech in Computer Science and Engineering",
      period: "2024 – Present",
      grade: "CGPA: 8.94",
      icon: "🎓"
    },
    {
      institution: "Aditya Birla Public School",
      degree: "Class XII — CBSE",
      period: "2022 – 2024",
      grade: "Percentage: 87.2%",
      icon: "📚"
    },
    {
      institution: "Aditya Birla Public School",
      degree: "Class X — CBSE",
      period: "2020 – 2022",
      grade: "Percentage: 86.2%",
      icon: "📖"
    }
  ],

  // ── Skills ─────────────────────────────────────────────────
  skills: {
    languages: [
      { name: "Java",    level: 85 },
      { name: "Python",  level: 80 },
      { name: "C",       level: 70 },
      { name: "SQL",     level: 75 },
      { name: "MATLAB",  level: 60 }
    ],
    tools: [
      { name: "Git",           level: 80 },
      { name: "VS Code",       level: 90 },
      { name: "IntelliJ IDEA", level: 75 }
    ],
    soft: [
      { name: "Leadership",      level: 90 },
      { name: "Problem Solving",  level: 95 },
      { name: "Communication",    level: 85 }
    ]
  },

  // ── Projects ───────────────────────────────────────────────
  projects: [
    {
      title: "Smart Parcel Tracking & Predictive Delivery",
      description: "A full-stack web application that tracks real-time parcel status and uses predictive algorithms to estimate delivery timelines with high accuracy.",
      tags: ["Full-Stack", "Predictive Analytics", "REST API"],
      icon: "📦",
      details: "Built with a modern stack, this application integrates real-time tracking APIs with machine-learning-based delivery prediction. Features include live map tracking, push notifications, and an intuitive dashboard for both senders and recipients.",
      link: "#"
    },
    {
      title: "Speaking Calculator",
      description: "A Python-based voice-feedback calculator designed to assist visually impaired users with audible computation results.",
      tags: ["Python", "Accessibility", "Text-to-Speech"],
      icon: "🔊",
      details: "Leverages pyttsx3 and speech recognition libraries to provide a fully accessible calculator. Supports basic arithmetic, history recall, and customizable speech rate and voice selection.",
      link: "#"
    },
    {
      title: "Carbon Footprint Tracker",
      description: "An interactive website that helps users monitor and reduce their carbon footprint through tracking daily activities.",
      tags: ["HTML", "CSS", "JavaScript", "SQL"],
      icon: "🌱",
      details: "Features an intuitive interface for logging transportation, energy usage, and diet choices. Generates visual reports, suggests eco-friendly alternatives, and supports goal-setting for emissions reduction.",
      link: "#"
    }
  ],

  // ── Certifications ─────────────────────────────────────────
  certifications: [
    {
      title: "Responsive Web Design",
      issuer: "freeCodeCamp",
      icon: "🌐",
      link: "#"
    },
    {
      title: "Meta Front-End Developer",
      issuer: "Coursera",
      icon: "⚛️",
      link: "#"
    },
    {
      title: "AWS Cloud Practitioner Essentials",
      issuer: "Amazon Web Services",
      icon: "☁️",
      link: "#"
    },
    {
      title: "Google Cloud Fundamentals",
      issuer: "Coursera",
      icon: "🔧",
      link: "#"
    }
  ],

  // ── Achievements ───────────────────────────────────────────
  achievements: [
    {
      title: "Google Devs-2K24",
      stat: "Rank 7",
      description: "Secured 7th rank in the prestigious Google Developers 2K24 coding competition."
    },
    {
      title: "LeetCode Warrior",
      stat: "100+",
      description: "Solved over 100 algorithmic problems on LeetCode across multiple difficulty levels."
    },
    {
      title: "FTRE Excellence",
      stat: "District Rank 4",
      description: "Achieved District Rank 4 in the FIITJEE Talent Reward Exam."
    }
  ],

  // ── Languages ──────────────────────────────────────────────
  languages: [
    { name: "Hindi",   proficiency: "Native" },
    { name: "English", proficiency: "Professional" },
    { name: "Punjabi", proficiency: "Conversational" }
  ],

  // ── Hobbies ────────────────────────────────────────────────
  hobbies: [
    { name: "Badminton",               icon: "🏸" },
    { name: "Solving LeetCode Problems", icon: "💻" },
    { name: "Chess",                   icon: "♟️" }
  ],

  // ── Social Links ──────────────────────────────────────────
  social: {
    email: "anistar575@gmail.com",
    linkedin: "https://linkedin.com/in/aniket-singh-a04177358",
    linkedinDisplay: "linkedin.com/in/aniket-singh-a04177358",
    github: "https://github.com/"
  },

  // ── Floating Tech Icons (used in background) ──────────────
  techIcons: ["⚡","🚀","💻","🔗","🧠","⚙️","📡","🔬","🛡️","🌐","☁️","📊"],

  // ── AI Terminal Commands ───────────────────────────────────
  terminal: {
    greeting: "Welcome to AS.dev Terminal v2.0",
    prompt: "aniket@portfolio:~$",
    commands: {
      help:       "Available commands: help, about, skills, projects, education, achievements, clear, whoami, neofetch, leetcode",
      about:      "CS Student @ VIT-AP University | Full-Stack Developer | Open Source Enthusiast | Building practical user-centric tech solutions.",
      whoami:     "Aniket Singh — Computer Science Student & Software Developer",
      skills:     "Languages: Java, Python, C, SQL, MATLAB\nTools: Git, VS Code, IntelliJ IDEA\nSoft: Leadership, Problem Solving, Communication",
      projects:   "1. Smart Parcel Tracking & Predictive Delivery [Full-Stack]\n2. Speaking Calculator [Python, Accessibility]\n3. Carbon Footprint Tracker [HTML/CSS/JS/SQL]",
      education:  "VIT-AP University — Integrated M.Tech CSE (CGPA: 8.94)\nAditya Birla Public School — XII (87.2%) | X (86.2%)",
      achievements: "Google Devs-2K24: Rank 7\nLeetCode: 100+ Problems Solved\nFTRE: District Rank 4",
      leetcode:   "\n  ╔══════════════════════════════╗\n  ║  LeetCode Stats             ║\n  ║  Problems Solved : 100+     ║\n  ║  Easy   : 50+ ████████░░    ║\n  ║  Medium : 35+ ██████░░░░    ║\n  ║  Hard   : 15+ ███░░░░░░░    ║\n  ╚══════════════════════════════╝",
      neofetch:   "\n        ╭──────────────────╮\n   ⚡    │  Aniket Singh     │\n  ╱╲    │  ─────────────── │\n ╱  ╲   │  OS: Portfolio v2 │\n╱────╲  │  Lang: Java/Py/C  │\n╲    ╱  │  CGPA: 8.94       │\n ╲  ╱   │  LeetCode: 100+   │\n  ╲╱    │  Theme: Cyber     │\n        ╰──────────────────╯"
    }
  },

  // ── Command Palette (Ctrl+K) ──────────────────────────────
  commandPalette: [
    { label: "Go to Home",           action: "navigate", target: "#hero" },
    { label: "Go to About",          action: "navigate", target: "#about" },
    { label: "Go to Education",      action: "navigate", target: "#education" },
    { label: "Go to Skills",         action: "navigate", target: "#skills" },
    { label: "Go to Projects",       action: "navigate", target: "#projects" },
    { label: "Go to Certifications", action: "navigate", target: "#certifications" },
    { label: "Go to Achievements",   action: "navigate", target: "#achievements" },
    { label: "Go to Terminal",       action: "navigate", target: "#ai-terminal" },
    { label: "Toggle Dark/Light Mode", action: "theme",  target: "" },
    { label: "Toggle Edit Mode",     action: "edit",     target: "" },
    { label: "Open LinkedIn",        action: "link",     target: "https://linkedin.com/in/aniket-singh-a04177358" },
    { label: "Send Email",           action: "link",     target: "mailto:anistar575@gmail.com" }
  ],



  // ── Tech Stack Orbit ──────────────────────────────────────
  techOrbit: [
    { name: "Java",       icon: "☕", orbit: 1 },
    { name: "Python",     icon: "🐍", orbit: 1 },
    { name: "JavaScript", icon: "⚡", orbit: 1 },
    { name: "HTML/CSS",   icon: "🌐", orbit: 1 },
    { name: "Git",        icon: "🔀", orbit: 2 },
    { name: "SQL",        icon: "🗄️", orbit: 2 },
    { name: "React",      icon: "⚛️", orbit: 2 },
    { name: "Node.js",    icon: "💚", orbit: 2 },
    { name: "AWS",        icon: "☁️", orbit: 3 },
    { name: "Docker",     icon: "🐳", orbit: 3 },
    { name: "Linux",      icon: "🐧", orbit: 3 },
    { name: "VS Code",    icon: "💻", orbit: 3 }
  ],

  // ── Skill Radar Chart ─────────────────────────────────────
  radarSkills: [
    { axis: "Frontend",        value: 80 },
    { axis: "Backend",         value: 70 },
    { axis: "Algorithms",      value: 85 },
    { axis: "Problem Solving", value: 95 },
    { axis: "System Design",   value: 60 },
    { axis: "DevOps",          value: 55 }
  ]
};
