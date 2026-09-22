import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { insights } from '../data/site'
import SectionHeading from './SectionHeading'
import Reveal, { RevealGroup, RevealItem } from './Reveal'
import Button from './Button'

/**
 * Editorial note cards for blogs & insights.
 * Active articles link directly to their full long-form piece;
 * upcoming topics indicate "Article in preparation".
 */
export function InsightCard({ insight, index }) {
  const isAvailable = !insight.inPreparation

  const cardContent = (
    <>
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 h-0.5 w-10 bg-gold transition-[width] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:w-full"
      />
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full border border-gold/40 bg-cream px-3 py-1 text-[0.625rem] font-medium tracking-[0.18em] text-gold-ink uppercase">
          {insight.category}
        </span>
        <span aria-hidden="true" className="font-display text-sm text-forest/50">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <h3 className="mt-5 font-display text-[1.5rem] leading-tight text-forest transition-colors duration-300 group-hover:text-gold-ink sm:text-[1.625rem]">
        {insight.title}
      </h3>

      <p className="mt-4 grow text-[0.9375rem] leading-relaxed text-muted">{insight.excerpt}</p>

      <div className="mt-6 flex items-center justify-between border-t border-line pt-5 text-[0.6875rem] font-medium tracking-[0.14em] uppercase">
        <span className="text-muted">{insight.readingTime}</span>
        {isAvailable ? (
          <span className="inline-flex items-center gap-1.5 font-semibold text-forest transition-colors duration-200 group-hover:text-gold-ink">
            <span>Read Article</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        ) : (
          <span className="text-muted/60">Article in preparation</span>
        )}
      </div>
    </>
  )

  if (isAvailable) {
    return (
      <Link
        to={`/blogs/${insight.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold/60 hover:shadow-card sm:p-8"
      >
        {cardContent}
      </Link>
    )
  }

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white p-7 opacity-85 transition-[border-color,box-shadow] duration-500 hover:border-gold/60 hover:shadow-card sm:p-8">
      {cardContent}
    </article>
  )
}

export default function Insights({ limit, withCta = true, background = 'bg-ivory' }) {
  const items = limit ? insights.slice(0, limit) : insights

  return (
    <section className={`section ${background}`}>
      <div className="shell">
        <SectionHeading
          eyebrow="Blogs &amp; Perspectives"
          title="Insights for Better Financial Decisions"
          lede="Plain-language notes on wealth creation, retirement, protection, and business continuity."
        />

        <RevealGroup
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-6"
          stagger={0.08}
          amount={0.12}
        >
          {items.map((insight, i) => (
            <RevealItem key={insight.slug} className="h-full">
              <InsightCard insight={insight} index={i} />
            </RevealItem>
          ))}
        </RevealGroup>

        {withCta && (
          <Reveal y={16} className="mt-8 flex justify-center">
            <Button to="/blogs" variant="secondary" withArrow={false}>
              View All Blogs
            </Button>
          </Reveal>
        )}
      </div>
    </section>
  )
}
