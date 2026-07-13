import { defineField, defineType } from 'sanity'

export const message = defineType({
  name: 'message',
  title: 'Mensaje de Contacto',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nombre', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'phone', title: 'Teléfono', type: 'string' }),
    defineField({ name: 'message', title: 'Mensaje', type: 'text', rows: 4 }),
    defineField({ name: 'createdAt', title: 'Fecha', type: 'datetime' }),
  ],
  preview: { select: { title: 'name', subtitle: 'email' } },
})
