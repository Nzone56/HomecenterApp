import { DialogTrigger } from "@radix-ui/react-dialog";
import { forwardRef } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export const RentalDialogTrigger = forwardRef<HTMLButtonElement>((props, ref) => {
  const handleSelectProduct = () => {
    toast.success("El producto se cargó de manera exitosa");
  };

  return (
    <DialogTrigger asChild>
      <Button ref={ref} onClick={handleSelectProduct} className="sr-only" tabIndex={-1} {...props}>
        Hidden Trigger
      </Button>
    </DialogTrigger>
  );
});
