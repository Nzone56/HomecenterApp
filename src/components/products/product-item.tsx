import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ProductCard } from "./product-card";
import { ProductsDialog } from "./products-dialog";
import type { Product } from "@/interfaces/product";

export const ProductItem = ({ product }: { product: Product }) => {
  return (
    <Dialog>
      <ProductCard product={product} />
      <DialogContent className="sm:max-w-[425px]">
        <ProductsDialog product={product} />
      </DialogContent>
    </Dialog>
  );
};
