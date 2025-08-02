import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { CardHeader, CardTitle } from "@/components/ui/card";
import type { Product } from "@/interfaces/product";

export const ProductCarousel = ({ product }: { product: Product }) => (
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
      <CarouselPrevious variant="secondary" />
      <CarouselNext variant="secondary" />
    </Carousel>
    <CardTitle>{product.displayName}</CardTitle>
  </CardHeader>
);
