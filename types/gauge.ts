export type GaugeSpec = Readonly<{
  value: number;
  min: number;
  max: number;
  unit: string;
}>;

export const clampNumber = (value: number, min: number, max: number): number => {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
};

export const roundTo = (value: number, digits: number): number => {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
};

export const getGaugeTicks = (min: number, max: number): number[] => {
  const mid = (min + max) / 2;
  return [min, mid, max].map((v) => roundTo(v, 0));
};

export const formatGaugeValue = (value: number, unit: string): string => {
  const safe = Number.isFinite(value) ? value : 0;
  return `${roundTo(safe, 0)} ${unit}`;
};

