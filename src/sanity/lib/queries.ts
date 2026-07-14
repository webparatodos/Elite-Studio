import { groq } from 'next-sanity'

export const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings"][0]`

const serviceCardProjection = groq`{
  "id": _id,
  title,
  "slug": slug.current,
  shortDescription,
  heroImage,
}`

const serviceFullProjection = groq`{
  "id": _id,
  title,
  "slug": slug.current,
  order,
  shortDescription,
  description,
  heroImage,
  heroVideoUrl,
  gallery,
  features,
  blocks,
  seo,
}`

export const SERVICES_QUERY = groq`*[_type == "service"] | order(order asc) ${serviceCardProjection}`

export const SERVICES_QUERY_FULL = groq`*[_type == "service"] | order(order asc) ${serviceFullProjection}`

export const SERVICE_BY_SLUG_QUERY = groq`*[_type == "service" && slug.current == $slug][0] ${serviceFullProjection}`

const newsCardProjection = groq`{
  "id": _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedDate,
  featuredImage,
  categories,
}`

export const NEWS_LIST_QUERY = groq`*[_type == "news"] | order(publishedDate desc) [$start...$end] ${newsCardProjection}`

export const NEWS_LIST_BY_CATEGORY_QUERY = groq`*[_type == "news" && $category in categories] | order(publishedDate desc) [$start...$end] ${newsCardProjection}`

export const NEWS_COUNT_QUERY = groq`count(*[_type == "news"])`

export const NEWS_COUNT_BY_CATEGORY_QUERY = groq`count(*[_type == "news" && $category in categories])`

export const NEWS_HOME_QUERY = groq`*[_type == "news"] | order(publishedDate desc) [0...6] ${newsCardProjection}`

export const NEWS_BY_SLUG_QUERY = groq`*[_type == "news" && slug.current == $slug][0]{
  "id": _id,
  title,
  "slug": slug.current,
  excerpt,
  content,
  publishedDate,
  featuredImage,
  categories,
  seo,
}`

export const NEWS_CATEGORIES_QUERY = groq`array::unique(*[_type == "news"].categories[])`

export const TEAM_QUERY = groq`*[_type == "team"] | order(order asc){
  "id": _id,
  name,
  role,
  photo,
  bio,
}`

export const TESTIMONIALS_BY_SERVICE_QUERY = groq`*[_type == "testimonial" && service._ref == $serviceId]{
  "id": _id,
  name,
  photo,
  text,
  featured,
}`

export const FAQS_BY_SERVICE_QUERY = groq`*[_type == "faq" && service._ref == $serviceId] | order(order asc){
  "id": _id,
  question,
  answer,
}`

export const PRICING_BY_SERVICE_QUERY = groq`*[_type == "pricing" && service._ref == $serviceId] | order(order asc){
  "id": _id,
  name,
  price,
  duration,
  type,
  description,
}`

export const PORTFOLIO_BY_SERVICE_QUERY = groq`*[_type == "portfolioItem" && service._ref == $serviceId] | order(order asc){
  "id": _id,
  title,
  type,
  image,
  videoUrl,
  description,
}`

export const TALENT_QUERY = groq`*[_type == "talent"] | order(order asc){
  "id": _id,
  name,
  photo,
  specialty,
  socialLinks,
  featured,
}`

export const MUSIC_PAGE_QUERY = groq`*[_type == "musicPage"][0]{
  heroTitle,
  heroSubtitle,
  heroImage,
  description,
  ctaLabel,
  ctaUrl,
  "portfolio": portfolio[]->{
    "id": _id,
    title,
    type,
    image,
    videoUrl,
    description,
  }
}`
