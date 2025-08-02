import { currencyFormatter, DAY_PERCENTAGE } from "@/lib/utils";
import type { Product } from "@/interfaces/product";

export const getFormattedPrices = (product: Product) => {
  const fullPrice = product.prices.symbol + product.prices.price;
  const dailyPrice = product.prices.symbol + currencyFormatter.format(product.prices.priceWithoutFormatting * DAY_PERCENTAGE);

  return { fullPrice, dailyPrice };
};
