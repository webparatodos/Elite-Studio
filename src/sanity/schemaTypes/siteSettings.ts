import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Configuración del Sitio',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', title: 'Nombre del sitio', type: 'string', initialValue: 'Élite Estudio' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'logo', title: 'Logo', type: 'image' }),
    defineField({
      name: 'phones',
      title: 'Teléfonos',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'emails',
      title: 'Emails',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'address', title: 'Dirección', type: 'string' }),
    defineField({ name: 'mapEmbedUrl', title: 'URL iframe de Google Maps', type: 'url' }),
    defineField({
      name: 'socialLinks',
      title: 'Redes sociales',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Plataforma',
              type: 'string',
              options: { list: ['instagram', 'facebook', 'tiktok', 'youtube', 'x'] },
            },
            { name: 'url', title: 'URL', type: 'url' },
          ],
        },
      ],
    }),
    defineField({
      name: 'tiendaUrl',
      title: 'URL de la Tienda (placeholder)',
      type: 'string',
      initialValue: '#tienda',
      description: 'Enlace externo de la tienda Shopify. Actualiza este campo cuando esté lista.',
    }),
    defineField({ name: 'footerText', title: 'Texto de footer', type: 'text', rows: 3 }),
    defineField({
      name: 'promoBanner',
      title: 'Banner promocional flotante',
      type: 'object',
      fields: [
        { name: 'active', title: 'Activo', type: 'boolean', initialValue: false },
        { name: 'text', title: 'Texto', type: 'string' },
        { name: 'ctaLabel', title: 'Texto del botón', type: 'string' },
        { name: 'ctaUrl', title: 'URL del botón', type: 'string' },
        { name: 'image', title: 'Imagen', type: 'image' },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Configuración del sitio' }) },
})
