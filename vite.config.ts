import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { codeInspectorPlugin } from 'code-inspector-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    codeInspectorPlugin({
      bundler: 'vite',
      editor: 'code',
    }),
  ],
})
