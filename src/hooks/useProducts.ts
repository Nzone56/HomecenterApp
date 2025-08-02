import { ProductsService } from "@/services/products-service";
import { useEffect, useState } from "react";

interface UseFetchProps<T1, T2> {
  url: string;
  transform?: (raw: T2) => T1;
}

export const useProducts = <T1, T2>({ url, transform }: UseFetchProps<T1, T2>) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<T1[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawResults = await ProductsService.getProducts(url);
        const finalResults = transform ? rawResults.map(transform) : rawResults;
        setData(finalResults);
      } catch (err) {
        console.error(err);
        setError(true);
      }
      setLoading(false);
    };

    fetchData();
  }, [url, transform]);

  return { data, loading, error };
};
