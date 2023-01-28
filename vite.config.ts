/// <reference types="vitest" />

import { configDefaults, defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [
      './setupFiles/server.ts',
      './setupFiles/extend.ts',
      './setupFiles/indexDB.mock.ts',
      './setupFiles/modules.mock.ts',
      './setupFiles/date.mock.ts',
      '/setupFiles/mongo-memory-server.ts'

    ],
    coverage: {
      reporter: ['text', 'html'],
      all: true,
      exclude: [
        ...configDefaults.exclude,
        '**/e2e/*',
        '**/.next/*',
        '**/db/*',
        'public/**',
        'styles/**',
        'pages/**/*.tsx',
        '**/playwright.config.ts',
        '**/tests-examples/*',
        'types/**',
        '**/*.ts',
        '**/*.js'
      ],
    },
    exclude: [
      ...configDefaults.exclude,
      '**/e2e/*',
      '**/.next/*',
      '**/db/*',
      'public/**',
      'styles/**',
      '**/playwright.config.ts',
      '**/tests-examples/*',
      'types/**',
    ],

  },
})