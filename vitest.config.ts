import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        '**/*.spec.ts',
        '**/*.test.ts',
        '**/main.ts',
        '**/main.server.ts',
        '**/server.ts',
        '**/*.config.ts',
        '**/*.routes.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@app': resolve(__dirname, './src/app'),
      '@environments': resolve(__dirname, './src/environments'),
      '@assets': resolve(__dirname, './src/assets'),
    },
  },
});
