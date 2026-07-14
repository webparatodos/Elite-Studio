import { defineField, defineType } from 'sanity'

export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Imagen',
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      title: 'Texto alternativo (SEO / accesibilidad)',
      type: 'string',
      description: 'Describe la imagen para buscadores y lectores de pantalla. Si se deja vacío, se usa el título del contenido.',
    }),
  ],
})
