import { Component } from 'react'
import { site } from '../data/site'

/** Keep a failed route/chunk recoverable instead of leaving a blank screen. */
export default class ErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch() {
    document.getElementById('boot-preloader')?.remove()
    document.documentElement.style.overflow = ''
    document.body.style.overflow = ''
  }

  render() {
    if (!this.state.failed) return this.props.children
    return (
      <main className="shell py-24" role="alert">
        <h1 className="font-display text-3xl text-forest">We couldn’t load this page.</h1>
        <p className="mt-4 text-muted">Please reload the page, or contact our advisory desk.</p>
        <a href={window.location.href} className="mt-6 inline-block rounded-full bg-forest px-6 py-3 text-white">Reload page</a>
        <p className="mt-6"><a href={site.phoneHref} className="underline">{site.phoneDisplay}</a></p>
      </main>
    )
  }
}
