import { useFetch } from "@/hooks/useFetch";
import type { Product, RawProduct } from "@/interfaces/product";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import "../index.css";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ProductsDialog } from "./products-dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

const transformProduct = (raw: RawProduct): Product => ({
  productId: raw.productId,
  displayName: raw.displayName,
  prices: raw.prices[0],
  mediaUrls: raw.mediaUrls,
});

export const Products = () => {
  const url = "https://www.homecenter.com.co/s/search/v1/soco/category/products?categoryId=cat1210001&currentpage=1&zoneId=1&priceGroup=10&sortBy=_score,desc";
  const {
    data: products,
    loading,
    error,
  } = useFetch<Product, RawProduct>({
    url,
    transform: transformProduct,
  });

  if (loading) return <h2 className="text-xl text-center">Cargando productos...</h2>;
  if (error) return <h2 className="text-2xl text-center text-red-500">Ocurrió un error al obtener los productos</h2>;

  console.log(products, loading);
  return (
    <div className="flex flex-wrap justify-center gap-4 my-6 mx-auto max-w-6xl">
      {products.map((product) => (
        <Dialog>
          <Card key={product.productId} className="justify-between animate-appear">
            <CardHeader>
              <Carousel opts={{ loop: true }}>
                <CarouselContent>
                  {product.mediaUrls.map((url) => (
                    <CarouselItem key={url} className="flex justify-center items-center">
                      <img src={url} className="w-[200px]" />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious variant={"secondary"} />
                <CarouselNext variant={"secondary"} />
              </Carousel>
              <CardTitle>{product.displayName}</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <span>
                {product.prices.symbol}
                {product.prices.price}
              </span>

              <DialogTrigger asChild>
                <Button className="font-extrabold"><Plus />Agregar</Button>
              </DialogTrigger>
            </CardContent>
          </Card>
          <DialogContent className="sm:max-w-[425px]">
            <ProductsDialog product={product} />
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};
