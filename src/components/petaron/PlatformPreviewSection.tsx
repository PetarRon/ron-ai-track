import { PETARON_SECTION_SHELL, SectionHeading } from "./shared";
import { BoardRow, type BoardSlide } from "./BoardRow";

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

export const PlatformPreviewSection = () => (
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
          />
        ))}
      </div>
    </div>
  </section>
);
