import { useProducts } from "@/hooks/useProducts";
import type { Product, RawProduct } from "@/interfaces/product";
import { transformProduct } from "@/lib/utils";
import { ProductsSkeleton } from "./products-skeleton";
import { ProductsLayout } from "@/layouts/products-layout";
import "../index.css";
import { ProductCard } from "./product-card";

export const Products = () => {
  const url = "https://www.homecenter.com.co/s/search/v1/soco/category/products?categoryId=cat1210001&currentpage=1&zoneId=1&priceGroup=10&sortBy=_score,desc";
  const {
    data: products,
    loading,
    error,
  } = useProducts<Product, RawProduct>({
    url,
    transform: transformProduct,
  });

  if (loading) {
    return (
      <ProductsLayout>
        {Array.from({ length: 15 }).map((_, idx) => (
          <ProductsSkeleton key={idx} />
        ))}
      </ProductsLayout>
    );
  }
  if (error) return <h2 className="text-2xl text-center text-red-500">No se pudieron cargar los productos</h2>;

  return (
    <ProductsLayout>
      {products.map((product) => (
        <ProductCard product={product} key={product.productId} />
      ))}
    </ProductsLayout>
  );
};
