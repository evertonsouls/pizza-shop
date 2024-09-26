import { api } from "@/lib/ky"

export interface GetDailyRevenueInPeriodQuery {
  from?: Date
  to?: Date
}

export type GetDailyRevenueInPeriodResponse = {
  date: string
  receipt: number
}[]

export async function getDailyRevenueInPeriod({
  from,
  to,
}: GetDailyRevenueInPeriodQuery) {
  const response = await api.get(
    'metrics/daily-receipt-in-period',
    {
      searchParams: {
        from: from ? from?.toISOString() : new Date().toISOString(),
        to: to ? to?.toISOString() : new Date().toISOString(),  
      },
    },
  ).json<GetDailyRevenueInPeriodResponse>()

  return response
}