import { DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import type { Product, RentalForm } from "@/interfaces/product";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { currencyFormatter } from "@/lib/utils";
import type { DateRange } from "react-day-picker";

export const RentalDialogHeader = ({ product }: { product: Product }) => (
  <DialogHeader>
    <DialogTitle>Añadir Producto</DialogTitle>
    <DialogDescription>{product.displayName}</DialogDescription>
  </DialogHeader>
);

export const RentalDialogFooter = ({ isValid }: { isValid: boolean }) => (
  <DialogFooter>
    <DialogClose asChild>
      <Button variant="outline">Cancelar</Button>
    </DialogClose>
    <DialogClose asChild>
      <Button disabled={!isValid} type="submit">
        Continuar
      </Button>
    </DialogClose>
  </DialogFooter>
);

type RentalDialogContentProps = {
  form: RentalForm;
  product: Product;
  totalPrice: number;
  handleSetRange: (range: DateRange | undefined) => void;
  handleSetQuantity: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const RentalDialogContent = ({ form, handleSetQuantity, handleSetRange, product, totalPrice }: RentalDialogContentProps) => (
  <div className="flex flex-col items-center gap-4">
    <Calendar mode="range" defaultMonth={form.dateRange?.from} selected={form.dateRange} onSelect={handleSetRange} className="rounded-lg border shadow-sm" />

    <div className="grid w-full max-w-sm items-center gap-2">
      <Label htmlFor="quantity">Cantidad de productos:</Label>
      <Input type="text" id="quantity" inputMode="numeric" placeholder="0" value={form.quantity} onChange={handleSetQuantity} disabled={!form.dateRange} />

      {totalPrice > 0 && (
        <span className="text-green-600 text-sm font-medium mt-1">
          Precio total: {product.prices.symbol}
          {currencyFormatter.format(totalPrice)}
        </span>
      )}
    </div>
  </div>
);
