import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
    server: {
      host: true,
      port: parseInt(process.env.PORT ?? "5173"),
      // proxy: {
      //   '/api': {
      //     target: process.env.services__weatherapi__https__0 || process.env.services__weatherapi__http__0,
      //     changeOrigin: true,
      //     rewrite: path => path.replace(/^\/api/, ''),
      //     secure: false
      //   }
      // }
    },
  }),
)
