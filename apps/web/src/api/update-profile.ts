import { api } from '@/lib/ky'

export interface UpdateProfileRequest {
  name: string
  description: string | null
}

export async function updateProfile({ name, description }: UpdateProfileRequest) {
  await api.put('profile', {
    json: {
      name, 
      description,
    },
  })
}
