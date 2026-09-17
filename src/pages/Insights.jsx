import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import CTA from '../components/CTA'
import { InsightCard } from '../components/Insights'
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal'
import { insights } from '../data/site'

export default function InsightsPage() {
  return (
    <>
      <Seo
        title="Insights"
        path="/insights"
        description="Plain-language notes on wealth creation, retirement, protection, legacy planning and financial planning for business owners."
      />

      <PageHeader
        eyebrow="Insights"
        title="Insights for better financial decisions."
        lede="Short notes on the questions that come up most often in planning conversations — written in plain language, without jargon or projections."
      >
        <Reveal y={14} delay={0.24} className="mt-8">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-gold-soft/35 bg-ivory/5 px-4 py-2 text-[0.75rem] tracking-[0.06em] text-ivory/80 backdrop-blur-sm">
            <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-gold/70" />
            The full articles are being written. Topics and summaries are shown below.
          </p>
        </Reveal>
      </PageHeader>

      <section className="section bg-ivory">
        <div className="shell">
          <h2 className="sr-only">All insights</h2>
          <RevealGroup
            className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-10"
            stagger={0.08}
            amount={0.1}
          >
            {insights.map((insight, i) => (
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
        body="Most questions are quicker to answer in conversation than in an article. A first call carries no obligation."
      />
    </>
  )
}
