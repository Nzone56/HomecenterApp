import { DialogClose, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { DialogFooter, DialogHeader } from "./ui/dialog";
import { Button } from "./ui/button";
import type { Product } from "@/interfaces/product";
import { Calendar } from "./ui/calendar";
import { useEffect, useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { currencyFormatter, DAY_PERCENTAGE, getDaysInRange } from "@/lib/utils";
import { toast } from "sonner";

export const ProductsDialog = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  // Handles the input allowing only integers
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setQuantity(value); // Only allows Integers
  };


  // Generate de JSON
  const handleAddProduct = () => {
    toast("El proceso de alquiler culminó de manera correcta")
    const rentedProduct = {
      fechaInicio: dateRange?.from,
      fechaFinal: dateRange?.to,
      diasAquiler: getDaysInRange(dateRange),
      producto: product.productId,
      descripcionProducto: {
        nombre: product.displayName,
        cantidad: quantity,
        precioProducto: product.prices.price,
      },
      precioDia: currencyFormatter.format(product.prices.priceWithoutFormatting * DAY_PERCENTAGE),
      precioTotal: currencyFormatter.format(totalPrice)    
    }

    const json = JSON.stringify(rentedProduct, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = `alquiler_${product.productId}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
  }

  // Get the total price of the product rent
  const totalPrice = useMemo(() => {
    const qty = parseInt(quantity);
    if (!qty || !dateRange) return 0;

    const days = getDaysInRange(dateRange);
    const unitPricePerDay = product.prices.priceWithoutFormatting * DAY_PERCENTAGE;
    return unitPricePerDay * days * qty;
  }, [quantity, dateRange, product]);

  const isReady = !!parseInt(quantity) && dateRange;

  // Clean input and label when dates become undefined
  useEffect(() => {
    if (!dateRange) setQuantity("");
  }, [dateRange]);

  return (
    <>
      <DialogHeader>
        <DialogTitle>Añadir Producto</DialogTitle>
        <DialogDescription>{product.displayName}</DialogDescription>
      </DialogHeader>

      <div className="flex flex-col items-center gap-4">
        <Calendar 
          mode="range" 
          defaultMonth={dateRange?.from} 
          selected={dateRange} 
          onSelect={setDateRange} 
          className="rounded-lg border shadow-sm" 
        />

        <div className="grid w-full max-w-sm items-center gap-2">
          <Label htmlFor="quantity">Cantidad de productos:</Label>
          <Input 
            type="text" 
            id="quantity" 
            inputMode="numeric" 
            placeholder="0" 
            value={quantity}
            onChange={handleQuantityChange} 
            disabled={!dateRange} 
          />

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
          <Button disabled={!isReady} onClick={handleAddProduct}>
            Continuar
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
};
