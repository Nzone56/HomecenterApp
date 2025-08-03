import type { Product, RentalForm, RentalSummary } from "@/interfaces/product";
import type { DateRange } from "react-day-picker";
import { getFormattedPrices } from "./formatted-prices";
import { currencyFormatter } from "./utils";

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

export const createRentalData = (product: Product, form: RentalForm, totalPrice: number): RentalSummary => {
  const { dailyPrice, fullPrice } = getFormattedPrices(product);
  return {
    fechaInicio: form.dateRange?.from,
    fechaFinal: form.dateRange?.to,
    diasAquiler: getDaysInRange(form.dateRange),
    producto: product.productId,
    descripcionProducto: {
      nombre: product.displayName,
      cantidad: form.quantity,
      precioProducto: fullPrice,
    },
    precioDia: dailyPrice,
    costoTotal: currencyFormatter.format(totalPrice),
  };
};

export const downloadAsJson = (filename: string, data: object) => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.download = filename;
  a.href = url;
  a.click();
  URL.revokeObjectURL(url);
};
