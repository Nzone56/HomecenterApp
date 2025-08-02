import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ProductsDialog } from "./products-dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { currencyFormatter, DAY_PERCENTAGE } from "@/lib/utils";
import { toast } from "sonner";
import type { Product } from "@/interfaces/product";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
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
            <Button className="font-extrabold" onClick={() => toast.success("El producto se cargó de manera exitosa")}>
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
  );
};
