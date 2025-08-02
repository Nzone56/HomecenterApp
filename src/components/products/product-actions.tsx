import { DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export const ProductActions = () => {
  const handleSelectProduct = () => {
    toast.success("El producto se cargó de manera exitosa");
  };

  return (
    <DialogTrigger asChild>
      <Button className="font-extrabold" onClick={handleSelectProduct}>
        <Plus />
        Agregar
      </Button>
    </DialogTrigger>
  );
};
