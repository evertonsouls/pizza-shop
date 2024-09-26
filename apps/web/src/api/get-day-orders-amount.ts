import { api } from "@/lib/ky"

export interface GetDayOrdersAmountResponse {
  amount: number
  diffFromYesterday: number
}

export async function getDayOrdersAmount() {
  const response = await api.get<GetDayOrdersAmountResponse>(
    'metrics/day-orders-amount',
  ).json<GetDayOrdersAmountResponse>()

  return response
}