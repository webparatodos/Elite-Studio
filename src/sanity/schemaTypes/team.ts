import { defineField, defineType } from 'sanity'

export const team = defineType({
  name: 'team',
  title: 'Equipo',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nombre', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'role', title: 'Rol', type: 'string' }),
    defineField({ name: 'order', title: 'Orden', type: 'number', initialValue: 0 }),
    defineField({ name: 'photo', title: 'Foto', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 3 }),
  ],
  preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } },
})
