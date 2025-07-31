import { DialogClose, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { DialogFooter, DialogHeader } from "./ui/dialog";
import { Button } from "./ui/button";
import type { Product } from "@/interfaces/product";

export const ProductsDialog = ({ product }: { product: Product }) => {
  console.log(product);
  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4">HOLA</div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </>
  );
};
