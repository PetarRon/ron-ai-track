import { useEffect, useId, useMemo, useRef, useState } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { animate, motion, useInView } from "framer-motion";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { PETARON_SECTION_SHELL, SectionHeading } from "./shared";

const WORKING_DAYS_PER_MONTH = 22;
const MINUTES_OPTIONS = [5, 10, 15, 20];
const HOURLY_OPTIONS = [25, 35, 50];

const TokenSlider = ({
  value,
  onChange,
  min,
  max,
  step,
  ariaLabel,
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  ariaLabel: string;
}) => (
  <SliderPrimitive.Root
    className="relative flex w-full touch-none select-none items-center"
    value={[value]}
    onValueChange={(v) => onChange(v[0])}
    min={min}
    max={max}
    step={step}
    aria-label={ariaLabel}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-th-line">
      <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-ac-1 via-ac-2 to-ac-3" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-ac-1 bg-th-page shadow-md transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ac-1/40 focus-visible:ring-offset-2 focus-visible:ring-offset-th-page" />
  </SliderPrimitive.Root>
);

const SegButtons = ({
  value,
  onChange,
  options,
  format,
  ariaLabel,
}: {
  value: number;
  onChange: (v: number) => void;
  options: number[];
  format: (v: number) => string;
  ariaLabel: string;
}) => (
  <div className="flex gap-2" role="radiogroup" aria-label={ariaLabel}>
    {options.map((opt) => {
      const active = value === opt;
      return (
        <button
          key={opt}
          type="button"
          role="radio"
          aria-checked={active}
          onClick={() => onChange(opt)}
          className={`flex-1 rounded-lg border px-3 py-2 text-[13px] font-semibold transition-all ${
            active
              ? "border-ac-1/40 bg-ac-1/10 text-th-heading"
              : "border-th-line bg-th-surface-alt/40 text-th-muted hover:text-th-heading hover:bg-th-surface-alt/70"
          }`}
        >
          {format(opt)}
        </button>
      );
    })}
  </div>
);

const AnimatedNumber = ({
  value,
  format,
  active,
}: {
  value: number;
  format: (v: number) => string;
  active: boolean;
}) => {
  const [display, setDisplay] = useState(value);
  const previous = useRef(value);
  const started = useRef(false);

  useEffect(() => {
    if (!active) return;
    const from = started.current ? previous.current : 0;
    started.current = true;
    const controls = animate(from, value, {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(latest),
    });
    previous.current = value;
    return () => controls.stop();
  }, [value, active]);

  return <>{format(Math.round(display))}</>;
};

const formatEuro = (n: number) => `€${n.toLocaleString("en-US")}`;
const formatHours = (n: number) => n.toLocaleString("en-US");

export const OrderCostCalculator = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const ordersId = useId();

  const [ordersPerDay, setOrdersPerDay] = useState(150);
  const [minutesPerOrder, setMinutesPerOrder] = useState(10);
  const [hourlyCost, setHourlyCost] = useState(35);

  const results = useMemo(() => {
    const hoursPerMonth = (ordersPerDay * WORKING_DAYS_PER_MONTH * minutesPerOrder) / 60;
    const monthlyCost = hoursPerMonth * hourlyCost;
    const annualCost = monthlyCost * 12;
    return {
      monthlyCost: Math.round(monthlyCost),
      annualCost: Math.round(annualCost),
      hoursPerMonth: Math.round(hoursPerMonth),
    };
  }, [ordersPerDay, minutesPerOrder, hourlyCost]);

  return (
    <section
      id="cost-calculator"
      className="relative z-10 border-y border-th-line-subtle bg-th-page py-16"
      ref={ref}
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
            <div className="relative rounded-xl border-[0.75px] border-th-line-subtle bg-th-surface p-6 md:p-10 shadow-[0px_0px_27px_0px_rgba(45,45,45,0.15)]">
              <div className="grid gap-8 md:grid-cols-3 md:gap-10">
                <div className="space-y-3">
                  <label
                    htmlFor={ordersId}
                    className="block text-[10px] font-bold uppercase tracking-[0.25em] text-th-body"
                  >
                    Orders per day
                  </label>
                  <p className="text-3xl font-serif font-normal text-th-heading md:text-4xl">
                    {ordersPerDay.toLocaleString("en-US")}
                  </p>
                  <TokenSlider
                    value={ordersPerDay}
                    onChange={setOrdersPerDay}
                    min={20}
                    max={500}
                    step={10}
                    ariaLabel="Orders per day"
                  />
                  <div className="flex justify-between text-[10px] uppercase tracking-widest text-th-faint">
                    <span>20</span>
                    <span>500</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.25em] text-th-body">
                    Minutes per order
                  </span>
                  <SegButtons
                    value={minutesPerOrder}
                    onChange={setMinutesPerOrder}
                    options={MINUTES_OPTIONS}
                    format={(v) => `${v} min`}
                    ariaLabel="Minutes per order"
                  />
                  <p className="text-[11px] text-th-muted leading-relaxed">
                    Average operator time, from email to TMS confirmation.
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.25em] text-th-body">
                    Hourly staff cost
                  </span>
                  <SegButtons
                    value={hourlyCost}
                    onChange={setHourlyCost}
                    options={HOURLY_OPTIONS}
                    format={(v) => `€${v}`}
                    ariaLabel="Hourly staff cost"
                  />
                  <p className="text-[11px] text-th-muted leading-relaxed">
                    Fully loaded cost including overhead and benefits.
                  </p>
                </div>
              </div>

              <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-th-line to-transparent md:my-10" />

              <div className="grid gap-6 sm:grid-cols-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-th-muted mb-2">
                    Spent per month
                  </p>
                  <p className="text-3xl font-serif font-normal text-ac-neg md:text-4xl">
                    <AnimatedNumber
                      value={results.monthlyCost}
                      format={formatEuro}
                      active={inView}
                    />
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-th-muted mb-2">
                    Spent per year
                  </p>
                  <p className="text-3xl font-serif font-normal text-th-heading md:text-4xl">
                    <AnimatedNumber
                      value={results.annualCost}
                      format={formatEuro}
                      active={inView}
                    />
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-th-muted mb-2">
                    Staff hours per month
                  </p>
                  <p className="text-3xl font-serif font-normal text-th-heading md:text-4xl">
                    <AnimatedNumber
                      value={results.hoursPerMonth}
                      format={formatHours}
                      active={inView}
                    />
                    <span className="text-sm text-th-muted font-normal ml-1.5">hrs</span>
                  </p>
                </div>
              </div>

              <motion.p
                className="mt-8 text-center text-[13px] text-th-muted"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Most teams cut this 80%+. Talk to us about your numbers.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
