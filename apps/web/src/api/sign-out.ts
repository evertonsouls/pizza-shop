import { api } from '@/lib/ky'

export async function signOut() {
  await api.post('sign-out').json()
}
