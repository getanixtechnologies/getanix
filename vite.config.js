import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run build`         -> normal multi-file production build in /dist
// `npm run build:single`  -> one self-contained HTML file in /dist-single (used for the hosted preview)
export default defineConfig(({ mode }) => ({
  plugins: [react(), ...(mode === 'single' ? [viteSingleFile()] : [])],
  build: mode === 'single' ? { outDir: 'dist-single' } : { outDir: 'dist' },
}))
