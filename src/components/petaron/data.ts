import { BrainCircuit, CheckCircle2, FileJson, Link, Mail, ScanText, type LucideIcon } from "lucide-react";

export const integrations = [
  { name: "CargoWise", domain: "cargowise.com" },
  { name: "SAP", domain: "sap.com" },
  { name: "Descartes", domain: "descartes.com" },
  { name: "Scope", domain: "riege.com" },
  { name: "Modality", domain: "modality.com" },
  { name: "Gmail", domain: "gmail.com" },
  { name: "Microsoft", domain: "microsoft.com" },
  { name: "OpenAI", domain: "openai.com" },
  { name: "Anthropic", domain: "anthropic.com" },
];

export type ProcessStage = {
  title: string;
  description: string;
  detail: string;
  Icon: LucideIcon;
  accent: string;
  iconClass: string;
  offset: string;
  chips: string[];
  glowColors: string[];
};

export const processStages: ProcessStage[] = [
  {
    title: "Agentic Capture",
    description: "Reads incoming documents and messages, then prepares a clean intake package for processing.",
    detail: "One stream across channels",
    Icon: ScanText,
    accent: "from-ac-1/25 via-ac-1/10 to-transparent",
    iconClass: "border-ac-1/30 bg-ac-1/10 text-ac-1",
    offset: "",
    chips: ["Inbox", "Attachments", "Threads"],
    glowColors: ["rgb(var(--ac-1))", "rgb(var(--ac-1))", "rgb(var(--ac-3))"],
  },
  {
    title: "Process & Validate",
    description: "Builds a structured order draft and checks critical fields before review.",
    detail: "Structured fields with checks",
    Icon: BrainCircuit,
    accent: "from-ac-2/25 via-ac-2/10 to-transparent",
    iconClass: "border-ac-2/30 bg-ac-2/10 text-ac-2",
    offset: "lg:ml-12",
    chips: ["Field mapping", "Validation", "Confidence"],
    glowColors: ["rgb(var(--ac-3))", "rgb(var(--ac-2))", "rgb(var(--ac-neg))"],
  },
  {
    title: "Review & Confirm",
    description: "Shows operators exactly what matters, so approval is fast and controlled.",
    detail: "Human approval before push",
    Icon: CheckCircle2,
    accent: "from-ac-pos/25 via-ac-pos/10 to-transparent",
    iconClass: "border-ac-pos/30 bg-ac-pos/10 text-ac-pos",
    offset: "lg:ml-24",
    chips: ["Exceptions", "Approval", "TMS ready"],
    glowColors: ["rgb(var(--ac-pos))", "rgb(var(--ac-1))", "rgb(var(--ac-3))"],
  },
];

export const processIntakeHighlights = [
  { label: "Channels", value: "Inbox + Portal", icon: Link },
  { label: "Formats", value: "Email, PDF, XLS", icon: FileJson },
];

export const processIntakeTags = ["PDF attached", "24 pallets", "Carrier rules"];

export type FeatureCard = {
  title: string;
  description: string;
  Icon: LucideIcon;
  tone: string;
  accent: string;
  text: string;
  eyebrow: string;
};

export const featureCards: FeatureCard[] = [
  {
    title: "Connect in Minutes",
    description: "Launch quickly with current channels and systems, without heavy change management.",
    Icon: Link,
    tone: "from-ac-2/12 to-transparent",
    accent: "bg-ac-2",
    text: "text-ac-2",
    eyebrow: "Fast onboarding",
  },
  {
    title: "Agentic Capture",
    description: "Handle real-world order formats and unstructured inputs without rigid templates.",
    Icon: ScanText,
    tone: "from-ac-1/12 to-transparent",
    accent: "bg-ac-1",
    text: "text-ac-1",
    eyebrow: "Flexible intake",
  },
  {
    title: "Review & Confirm",
    description: "Keep approval exactly where it matters, with faster review and cleaner output.",
    Icon: CheckCircle2,
    tone: "from-ac-pos/12 to-transparent",
    accent: "bg-ac-pos",
    text: "text-ac-pos",
    eyebrow: "Human control",
  },
  {
    title: "Executive Visibility",
    description: "Give leadership a cleaner view of throughput, exceptions, and approval flow.",
    Icon: Mail,
    tone: "from-ac-3/12 to-transparent",
    accent: "bg-ac-3",
    text: "text-ac-3",
    eyebrow: "Clear oversight",
  },
];
