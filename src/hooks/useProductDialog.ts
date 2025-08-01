import type { Product } from "@/interfaces/product";
import { currencyFormatter, DAY_PERCENTAGE, getDaysInRange } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import { toast } from "sonner";

export const useProductDialog = (product: Product) => {
  const [quantity, setQuantity] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  // Handles the input allowing only integers
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setQuantity(value); // Only allows Integers
  };

  // Generate de JSON
  const handleAddProduct = () => {
    toast("El proceso de alquiler culminó de manera correcta");
    const rentedProduct = {
      fechaInicio: dateRange?.from,
      fechaFinal: dateRange?.to,
      diasAquiler: getDaysInRange(dateRange),
      producto: product.productId,
      descripcionProducto: {
        nombre: product.displayName,
        cantidad: quantity,
        precioProducto: product.prices.price,
      },
      precioDia: currencyFormatter.format(product.prices.priceWithoutFormatting * DAY_PERCENTAGE),
      precioTotal: currencyFormatter.format(totalPrice),
    };

    const json = JSON.stringify(rentedProduct, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `alquiler_${product.productId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Get the total price of the product rent
  const totalPrice = useMemo(() => {
    const qty = parseInt(quantity);
    if (!qty || !dateRange?.from || !dateRange?.to) return 0;

    const days = getDaysInRange(dateRange);
    const unitPricePerDay = product.prices.priceWithoutFormatting * DAY_PERCENTAGE;
    return unitPricePerDay * days * qty;
  }, [quantity, dateRange, product]);

  const isReady = !!parseInt(quantity) && !!dateRange?.from && !!dateRange?.to;

  // Clean input and label when dates become undefined
  useEffect(() => {
    if (!dateRange) setQuantity("");
  }, [dateRange]);

  return {
    quantity,
    dateRange,
    setDateRange,
    handleQuantityChange,
    handleAddProduct,
    isReady,
    totalPrice,
  };
};
