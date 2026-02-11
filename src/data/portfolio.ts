import { Bot, Brain, Eye, Cpu, Search, MessageSquare, BarChart3, Shield } from "lucide-react";

export const personalInfo = {
  name: "Ron Lev Tabuchov",
  title: "Data Science & AI",
  subtitle: "BSc @ Breda University of Applied Sciences",
  tagline: "Building intelligent systems that solve real-world problems — from computer vision to AI agents.",
  email: "Ronlevtab@gmail.com",
  website: "ronlevtab.com",
  linkedin: "https://linkedin.com/in/ronlevtab",
  location: "Breda, Netherlands",
};

export const projects = [
  {
    id: "order-entry",
    title: "AI Agent Order Entry",
    org: "Move Intermodal",
    year: "2026",
    award: "1st Place: Most Innovative & Best Business Value",
    description: "Award-winning intelligent order processing system using AI Agents for automated email classification, order interpretation, validation, and business systems integration.",
    tags: ["AI Agents", "LangChain", "NLP", "Automation"],
    icon: Bot,
  },
  {
    id: "orbits",
    title: "Orbits",
    org: "Job Search Platform",
    year: "2025",
    description: "Intelligent job-resume matching platform using LLM and ML. Built NLP-based feature extraction, vectorization, similarity search, and ethics-focused matching algorithm with Django REST API.",
    tags: ["NLP", "ML", "Django", "LLM"],
    icon: Search,
  },
  {
    id: "npec",
    title: "NPEC Automation",
    org: "Plant Inoculation System",
    year: "2024",
    description: "Integrated computer vision and robotics system for automated plant inoculation. Implemented petri dish detection, segmentation, reinforcement learning, and end-to-end automation pipeline.",
    tags: ["Computer Vision", "OpenCV", "RL", "Robotics"],
    icon: Eye,
  },
  {
    id: "emotion-cv",
    title: "Emotion Detection",
    org: "Computer Vision Business App",
    year: "2024",
    award: "Top 5 Business Ideas Award",
    description: "Award-winning emotion detection solution using computer vision and machine learning. Recognized for innovative practical business applications.",
    tags: ["Computer Vision", "ML", "Business Innovation"],
    icon: Brain,
  },
];

export const experience = [
  {
    role: "DPC Member",
    org: "Breda University of Applied Sciences",
    period: "2023 – Present",
    description: "Active participation in curriculum development and NVAO accreditation. Student representation in program decisions and quality assurance.",
  },
  {
    role: "Sales Assistant",
    org: "Mango",
    period: "2023 – Present",
    description: "Delivering excellent customer service while managing multiple priorities in fast-paced retail.",
  },
  {
    role: "Head Cashier",
    org: "Zara",
    period: "2020 – 2023",
    description: "Managed financial transactions, trained team members, and ensured operational efficiency.",
  },
  {
    role: "Security Guard",
    org: "Ministry of Defence",
    period: "2019 – 2020",
    description: "Provided high-level security for government facilities. Completed advanced training at College of Counter-Terrorism.",
  },
  {
    role: "Search and Rescue Combat Officer",
    org: "Israel Defense Forces",
    period: "2014 – 2018",
    description: "Led platoons after completing Officers Course, managing complex operations under pressure.",
  },
];

export const skills = [
  { category: "Programming & Data", items: ["Python", "SQL", "PowerBI", "Data Visualization"] },
  { category: "AI & ML", items: ["AI Agents", "LangChain", "Computer Vision", "NLP", "Deep Learning", "RL", "LLM"] },
  { category: "Dev Tools", items: ["Git", "Docker", "Azure DevOps", "AzureML"] },
  { category: "Other", items: ["Agile/Scrum", "Technical Documentation", "SEO"] },
];

export const modelZooItems = [
  {
    id: "order-agent",
    title: "Order Entry Agent",
    year: "2026",
    type: "AI Agent System",
    icon: Bot,
    color: "from-primary/30 to-primary/5",
  },
  {
    id: "orbits-ml",
    title: "Orbits Matcher",
    year: "2025",
    type: "NLP / ML Pipeline",
    icon: Search,
    color: "from-primary/25 to-primary/5",
  },
  {
    id: "npec-cv",
    title: "NPEC Vision",
    year: "2024",
    type: "CV + Robotics",
    icon: Eye,
    color: "from-primary/20 to-primary/5",
  },
  {
    id: "emotion-det",
    title: "Emotion Detector",
    year: "2024",
    type: "Computer Vision",
    icon: Brain,
    color: "from-primary/25 to-primary/5",
  },
  {
    id: "chatbot-res",
    title: "Chatbot Research",
    year: "2024",
    type: "Conversational AI",
    icon: MessageSquare,
    color: "from-primary/15 to-primary/5",
  },
  {
    id: "sdg-dash",
    title: "SDG Dashboard",
    year: "2024",
    type: "Data Visualization",
    icon: BarChart3,
    color: "from-primary/20 to-primary/5",
  },
];
