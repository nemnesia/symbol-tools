import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Argon2id is intentionally expensive. V8 coverage instrumentation makes it
    // slower still, so Vitest's default 5-second timeout is not appropriate.
    testTimeout: 30_000,
    hookTimeout: 30_000,
  },
});
