import { api } from '@/lib/ky'

export type GetOrdersQuery = {
  pageIndex?: number | null
  orderId?: string | null
  customerName?: string | null
  status?: string | null
}

export type GetOrdersResponse = {
  orders: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getOrders({
  pageIndex,
  customerName,
  orderId,
  status,
}: GetOrdersQuery) {
  const params = [['pageIndex', pageIndex ? String(pageIndex) : '0']]
  if (customerName) params.push(['customerName', customerName])
  if (orderId) params.push(['orderId', orderId])
  if (status) params.push(['status', status])

  const searchParams = new URLSearchParams(params)

  const response = await api
    .get('orders', {
      searchParams,
    })
    .json<GetOrdersResponse>()

  return response
}
