import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 커스텀 도메인(soobeen.work)을 사용하므로 base를 '/'로 설정
  base: '/',
  build: {
    outDir: 'docs' // GitHub Pages에서 사용할 폴더
  }
})
