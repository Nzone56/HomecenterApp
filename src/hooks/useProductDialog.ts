import type { Product, RentalForm } from "@/interfaces/product";
import { createRentalData, downloadAsJson, getDaysInRange } from "@/lib/rental-utils";
import { DAY_PERCENTAGE } from "@/lib/utils";
import { useMemo } from "react";
import { toast } from "sonner";

export const useProductDialog = (product: Product, form: RentalForm) => {
  const isReady = !!parseInt(form.quantity) && !!form.dateRange?.from && !!form.dateRange?.to;

  // Generate the JSON
  const handleSubmitRental = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isReady) return toast.error("Por favor completa todos los campos");

    const rentalData = createRentalData(product, form, totalPrice);
    downloadAsJson(`rental-${product.productId}.json`, rentalData);

    toast.success("El proceso de alquiler culminó de manera correcta");
  };

  // Get the total price of the product rent
  const totalPrice = useMemo(() => {
    const qty = parseInt(form.quantity);
    if (!qty || !form.dateRange?.from || !form.dateRange?.to) return 0;

    const days = getDaysInRange(form.dateRange);
    const unitPricePerDay = product.prices.priceWithoutFormatting * DAY_PERCENTAGE;
    return unitPricePerDay * days * qty;
  }, [form, product]);

  return {
    handleSubmitRental,
    isReady,
    totalPrice,
  };
};
