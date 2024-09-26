import { api } from '@/lib/ky'

export interface RegisterRestaurantRequest {
  restaurantName: string
  managerName: string
  email: string
  phone: string
}

export async function registerRestaurant({ restaurantName, managerName, email, phone }: RegisterRestaurantRequest) {
  await api.post('restaurants', {
    json: {
      restaurantName,
      managerName,
      email,
      phone,
    },
  })
}
