import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ProductsSkeleton = () => {
  return (
    <Card className="p-4">
      <Skeleton className="w-full h-[200px] rounded-lg" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-10 w-full rounded-md" />
    </Card>
  );
};
