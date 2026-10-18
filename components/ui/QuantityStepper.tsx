"use client";

import { Minus, Plus } from "lucide-react";

type QuantityStepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
  size?: "sm" | "md";
};

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  className = "",
  size = "md",
}: QuantityStepperProps) {
  const pad = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const text = size === "sm" ? "w-8 text-sm" : "w-10 text-base";

  return (
    <div
      className={`inline-flex items-center rounded-full border border-gray-200 bg-white shadow-sm ${className}`}
      role="group"
      aria-label="Quantity"
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        className={`${pad} flex items-center justify-center rounded-l-full text-forest transition hover:bg-mint`}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className={`${text} text-center font-semibold tabular-nums`}>{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        className={`${pad} flex items-center justify-center rounded-r-full text-forest transition hover:bg-mint`}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
