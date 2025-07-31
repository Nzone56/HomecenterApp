import { DialogClose, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { DialogFooter, DialogHeader } from "./ui/dialog";
import { Button } from "./ui/button";
import type { Product } from "@/interfaces/product";

export const ProductsDialog = ({ product }: { product: Product }) => {
  console.log(product);
  return (
    <>
      <DialogHeader>
        <DialogTitle>Añadir Producto</DialogTitle>
        <DialogDescription>{product.displayName}</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4">
      <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow-sm"
      captionLayout="dropdown"
    />
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </>
  );
};
