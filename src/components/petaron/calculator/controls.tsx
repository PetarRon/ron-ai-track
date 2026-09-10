import * as SliderPrimitive from "@radix-ui/react-slider";

export const TokenSlider = ({
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
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-th-line">
      <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-ac-1 via-ac-2 to-ac-3" />
    </SliderPrimitive.Track>
    {/* 44px hit area around a 20px visual thumb; the name lives on the thumb, which is the slider control. */}
    <SliderPrimitive.Thumb
      aria-label={ariaLabel}
      className="calc-thumb flex h-11 w-11 cursor-grab items-center justify-center rounded-full focus-visible:outline-none active:cursor-grabbing"
    >
      <span
        aria-hidden="true"
        className="block h-5 w-5 rounded-full border-2 border-ac-1 bg-th-page shadow-md transition-transform"
      />
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
);

const WORKING_DAYS_PER_MONTH = 22;

export type CalcInputs = {
  ordersPerDay: number;
  minutesPerOrder: number;
  hourlyCost: number;
};

export const computeResults = ({
  ordersPerDay,
  minutesPerOrder,
  hourlyCost,
}: CalcInputs) => {
  const hoursPerMonth =
    (ordersPerDay * WORKING_DAYS_PER_MONTH * minutesPerOrder) / 60;
  const monthlyCost = hoursPerMonth * hourlyCost;
  const annualCost = monthlyCost * 12;
  return {
    monthlyCost: Math.round(monthlyCost),
    annualCost: Math.round(annualCost),
    hoursPerMonth: Math.round(hoursPerMonth),
  };
};
