import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import CTA from '../components/CTA'
import { InsightCard } from '../components/Insights'
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal'
import { blogs } from '../data/blogs'

export default function InsightsPage() {
  return (
    <>
      <Seo
        title="Blogs & Perspectives"
        path="/blogs"
        description="Plain-language articles and perspectives on wealth creation, retirement planning, family protection, and business continuity."
      />

      <PageHeader
        eyebrow="Blogs & Perspectives"
        title="Insights for better financial decisions."
        lede="Plain-language perspectives on the strategic questions that shape long-term family wealth, business resilience, and generational continuity."
        crumb="Blogs"
      >
        <Reveal y={14} delay={0.24} className="mt-8">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-gold-soft/35 bg-ivory/5 px-4 py-2 text-[0.75rem] tracking-[0.06em] text-ivory/80 backdrop-blur-sm">
            <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-gold/70" />
            Clear, dignified guidance without jargon or speculative projections.
          </p>
        </Reveal>
      </PageHeader>

      <section className="section bg-ivory">
        <div className="shell">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6 sm:mb-10 lg:mb-12">
            <div>
              <h2 className="font-display text-2xl font-semibold text-forest sm:text-3xl">
                Featured Articles
              </h2>
              <p className="mt-1 text-sm text-muted">
                Explore in-depth notes on our core planning disciplines.
              </p>
            </div>
            <span className="text-xs font-medium tracking-wider text-gold-ink uppercase">
              {blogs.filter((b) => !b.inPreparation).length} Published Articles
            </span>
          </div>

          <RevealGroup
            className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10"
            stagger={0.08}
            amount={0.1}
          >
            {blogs.map((insight, i) => (
              <RevealItem key={insight.slug} className="h-full">
                <InsightCard insight={insight} index={i} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CTA
        eyebrow="Questions"
        title="Rather just ask directly?"
        body="Most questions are quicker to answer in conversation than in an article. A first call carries no cost or obligation."
      />
    </>
  )
}
