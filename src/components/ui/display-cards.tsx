"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface DisplayCardProps {
  className?: string;
  icon?: ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
}

const DisplayCard = ({
  className = "",
  icon,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  titleClassName = "text-blue-500",
}: DisplayCardProps) => (
  <div
    className={`relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 border-white/10 bg-[#0c1320]/70 backdrop-blur-sm px-4 py-3 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-[#06070c] after:to-transparent after:content-[''] hover:border-white/20 hover:bg-[#0c1320] [&>*]:flex [&>*]:items-center [&>*]:gap-2 ${className}`}
  >
    <div>
      <span className="relative inline-block rounded-full bg-cyan-800/60 p-1">{icon}</span>
      <p className={`text-lg font-medium ${titleClassName}`}>{title}</p>
    </div>
    <p className="whitespace-nowrap text-lg text-white/90">{description}</p>
    <p className="text-white/40">{date}</p>
  </div>
);

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards: DisplayCardProps[] = [
    {
      className:
        "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-full before:outline-1 before:rounded-xl before:outline-white/10 before:h-full before:content-[''] before:bg-blend-overlay before:bg-[#06070c]/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className:
        "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-full before:outline-1 before:rounded-xl before:outline-white/10 before:h-full before:content-[''] before:bg-blend-overlay before:bg-[#06070c]/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <motion.div
      className="grid [grid-template-areas:'stack'] place-items-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.2 }}
    >
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </motion.div>
  );
}
