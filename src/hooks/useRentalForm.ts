import type { RentalForm } from "@/interfaces/product";
import { useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";

export const useRentalForm = () => {
  const [form, setForm] = useState<RentalForm>({
    quantity: "0",
    dateRange: undefined as DateRange | undefined,
  });

  // Handles the input allowing only integers
  const handleSetQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setForm((prev) => ({ ...prev, quantity: value })); // Only allows Integers
  };

  // Handles the date range selection
  const handleSetRange = (range: DateRange | undefined) => {
    setForm((prev) => ({ ...prev, dateRange: range }));
  };

  // Clean input and label when dates become undefined
  useEffect(() => {
    if (!form.dateRange) setForm((prev) => ({ ...prev, quantity: "" }));
  }, [form.dateRange]);

  return {
    form,
    setForm,
    handleSetQuantity,
    handleSetRange,
  };
};
