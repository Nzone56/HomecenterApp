import { useMemo } from "react";
import type { Product } from "@/interfaces/product";
import { getFormattedPrices } from "@/lib/formatted-prices";

export const useFormattedPrices = (product: Product) => {
  return useMemo(() => getFormattedPrices(product), [product]);
};
