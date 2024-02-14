import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
// @ts-ignore - importing through direct path propagates tRPC types faster
import type { AppRouter } from '@mono/server/src/shared/trpc'
import { apiBase } from '@/config'
import { getStoredAccessToken } from '@/utils/auth'
import SuperJSON from 'superjson'

export const trpc = createTRPCProxyClient<AppRouter>({
  // auto convert Date <-> string
  transformer: SuperJSON,

  links: [
    httpBatchLink({
      url: apiBase,

      headers: () => {
        const token = getStoredAccessToken(localStorage)

        if (!token) return {}

        return {
          Authorization: `Bearer ${token}`,
        }
      },
    }),
  ],
})
