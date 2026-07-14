import type { SchemaTypeDefinition } from 'sanity'

import { service } from './service'
import { news } from './news'
import { team } from './team'
import { siteSettings } from './siteSettings'
import { testimonial } from './testimonial'
import { faq } from './faq'
import { talent } from './talent'
import { portfolioItem } from './portfolioItem'
import { pricing } from './pricing'
import { musicPage } from './musicPage'
import { message } from './message'
import { seo } from './seo'
import { imageWithAlt } from './imageWithAlt'
import {
  textBlock,
  pricingBlock,
  faqBlock,
  testimonialBlock,
  talentBlock,
  portfolioBlock,
  kidsBlock,
  planBlock,
} from './blocks'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documentos
    service,
    news,
    team,
    siteSettings,
    testimonial,
    faq,
    talent,
    portfolioItem,
    pricing,
    musicPage,
    message,
    // Objetos reutilizables
    seo,
    imageWithAlt,
    // Objetos de bloque
    textBlock,
    pricingBlock,
    faqBlock,
    testimonialBlock,
    talentBlock,
    portfolioBlock,
    kidsBlock,
    planBlock,
  ],
}
