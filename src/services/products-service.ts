import type { RawProduct } from "@/interfaces/product";

export const ProductsService = {
  url: "https://www.homecenter.com.co/s/search/v1/soco/category/products?categoryId=cat1210001&currentpage=1&zoneId=1&priceGroup=10&sortBy=_score,desc",
  async getProducts(): Promise<RawProduct[]> {
    const res = await fetch(this.url);
    const json = await res.json();
    return json.data?.results ?? [];
  },
};
