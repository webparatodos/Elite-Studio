import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export function generateMetadata(): Metadata {
  return buildMetadata({
    fallbackTitle: 'Política de Privacidad',
    fallbackDescription:
      'Política de privacidad y protección de datos personales de Élite Estudio, escuela de danza en Madrid.',
    path: '/legal/privacidad',
  })
}

export default function PrivacidadPage() {
  return (
    <div className="pt-40 pb-24 container-px max-w-3xl mx-auto">
      <h1 className="font-display text-4xl mb-8">Política de Privacidad</h1>
      <div className="prose prose-invert max-w-none text-white/70 space-y-4">
        <p>
          En Élite Estudio nos tomamos en serio la protección de tus datos personales. Este es un
          texto de ejemplo para el proyecto local; en un entorno de producción real, aquí se
          detallaría el tratamiento de datos personales conforme al Reglamento General de
          Protección de Datos (RGPD) y la normativa española aplicable.
        </p>
        <h2 className="font-display text-2xl mt-8 mb-2">Responsable del tratamiento</h2>
        <p>
          Élite Estudio, con domicilio en Madrid, es el responsable del tratamiento de los datos
          personales que nos facilitas a través de nuestro formulario de contacto, la inscripción
          en clases o el registro en nuestros eventos y campamentos.
        </p>
        <h2 className="font-display text-2xl mt-8 mb-2">Finalidad del tratamiento</h2>
        <p>
          Utilizamos tus datos para gestionar tu solicitud de información, tramitar tu inscripción
          en nuestros servicios (clases de baile, formación profesional, campamento, alquiler de
          salas, agencia de representación, producción audiovisual, fotografía, diseño gráfico y
          música), y, si nos has dado tu consentimiento, para enviarte comunicaciones sobre
          novedades y eventos del estudio.
        </p>
        <h2 className="font-display text-2xl mt-8 mb-2">Tus derechos</h2>
        <p>
          Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación
          del tratamiento y portabilidad de tus datos escribiéndonos a través de los canales de
          contacto indicados en nuestra página de{' '}
          <a href="/contacto" className="text-accent hover:underline">
            Contacto
          </a>
          .
        </p>
      </div>
    </div>
  )
}
