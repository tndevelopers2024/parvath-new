import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import AboutFounder from '../components/AboutFounder'
import WhyParvath from '../components/WhyParvath'
import Process from '../components/Process'
import CTA from '../components/CTA'
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal'
import EditorialImage from '../components/EditorialImage'
import SectionHeading from '../components/SectionHeading'
import { images } from '../data/images'
import { site } from '../data/site'

const beliefs = [
  {
    title: 'A plan before a product',
    body: 'The question of what to buy comes last. It cannot be answered sensibly until the goals, the timelines and the obligations are on the table.',
  },
  {
    title: 'Plain language, always',
    body: 'If a recommendation cannot be explained in terms you would use yourself, it has not been explained properly.',
  },
  {
    title: 'The whole picture',
    body: 'Personal wealth, the business, protection and succession are one conversation. Treating them separately is where most plans come apart.',
  },
  {
    title: 'Reviewed, not filed away',
    body: 'A plan written once and never revisited stops matching the life it was written for. The review is the work.',
  },
]

export default function About() {
  return (
    <>
      <Seo
        title="About"
        path="/about"
        description={`${site.name} is led by ${site.founder}, who partners with business owners, professionals and families to create, grow, protect and transfer wealth through structured financial planning.`}
      />

      <PageHeader
        eyebrow="About Parvath"
        title="Financial planning built on two decades of practical experience."
        lede={site.positioning}
      />

      <section className="section bg-ivory">
        <div className="shell">
          <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <EditorialImage image={images.consultation} frameSide="left" className="lg:pl-6" />
            </div>

            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="The Practice"
                title="A Boutique Practice, by Choice"
              />

              <Reveal y={16} delay={0.16} className="mt-8">
                <p className="lede">
                  Parvath Financial Services was founded to do financial planning the way it is
                  described in theory and rarely practised: start with the client&rsquo;s
                  circumstances, understand the whole picture, and only then discuss what should
                  actually be done.
                </p>
                <p className="lede mt-5">
                  That takes time per relationship, which is why the practice stays deliberately
                  small. Over seven years of advisory work, it has served more than 200 families
                  and businesses — a number that grows slowly and on purpose.
                </p>
                <p className="lede mt-5">
                  The perspective behind it comes from twenty years in corporate roles before the
                  advisory practice began. That background is the reason business owners tend to
                  find the conversation useful: the pressures of running a company are familiar
                  ones, not theoretical.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <AboutFounder className="border-y border-line" />

      <section className="section bg-ivory">
        <div className="shell">
          <SectionHeading
            eyebrow="How We Work"
            title="Four Things We Hold To"
          />

          <RevealGroup
            className="mx-auto mt-14 grid max-w-4xl gap-x-10 gap-y-10 sm:grid-cols-2"
            stagger={0.09}
          >
            {beliefs.map((belief, i) => (
              <RevealItem key={belief.title} className="border-t border-line pt-7">
                <span className="font-display text-sm text-gold-ink">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-[1.5rem] leading-tight text-forest">
                  {belief.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{belief.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <Process eyebrow="The Process" background="bg-ivory" className="border-t border-line" />
      <WhyParvath />
      <CTA />
    </>
  )
}
