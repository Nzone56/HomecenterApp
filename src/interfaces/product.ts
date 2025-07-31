export interface RawProduct {
  productId: string
  merchantCategoryId: string
  skuId: string
  isPrimeEligible: boolean
  displayName: string
  brand: string
  model: string
  media: unknown
  badges: string[]
  events: string[]
  prices: Price[]
  variants: string[]
  multiPurposeIcon: unknown
  highlights: unknown
  accumulativePoints: string[]
  isPromoted: boolean
  isInternational: string
  installments: unknown
  mediaUrls: string[]
}

export interface Product {
  productId: string
  prices: Price
  mediaUrls: string[]
  displayName: string,
}


interface Price {
  label: string
  type: string
  symbol: string
  price: string
  unit: string
  priceWithoutFormatting: number
}
