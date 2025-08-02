import type { DateRange } from "react-day-picker";

export interface RawProduct {
  productId: string;
  merchantCategoryId?: string;
  skuId?: string;
  isPrimeEligible?: boolean;
  displayName: string;
  brand?: string;
  model?: string;
  media?: unknown;
  badges?: string[];
  events?: string[];
  prices: Price[];
  variants?: string[];
  multiPurposeIcon?: unknown;
  highlights?: unknown;
  accumulativePoints?: string[];
  isPromoted?: boolean;
  isInternational?: string;
  installments?: unknown;
  mediaUrls: string[];
}

export interface Product {
  productId: string;
  prices: Price;
  mediaUrls: string[];
  displayName: string;
}

export interface Price {
  label: string;
  type: string;
  symbol: string;
  price: string;
  unit: string;
  priceWithoutFormatting: number;
}

export interface RentalForm {
  dateRange?: DateRange | undefined;
  quantity: string;
}

export interface RentalSummary {
  fechaInicio: Date | undefined;
  fechaFinal: Date | undefined;
  diasAquiler: number;
  producto: Product["productId"];
  descripcionProducto: {
    nombre: Product["displayName"];
    cantidad: string;
    precioProducto: Product["prices"]["price"];
  };
  precioDia: string;
  precioTotal: string;
}
