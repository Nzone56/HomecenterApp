import type { Product } from "@/interfaces/product";

import { useProductDialog } from "@/hooks/useProductDialog";
import { RentalDialogContent, RentalDialogFooter, RentalDialogHeader } from "./rental-dialog-sections";
import { useRentalForm } from "@/hooks/useRentalForm";

export const RentalDialog = ({ product }: { product: Product }) => {
  const { form, handleSetQuantity, handleSetRange } = useRentalForm();
  const { handleSubmitRental, isReady, totalPrice } = useProductDialog(product, form);

  return (
    <>
      <RentalDialogHeader productName={product.displayName} />
      <RentalDialogContent
        form={form}
        handleSetQuantity={handleSetQuantity}
        handleSetRange={handleSetRange}
        handleSubmitRental={handleSubmitRental}
        product={product}
        totalPrice={totalPrice}
      />
      <RentalDialogFooter isValid={isReady} />
    </>
  );
};
