import { defineField, defineType } from 'sanity'

export const portfolioItem = defineType({
  name: 'portfolioItem',
  title: 'Elemento de Portfolio',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'type',
      title: 'Tipo',
      type: 'string',
      options: { list: ['video', 'foto', 'diseno'] },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'service', title: 'Servicio relacionado', type: 'reference', to: [{ type: 'service' }] }),
    defineField({ name: 'image', title: 'Imagen', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'videoUrl', title: 'URL de vídeo (YouTube/Vimeo/mp4)', type: 'url' }),
    defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 3 }),
    defineField({ name: 'order', title: 'Orden', type: 'number', initialValue: 0 }),
  ],
  preview: { select: { title: 'title', subtitle: 'type', media: 'image' } },
})
