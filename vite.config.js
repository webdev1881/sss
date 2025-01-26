import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  // server: {
  //   https: {
  //     key: fs.readFileSync('D:/IWIS/sms/sss/sss/localhost-key.pem'),
  //     cert: fs.readFileSync('D:/IWIS/sms/sss/sss/localhost.pem')
  //   },
  //   port: 8080
  // },
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'SMS Code Login',
        short_name: 'SMSLogin',
        theme_color: '#ffffff',
        icons: [
          {
            src: './src/icons/icon-48x48.png',
            sizes: '48x48',
            type: 'image/png'
          },
          {
            src: './src/icons/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png'
          },
          {
            src: './src/icons/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: './src/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: './src/icons/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: './src/icons/icon-152x152.png',
            sizes: '152x152',
            type: 'image/png'
          },
          {
            src: './src/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: './src/icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: './src/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: './src/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
