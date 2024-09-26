import { api } from '@/lib/ky'

export type GetPopularProductsResponse = {
  product: string
  amount: number
}[]

export async function getPopularProducts() {
  const response = await api
    .get('metrics/popular-products')
    .json<GetPopularProductsResponse>()

  return response
}
