import { defineField, defineType } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Servicio',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'order', title: 'Orden', type: 'number', initialValue: 0 }),
    defineField({ name: 'shortDescription', title: 'Descripción corta', type: 'text', rows: 3 }),
    defineField({ name: 'description', title: 'Descripción', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'heroImage', title: 'Imagen destacada', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'heroVideoUrl', title: 'URL de vídeo (YouTube/Vimeo o mp4)', type: 'url' }),
    defineField({
      name: 'gallery',
      title: 'Galería',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'features',
      title: 'Características',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Título', type: 'string' },
            { name: 'description', title: 'Descripción', type: 'text', rows: 2 },
          ],
        },
      ],
    }),
    defineField({
      name: 'blocks',
      title: 'Bloques modulares',
      description: 'Bloques opcionales para componer la página del servicio sin tocar código.',
      type: 'array',
      of: [
        { type: 'pricingBlock' },
        { type: 'faqBlock' },
        { type: 'testimonialBlock' },
        { type: 'talentBlock' },
        { type: 'portfolioBlock' },
        { type: 'textBlock' },
        { type: 'kidsBlock' },
        { type: 'planBlock' },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', media: 'heroImage' },
  },
})
