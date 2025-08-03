import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ProductCard } from "./product-card";
import { RentalDialog } from "../rental-dialog/rental-dialog";
import type { Product } from "@/interfaces/product";
import { useRef } from "react";
import { RentalDialogTrigger } from "../rental-dialog/rental-dialog-trigger";

export const ProductItem = ({ product }: { product: Product }) => {
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleOpenDialog = () => {
    triggerRef.current?.click();
  };

  return (
    <>
      <ProductCard product={product} handleOpenDialog={handleOpenDialog} />
      <Dialog>
        <RentalDialogTrigger ref={triggerRef} />
        <DialogContent className="sm:max-w-[425px]">
          <RentalDialog product={product} />
        </DialogContent>
      </Dialog>
    </>
  );
};
