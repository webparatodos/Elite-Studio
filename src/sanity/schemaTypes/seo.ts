import { defineField, defineType } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Título para buscadores',
      type: 'string',
      description: 'Si se deja vacío, se usa el título del documento. Recomendado: 50-60 caracteres.',
      validation: (r) => r.max(70).warning('Más de 70 caracteres puede recortarse en Google.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta descripción',
      type: 'text',
      rows: 3,
      description: 'Recomendado: 120-160 caracteres.',
      validation: (r) => r.max(180).warning('Más de 180 caracteres puede recortarse en Google.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Imagen para redes sociales (Open Graph)',
      type: 'image',
      description: 'Si se deja vacía, se usa la imagen destacada del propio contenido.',
    }),
    defineField({
      name: 'noIndex',
      title: 'Ocultar de buscadores (noindex)',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  options: { collapsible: true, collapsed: true },
})
