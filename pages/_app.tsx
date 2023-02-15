import { Layout } from '@/components'
import { ShoppingCartProvider } from '@/context/ShoppingCartContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'


const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ShoppingCartProvider>
      <Layout>
        <Toaster />
        {/* Layout children */}
        <Component {...pageProps} />
      </Layout>
    </ShoppingCartProvider>
  )
}

export default App