import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // 将 projects/ 目录下的子项目原样复制到 dist 中
    viteStaticCopy({
      targets: [
        { src: 'projects', dest: '.' }
      ]
    })
  ],
  // GitHub Pages 部署时需要设置为仓库名
  base: '/useless-code-show/',
})
