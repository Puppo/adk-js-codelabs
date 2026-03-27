export interface Session {
  title: string;
  speaker: string;
  time: string;
  room: string;
  track: string;
  difficulty: string;
  description: string;
}

export interface Speaker {
  name: string;
  company: string;
  role: string;
  bio: string;
}

export const tracks = ["AI/ML", "Web", "Cloud", "Mobile", "DevOps"] as const;

export const difficulties = ["Beginner", "Intermediate", "Advanced"] as const;

export const sessions: Session[] = [
  {
    title: "The Future of AI Agents",
    speaker: "Dr. Elena Rossi",
    time: "9:00-10:00",
    room: "Main Hall",
    track: "AI/ML",
    difficulty: "Beginner",
    description:
      "Keynote — Explore how AI agents are reshaping software development and what the future holds.",
  },
  {
    title: "Building with Gemini API",
    speaker: "Marco Bianchi",
    time: "10:30-11:30",
    room: "Room A",
    track: "AI/ML",
    difficulty: "Beginner",
    description:
      "Hands-on introduction to building applications with the Gemini API.",
  },
  {
    title: "Advanced RAG Patterns",
    speaker: "Sofia Conti",
    time: "10:30-11:30",
    room: "Room B",
    track: "AI/ML",
    difficulty: "Advanced",
    description:
      "Deep dive into retrieval-augmented generation patterns for production systems.",
  },
  {
    title: "Angular Signals Deep Dive",
    speaker: "Luca Ferrari",
    time: "10:30-11:30",
    room: "Room C",
    track: "Web",
    difficulty: "Intermediate",
    description:
      "Master Angular's reactivity model with signals, computed values, and effects.",
  },
  {
    title: "Cloud Run Best Practices",
    speaker: "Anna Verdi",
    time: "11:45-12:45",
    room: "Room A",
    track: "Cloud",
    difficulty: "Intermediate",
    description:
      "Production-ready patterns for deploying and scaling services on Cloud Run.",
  },
  {
    title: "Flutter for Web",
    speaker: "Giuseppe Marino",
    time: "11:45-12:45",
    room: "Room C",
    track: "Mobile",
    difficulty: "Beginner",
    description:
      "Build beautiful cross-platform web apps using Flutter's web support.",
  },
  {
    title: "Kubernetes Operators from Scratch",
    speaker: "Paolo Russo",
    time: "11:45-12:45",
    room: "Room B",
    track: "DevOps",
    difficulty: "Advanced",
    description:
      "Learn to build custom Kubernetes operators to automate complex deployments.",
  },
  {
    title: "LLM Fine-Tuning Workshop",
    speaker: "Dr. Elena Rossi",
    time: "14:00-15:30",
    room: "Room A",
    track: "AI/ML",
    difficulty: "Advanced",
    description:
      "Hands-on workshop on fine-tuning large language models for domain-specific tasks.",
  },
  {
    title: "Building PWAs in 2026",
    speaker: "Luca Ferrari",
    time: "14:00-15:00",
    room: "Room C",
    track: "Web",
    difficulty: "Intermediate",
    description:
      "Modern progressive web app techniques including offline-first and push notifications.",
  },
  {
    title: "Terraform on GCP",
    speaker: "Anna Verdi",
    time: "14:00-15:00",
    room: "Room B",
    track: "Cloud",
    difficulty: "Intermediate",
    description:
      "Infrastructure as code on Google Cloud Platform using Terraform modules and best practices.",
  },
  {
    title: "Agent Development Kit Workshop",
    speaker: "Marco Bianchi",
    time: "15:30-16:30",
    room: "Room A",
    track: "AI/ML",
    difficulty: "Beginner",
    description:
      "Build your first AI agent using Google's Agent Development Kit (ADK).",
  },
  {
    title: "Monitoring with OpenTelemetry",
    speaker: "Paolo Russo",
    time: "15:15-16:15",
    room: "Room B",
    track: "DevOps",
    difficulty: "Intermediate",
    description:
      "Implement distributed tracing and metrics collection with OpenTelemetry.",
  },
  {
    title: "Jetpack Compose Masterclass",
    speaker: "Giuseppe Marino",
    time: "15:15-16:15",
    room: "Room C",
    track: "Mobile",
    difficulty: "Intermediate",
    description:
      "Advanced UI patterns and animations with Jetpack Compose for Android.",
  },
  {
    title: "Lightning Talks & Community Showcase",
    speaker: "Various",
    time: "16:30-17:30",
    room: "Main Hall",
    track: "AI/ML",
    difficulty: "Beginner",
    description:
      "Closing — Short talks from community members and a showcase of projects built during the conference.",
  },
];

export const speakers: Speaker[] = [
  {
    name: "Dr. Elena Rossi",
    company: "Google",
    role: "AI Research Lead",
    bio: "Specializing in LLMs and AI agents, Dr. Rossi leads research on next-generation AI systems at Google.",
  },
  {
    name: "Marco Bianchi",
    company: "Google",
    role: "Developer Advocate",
    bio: "Expert in Gemini and ADK, Marco helps developers build AI-powered applications.",
  },
  {
    name: "Sofia Conti",
    company: "Elastic",
    role: "Senior Engineer",
    bio: "Focused on search and RAG, Sofia builds production-grade retrieval systems at Elastic.",
  },
  {
    name: "Luca Ferrari",
    company: "Freelance",
    role: "Web Developer & Angular GDE",
    bio: "Angular Google Developer Expert and freelance consultant specializing in modern web frameworks.",
  },
  {
    name: "Anna Verdi",
    company: "Google Cloud",
    role: "Cloud Architect",
    bio: "GCP specialist helping organizations design and implement cloud-native architectures.",
  },
  {
    name: "Giuseppe Marino",
    company: "Very Good Ventures",
    role: "Mobile Lead & Flutter GDE",
    bio: "Flutter Google Developer Expert leading mobile development at Very Good Ventures.",
  },
  {
    name: "Paolo Russo",
    company: "Red Hat",
    role: "Platform Engineer",
    bio: "Kubernetes expert building platform engineering tools and operator frameworks at Red Hat.",
  },
];
