import { Card } from "@/components/ui/card";
import type { Product } from "@/interfaces/product";
import { ProductCarousel } from "./product-carousel";
import { ProductInfo } from "./product-info";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="justify-between animate-appear">
      <ProductCarousel product={product} />
      <ProductInfo product={product} />
    </Card>
  );
};
