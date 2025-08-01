import type { Product, RawProduct } from "@/interfaces/product";
import { clsx, type ClassValue } from "clsx"
import type { DateRange } from "react-day-picker";
import { twMerge } from "tailwind-merge"

export const DAY_PERCENTAGE = 0.05 // Represents 5% of the product's value as the estimated daily rental price

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getDaysInRange = (range?: DateRange): number => {
  if (!range?.from || !range?.to) return 0;

  const from = new Date(range.from);
  const to = new Date(range.to);

  from.setHours(0, 0, 0, 0);
  to.setHours(0, 0, 0, 0);

  const diffTime = to.getTime() - from.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Including first day

  return diffDays + 1; // Including last day
};

export const currencyFormatter = new Intl.NumberFormat("es-CO")

export const transformProduct = (raw: RawProduct): Product => ({
  productId: raw.productId,
  displayName: raw.displayName,
  prices: raw.prices.find((price) => price.type === "NORMAL") || raw.prices[0],
  mediaUrls: raw.mediaUrls,
});