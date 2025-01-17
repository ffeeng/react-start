import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import eslintPlugin from 'vite-plugin-eslint'
import svgr from 'vite-plugin-svgr'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      svgr(),
      react(),
      legacy({
        /**
         * https://github.com/vitejs/vite/tree/main/packages/plugin-legacy
         * target https://github.com/browserslist/browserslist
         */
        targets: ['> 1%', 'not dead'],
        polyfills: true,
        // modernPolyfills: true,
      }),
      eslintPlugin({
        include: ['src/**/*.js', 'src/**/*.vue', 'src/**/*.jsx', 'src/**/*.ts'],
        exclude: ['./node_modules/**'],
        cache: false,
      }),
    ],
    css: {
      /**
       * https://github.com/madyankin/postcss-modules
       */
      modules: {
        localsConvention: 'camelCaseOnly',
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {},
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    server: {
      // https: true,
      host: 'localhost',
      port: 3001,
      open: true,
      proxy: {
        '/zdtc-api': {
          target: 'https://chat-xx.ac.cn',
          secure: true,
          changeOrigin: true,
        },
      },
    },
    build: {
      assetsDir: command === 'build' ? 'chat' : '',
      manifest: true,
      rollupOptions: {
        output: {
          entryFileNames: 'chat/assets/entry/[name][hash].js',
          chunkFileNames: 'chat/assets/chunk/[name][hash].js',
          assetFileNames: 'chat/assets/file/[name][hash].[ext]',
          manualChunks: {
            common: ['react', 'dayjs', 'axios', 'js-cookie'],
            three: ['three', '@react-three/drei', '@react-three/fiber'],
          },
        },
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: command === 'build',
          drop_debugger: command === 'build',
        },
      },
      sourcemap: false,
    },
  }
})
