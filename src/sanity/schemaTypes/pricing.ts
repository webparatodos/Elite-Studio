import { defineField, defineType } from 'sanity'

export const pricing = defineType({
  name: 'pricing',
  title: 'Bono / Precio',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nombre', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'price', title: 'Precio', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'duration', title: 'Duración / caducidad', type: 'string' }),
    defineField({
      name: 'type',
      title: 'Tipo',
      type: 'string',
      options: { list: ['general', 'ini-inter', 'suelta', 'kids'] },
    }),
    defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 2 }),
    defineField({ name: 'service', title: 'Servicio relacionado', type: 'reference', to: [{ type: 'service' }] }),
    defineField({ name: 'order', title: 'Orden', type: 'number', initialValue: 0 }),
  ],
  preview: { select: { title: 'name', subtitle: 'price' } },
})
