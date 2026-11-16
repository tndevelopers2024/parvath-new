import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { parseEnv } from 'node:util'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { sendEnquiry } from './api/enquiry.js'

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'enquiry-api',
      configureServer(server) {
        const dir = server.config.envDir || server.config.root
        const env = {}
        for (const file of ['.env', '.env.local', `.env.${mode}`, `.env.${mode}.local`]) {
          try {
            Object.assign(env, parseEnv(readFileSync(resolve(dir, file), 'utf8')))
          } catch (error) {
            if (error.code !== 'ENOENT') throw error
          }
        }
        Object.assign(env, process.env)
        server.middlewares.use('/api/enquiry', (req, res) => sendEnquiry(req, res, env))
      },
    },
  ],
}))
