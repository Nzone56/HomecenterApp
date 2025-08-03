import { Card } from "@/components/ui/card";
import type { Product } from "@/interfaces/product";
import { ProductCarousel } from "./product-carousel";
import { ProductContent } from "./product-content";

type ProductCardProps = {
  product: Product;
  handleOpenDialog: () => void;
};

export const ProductCard = ({ product, handleOpenDialog }: ProductCardProps) => {
  return (
    <Card className="justify-between animate-appear">
      <ProductCarousel product={product} />
      <ProductContent product={product} handleOpenDialog={handleOpenDialog} />
    </Card>
  );
};
