import type { Product } from "@/interfaces/product";

import { useProductDialog } from "@/hooks/useProductDialog";
import { RentalDialogContent, RentalDialogFooter, RentalDialogHeader } from "./product-dialog-sections";
import { useRentalForm } from "@/hooks/useRentalForm";

export const ProductsDialog = ({ product }: { product: Product }) => {
  const { form, handleSetQuantity, handleSetRange } = useRentalForm();
  const { handleSubmitRental, isReady, totalPrice } = useProductDialog(product, form);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmitRental}>
      <RentalDialogHeader product={product} />
      <RentalDialogContent form={form} handleSetQuantity={handleSetQuantity} handleSetRange={handleSetRange} product={product} totalPrice={totalPrice} />
      <RentalDialogFooter isValid={isReady} />
    </form>
  );
};
