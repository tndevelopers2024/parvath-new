import { Compass, PenLine, Handshake, Briefcase } from 'lucide-react'
import { pillars } from '../data/site'
import SectionHeading from './SectionHeading'
import { RevealGroup, RevealItem } from './Reveal'

const iconMap = { Compass, PenLine, Handshake, Briefcase }

export default function WhyParvath({ background = 'bg-ivory', className = 'border-y border-line' }) {
  return (
    <section className={`section ${background} ${className}`}>
      <div className="shell">
        <SectionHeading
          eyebrow="Why Parvath"
          title="Built on Experience, Driven by Relationships"
          lede="Four things that shape how every plan is put together, and why clients stay with it."
        />

        <RevealGroup
          className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-10 lg:grid-cols-4"
          stagger={0.09}
        >
          {pillars.map((pillar, i) => {
            const Icon = iconMap[pillar.icon]
            return (
              <RevealItem
                key={pillar.title}
                className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white p-6 transition-[border-color,box-shadow] duration-500 hover:border-gold/60 hover:shadow-card sm:p-7"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 h-0.5 w-10 bg-gold transition-[width] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:w-full"
                />
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream text-forest transition-colors duration-500 group-hover:bg-forest group-hover:text-gold-soft">
                    <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <span aria-hidden="true" className="font-display text-sm text-forest/40">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-[1.375rem] leading-tight text-forest">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{pillar.body}</p>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}
