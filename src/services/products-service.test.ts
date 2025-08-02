import { describe, it, expect, vi, type Mock } from "vitest";
import * as ProductsServiceModule from "@/services/products-service";

describe("ProductsService.getProducts", () => {
  it("Must return results data !== []", async () => {
    const data = [{ id: 1 }];
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: { results: data } }),
      })
    ) as Mock;

    const result = await ProductsServiceModule.ProductsService.getProducts();
    expect(result).toEqual(data);
  });

  it("Must return data === [] if there are not results", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
    ) as Mock;

    const result = await ProductsServiceModule.ProductsService.getProducts();
    expect(result).toEqual([]);
  });
});
