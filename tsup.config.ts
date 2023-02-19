import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['src/main.ts'],
    outDir: 'bin',
    target: 'node16',
    platform: 'node',
    format: ['esm'],
    splitting: false,
    minify: false,
    shims: true,
  }
])
