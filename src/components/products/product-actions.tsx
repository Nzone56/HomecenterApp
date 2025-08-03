import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const ProductActions = ({ handleOpenDialog }: { handleOpenDialog: () => void }) => {
  return (
    <Button className="font-extrabold" onClick={handleOpenDialog}>
      <Plus />
      Agregar
    </Button>
  );
};
