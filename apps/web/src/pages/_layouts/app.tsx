import { useQuery } from '@tanstack/react-query'
import { Outlet, useNavigate } from 'react-router-dom'

import { getProfile } from '@/api/get-profile'
import { Header } from '@/components/header'

export function AppLayout() {
  const navigate = useNavigate()

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity,
  })

  if (isLoadingProfile) return null

  if (!profile) {
    navigate('/sign-in', { replace: true })
    return null
  }

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />

      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  )
}
