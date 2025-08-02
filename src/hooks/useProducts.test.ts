import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import * as ProductsServiceModule from "@/services/products-service";
import { useProducts } from "@/hooks/useProducts";
import type { RawProduct } from "@/interfaces/product";
import { transformProduct } from "@/lib/utils";

describe("useProducts", () => {
  beforeEach(() => {
    vi.restoreAllMocks(); // Clean older mocks
  });

  it("Must return data getProducts", async () => {
    const fakeRawData: RawProduct[] = [
      {
        productId: "1",
        merchantCategoryId: "cat1",
        prices: [
          {
            label: "Precio",
            type: "regular",
            symbol: "$",
            price: "100.00",
            unit: "unidad",
            priceWithoutFormatting: 100,
          },
        ],
        mediaUrls: ["url1", "url2"],
        displayName: "Producto 1",
      },
    ];

    const transformedData = fakeRawData.map(transformProduct);

    vi.spyOn(ProductsServiceModule.ProductsService, "getProducts").mockResolvedValue(fakeRawData);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.products).toEqual(transformedData);
    expect(result.current.error).toBe(false);
  });

  it("Must return error=true if getProducts fails", async () => {
    vi.spyOn(ProductsServiceModule.ProductsService, "getProducts").mockRejectedValue(new Error("error"));

    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe(true);
    expect(result.current.products).toEqual([]);
  });
});
