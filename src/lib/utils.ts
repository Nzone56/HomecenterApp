import type { Product, RawProduct } from "@/interfaces/product";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const DAY_PERCENTAGE = 0.05; // Represents 5% of the product's value as the estimated daily rental price

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const currencyFormatter = new Intl.NumberFormat("es-CO");

export const transformProduct = (raw: RawProduct): Product => ({
  productId: raw.productId,
  displayName: raw.displayName,
  prices: raw.prices.find((price) => price.type === "NORMAL") || raw.prices[0],
  mediaUrls: raw.mediaUrls,
});
