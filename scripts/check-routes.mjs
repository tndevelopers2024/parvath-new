import { createServer } from 'vite'
import react from '@vitejs/plugin-react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { renderToPipeableStream } from 'react-dom/server'
import { PassThrough } from 'node:stream'
import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'node:fs'

// Render routes without opening a network listener or submitting enquiry forms.
const vite = await createServer({ configFile: false, plugins: [react()], envDir: false, server: { middlewareMode: true, hmr: false, ws: false, watch: null }, appType: 'custom' })
try {
  const { default: App } = await vite.ssrLoadModule('/src/App.jsx')
  const xml = readFileSync('public/sitemap.xml', 'utf8')
  const paths = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]).pathname)
  const summaries = []
  for (const path of [...paths, '/not-a-real-page']) {
    const errors = []
    const html = await new Promise((resolve, reject) => {
      const output = new PassThrough(); let result = ''
      output.on('data', chunk => { result += chunk }); output.on('end', () => resolve(result)); output.on('error', reject)
      const stream = renderToPipeableStream(React.createElement(MemoryRouter, { initialEntries: [path] }, React.createElement(App)), {
        onAllReady() { stream.pipe(output) }, onShellError: reject, onError(error) { errors.push(error.message) },
      })
    })
    const headings = [...html.matchAll(/<h1\b[^>]*>(.*?)<\/h1>/gs)].map(m => m[1].replace(/<[^>]+>/g, '').replace(/<!--.*?-->/g, ''))
    const brokenImages = [...html.matchAll(/<img\b[^>]*src="([^"]+)"/g)].map(m => m[1]).filter(src => src.startsWith('/') && !existsSync(`public${src}`))
    if (errors.length || headings.length !== 1 || brokenImages.length) throw new Error(JSON.stringify({ path, errors, headings, brokenImages }))
    summaries.push({ path, heading: headings[0] })
    console.log('PASS', path)
  }
  mkdirSync('tmp', { recursive: true })
  writeFileSync('tmp/route-checks.json', JSON.stringify(summaries, null, 2))
  console.log(`Rendered ${paths.length} sitemap routes and the 404 page: one H1 each, no render errors or missing rendered images.`)
} finally { await vite.close() }
