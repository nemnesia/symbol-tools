/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/**/*.js'],
      exclude: [
        'node_modules/**',
        'coverage/**',
        'src/impl/external/**',
        'src/nem/index.js',
        'src/nem/models.js',
        'src/nem/models_ts.js',
        'src/symbol/index.js',
        'src/symbol/models.js',
        'src/symbol/models_ts.js',
      ],
      reporter: ['text', 'html', 'clover', 'json'],
      thresholds: {
        perFile: true,
        lines: 90,
        branches: 90,
        functions: 90,
        statements: 90,
      },
    },
  },
});
