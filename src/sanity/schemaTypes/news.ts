import { defineField, defineType } from 'sanity'

export const news = defineType({
  name: 'news',
  title: 'Noticia',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'excerpt', title: 'Extracto', type: 'text', rows: 3 }),
    defineField({ name: 'content', title: 'Contenido', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'featuredImage', title: 'Imagen destacada', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'publishedDate', title: 'Fecha de publicación', type: 'datetime', validation: (r) => r.required() }),
    defineField({
      name: 'categories',
      title: 'Categorías',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Baile', value: 'baile' },
          { title: 'Audiovisual', value: 'audiovisual' },
          { title: 'Eventos', value: 'eventos' },
          { title: 'Formación', value: 'formacion' },
          { title: 'Agencia', value: 'agencia' },
        ],
      },
    }),
  ],
  preview: { select: { title: 'title', media: 'featuredImage' } },
})
