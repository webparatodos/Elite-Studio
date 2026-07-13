# Élite Estudio — Proyecto local (Next.js + Sanity CMS)

Réplica premium en local de una web de estudio de baile / productora audiovisual. Stack: **Next.js 16 (App Router, TypeScript)**, **Tailwind CSS**, **Framer Motion** y **Sanity CMS** (Studio embebido en `/studio`, contenido alojado en la nube de Sanity — plan gratuito).

## Instalación y arranque

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). El panel de contenido está en [http://localhost:3000/studio](http://localhost:3000/studio).

## Configurar Sanity (una sola vez)

1. Crea cuenta y proyecto en [sanity.io](https://sanity.io) (gratis):
   ```bash
   npx sanity login
   npx sanity init --env
   ```
   Elige **Next.js** como framework y **"Clean project / no predefined schema"** (el schema ya está escrito en `src/sanity/schemaTypes/`). Cuando te pregunte si añadir archivos de configuración al proyecto existente, di que no, para no sobrescribir `sanity.config.ts`.

2. Copia el `projectId` que te da la consola y rellena `.env.local` (crea el archivo si no existe):
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=tu-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
   SANITY_API_WRITE_TOKEN=tu-token-de-escritura
   ```

3. El `SANITY_API_WRITE_TOKEN` solo es necesario para ejecutar el seed y para que el formulario de contacto guarde mensajes. Créalo en [sanity.io/manage](https://sanity.io/manage) → tu proyecto → **API** → **Tokens** → **Add API token** → permisos **Editor**.

4. Inicia sesión en `/studio` con tu cuenta de Sanity (mismo login que en `sanity login`).

## Cargar contenido de ejemplo (seed)

```bash
npm run seed
```

Sube a tu dataset de Sanity (requiere `SANITY_API_WRITE_TOKEN` en `.env.local`):
- `siteSettings`: teléfonos, emails, redes sociales, footer, banner promocional flotante y el enlace placeholder de la Tienda.
- 10 servicios con descripción, galería y los bloques modulares correspondientes (Precios, Élite Kids, FAQ, Plan de estudios, Testimonios, Roster, Portfolio).
- 6 noticias con categorías.
- 4 miembros de equipo, 4 talentos de agencia, 2 testimonios, 3 FAQs, 5 precios/bonos, 4 elementos de portfolio.
- El documento único `musicPage` para `/music`.

Puedes ejecutarlo varias veces: los documentos de tipo lista se duplican (bórralos desde `/studio` si no los quieres repetidos), pero `siteSettings` y `musicPage` se sobrescriben (usan un `_id` fijo).

## Panel de contenido (`/studio`)

Desde ahí puedes crear, editar y eliminar sin tocar código:
- **Servicio**: hero, galería, descripción, características y el array de **bloques modulares** (añade "Precios y Bonos", "FAQ", "Testimonios", "Roster", "Portfolio", "Élite Kids", "Plan de estudios" a cualquier servicio).
- **Noticia**: título, extracto, contenido enriquecido, imagen destacada, categorías (para el filtro de `/novedades`).
- **Equipo**, **Talento (Roster Agencia)**, **Testimonio**, **FAQ**, **Bono/Precio**, **Elemento de Portfolio**.
- **Página Music**: documento único para `/music`.
- **Configuración del Sitio**: documento único con contacto, redes, footer, banner flotante y `tiendaUrl`.

Todo el frontend lee estos datos dinámicamente vía GROQ (`src/sanity/lib/queries.ts`) — no hay contenido hardcodeado salvo un par de placeholders decorativos (galería de `/nosotros`, textos por defecto de misión/historia).

## Sección "Tienda"

El enlace del menú "Tienda" es **solo un placeholder**, apunta al campo `tiendaUrl` de **Configuración del Sitio** (editable desde `/studio`). No hay catálogo, carrito ni checkout: la tienda real se integrará más adelante con Shopify en un subdominio aparte, fuera de este proyecto.

## Formulario de contacto

El formulario de `/contacto` usa un Server Action que crea un documento `message` en Sanity (requiere `SANITY_API_WRITE_TOKEN`). Puedes verlos y gestionarlos desde `/studio` → "Mensaje de Contacto". No hay envío real de emails configurado — es un entorno de prueba local.

## Dónde sustituir imágenes/vídeos placeholder

- Todo el contenido del seed usa imágenes de `picsum.photos` subidas como assets reales de Sanity. Para sustituirlas, entra en `/studio`, abre el documento correspondiente y reemplaza la imagen desde el selector — no hace falta tocar código.
- El vídeo del hero de la Home sigue siendo un archivo local: coloca tu `.mp4` en `public/videos/hero-placeholder.mp4` (y opcionalmente `public/images/hero-poster.jpg`).
- Los vídeos de Portfolio/Music aceptan URL de YouTube, Vimeo o un `.mp4` directo — se detecta automáticamente (`src/lib/video.ts`).

## Estructura relevante

```
src/
  sanity/
    schemaTypes/     # service, news, team, siteSettings, testimonial, faq, talent,
                      # portfolioItem, pricing, musicPage, message, blocks.ts
    lib/              # client.ts, writeClient.ts, image.ts, queries.ts
    seed.ts            # script de contenido de ejemplo
  sanity.config.ts       # config del Studio (basePath /studio)
  components/
    layout/               # Header, Footer, CookieBanner, PromoBanner
    home/                  # Hero, ServiciosGrid, Nosotros, NewsGrid, BannerPromo
    service/                # bloques modulares de página de servicio
  app/(frontend)/            # Home, Servicios, Novedades, Nosotros, Contacto, Music
  app/studio/                  # Studio embebido
```

## Comandos

- `npm run dev` — entorno de desarrollo (frontend + Studio en `/studio`).
- `npm run build` / `npm run start` — build y arranque en modo producción.
- `npm run seed` — carga contenido de ejemplo en Sanity.
