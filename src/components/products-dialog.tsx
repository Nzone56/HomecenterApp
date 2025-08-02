import { DialogClose, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { DialogFooter, DialogHeader } from "./ui/dialog";
import { Button } from "./ui/button";
import type { Product } from "@/interfaces/product";
import { Calendar } from "./ui/calendar";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { currencyFormatter } from "@/lib/utils";
import { useProductDialog } from "@/hooks/useProductDialog";

export const ProductsDialog = ({ product }: { product: Product }) => {
  const { quantity, dateRange, setDateRange, handleQuantityChange, handleAddProduct, isReady, totalPrice } = useProductDialog(product);
  return (
    <form className="flex flex-col gap-4" onSubmit={handleAddProduct}>
      <DialogHeader>
        <DialogTitle>Añadir Producto</DialogTitle>
        <DialogDescription>{product.displayName}</DialogDescription>
      </DialogHeader>

      <div className="flex flex-col items-center gap-4">
        <Calendar mode="range" defaultMonth={dateRange?.from} selected={dateRange} onSelect={setDateRange} className="rounded-lg border shadow-sm" />

        <div className="grid w-full max-w-sm items-center gap-2">
          <Label htmlFor="quantity">Cantidad de productos:</Label>
          <Input type="text" id="quantity" inputMode="numeric" placeholder="0" value={quantity} onChange={handleQuantityChange} disabled={!dateRange} />

          {totalPrice > 0 && (
            <span className="text-green-600 text-sm font-medium mt-1">
              Precio total: {product.prices.symbol}
              {currencyFormatter.format(totalPrice)}
            </span>
          )}
        </div>
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button disabled={!isReady} type="submit">
            Continuar
          </Button>
        </DialogClose>
      </DialogFooter>
    </form>
  );
};
