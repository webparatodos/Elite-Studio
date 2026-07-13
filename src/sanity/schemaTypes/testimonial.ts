import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonio',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nombre', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'photo', title: 'Foto', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'text', title: 'Texto', type: 'text', rows: 4, validation: (r) => r.required() }),
    defineField({ name: 'service', title: 'Servicio relacionado', type: 'reference', to: [{ type: 'service' }] }),
    defineField({ name: 'featured', title: 'Destacado', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'name', subtitle: 'text', media: 'photo' } },
})
