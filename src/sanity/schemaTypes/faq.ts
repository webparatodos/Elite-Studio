import { defineField, defineType } from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Pregunta', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'answer', title: 'Respuesta', type: 'text', rows: 4, validation: (r) => r.required() }),
    defineField({ name: 'service', title: 'Servicio relacionado', type: 'reference', to: [{ type: 'service' }] }),
    defineField({ name: 'order', title: 'Orden', type: 'number', initialValue: 0 }),
  ],
  preview: { select: { title: 'question' } },
})
