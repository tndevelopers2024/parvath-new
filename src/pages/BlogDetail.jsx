import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Check,
  Clock,
  Share2,
  Sparkles,
  User,
} from 'lucide-react'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import CTA from '../components/CTA'
import Button from '../components/Button'
import Reveal from '../components/Reveal'
import { Diamond, GoldRule, JaaliField, QuoteMark } from '../components/Ornaments'
import { blogs } from '../data/blogs'
import { site } from '../data/site'

export default function BlogDetail() {
  const { slug } = useParams()
  const [copied, setCopied] = useState(false)

  const blog = blogs.find((b) => b.slug === slug)

  if (!blog || blog.inPreparation) {
    return <Navigate to="/blogs" replace />
  }

  // Related active blogs (exclude the current one and in-prep ones)
  const activeBlogs = blogs.filter((b) => !b.inPreparation)
  const currentIndex = activeBlogs.findIndex((b) => b.slug === slug)
  const prevBlog = currentIndex > 0 ? activeBlogs[currentIndex - 1] : null
  const nextBlog = currentIndex < activeBlogs.length - 1 ? activeBlogs[currentIndex + 1] : null
  const otherBlogs = activeBlogs.filter((b) => b.slug !== slug).slice(0, 3)

  const shareUrl = typeof window !== 'undefined' ? window.location.href : `${site.url}/blogs/${slug}`

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2400)
    }
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt,
    author: {
      '@type': 'Person',
      name: blog.author,
    },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
    },
    datePublished: '2025-03-01',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${site.url}/blogs/${blog.slug}`,
    },
  }

  return (
    <>
      <Seo
        title={`${blog.shortTitle || blog.title} | Blogs`}
        path={`/blogs/${blog.slug}`}
        description={blog.excerpt}
        jsonLd={articleJsonLd}
      />

      <PageHeader
        eyebrow={blog.category}
        title={blog.title}
        lede={blog.lead}
        crumb={blog.shortTitle || blog.title}
      >
        {/* Article Meta Header Strip */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 border-t border-ivory/15 pt-6 text-[0.8125rem] text-ivory/80 sm:gap-6">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gold-soft/40 bg-ivory/10 text-gold-soft">
              <User className="h-3.5 w-3.5" strokeWidth={1.75} />
            </span>
            <span className="font-medium">{blog.author}</span>
          </div>

          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-ivory/30" />

          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-gold-soft" strokeWidth={1.75} />
            <span>{blog.readingTime}</span>
          </div>

          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-ivory/30" />

          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-gold-soft" strokeWidth={1.75} />
            <span>{blog.publishedAt}</span>
          </div>

          <span aria-hidden="true" className="hidden h-1 w-1 rounded-full bg-ivory/30 sm:inline" />

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-full border border-ivory/20 bg-ivory/5 px-3 py-1 text-xs text-ivory/90 transition-colors duration-200 hover:border-gold-soft hover:text-gold-soft"
            aria-label="Copy link to article"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-gold-soft" strokeWidth={2} />
                <span className="text-gold-soft">Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                <span>Share</span>
              </>
            )}
          </button>
        </div>
      </PageHeader>

      {/* Main Reading Section */}
      <article className="section bg-ivory">
        <div className="shell">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px] lg:gap-14 xl:grid-cols-[1fr_360px] xl:gap-20">
            
            {/* Left / Center Column: Article Body */}
            <main className="min-w-0">
              
              {/* Key Takeaways Box */}
              {blog.keyTakeaways && blog.keyTakeaways.length > 0 && (
                <Reveal y={20} className="mb-12">
                  <div className="relative overflow-hidden rounded-2xl border border-gold/40 bg-cream p-7 shadow-xs sm:p-9">
                    <div aria-hidden="true" className="pointer-events-none absolute -top-12 -right-12 h-44 w-44">
                      <JaaliField opacity={0.12} scale={36} />
                    </div>

                    <div className="flex items-center gap-2 text-[0.6875rem] font-medium tracking-[0.2em] text-gold-ink uppercase">
                      <Sparkles aria-hidden="true" className="h-3.5 w-3.5 text-gold-ink" strokeWidth={1.75} />
                      Strategic Takeaways
                    </div>

                    <h2 className="mt-3 font-display text-xl font-semibold text-forest sm:text-2xl">
                      Key Principles at a Glance
                    </h2>

                    <ul className="mt-5 space-y-3.5">
                      {blog.keyTakeaways.map((takeaway, idx) => (
                        <li key={idx} className="flex items-start gap-3.5 text-[0.9375rem] leading-relaxed text-charcoal">
                          <Diamond size={7} className="mt-2 shrink-0 border-gold-ink bg-gold-ink" />
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}

              {/* Structured Article Sections */}
              <div className="space-y-12 sm:space-y-14">
                {blog.sections.map((section, sIdx) => (
                  <Reveal key={sIdx} y={20} delay={0.08 * sIdx} className="space-y-5">
                    <h2 className="font-display text-2xl font-semibold text-forest sm:text-[1.875rem] sm:leading-snug">
                      {section.heading}
                    </h2>

                    <GoldRule width="2.5rem" tone="bg-gold" />

                    {section.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-base leading-relaxed text-charcoal/90 sm:text-[1.0625rem] sm:leading-[1.8]">
                        {p}
                      </p>
                    ))}

                    {/* Optional Bullet Points */}
                    {section.bulletPoints && (
                      <div className="my-6 space-y-3 rounded-xl border-l-2 border-forest/30 bg-cream/70 p-5 pl-6 sm:my-8 sm:p-6 sm:pl-7">
                        {section.bulletPoints.map((bp, bpIdx) => (
                          <div key={bpIdx} className="text-[0.9375rem] leading-relaxed">
                            <strong className="font-semibold text-forest">{bp.label}: </strong>
                            <span className="text-muted">{bp.text}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Optional Pull Quote */}
                    {section.quote && (
                      <blockquote className="relative my-8 overflow-hidden rounded-2xl border border-line bg-white p-7 shadow-xs sm:my-10 sm:p-9">
                        <QuoteMark size={32} className="text-gold/40" />
                        <p className="mt-3 font-display text-xl leading-relaxed text-forest sm:text-2xl">
                          “{section.quote.text}”
                        </p>
                        {section.quote.citation && (
                          <footer className="mt-4 text-[0.75rem] font-medium tracking-wide text-gold-ink uppercase">
                            — {section.quote.citation}
                          </footer>
                        )}
                      </blockquote>
                    )}
                  </Reveal>
                ))}
              </div>

              {/* Related Interactive Calculator Box */}
              {blog.relatedCalculator && (
                <Reveal y={20} className="mt-14 sm:mt-16">
                  <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-forest/15 bg-cream p-7 sm:flex-row sm:items-center sm:p-8">
                    <div>
                      <span className="text-[0.6875rem] font-medium tracking-[0.16em] text-gold-ink uppercase">
                        Interactive Planning Tool
                      </span>
                      <h3 className="mt-1 font-display text-xl text-forest sm:text-2xl">
                        {blog.relatedCalculator.title}
                      </h3>
                      <p className="mt-2 max-w-xl text-[0.875rem] leading-relaxed text-muted">
                        {blog.relatedCalculator.description}
                      </p>
                    </div>
                    <Button to={blog.relatedCalculator.path} variant="primary">
                      Launch Tool
                    </Button>
                  </div>
                </Reveal>
              )}

              {/* Author Byline Card */}
              <div className="mt-14 rounded-2xl border border-line bg-white p-7 sm:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-cream text-forest">
                    <span className="font-display text-xl font-bold text-gold-ink">PS</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-lg font-semibold text-forest">{blog.author}</p>
                    <p className="text-xs font-medium text-gold-ink uppercase tracking-wide">{blog.authorRole}</p>
                    <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">
                      With over 20 years of corporate advisory experience and 7+ years guiding families and business owners, we believe financial planning is most potent when approached as one integrated life plan.
                    </p>
                  </div>
                </div>
              </div>

              {/* Prev / Next Article Navigation */}
              <nav aria-label="Article navigation" className="mt-12 grid grid-cols-1 gap-4 border-t border-line pt-8 sm:grid-cols-2">
                {prevBlog ? (
                  <Link
                    to={`/blogs/${prevBlog.slug}`}
                    className="group flex flex-col rounded-xl border border-line bg-white p-5 transition-all duration-300 hover:border-gold hover:shadow-xs"
                  >
                    <span className="flex items-center gap-1 text-[0.6875rem] font-medium tracking-wider text-muted uppercase group-hover:text-forest">
                      <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
                      Previous Article
                    </span>
                    <span className="mt-2 line-clamp-1 font-display text-base font-semibold text-forest group-hover:text-gold-ink">
                      {prevBlog.shortTitle || prevBlog.title}
                    </span>
                  </Link>
                ) : <div />}

                {nextBlog && (
                  <Link
                    to={`/blogs/${nextBlog.slug}`}
                    className="group flex flex-col items-end rounded-xl border border-line bg-white p-5 text-right transition-all duration-300 hover:border-gold hover:shadow-xs"
                  >
                    <span className="flex items-center gap-1 text-[0.6875rem] font-medium tracking-wider text-muted uppercase group-hover:text-forest">
                      Next Article
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="mt-2 line-clamp-1 font-display text-base font-semibold text-forest group-hover:text-gold-ink">
                      {nextBlog.shortTitle || nextBlog.title}
                    </span>
                  </Link>
                )}
              </nav>

            </main>

            {/* Right Column: Sticky Sidebar */}
            <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
              
              {/* Back to All Blogs link */}
              <Link
                to="/blogs"
                className="group inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-forest uppercase transition-colors hover:text-gold-ink"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to all blogs
              </Link>

              {/* Consultation Card */}
              <div className="relative overflow-hidden rounded-2xl bg-forest p-6 text-ivory shadow-card">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0">
                  <JaaliField opacity={0.1} scale={40} tone="#E4D2A6" />
                </div>
                <span className="text-[0.625rem] font-semibold tracking-[0.2em] text-gold-soft uppercase">
                  Advisory Desk
                </span>
                <h3 className="mt-2 font-display text-xl text-ivory sm:text-2xl">
                  Discuss your personal plan
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-ivory/80">
                  Have a specific question about your family wealth or business balance sheet? We invite you to an unhurried, complimentary conversation.
                </p>
                <div className="mt-6">
                  <Button to="/contact" variant="light" className="w-full justify-center">
                    Book Consultation
                  </Button>
                </div>
              </div>

              {/* More Articles List */}
              <div className="rounded-2xl border border-line bg-white p-6 shadow-xs">
                <h3 className="font-heading text-xs font-semibold tracking-[0.16em] text-gold-ink uppercase">
                  More Articles
                </h3>
                <div className="mt-4 divide-y divide-line">
                  {otherBlogs.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/blogs/${item.slug}`}
                      className="group block py-3.5 transition-colors first:pt-0 last:pb-0"
                    >
                      <span className="text-[0.625rem] font-medium tracking-wider text-muted uppercase">
                        {item.category}
                      </span>
                      <h4 className="mt-1 line-clamp-2 font-display text-[0.9375rem] font-semibold leading-snug text-forest transition-colors group-hover:text-gold-ink">
                        {item.shortTitle || item.title}
                      </h4>
                      <span className="mt-1.5 inline-flex items-center gap-1 text-[0.6875rem] font-medium text-muted/70 group-hover:text-forest">
                        <span>{item.readingTime}</span>
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

            </aside>
          </div>
        </div>
      </article>

      {/* Global Closing CTA */}
      <CTA
        eyebrow="Direct Advice"
        title="Ready to structure your own wealth?"
        body="One conversation is often all it takes to bring clarity to questions you have carried for years."
      />
    </>
  )
}
