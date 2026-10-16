import { useEffect, useMemo, useRef, useState } from "react";
import { animate, motion } from "framer-motion";
import { TokenSlider, computeResults } from "@/components/petaron/calculator/controls";
import { CalButton, Card, Em, RELAY_SHELL, settle } from "./shared";

const CountUp = ({ value, format }: { value: number; format: (v: number) => string }) => {
  const [display, setDisplay] = useState(0);
  const previous = useRef(0);
  useEffect(() => {
    const controls = animate(previous.current, value, {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    previous.current = value;
    return () => controls.stop();
  }, [value]);
  return <>{format(Math.round(display))}</>;
};

const euro = (n: number) => `€${n.toLocaleString("en-US")}`;
const num = (n: number) => n.toLocaleString("en-US");

const Row = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
}) => (
  <div>
    <div className="flex items-baseline justify-between">
      <label className="font-body text-[15px] text-th-heading">{label}</label>
      <span className="font-mono text-[13px] tabular-nums text-ac-1">{format(value)}</span>
    </div>
    <div className="mt-4">
      <TokenSlider value={value} onChange={onChange} min={min} max={max} step={step} ariaLabel={label} />
    </div>
    <div className="mt-2 flex justify-between font-mono text-[11px] text-th-faint">
      <span>{format(min)}</span>
      <span>{format(max)}</span>
    </div>
  </div>
);

export const RelayCalculator = () => {
  const [ordersPerDay, setOrdersPerDay] = useState(150);
  const [minutesPerOrder, setMinutesPerOrder] = useState(10);
  const [hourlyCost, setHourlyCost] = useState(35);
  const { annualCost, hoursPerMonth } = useMemo(
    () => computeResults({ ordersPerDay, minutesPerOrder, hourlyCost }),
    [ordersPerDay, minutesPerOrder, hourlyCost],
  );

  return (
    <section id="calculator" className={`relative scroll-mt-20 py-20 ${RELAY_SHELL}`}>
      {/* stacked and centred so the headline gets the full width and sits on one line from lg up */}
      <div className="mx-auto grid justify-items-center gap-5 text-center">
        <motion.h2
          {...settle()}
          className="font-display text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] text-th-heading sm:text-[44px] lg:whitespace-nowrap"
        >
          What manual entry <Em>costs</Em> you today.
        </motion.h2>
        <motion.p {...settle(0.1)} className="max-w-md font-body text-[15px] leading-relaxed text-th-body">
          Set your own numbers and see what the difference is worth to your team. Your estimate, not ours.
        </motion.p>
      </div>
      <motion.div {...settle(0.15)} className="mt-14">
        <Card className="grid gap-10 p-7 md:p-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div>
            <span className="font-mono text-[12px] text-th-muted">Estimate</span>
            <h3 className="mt-2 font-display text-[20px] font-medium tracking-[-0.02em] text-th-heading">
              How many orders does your team type in a day?
            </h3>
            <div className="mt-10 space-y-9">
              <Row label="Orders per day" value={ordersPerDay} onChange={setOrdersPerDay} min={20} max={500} step={10} format={num} />
              <Row
                label="Minutes per order"
                value={minutesPerOrder}
                onChange={setMinutesPerOrder}
                min={2}
                max={30}
                step={1}
                format={(v) => `${v} min`}
              />
              <Row label="Hourly staff cost" value={hourlyCost} onChange={setHourlyCost} min={15} max={80} step={5} format={(v) => `€${v}`} />
            </div>
          </div>
          <div className="relay-well flex flex-col justify-between rounded-xl border border-th-line/60 bg-th-page/50 p-6 text-center md:p-7">
            <div className="flex flex-1 flex-col justify-center">
              <span className="font-mono text-[12px] text-th-muted">Manual entry costs you</span>
              <p className="mt-3 font-body text-[44px] font-semibold leading-none tracking-[-0.03em] text-th-heading sm:text-[52px]">
                <CountUp value={annualCost} format={euro} />
                <span className="ml-2 inline-block whitespace-nowrap font-mono text-[13px] font-normal tracking-normal text-th-muted">a year</span>
              </p>
              <div className="my-6 h-px bg-th-line/60" />
              <span className="font-mono text-[12px] text-th-muted">Hours back on your desk</span>
              <p className="mt-2 font-body text-[28px] font-semibold tracking-[-0.02em] text-ac-1">
                <CountUp value={hoursPerMonth} format={num} />
                <span className="ml-2 inline-block whitespace-nowrap font-mono text-[13px] font-normal tracking-normal text-th-muted">every month</span>
              </p>
            </div>
            <div className="mt-8">
              <CalButton className="w-full">Book a Demo for Free</CalButton>
              <p className="mt-3 text-center font-mono text-[11px] text-th-faint">Free one-month pilot on your own orders</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
};
