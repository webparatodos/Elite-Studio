import { writeClient } from './lib/writeClient'

const PICSUM = (seed: string, w = 1200, h = 800) => `https://picsum.photos/seed/${seed}/${w}/${h}`

const imageCache = new Map<string, any>()

async function uploadImage(seed: string, w = 1200, h = 800) {
  const key = `${seed}-${w}x${h}`
  if (imageCache.has(key)) return imageCache.get(key)
  const res = await fetch(PICSUM(seed, w, h))
  const arrayBuffer = await res.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const asset = await writeClient.assets.upload('image', buffer, {
    filename: `${seed}.jpg`,
    contentType: 'image/jpeg',
  })
  const ref = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
  imageCache.set(key, ref)
  return ref
}

const block = (text: string) => [
  {
    _type: 'block',
    _key: crypto.randomUUID(),
    style: 'normal',
    children: [{ _type: 'span', _key: crypto.randomUUID(), text, marks: [] }],
    markDefs: [],
  },
]

const SERVICES = [
  {
    title: 'Producción Artística',
    slug: 'produccion-artistica',
    shortDescription: 'Dirección artística y creación de espectáculos de danza a medida.',
    description: 'Diseñamos y producimos espectáculos de danza para eventos, marcas y compañías, desde la idea creativa hasta la puesta en escena final.',
    features: [
      { title: 'Dirección coreográfica', description: 'Creación de piezas originales adaptadas a cada proyecto.' },
      { title: 'Casting de bailarines', description: 'Selección del elenco idóneo para cada producción.' },
      { title: 'Producción integral', description: 'Gestión de vestuario, escenografía y logística del espectáculo.' },
    ],
    blocks: [{ _type: 'portfolioBlock', heading: 'Portfolio' }],
  },
  {
    title: 'Producción Audiovisual',
    slug: 'produccion-audiovisual',
    shortDescription: 'Grabación y edición de videoclips, contenido para redes y sesiones en estudio.',
    description: 'Contamos con equipo técnico y creativo propio para producir contenido audiovisual de alto nivel: videoclips, reels y piezas para marcas del sector urbano.',
    features: [
      { title: 'Rodaje en estudio o exteriores', description: 'Equipo de cámara, iluminación y sonido profesional.' },
      { title: 'Edición y postproducción', description: 'Montaje, etalonaje y motion graphics.' },
      { title: 'Dirección creativa', description: 'Desarrollo de concepto visual y storyboard.' },
    ],
    blocks: [{ _type: 'portfolioBlock', heading: 'Portfolio Audiovisual' }],
  },
  {
    title: 'Alquiler de Salas',
    slug: 'alquiler-de-salas',
    shortDescription: 'Salas de ensayo equipadas con espejos, suelo profesional y sonido.',
    description: 'Nuestras salas están disponibles por horas para ensayos, castings, rodajes y sesiones fotográficas, con equipamiento profesional incluido.',
    features: [
      { title: 'Suelo de danza profesional', description: 'Superficie amortiguada apta para todo tipo de baile.' },
      { title: 'Sonido e iluminación', description: 'Equipo de sonido y focos regulables incluidos.' },
      { title: 'Reserva flexible', description: 'Alquiler por horas, medio día o jornada completa.' },
    ],
  },
  {
    title: 'Agencia de Representación',
    slug: 'agencia-de-representacion',
    shortDescription: 'Representamos y potenciamos la carrera de bailarines y artistas urbanos.',
    description: 'Gestionamos la carrera profesional de nuestros artistas representados: contratación, bookings, negociación y desarrollo de marca personal.',
    features: [
      { title: 'Bookings y castings', description: 'Acceso a oportunidades profesionales en el sector.' },
      { title: 'Desarrollo de marca personal', description: 'Asesoramiento de imagen y contenido.' },
      { title: 'Gestión de contratos', description: 'Negociación profesional en nombre del artista.' },
    ],
    blocks: [{ _type: 'talentBlock', heading: 'Nuestro Roster' }],
  },
  {
    title: 'Clases de Baile',
    slug: 'clases-de-baile',
    shortDescription: 'Clases regulares de hip hop, urbano, contemporáneo y comercial para todos los niveles.',
    description: 'Ofrecemos clases semanales en múltiples estilos impartidas por profesionales activos en la industria, para todas las edades y niveles.',
    features: [
      { title: 'Todos los niveles', description: 'Desde iniciación hasta nivel avanzado.' },
      { title: 'Múltiples estilos', description: 'Hip hop, urbano, contemporáneo, comercial y más.' },
      { title: 'Horario flexible', description: 'Clases de mañana, tarde y fin de semana.' },
    ],
    blocks: [
      { _type: 'pricingBlock', heading: 'Precios y Bonos' },
      {
        _type: 'kidsBlock',
        heading: 'Élite Kids',
        text: 'Clases pensadas para los más pequeños, en grupos reducidos por edad.',
        groups: [
          { ageRange: '5-9 años', schedule: 'Lunes y miércoles 17:00-18:00', price: '35€/mes' },
          { ageRange: '10-13 años', schedule: 'Martes y jueves 18:00-19:00', price: '40€/mes' },
        ],
      },
      { _type: 'faqBlock', heading: 'Preguntas Frecuentes' },
    ],
  },
  {
    title: 'Formación Profesional',
    slug: 'formacion-profesional',
    shortDescription: 'Programa intensivo para formar a la próxima generación de bailarines profesionales.',
    description: 'Un itinerario formativo completo que combina técnica, teoría, preparación física y experiencia escénica real para dar el salto a la profesionalización.',
    features: [
      { title: 'Formación técnica avanzada', description: 'Programa intensivo de varios estilos de danza.' },
      { title: 'Preparación física', description: 'Acondicionamiento y prevención de lesiones.' },
      { title: 'Experiencia escénica', description: 'Participación en producciones y muestras reales.' },
    ],
    blocks: [
      {
        _type: 'planBlock',
        heading: 'Plan de Estudios',
        items: [
          { title: 'Técnica Urbana', description: 'Hip hop, house, breaking y estilos comerciales.' },
          { title: 'Jazz y Ballet', description: 'Base técnica clásica para todos los perfiles.' },
          { title: 'Preparación Física', description: 'Fuerza, flexibilidad y prevención de lesiones.' },
          { title: 'Desarrollo Artístico', description: 'Interpretación, improvisación y creación coreográfica.' },
          { title: 'Profesores Invitados', description: 'Masterclasses con referentes internacionales.' },
        ],
      },
      {
        _type: 'planBlock',
        heading: 'Salidas Profesionales',
        items: [
          { title: 'Bailarín profesional', description: 'Compañías, giras y espectáculos.' },
          { title: 'Docencia', description: 'Profesor de danza en escuelas y estudios.' },
          { title: 'Coreógrafo', description: 'Creación para artistas, marcas y producciones audiovisuales.' },
        ],
      },
      { _type: 'testimonialBlock', heading: 'Testimonios' },
    ],
  },
  {
    title: 'Campamento',
    slug: 'campamento',
    shortDescription: 'Campamento de verano de danza, música y producción audiovisual para jóvenes.',
    description: 'Una semana intensiva de inmersión artística donde los participantes combinan clases de baile, talleres de música y producción de contenido audiovisual.',
    features: [
      { title: 'Semana intensiva', description: 'Talleres de danza, música y audiovisual cada día.' },
      { title: 'Proyecto final', description: 'Producción de una pieza audiovisual grupal.' },
      { title: 'Plazas limitadas', description: 'Grupos reducidos para una atención personalizada.' },
    ],
    blocks: [{ _type: 'pricingBlock', heading: 'Precios del Campamento' }],
  },
  {
    title: 'Estudios de Música',
    slug: 'estudios-de-musica',
    shortDescription: 'Salas insonorizadas para grabación, producción y ensayo musical.',
    description: 'Espacios equipados con tecnología profesional de grabación para producir maquetas, temas completos y sesiones de ensayo musical.',
    features: [
      { title: 'Grabación profesional', description: 'Cabina insonorizada con equipo de última generación.' },
      { title: 'Producción musical', description: 'Mezcla y mastering a cargo de productores especializados.' },
      { title: 'Ensayo de banda', description: 'Sala equipada para ensayos grupales.' },
    ],
  },
  {
    title: 'Diseño Gráfico',
    slug: 'diseno-grafico',
    shortDescription: 'Identidad visual, carteles y contenido gráfico para artistas y eventos.',
    description: 'Creamos la identidad visual de artistas, escuelas y eventos: logotipos, carteles, artes para redes sociales y material de marca.',
    features: [
      { title: 'Identidad de marca', description: 'Logotipo y sistema visual completo.' },
      { title: 'Diseño para redes', description: 'Plantillas y piezas gráficas para contenido digital.' },
      { title: 'Cartelería de eventos', description: 'Diseño de carteles y flyers para espectáculos.' },
    ],
    blocks: [{ _type: 'portfolioBlock', heading: 'Portfolio de Diseño' }],
  },
  {
    title: 'Estudio de Foto',
    slug: 'estudio-de-foto',
    shortDescription: 'Estudio fotográfico equipado para sesiones artísticas y de books profesionales.',
    description: 'Un espacio versátil con equipo de iluminación profesional para books de danza, campañas de moda urbana y material promocional.',
    features: [
      { title: 'Iluminación profesional', description: 'Set de flashes y continuas configurables.' },
      { title: 'Fondos intercambiables', description: 'Distintos fondos y ciclorama disponibles.' },
      { title: 'Books artísticos', description: 'Sesiones enfocadas en movimiento y danza.' },
    ],
    blocks: [{ _type: 'portfolioBlock', heading: 'Portfolio Fotográfico' }],
  },
]

const NEWS = [
  { title: 'Arranca la nueva temporada de clases en Élite Estudio', slug: 'arranca-nueva-temporada-de-clases', excerpt: 'Nuevos horarios, nuevos profesores y estilos renovados para esta temporada.', content: 'Comenzamos la temporada con una oferta ampliada de clases y un nuevo equipo docente que se incorpora al estudio para reforzar los estilos urbanos y contemporáneos.', categories: ['formacion'] },
  { title: 'Nuestro equipo gana el concurso nacional de danza urbana', slug: 'equipo-gana-concurso-nacional', excerpt: 'La crew de Élite Estudio se alza con el primer premio en la final nacional.', content: 'Después de meses de ensayos, nuestra crew representó al estudio en la final nacional de danza urbana, consiguiendo el primer puesto en la categoría de coreografía grupal.', categories: ['baile', 'eventos'] },
  { title: 'Estrenamos nuevo estudio de producción audiovisual', slug: 'nuevo-estudio-produccion-audiovisual', excerpt: 'Ampliamos nuestras instalaciones con un plató preparado para rodajes profesionales.', content: 'El nuevo plató cuenta con croma, iluminación profesional y equipo de grabación en 4K, permitiéndonos ampliar nuestros servicios de producción audiovisual para artistas y marcas.', categories: ['audiovisual'] },
  { title: 'Abierta la inscripción para el Campamento de Verano 2026', slug: 'inscripcion-campamento-verano-2026', excerpt: 'Una semana de danza, música y creación audiovisual para jóvenes talentos.', content: 'Ya puedes inscribirte en nuestro campamento de verano, una experiencia intensiva donde los participantes combinan formación en danza, música y producción audiovisual.', categories: ['formacion', 'eventos'] },
  { title: 'Firmamos un acuerdo de colaboración con una agencia internacional', slug: 'acuerdo-colaboracion-agencia-internacional', excerpt: 'Nuestros artistas representados tendrán acceso a nuevas oportunidades internacionales.', content: 'Este acuerdo permitirá a los bailarines y artistas representados por nuestra agencia acceder a castings y proyectos internacionales de primer nivel.', categories: ['agencia'] },
  { title: 'Masterclass exclusiva con un coreógrafo internacional', slug: 'masterclass-coreografo-internacional', excerpt: 'Una jornada única de formación con uno de los referentes del panorama urbano actual.', content: 'Organizamos una masterclass exclusiva impartida por un reconocido coreógrafo internacional, abierta a todos los niveles con plazas limitadas.', categories: ['baile', 'formacion'] },
]

const TEAM = [
  { name: 'Laura Gómez', role: 'Directora Artística', bio: 'Coreógrafa y bailarina profesional con más de 15 años de trayectoria.' },
  { name: 'Marcos Ruiz', role: 'Responsable de Producción Audiovisual', bio: 'Director de fotografía especializado en contenido de danza y música urbana.' },
  { name: 'Elena Torres', role: 'Coordinadora de Formación', bio: 'Profesora de danza contemporánea y responsable del programa de formación profesional.' },
  { name: 'David Navarro', role: 'Productor Musical', bio: 'Productor y técnico de sonido en el estudio de música de Élite Estudio.' },
]

const TALENT = [
  { name: 'Nia Fuentes', specialty: 'Hip Hop / Comercial', featured: true },
  { name: 'Kevin Ortiz', specialty: 'Breaking', featured: true },
  { name: 'Sara Molina', specialty: 'Contemporáneo', featured: false },
  { name: 'Diego Paredes', specialty: 'House', featured: false },
]

const TESTIMONIALS = [
  { name: 'Marta S.', text: 'La formación profesional me dio las herramientas técnicas y la confianza para dar el salto a bailar profesionalmente.', serviceSlug: 'formacion-profesional' },
  { name: 'Javier R.', text: 'Los profesores invitados y el nivel del plan de estudios superaron mis expectativas por completo.', serviceSlug: 'formacion-profesional' },
]

const FAQS = [
  { question: '¿Necesito experiencia previa para apuntarme?', answer: 'No, tenemos grupos de iniciación para todos los niveles.', serviceSlug: 'clases-de-baile', order: 0 },
  { question: '¿Puedo probar una clase antes de apuntarme?', answer: 'Sí, ofrecemos una clase suelta de prueba en cualquier estilo.', serviceSlug: 'clases-de-baile', order: 1 },
  { question: '¿Los bonos caducan?', answer: 'Los bonos mensuales caducan a los 30 días desde su compra.', serviceSlug: 'clases-de-baile', order: 2 },
]

const PRICING = [
  { name: 'Bono Mensual General', price: '55€', duration: '30 días', type: 'general', description: 'Acceso ilimitado a todas las clases regulares.', serviceSlug: 'clases-de-baile', order: 0 },
  { name: 'Bono Iniciación', price: '40€', duration: '30 días', type: 'ini-inter', description: '2 clases semanales para nivel iniciación/intermedio.', serviceSlug: 'clases-de-baile', order: 1 },
  { name: 'Clase Suelta', price: '12€', duration: '1 clase', type: 'suelta', description: 'Acceso a una única clase, sin compromiso.', serviceSlug: 'clases-de-baile', order: 2 },
  { name: 'Bono Kids', price: '35€', duration: '30 días', type: 'kids', description: 'Clases semanales para el grupo de 5-9 años.', serviceSlug: 'clases-de-baile', order: 3 },
  { name: 'Semana Campamento', price: '180€', duration: '1 semana', type: 'general', description: 'Incluye todos los talleres y materiales.', serviceSlug: 'campamento', order: 0 },
]

const PORTFOLIO = [
  { title: 'Videoclip "Ritmo Urbano"', type: 'video', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', description: 'Producción completa para artista emergente.', serviceSlug: 'produccion-audiovisual', order: 0 },
  { title: 'Sesión Book Danza', type: 'foto', description: 'Sesión artística en estudio.', serviceSlug: 'estudio-de-foto', order: 0 },
  { title: 'Identidad Festival Urbano', type: 'diseno', description: 'Cartelería y branding de evento.', serviceSlug: 'diseno-grafico', order: 0 },
  { title: 'Reel Campaña Verano', type: 'video', videoUrl: 'https://vimeo.com/76979871', description: 'Pieza para redes sociales.', serviceSlug: 'produccion-audiovisual', order: 1 },
]

async function seed() {
  console.log('Sembrando contenido en Sanity…')

  const siteSettingsImage = await uploadImage('elite-campamento-promo', 500, 250)
  await writeClient.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteName: 'Élite Estudio',
    tagline: 'Un espacio en Madrid donde el baile, la música y la imagen se convierten en oficio y en arte.',
    phones: ['+34 910 000 000', '+34 600 000 000'],
    emails: ['info@eliteestudio.local', 'produccion@eliteestudio.local'],
    address: 'Calle Ejemplo 123, 28001 Madrid',
    mapEmbedUrl: 'https://www.google.com/maps?q=Madrid,Spain&output=embed',
    socialLinks: [
      { _key: 'ig', platform: 'instagram', url: 'https://instagram.com' },
      { _key: 'tt', platform: 'tiktok', url: 'https://tiktok.com' },
      { _key: 'yt', platform: 'youtube', url: 'https://youtube.com' },
    ],
    tiendaUrl: 'https://tienda.eliteestudio-local.com',
    footerText: 'Estudio de danza y productora audiovisual en Madrid. Formación, producción y espacios para creadores.',
    promoBanner: {
      active: true,
      text: '¡Plazas abiertas para el Campamento de Verano 2026! Danza, música y audiovisual en una semana intensiva.',
      ctaLabel: 'Más información',
      ctaUrl: '/servicios/campamento',
      image: siteSettingsImage,
    },
  })
  console.log('Site settings creado.')

  const serviceIds: Record<string, string> = {}

  for (const [i, s] of SERVICES.entries()) {
    const heroImage = await uploadImage(`elite-${s.slug}`, 1200, 900)
    const gallery = await Promise.all(
      [0, 1, 2].map((n) => uploadImage(`elite-${s.slug}-g${n}`, 800, 800)),
    )

    const doc = await writeClient.create({
      _type: 'service',
      title: s.title,
      slug: { _type: 'slug', current: s.slug },
      order: i,
      shortDescription: s.shortDescription,
      description: block(s.description),
      heroImage,
      gallery,
      features: s.features.map((f) => ({ ...f, _key: crypto.randomUUID() })),
      blocks: (s.blocks || []).map((b: any) => ({ ...b, _key: crypto.randomUUID() })),
    })
    serviceIds[s.slug] = doc._id
    console.log(`Servicio creado: ${s.title}`)
  }

  for (const n of NEWS) {
    const featuredImage = await uploadImage(`elite-news-${n.slug}`, 1200, 800)
    await writeClient.create({
      _type: 'news',
      title: n.title,
      slug: { _type: 'slug', current: n.slug },
      excerpt: n.excerpt,
      content: block(n.content),
      featuredImage,
      publishedDate: new Date().toISOString(),
      categories: n.categories,
    })
    console.log(`Noticia creada: ${n.title}`)
  }

  for (const [i, member] of TEAM.entries()) {
    const photo = await uploadImage(`elite-team-${i}`, 500, 650)
    await writeClient.create({
      _type: 'team',
      name: member.name,
      role: member.role,
      bio: member.bio,
      order: i,
      photo,
    })
    console.log(`Miembro de equipo creado: ${member.name}`)
  }

  for (const [i, t] of TALENT.entries()) {
    const photo = await uploadImage(`elite-talent-${i}`, 500, 650)
    await writeClient.create({
      _type: 'talent',
      name: t.name,
      specialty: t.specialty,
      featured: t.featured,
      order: i,
      photo,
      socialLinks: [{ _key: 'ig', platform: 'instagram', url: 'https://instagram.com' }],
    })
    console.log(`Talento creado: ${t.name}`)
  }

  for (const [i, tst] of TESTIMONIALS.entries()) {
    const photo = await uploadImage(`elite-testimonial-${i}`, 200, 200)
    await writeClient.create({
      _type: 'testimonial',
      name: tst.name,
      text: tst.text,
      photo,
      featured: true,
      service: { _type: 'reference', _ref: serviceIds[tst.serviceSlug] },
    })
    console.log(`Testimonio creado: ${tst.name}`)
  }

  for (const f of FAQS) {
    await writeClient.create({
      _type: 'faq',
      question: f.question,
      answer: f.answer,
      order: f.order,
      service: { _type: 'reference', _ref: serviceIds[f.serviceSlug] },
    })
  }
  console.log(`${FAQS.length} FAQs creadas.`)

  for (const p of PRICING) {
    await writeClient.create({
      _type: 'pricing',
      name: p.name,
      price: p.price,
      duration: p.duration,
      type: p.type,
      description: p.description,
      order: p.order,
      service: { _type: 'reference', _ref: serviceIds[p.serviceSlug] },
    })
  }
  console.log(`${PRICING.length} precios creados.`)

  const portfolioIds: string[] = []
  for (const p of PORTFOLIO) {
    const image = p.type !== 'video' ? await uploadImage(`elite-portfolio-${p.title}`, 800, 800) : undefined
    const doc = await writeClient.create({
      _type: 'portfolioItem',
      title: p.title,
      type: p.type,
      videoUrl: p.videoUrl,
      image,
      description: p.description,
      order: p.order,
      service: { _type: 'reference', _ref: serviceIds[p.serviceSlug] },
    })
    portfolioIds.push(doc._id)
  }
  console.log(`${PORTFOLIO.length} elementos de portfolio creados.`)

  const musicHero = await uploadImage('elite-music-hero', 1920, 1080)
  await writeClient.createOrReplace({
    _id: 'musicPage',
    _type: 'musicPage',
    heroTitle: 'MUSIC',
    heroSubtitle: 'Producción musical, grabación y ensayo para artistas urbanos en el corazón de Madrid.',
    heroImage: musicHero,
    description: block('Nuestro estudio de música acompaña a artistas emergentes en la producción de sus temas, desde la maqueta hasta la mezcla final.'),
    ctaLabel: 'Contacta con nosotros',
    ctaUrl: '/contacto',
    portfolio: portfolioIds
      .slice(0, 2)
      .map((id) => ({ _type: 'reference', _ref: id, _key: crypto.randomUUID() })),
  })
  console.log('Página Music creada.')

  console.log('Seed completado.')
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
