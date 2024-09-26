import ky from 'ky'

import { env } from '@/env'

export const api = ky.extend({
  prefixUrl: env.VITE_API_URL,
  credentials: 'include',
  hooks: {
    beforeRequest: [
      async (request) => {
        if (env.VITE_ENABLE_API_DELAY) {
          await new Promise((resolve) =>
            setTimeout(resolve, Math.round(Math.random() * 3000)),
          )
        }

        return request
      },
    ],
    afterResponse: [
      (_, __, response) => {
        if (response.status === 401) {
          window.location.href = '/sign-in'
        }

        return response
      },
    ],
  },
})
