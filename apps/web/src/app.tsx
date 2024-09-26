import './index.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'sonner'

import { ThemeProvider } from '@/components/theme/theme-provider'

import { queryClient } from './lib/react-query'
import { Routes } from './routes'

export function App() {
  return (
    <ThemeProvider storageKey="pizzashop-theme" defaultTheme="dark">
      <HelmetProvider>
        <Helmet titleTemplate="%s | pizza.shop" />
        <QueryClientProvider client={queryClient}>
          <Routes />
        </QueryClientProvider>
        <Toaster richColors />
      </HelmetProvider>
    </ThemeProvider>
  )
}
