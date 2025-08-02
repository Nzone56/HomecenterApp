import { ProductsService } from "@/services/products-service";
import { useEffect, useState } from "react";
import type { Product } from "@/interfaces/product";
import { transformProduct } from "@/lib/utils";

export const useProducts = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawResults = await ProductsService.getProducts();
        const finalResults = rawResults.map(transformProduct);
        setProducts(finalResults);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { products, loading, error };
};
