import { defineField, defineType } from 'sanity'

export const textBlock = defineType({
  name: 'textBlock',
  title: 'Bloque de texto',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Título', type: 'string' }),
    defineField({ name: 'body', title: 'Contenido', type: 'array', of: [{ type: 'block' }] }),
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: title || 'Bloque de texto' }) },
})

export const pricingBlock = defineType({
  name: 'pricingBlock',
  title: 'Bloque: Precios y Bonos',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Título', type: 'string', initialValue: 'Precios y Bonos' }),
  ],
  preview: { prepare: () => ({ title: 'Bloque: Precios y Bonos' }) },
})

export const faqBlock = defineType({
  name: 'faqBlock',
  title: 'Bloque: Preguntas Frecuentes',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Título', type: 'string', initialValue: 'Preguntas Frecuentes' }),
  ],
  preview: { prepare: () => ({ title: 'Bloque: FAQ' }) },
})

export const testimonialBlock = defineType({
  name: 'testimonialBlock',
  title: 'Bloque: Testimonios',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Título', type: 'string', initialValue: 'Testimonios' }),
  ],
  preview: { prepare: () => ({ title: 'Bloque: Testimonios' }) },
})

export const talentBlock = defineType({
  name: 'talentBlock',
  title: 'Bloque: Roster de Talento',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Título', type: 'string', initialValue: 'Nuestro Roster' }),
  ],
  preview: { prepare: () => ({ title: 'Bloque: Roster' }) },
})

export const portfolioBlock = defineType({
  name: 'portfolioBlock',
  title: 'Bloque: Portfolio',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Título', type: 'string', initialValue: 'Portfolio' }),
  ],
  preview: { prepare: () => ({ title: 'Bloque: Portfolio' }) },
})

export const kidsBlock = defineType({
  name: 'kidsBlock',
  title: 'Bloque: Élite Kids',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Título', type: 'string', initialValue: 'Élite Kids' }),
    defineField({
      name: 'groups',
      title: 'Grupos de edad',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'ageRange', title: 'Rango de edad', type: 'string' },
            { name: 'schedule', title: 'Horario', type: 'string' },
            { name: 'price', title: 'Precio', type: 'string' },
          ],
        },
      ],
    }),
    defineField({ name: 'text', title: 'Texto', type: 'text', rows: 3 }),
  ],
  preview: { prepare: () => ({ title: 'Bloque: Élite Kids' }) },
})

export const planBlock = defineType({
  name: 'planBlock',
  title: 'Bloque: Plan de estudios / Salidas profesionales',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Título', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Puntos',
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
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: title || 'Plan / Salidas' }) },
})
