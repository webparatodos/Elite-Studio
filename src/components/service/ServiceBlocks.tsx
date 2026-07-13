import { PricingBlock } from '@/components/service/PricingBlock'
import { KidsBlock } from '@/components/service/KidsBlock'
import { FaqBlock } from '@/components/service/FaqBlock'
import { TestimonialBlock } from '@/components/service/TestimonialBlock'
import { PlanBlock } from '@/components/service/PlanBlock'
import { TalentBlock } from '@/components/service/TalentBlock'
import { PortfolioBlock } from '@/components/service/PortfolioBlock'
import { PortableText } from '@portabletext/react'
import { Reveal } from '@/components/Reveal'

type Block = {
  _type: string
  _key: string
  heading?: string
  body?: any
  text?: string
  groups?: any[]
  items?: any[]
}

export function ServiceBlocks({ blocks, serviceId }: { blocks?: Block[]; serviceId: string }) {
  if (!blocks || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block) => {
        switch (block._type) {
          case 'pricingBlock':
            return <PricingBlock key={block._key} serviceId={serviceId} heading={block.heading} />
          case 'kidsBlock':
            return (
              <KidsBlock
                key={block._key}
                heading={block.heading}
                text={block.text}
                groups={block.groups}
              />
            )
          case 'faqBlock':
            return <FaqBlock key={block._key} serviceId={serviceId} heading={block.heading} />
          case 'testimonialBlock':
            return <TestimonialBlock key={block._key} serviceId={serviceId} heading={block.heading} />
          case 'planBlock':
            return <PlanBlock key={block._key} heading={block.heading} items={block.items} />
          case 'talentBlock':
            return <TalentBlock key={block._key} heading={block.heading} />
          case 'portfolioBlock':
            return <PortfolioBlock key={block._key} serviceId={serviceId} heading={block.heading} />
          case 'textBlock':
            return (
              <section key={block._key} className="container-px py-16 max-w-3xl">
                <Reveal>
                  {block.heading && <h2 className="font-display text-3xl mb-6">{block.heading}</h2>}
                  {block.body && (
                    <div className="prose prose-invert max-w-none">
                      <PortableText value={block.body} />
                    </div>
                  )}
                </Reveal>
              </section>
            )
          default:
            return null
        }
      })}
    </>
  )
}
