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
    aria-label={ariaLabel}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-th-line">
      <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-ac-1 via-ac-2 to-ac-3" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-ac-1 bg-th-page shadow-md transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ac-1/40 focus-visible:ring-offset-2 focus-visible:ring-offset-th-page" />
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
