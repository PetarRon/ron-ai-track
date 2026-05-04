import { useMemo, useState } from "react";
import { PETARON_SECTION_SHELL, SectionHeading } from "./shared";
import { BoardRow, type BoardSlide } from "./BoardRow";
import { PlatformPreviewLightbox } from "./PlatformPreviewLightbox";

const boardSlides: BoardSlide[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    title: "Operations dashboard",
    caption: "Pipeline health, review load, and throughput in one view.",
    src: "/petaron-dashboard.png",
  },
  {
    id: "orders",
    label: "Orders",
    title: "Orders inbox",
    caption: "Every incoming order classified, scored, and routed.",
    src: "/petaron-orders.png",
  },
  {
    id: "review",
    label: "Review",
    title: "Flag order review",
    caption: "AI reads the PDF, flags only what needs your eyes.",
    src: "/petaron-review.png",
  },
];

export const PlatformPreviewSection = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const expandedSlide = useMemo(
    () => boardSlides.find((s) => s.id === expandedId) ?? null,
    [expandedId],
  );

  return (
    <section id="platform" className="relative z-10 py-16">
      <div className={PETARON_SECTION_SHELL}>
        <SectionHeading
          title="See it in action"
          description="See how the team monitors operations, triages incoming work, and validates flagged order details."
        />

        <div className="mx-auto max-w-6xl">
          {boardSlides.map((slide, i) => (
            <BoardRow
              key={slide.id}
              slide={slide}
              index={i}
              imageSide={i % 2 === 0 ? "left" : "right"}
              onExpand={setExpandedId}
            />
          ))}
        </div>
      </div>

      <PlatformPreviewLightbox
        slide={expandedSlide}
        onClose={() => setExpandedId(null)}
      />
    </section>
  );
};
