import { defineField, defineType } from 'sanity'

export const musicPage = defineType({
  name: 'musicPage',
  title: 'Página Music',
  type: 'document',
  fields: [
    defineField({ name: 'heroTitle', title: 'Título del hero', type: 'string', initialValue: 'MUSIC' }),
    defineField({ name: 'heroSubtitle', title: 'Subtítulo del hero', type: 'string' }),
    defineField({ name: 'heroImage', title: 'Imagen del hero', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'description', title: 'Descripción', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'portfolio',
      title: 'Portfolio básico',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'portfolioItem' }] }],
    }),
    defineField({ name: 'ctaLabel', title: 'Texto del CTA', type: 'string', initialValue: 'Contacta con nosotros' }),
    defineField({ name: 'ctaUrl', title: 'URL del CTA', type: 'string', initialValue: '/contacto' }),
  ],
  preview: { prepare: () => ({ title: 'Página Music' }) },
})
