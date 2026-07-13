import { defineField, defineType } from 'sanity'

export const talent = defineType({
  name: 'talent',
  title: 'Talento (Roster Agencia)',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nombre', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'photo', title: 'Foto', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'specialty', title: 'Especialidad', type: 'string' }),
    defineField({
      name: 'socialLinks',
      title: 'Redes sociales',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Plataforma', type: 'string', options: { list: ['instagram', 'tiktok', 'youtube', 'x'] } },
            { name: 'url', title: 'URL', type: 'url' },
          ],
        },
      ],
    }),
    defineField({ name: 'featured', title: 'Destacado', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Orden', type: 'number', initialValue: 0 }),
  ],
  preview: { select: { title: 'name', subtitle: 'specialty', media: 'photo' } },
})
