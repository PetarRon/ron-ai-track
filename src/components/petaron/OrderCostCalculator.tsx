import { useMemo, useState } from "react";
import NumberFlow from "@number-flow/react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { TokenSlider, computeResults } from "./calculator/controls";
import { PETARON_SECTION_SHELL, SectionHeading } from "./shared";

const SliderRow = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
  ariaLabel,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  ariaLabel: string;
}) => (
  <div className="space-y-2.5">
    <div className="flex items-baseline justify-between">
      <label className="text-[11px] font-bold uppercase tracking-[0.25em] text-th-muted">
        {label}
      </label>
      <p className="text-lg font-serif font-normal tabular-nums text-th-heading">
        {format(value)}
      </p>
    </div>
    <TokenSlider
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      step={step}
      ariaLabel={ariaLabel}
    />
    <div className="flex justify-between text-[10px] uppercase tracking-widest text-th-faint">
      <span>{format(min)}</span>
      <span>{format(max)}</span>
    </div>
  </div>
);

export const OrderCostCalculator = () => {
  const [ordersPerDay, setOrdersPerDay] = useState(150);
  const [minutesPerOrder, setMinutesPerOrder] = useState(10);
  const [hourlyCost, setHourlyCost] = useState(35);

  const { annualCost, hoursPerMonth } = useMemo(
    () => computeResults({ ordersPerDay, minutesPerOrder, hourlyCost }),
    [ordersPerDay, minutesPerOrder, hourlyCost],
  );

  return (
    <section
      id="cost-calculator"
      className="relative z-10 border-y border-th-line-subtle bg-th-page py-16"
    >
      <div className={PETARON_SECTION_SHELL}>
        <SectionHeading
          title="What manual order entry costs you today"
          description="Move the inputs to match your operation. The numbers update instantly."
        />

        <div className="mx-auto max-w-5xl">
          <div className="relative rounded-2xl border-[0.75px] border-th-line p-1.5 md:p-2">
            <GlowingEffect
              spread={40}
              glow
              proximity={64}
              inactiveZone={0.01}
              borderWidth={2}
            />
            <div className="relative grid gap-10 rounded-xl border-[0.75px] border-th-line-subtle bg-th-surface p-6 md:p-10 shadow-[0_0_27px_0_rgba(45,45,45,0.15)] lg:grid-cols-[1fr,1.1fr] lg:gap-16">
              <div className="space-y-6">
                <SliderRow
                  label="Orders per day"
                  value={ordersPerDay}
                  onChange={setOrdersPerDay}
                  min={20}
                  max={500}
                  step={10}
                  format={(v) => v.toLocaleString("en-US")}
                  ariaLabel="Orders per day"
                />
                <SliderRow
                  label="Minutes per order"
                  value={minutesPerOrder}
                  onChange={setMinutesPerOrder}
                  min={2}
                  max={30}
                  step={1}
                  format={(v) => `${v} min`}
                  ariaLabel="Minutes per order"
                />
                <SliderRow
                  label="Hourly staff cost"
                  value={hourlyCost}
                  onChange={setHourlyCost}
                  min={15}
                  max={80}
                  step={5}
                  format={(v) => `€${v}`}
                  ariaLabel="Hourly staff cost"
                />
              </div>

              <div className="flex flex-col items-center justify-center text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-th-muted mb-3">
                  Manual entry costs you
                </p>
                <NumberFlow
                  value={annualCost}
                  format={{
                    style: "currency",
                    currency: "EUR",
                    maximumFractionDigits: 0,
                  }}
                  className="font-serif italic text-5xl font-normal leading-[1.05] tracking-tight text-ac-neg md:text-6xl lg:text-7xl"
                />
                <p className="mt-3 text-base text-th-body md:text-lg max-w-sm">
                  per year, plus{" "}
                  <NumberFlow
                    value={hoursPerMonth}
                    className="text-th-heading font-semibold tabular-nums"
                  />{" "}
                  <span className="text-th-heading font-semibold">hours</span>{" "}
                  of operator time every month.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
