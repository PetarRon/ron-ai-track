import { InteractiveHoverButton } from "./shared";

export const CTAButtons = ({ onContact }: { onContact: () => void }) => (
  <div className="flex flex-wrap items-center justify-center gap-3">
    <InteractiveHoverButton
      data-cal-namespace="30min"
      data-cal-link="ron-lev-tabuchov-tgk0nx/30min"
      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"dark"}'
    >
      Book a Demo for Free
    </InteractiveHoverButton>
    <button
      onClick={onContact}
      className="flex items-center justify-center rounded-full border border-th-line bg-th-surface-alt/50 px-7 py-3.5 text-[13px] font-semibold text-th-heading transition hover:bg-th-line/50"
    >
      Get in Touch
    </button>
  </div>
);
