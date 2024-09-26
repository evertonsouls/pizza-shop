import { api } from "@/lib/ky"

export interface GetManagedRestaurantResponse {
  id: string
  name: string
  createdAt: string | null
  updatedAt: string | null
  description: string | null
  managerId: string | null
}

export async function getManagedRestaurant() {
  const response = await api.get(
    'managed-restaurant',
  ).json<GetManagedRestaurantResponse>()
  
  return response
}