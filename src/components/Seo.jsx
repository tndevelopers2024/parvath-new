import { useEffect } from 'react'
import { site, siteDescription } from '../data/site'

const DEFAULT_TITLE = `${site.name} | Wealth & Financial Planning`
const DEFAULT_IMAGE = `${site.url}/og-image.png`

/**
 * Head management without an extra dependency.
 *
 * Each tag is found by selector or created once and then reused, so navigating
 * between routes updates the existing tags rather than accumulating new ones.
 * index.html carries the same defaults for crawlers that do not run JS.
 */
function setMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default function Seo({
  title,
  description = siteDescription,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  noindex = false,
  jsonLd,
}) {
  const fullTitle = title ? `${title} | ${site.name}` : DEFAULT_TITLE
  const canonical = `${site.url}${path === '/' ? '/' : path}`

  useEffect(() => {
    document.title = fullTitle

    setMeta('name', 'description', description)
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    setLink('canonical', canonical)

    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', canonical)
    setMeta('property', 'og:image', image)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:site_name', site.name)
    setMeta('property', 'og:locale', 'en_IN')

    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', image)
  }, [fullTitle, description, canonical, image, type, noindex])

  useEffect(() => {
    if (!jsonLd) return
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(jsonLd)
    document.head.appendChild(script)
    return () => script.remove()
  }, [jsonLd])

  return null
}
