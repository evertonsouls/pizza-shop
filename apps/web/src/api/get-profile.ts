import { api } from '@/lib/ky'

interface GetProfileResponse {
  id: string
  name: string
  email: string
  phone: string | null
  role: 'manager' | 'customer'
  createdAt: string | null
  updatedAt: string | null
}

export async function getProfile() {
  const response = await api.get('me').json<GetProfileResponse>()
  

  return response
}
