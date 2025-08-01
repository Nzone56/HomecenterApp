import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import { useFetch } from './useFetch'
import type { Price, RawProduct } from '@/interfaces/product'


const mockData = {
  data: {
    results: [
      { id: 1, name: 'Producto 1' },
      { id: 2, name: 'Producto 2' }
    ]
  }
}

describe('useFetchData - Initial State', () => {
  it('Should have data=[], loading=true, error=false', () => {
    const { result } = renderHook(() => useFetch({url: 'https://fake-api.com/products'}))
    const { data, loading, error } = result.current
    
    expect(data).toEqual([])
    expect(loading).toBe(true)
    expect(error).toBe(false)
  })
})

describe('useFetchData - Success', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    ) as Mock
  })
  it('Should return data after fetch resolves', async () => {


    const { result } = renderHook(() =>
      useFetch({
        url: 'https://fake-api.com/products'
      })
    )

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.data).toEqual(mockData.data.results)
    expect(result.current.error).toBe(false)
  })
})


describe('useFetchData - Error state', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.reject(new Error('Network error'))
    ) as Mock
  })
  it('Should set error=true when fetch fails', async () => {

    const { result } = renderHook(() =>
      useFetch({
        url: 'https://fake-api.com/products'
      })
    )

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.error).toBe(true)
    expect(result.current.data).toEqual([])
  })
})


describe('useFetchData with transform ( Product ) ', () => {
  it('Should transform raw data using transform function', async () => {

    const mockRawProduct = [{
      productId: '1',
      displayName: 'Test Product',
      prices: [
        { type: 'DISCOUNT', value: 8000 },
        { type: 'NORMAL', value: 10000 }
      ],
      mediaUrls: ['https://image.com/product.jpg']
    }]

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          data: {
            results: mockRawProduct
          }
        })
      })
    ) as Mock;

    const transformProduct = (raw: RawProduct) => ({
      productId: raw.productId,
      displayName: raw.displayName,
      prices: raw.prices.find((p: Price) => p.type === 'NORMAL') || raw.prices[0],
      mediaUrls: raw.mediaUrls,
    })

    const { result } = renderHook(() =>
      useFetch({
        url: 'https://fake-api.com/products',
        transform: transformProduct
      })
    )

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.error).toBe(false)
    expect(result.current.data).toEqual([
      {
        productId: '1',
        displayName: 'Test Product',
        prices: { type: 'NORMAL', value: 10000 },
        mediaUrls: ['https://image.com/product.jpg']
      }
    ])
  })
})