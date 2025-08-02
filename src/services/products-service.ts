export const ProductsService = {
  async getProducts(url: string) {
    const res = await fetch(url);
    const json = await res.json();
    return json.data?.results ?? [];
  },
};
