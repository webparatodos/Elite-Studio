import type { ReactNode } from 'react'

export const metadata = {
  title: 'Élite Estudio — Studio',
}

export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
