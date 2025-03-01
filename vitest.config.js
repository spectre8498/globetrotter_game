import { defineConfig } from 'vitest/config'; // Correct import path

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    threads: false,
    isolate: false,
  },
});