import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export function generateMetadata(): Metadata {
  return buildMetadata({
    fallbackTitle: 'Política de Cookies',
    fallbackDescription: 'Política de cookies de Élite Estudio: qué cookies usamos y cómo gestionarlas.',
    path: '/legal/cookies',
  })
}

export default function CookiesPage() {
  return (
    <div className="pt-40 pb-24 container-px max-w-3xl mx-auto">
      <h1 className="font-display text-4xl mb-8">Política de Cookies</h1>
      <div className="prose prose-invert max-w-none text-white/70 space-y-4">
        <p>
          Este es un texto de ejemplo para el proyecto local Élite Estudio. Usamos cookies
          técnicas necesarias para el funcionamiento del sitio y, opcionalmente, cookies
          analíticas si el usuario las acepta desde el banner de cookies.
        </p>
        <h2 className="font-display text-2xl mt-8 mb-2">¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos de texto que un sitio web almacena en tu navegador
          para recordar información sobre tu visita, como tus preferencias o el hecho de que ya
          has aceptado o rechazado su uso.
        </p>
        <h2 className="font-display text-2xl mt-8 mb-2">Cookies que utilizamos</h2>
        <p>
          <strong className="text-white">Cookies técnicas (necesarias):</strong> imprescindibles
          para el funcionamiento básico del sitio, como recordar tu elección en el banner de
          cookies. No requieren consentimiento.
        </p>
        <p>
          <strong className="text-white">Cookies analíticas (opcionales):</strong> nos ayudan a
          entender cómo se usa la web para mejorar la experiencia de navegación. Solo se activan
          si las aceptas expresamente desde el banner.
        </p>
        <h2 className="font-display text-2xl mt-8 mb-2">Cómo gestionar tus preferencias</h2>
        <p>
          Puedes aceptar, rechazar o configurar las cookies en cualquier momento desde el banner
          que aparece al entrar en el sitio, o borrando las cookies almacenadas desde la
          configuración de tu navegador.
        </p>
      </div>
    </div>
  )
}
