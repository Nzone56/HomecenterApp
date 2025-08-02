import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import * as ProductsServiceModule from "@/services/products-service";
import { useProducts } from "@/hooks/useProducts";

describe("useProducts", () => {
  beforeEach(() => {
    vi.restoreAllMocks(); // Clean older mocks
  });

  it("Must return data getProducts", async () => {
    const fakeData = [{ id: 1, name: "Product A" }];

    vi.spyOn(ProductsServiceModule.ProductsService, "getProducts").mockResolvedValue(fakeData);

    const { result } = renderHook(() => useProducts({ url: "/api/products" }));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual(fakeData);
    expect(result.current.error).toBe(false);
  });

  it("Must return error=true if getProducts fails", async () => {
    vi.spyOn(ProductsServiceModule.ProductsService, "getProducts").mockRejectedValue(new Error("error"));

    const { result } = renderHook(() => useProducts({ url: "/api/products" }));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe(true);
    expect(result.current.data).toEqual([]);
  });
});
