import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      S.listItem()
        .title('Configuración del Sitio')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('Página Music')
        .id('musicPage')
        .child(S.document().schemaType('musicPage').documentId('musicPage')),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !['siteSettings', 'musicPage'].includes(item.getId() ?? ''),
      ),
    ])
