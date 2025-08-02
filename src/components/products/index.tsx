import { ProductsLayout } from "@/layouts/products-layout";
import { ProductsSkeleton } from "./products-skeleton";
import { useProducts } from "@/hooks/useProducts";
import { ProductItem } from "./product-item";
import "../../index.css";

export const Products = () => {
  const { products, loading, error } = useProducts();

  if (error) return <h2 className="text-2xl text-center text-red-700">No se pudieron cargar los productos</h2>;

  return (
    <ProductsLayout>
      {loading
        ? Array.from({ length: 15 }).map((_, idx) => <ProductsSkeleton key={idx} />)
        : products.map((product) => <ProductItem product={product} key={product.productId} />)}
    </ProductsLayout>
  );
};
