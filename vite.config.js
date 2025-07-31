import { defineConfig } from 'vite';
import { viteExternalsPlugin } from 'vite-plugin-externals';

export default defineConfig({
  base: '/front-end-entrance-exam/',
  plugins: [
    viteExternalsPlugin({
      jspdf: 'jsPDF',
      html2canvas: 'html2canvas',
    }),
  ],
});

