import './globals.css'
import type { Metadata } from 'next'
import ReduxProvider from './reduxProvider'

export const metadata: Metadata = {
  title: 'Sistema Financeiro SOP',
  description: 'Controle de despesas, empenhos e pagamentos da SOP',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
