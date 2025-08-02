import { CardContent } from "@/components/ui/card";
import type { Product } from "@/interfaces/product";
import { useFormattedPrices } from "@/hooks/useFormattedPrices";
import { ProductActions } from "./product-actions";

export const ProductInfo = ({ product }: { product: Product }) => {
  const { fullPrice, dailyPrice } = useFormattedPrices(product);

  return (
    <CardContent className="flex justify-between items-center">
      <div className="flex flex-col">
        <span>
          <strong>Precio: </strong>
          {fullPrice}
        </span>
        <span>
          <strong>Precio x día: </strong>
          {dailyPrice}
        </span>
      </div>
      <ProductActions />.
    </CardContent>
  );
};
