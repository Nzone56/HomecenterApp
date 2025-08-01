import { useFetch } from "@/hooks/useFetch";
import type { Product, RawProduct } from "@/interfaces/product";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ProductsDialog } from "./products-dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { currencyFormatter, DAY_PERCENTAGE, transformProduct } from "@/lib/utils";
import { toast } from "sonner";
import { ProductsSkeleton } from "./products-skeleton";
import "../index.css";

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

  if (loading) {
    return (
      <div className="flex flex-wrap justify-center gap-4 my-6 mx-auto px-2 md:px-6 max-w-6xl">
        {Array.from({ length: 15 }).map((_, idx) => (
          <ProductsSkeleton key={idx} />
        ))}
      </div>
    );
  }
  if (error) return <h2 className="text-2xl text-center text-red-500">No se pudieron cargar los productos</h2>;

  return (
    <div className="flex flex-wrap justify-center gap-4 my-6 mx-auto px-2 md:px-6 max-w-6xl">
      {products.map((product) => (
        <Dialog key={product.productId}>
          <Card className="justify-between animate-appear">
            <CardHeader>
              <Carousel opts={{ loop: true }}>
                <CarouselContent>
                  {product.mediaUrls.map((url, index) => (
                    <CarouselItem key={url} className="flex justify-center items-center">
                      <img
                        loading="lazy"
                        decoding="async"
                        width={200}
                        height={200}
                        src={url}
                        alt={`Imagen del producto: ${product.displayName} #${index}`}
                        className="object-contain w-[200px] h-[200px]"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious variant={"secondary"} />
                <CarouselNext variant={"secondary"} />
              </Carousel>
              <CardTitle>{product.displayName}</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <div className="flex flex-col">
                <span>
                  <strong>Precio: </strong>
                  {product.prices.symbol}
                  {product.prices.price}
                </span>
                <span>
                  <strong>Precio x dia: </strong>
                  {product.prices.symbol}
                  {currencyFormatter.format(product.prices.priceWithoutFormatting * DAY_PERCENTAGE)}
                </span>
              </div>
              <DialogTrigger asChild>
                <Button className="font-extrabold" onClick={() => toast("El producto se cargó de manera exitosa")}>
                  <Plus />
                  Agregar
                </Button>
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
