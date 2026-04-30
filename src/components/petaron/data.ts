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

export type FaqItem = {
  question: string;
  answer: string;
  meta: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "Does it work with our existing TMS?",
    answer: "Yes. PetaRon.ai connects to the TMS you already use. No ripping and replacing, your setup stays the same, the manual work disappears.",
    meta: "Integration",
  },
  {
    question: "How long does it take to get started?",
    answer: "Days, not months. We connect to your email flow, configure your fields, and you are processing orders within a week.",
    meta: "Onboarding",
  },
  {
    question: "Does our team lose control over orders?",
    answer: "Never. AI handles the intake, your team makes every decision. Nothing moves to your TMS without human approval.",
    meta: "Control",
  },
  {
    question: "Is this built specifically for logistics?",
    answer: "From the ground up. PetaRon.ai was designed around the daily reality of freight operations, multi-format orders, tight deadlines, and zero tolerance for errors.",
    meta: "Industry",
  },
  {
    question: "What happens when the AI encounters an edge case?",
    answer: "It flags it. Anything the AI is not fully confident about gets routed to your team for review. Nothing slips through unchecked.",
    meta: "Reliability",
  },
  {
    question: "How fast is the ROI?",
    answer: "Most teams see the impact in the first week. Less time on data entry means more time with customers, that is value from day one.",
    meta: "Value",
  },
  {
    question: "Is there a free trial or pilot?",
    answer: "We offer a free 14-day pilot with your actual data. You will see exactly how it performs before making any commitment.",
    meta: "Pilot",
  },
  {
    question: "What data do you need from us to get started?",
    answer: "Access to your order inbox, basic TMS credentials, and a short walkthrough of your field mapping. That is it, we handle the rest.",
    meta: "Setup",
  },
];

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
