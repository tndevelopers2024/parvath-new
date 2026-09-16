import { JaaliField } from './Ornaments'
import SectionHeading from './SectionHeading'

/** Masthead for every page other than Home. */
export default function PageHeader({ eyebrow, title, lede, children }) {
  return (
    <section className="paper relative overflow-hidden border-b border-line bg-ivory pt-32 pb-16 sm:pt-[179px] lg:pt-[211px] lg:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -right-20 h-80 w-80 [mask-image:radial-gradient(circle_at_center,black,transparent_72%)] lg:h-[28rem] lg:w-[28rem]"
      >
        <JaaliField opacity={0.14} scale={44} />
      </div>

      <div className="shell relative">
        <SectionHeading eyebrow={eyebrow} title={title} lede={lede} level="h1">
          {children}
        </SectionHeading>
      </div>
    </section>
  )
}
