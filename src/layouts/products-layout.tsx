import type { ReactNode } from "react";

export const ProductsLayout = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-wrap justify-center gap-4 my-6 mx-auto px-2 md:px-6 max-w-6xl">{children}</div>;
};
